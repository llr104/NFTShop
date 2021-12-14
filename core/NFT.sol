pragma solidity ^0.5.0;
import "./NFTMdata.sol";
import "./Ownable.sol";

contract NFTBox is NFTMdata, Ownable{
   
    event SetOnSale(address indexed _from, uint256 indexed _tokenId, uint256 _price, bool _buy);
    
    constructor(string memory _name, string memory _symbol) public {
        nftName = _name;
        nftSymbol = _symbol;
    }


    function mint(address _to, string calldata _name, string calldata _uri, string calldata _des, NFTType _type,  uint32 _count, bool _isGroup) external onlyManager{
        super._mint(_to, _name, _uri, _des, _type, _count, _isGroup);
    }
    
    function burn(uint256 _tokenId) external onlyManager {
        super._burn(_tokenId);
    }

    function sale(address _to, uint256 _tokenId) canOperate(_tokenId) external{
        _setTokenPrice(_tokenId, 0);
        _transfer(_to, _tokenId);

        emit SetOnSale(_to, _tokenId, 0, true);
    }

    function openBlindBox(uint256 _tokenId) external canOperate(_tokenId) {
        super._openBlindBox(_tokenId);
    }

    function setTokenDescribe(uint256 _tokenId, string calldata _des) external onlyManager{
        super._setTokenDescribe(_tokenId, _des);
    }

    function setTokenPrice(uint256 _tokenId, uint256 _price) external canOperate(_tokenId){
        super._setTokenPrice(_tokenId, _price);
        emit SetOnSale(msg.sender, _tokenId, _price, false);
    }

    function setAttribute(uint256 _tokenId, uint256 _index, uint256 _tvalue) external onlyManager{
        super._setTokenAttributes(_tokenId, _index, _tvalue);
    }
    
    function addTokenAttributes(uint256 _tokenId, uint256 _tvalue) external onlyManager{
        super._addTokenAttributes(_tokenId,_tvalue);
    }

}