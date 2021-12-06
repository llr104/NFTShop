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
    mapping(uint256 => uint256) public idToIndex;
    mapping(address => uint256[]) public ownerToIds;
    mapping(uint256 => uint256) public idToOwnerIndex;
    mapping(uint256 => cAttributesStruct) public cAttributes;
    mapping(uint256 => uint256[]) public groupToIds;    //组id对应的tokenIds
    mapping(uint256 => uint256) public groupToIndex;
    
    struct cAttributesStruct{
        NFTType     nftType;
        uint256     groupId;    //组id
        string      uri;
        string      describe;   //描述
        uint256     price;      //价格
        bool        onSale;     //是否在售      
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

    function tokenByIndex(uint256 _index) external view returns (uint256){
        require(_index < tokens.length, INVALID_INDEX);
        return tokens[_index];
    }

    function tokenOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256){
        require(_index < ownerToIds[_owner].length, INVALID_INDEX);
        return ownerToIds[_owner][_index];
    }
    
    function _mint(address _to, string memory _uri, NFTType _type, uint32 count, bool _isGroup) internal {
        if(_isGroup){
            groupId++;
        }

        for (uint256 i = 0; i < count; i++) {
            uint256 _tokenId = super._mint(_to);
           
            tokens.push(_tokenId);
            idToIndex[_tokenId] = tokens.length - 1;

            if(_isGroup){
                _setTokenGroupId(_tokenId, groupId);
                groupToIds[_tokenId].push(_tokenId);
                groupToIndex[_tokenId] = groupToIds[_tokenId].length - 1;
            }else{
                _setTokenGroupId(_tokenId, NO_GROUP);
            }
            _setTokenUri(_tokenId, _uri);
            _setNFTType(_tokenId, _type);
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

        if(cAttributes[_tokenId].groupId != NO_GROUP){
            lastTokenIndex = groupToIds[_tokenId].length - 1;
            tokenIndex = groupToIndex[_tokenId];

            lastToken = groupToIds[_tokenId][lastTokenIndex];
            groupToIds[_tokenId][tokenIndex] = lastToken;
            groupToIds[_tokenId].pop();

            groupToIndex[lastToken] = tokenIndex;
            groupToIndex[_tokenId] = 0;
        }
        
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
        // address _to = idToOwner[_tokenId];
        // cAttributesStruct memory cattr = cAttributes[_tokenId];
        // require(cattr.nftType == NFTType.BlindBox, INVALID_BLINKBOX);
        // _burn(_tokenId);

        // uint256 _newTokenId = _mint(_to);
        // cattr.nftType = NFTType.Normal;
        // cAttributes[_newTokenId] = cattr;
    }

    function tokenUri(uint256 _tokenId) public view returns(string memory _uri){
        _uri = cAttributes[_tokenId].uri;
    }

    function _setTokenUri(uint256 _tokenId, string memory _uri) internal validNFToken(_tokenId) {
        cAttributes[_tokenId].uri = _uri;    
    }
    
    function _setNFTType(uint256 _tokenId, NFTType _type) internal validNFToken(_tokenId){
        cAttributes[_tokenId].nftType = _type;   
    }

    function _setTokenGroupId(uint256 _tokenId, uint256 _groupId) internal validNFToken(_tokenId) {
        cAttributes[_tokenId].groupId = _groupId;    
    }
    

    function _setTokenDescribe(uint256 _tokenId, string memory _des) internal validNFToken(_tokenId){
        cAttributes[_tokenId].describe = _des;
    }

    function _setTokenPrice(uint256 _tokenId, uint256 _price) internal validNFToken(_tokenId){
        cAttributes[_tokenId].price = _price;
    }

    function _setTokenOnSale(uint256 _tokenId, bool _onSale) internal validNFToken(_tokenId){
        cAttributes[_tokenId].onSale = _onSale;
    }
    
    function _setTokenAttributes(uint256 _tokenId, uint256 _index,uint256 _tvalue) internal validNFToken(_tokenId){
        cAttributes[_tokenId].atterbutes[_index] = _tvalue;
    }
    
    function _addTokenAttributes(uint256 _tokenId, uint256 _tvalue) internal validNFToken(_tokenId){
        cAttributes[_tokenId].atterbutes.push(_tvalue);
    }
    
    function getAttributesLength(uint256 _tokenId) public view returns(uint256){
        return cAttributes[_tokenId].atterbutes.length;
    }
    
    function getAttributesValuebyIndex(uint256 _tokenId, uint256 _index) public view returns(uint256){
        return cAttributes[_tokenId].atterbutes[_index];
    }
    
}