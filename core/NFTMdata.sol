pragma solidity ^0.5.0;
import "./NFToken.sol";

contract NFTMdata is NFToken {
    
    enum NFTType { BlindBox, Normal }
    string internal nftName;
    string internal nftSymbol;

    string constant INVALID_INDEX = "005007";
    string constant INVALID_BLINKBOX = "005008";

    uint256 constant NO_GROUP = 0;
    uint256 public groupId;

    uint256[] public tokens;
    cAttributesStruct[] public cAttributes;
    mapping(uint256 => uint256) public idToIndex;
    mapping(address => uint256[]) public ownerToIds;
    mapping(uint256 => uint256) public idToOwnerIndex;
    mapping(uint256 => uint256[]) public groupToIds;    //组id对应的tokenIds
    mapping(uint256 => uint256) public groupToIndex;

   
    struct cAttributesStruct{
        NFTType     nftType;
        uint256     groupId;    //组id
        string      uri;
        string      describe;   //描述
        uint256     price;      //价格
        string      name;    
        uint256[]   atterbutes; //一些属性
    }
  
    function name() external view returns (string memory _name){
        return nftName;
    }

    function symbol() external view returns (string memory _symbol){
        return nftSymbol;
    }

    function totalSupply() external view returns (uint256) {
        return tokens.length;
    }

    function totalTokens() external view returns (uint256[] memory) {
        return tokens;
    }

    function ownerTokens(address _owner) external view returns (uint256[] memory) {
        return ownerToIds[_owner];
    }

    function _mint(address _to, string memory _name, string memory _uri, 
    string memory _des, NFTType _type,  uint32 _count, bool _isGroup) internal {
        if(_isGroup){
            groupId++;
        }

        for (uint256 i = 0; i < _count; i++) {
            uint256 _tokenId = super._mint(_to);
           
            tokens.push(_tokenId);
            idToIndex[_tokenId] = tokens.length - 1;
            
            cAttributesStruct memory attr;
            if(_isGroup){
                attr.groupId = groupId;   
                groupToIds[_tokenId].push(_tokenId);
                groupToIndex[_tokenId] = groupToIds[_tokenId].length - 1;
            }else{
                attr.groupId = NO_GROUP;   
            }
            
            attr.uri = _uri;   
            attr.nftType = _type;
            attr.name = _name;
            attr.describe = _des;
            cAttributes.push(attr);
        }
    
    }

    function _burn(uint256 _tokenId) internal {
        super._burn(_tokenId);

        uint256 tokenIndex = idToIndex[_tokenId];
        uint256 lastTokenIndex = tokens.length - 1;
        uint256 lastToken = tokens[lastTokenIndex];

        tokens[tokenIndex] = lastToken;

        tokens.pop();
        // This wastes gas if you are burning the last token but saves a little gas if you are not.
        idToIndex[lastToken] = tokenIndex;
        idToIndex[_tokenId] = 0;

        
        if(cAttributes[tokenIndex].groupId != NO_GROUP){
            uint256 lIndex = groupToIds[_tokenId].length - 1;
            uint256 index = groupToIndex[_tokenId];

            uint256 lt = groupToIds[_tokenId][lIndex];
            groupToIds[_tokenId][index] = lt;
            groupToIds[_tokenId].pop();

            groupToIndex[lt] = index;
            groupToIndex[_tokenId] = 0;
        }

        cAttributesStruct memory lastAttr = cAttributes[lastTokenIndex];
        cAttributes[tokenIndex] = lastAttr;
        cAttributes.pop();
        
    }

    function _removeNFToken(address _from, uint256 _tokenId) internal {
        require(idToOwner[_tokenId] == _from, NOT_OWNER);
        delete idToOwner[_tokenId];

        uint256 tokenToRemoveIndex = idToOwnerIndex[_tokenId];
        uint256 lastTokenIndex = ownerToIds[_from].length - 1;

        if (lastTokenIndex != tokenToRemoveIndex){
            uint256 lastToken = ownerToIds[_from][lastTokenIndex];
            ownerToIds[_from][tokenToRemoveIndex] = lastToken;
            idToOwnerIndex[lastToken] = tokenToRemoveIndex;
        }

        ownerToIds[_from].pop();
    }


    function _addNFToken(address _to, uint256 _tokenId) internal {
        require(idToOwner[_tokenId] == address(0), NFT_ALREADY_EXISTS);
        idToOwner[_tokenId] = _to;

        ownerToIds[_to].push(_tokenId);
        idToOwnerIndex[_tokenId] = ownerToIds[_to].length - 1;
    }
    
    function _getOwnerNFTCount(address _owner) internal view returns (uint256){
        return ownerToIds[_owner].length;
    }

    function _openBlindBox(uint256 _tokenId) internal validNFToken(_tokenId){
       
    }
    

    function _setTokenDescribe(uint256 _tokenId, string memory _des) internal validNFToken(_tokenId){
        uint256 tokenIndex = idToIndex[_tokenId];
        cAttributes[tokenIndex].describe = _des;
    }

    function _setTokenPrice(uint256 _tokenId, uint256 _price) internal validNFToken(_tokenId){
        uint256 tokenIndex = idToIndex[_tokenId];
        if(_price != cAttributes[tokenIndex].price){
             cAttributes[tokenIndex].price = _price;
        }
    }

    
    function _setTokenAttributes(uint256 _tokenId, uint256 _index,uint256 _tvalue) internal validNFToken(_tokenId){
        uint256 tokenIndex = idToIndex[_tokenId];
        cAttributes[tokenIndex].atterbutes[_index] = _tvalue;
    }
    
    function _addTokenAttributes(uint256 _tokenId, uint256 _tvalue) internal validNFToken(_tokenId){
        uint256 tokenIndex = idToIndex[_tokenId];
        cAttributes[tokenIndex].atterbutes.push(_tvalue);
    }
    
    function getAttributesLength(uint256 _tokenId) public view validNFToken(_tokenId) returns(uint256){
        uint256 tokenIndex = idToIndex[_tokenId];
        return cAttributes[tokenIndex].atterbutes.length;
    }
    
    function getAttributesValuebyIndex(uint256 _tokenId, uint256 _index) public view validNFToken(_tokenId) returns(uint256){
        uint256 tokenIndex = idToIndex[_tokenId];
        return cAttributes[tokenIndex].atterbutes[_index];
    }

    function getTokenPrice(uint256 _tokenId) external view validNFToken(_tokenId) returns(uint256){
        uint256 tokenIndex = idToIndex[_tokenId];
        return cAttributes[tokenIndex].price;
    }
    
}