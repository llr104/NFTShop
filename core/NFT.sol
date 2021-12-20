pragma solidity ^0.5.0;
import "./NFTMdata.sol";
import "./Ownable.sol";
import "./IEnumDef.sol";

contract NFTBox is NFTMdata, Ownable{
    
    constructor(string memory _name, string memory _symbol) public {
        nftName = _name;
        nftSymbol = _symbol;
    }


    function mint(address _to, string calldata _name, string calldata _uri, string calldata _des, 
    IEnumDef.NFTType _type,  uint32 _count, int256 _groupId, uint256 _BBCfgId) external onlyManager{
        super._mint(_to, _name, _uri, _des, _type, _count, _groupId, _BBCfgId);
    }
    
    function burn(uint256 _tokenId) external onlyManager {
        super._burn(_tokenId);
    }

    function sale(address _to, uint256 _tokenId) canOperate(_tokenId) external{
        address from = idToOwner[_tokenId];
        _setTokenPrice(_tokenId, 0);
        _transfer(_to, _tokenId);
        
        emit SetOnSale(from, _to, _tokenId, 0, OPType.Buy);
    }


    function setTokenDescribe(uint256 _tokenId, string calldata _des) external onlyManager{
        super._setTokenDescribe(_tokenId, _des);
    }

    function setTokenPrice(uint256 _tokenId, uint256 _price) external canOperate(_tokenId){
        super._setTokenPrice(_tokenId, _price);
        address to = idToOwner[_tokenId];
        if(_price == 0){
            emit SetOnSale(msg.sender, to, _tokenId, 0, OPType.Down);
        }else{
            emit SetOnSale(msg.sender, to, _tokenId, _price, OPType.Up);
        }
    }

    function setAttribute(uint256 _tokenId, uint256 _index, uint256 _tvalue) external onlyManager{
        super._setTokenAttributes(_tokenId, _index, _tvalue);
    }
    
    function addTokenAttributes(uint256 _tokenId, uint256 _tvalue) external onlyManager{
        super._addTokenAttributes(_tokenId,_tvalue);
    }

}