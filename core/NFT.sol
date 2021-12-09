pragma solidity ^0.5.0;
import "./NFTMdata.sol";


contract NFTBox is NFTMdata, Ownable{
   
    event SetOnSalePrice(address indexed _from, uint256 indexed _tokenId, bool _onSale, uint256 _price);
    
    constructor(string memory _name, string memory _symbol) public {
        nftName = _name;
        nftSymbol = _symbol;
    }


    function mint(address _to, string calldata _name, string calldata _uri, NFTType _type, uint32 _count, bool _isGroup) external onlyManager{
        super._mint(_to, _name, _uri, _type, _count, _isGroup);
    }
    
    function burn(uint256 _tokenId) external onlyManager {
        super._burn(_tokenId);
    }

    function sale(address _from, address _to, uint256 _tokenId) external{
        this.setTokenOnSale(_tokenId, false);
        this.transferFrom(_from, _to, _tokenId);
    }

    function openBlindBox(uint256 _tokenId) external canOperate(_tokenId) {
        super._openBlindBox(_tokenId);
    }

    
    function setTokenName(uint256 _tokenId, string calldata _name) external onlyManager{
        super._setTokenName(_tokenId, _name);
    }
    
    function setTokenDescribe(uint256 _tokenId, string calldata _des) external onlyManager{
        super._setTokenDescribe(_tokenId, _des);
    }

    function setNFTType(uint256 _tokenId, NFTType _type) external onlyManager{
        super._setNFTType(_tokenId, _type);
    }

    function setTokenPrice(uint256 _tokenId, uint256 _price) external canOperate(_tokenId){
        super._setTokenPrice(_tokenId, _price);
    }

    function setTokenSaleAndPrice(uint256 _tokenId, uint256 _price, bool _onSale) external canOperate(_tokenId){
        super._setTokenPrice(_tokenId, _price);
        super._setTokenOnSale(_tokenId, _onSale);

        emit SetOnSalePrice(msg.sender, _tokenId, _onSale, cAttributes[_tokenId].price);
    }

    function setTokenOnSale(uint256 _tokenId, bool _onSale) external canOperate(_tokenId){
        super._setTokenOnSale(_tokenId, _onSale);
    }

    function setAttribute(uint256 _tokenId, uint256 _index, uint256 _tvalue) external onlyManager{
        super._setTokenAttributes(_tokenId, _index, _tvalue);
    }
    
    function addTokenAttributes(uint256 _tokenId, uint256 _tvalue) external onlyManager{
        super._addTokenAttributes(_tokenId,_tvalue);
    }

}