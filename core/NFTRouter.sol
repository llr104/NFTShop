pragma solidity ^0.5.0;
import "./IERC.sol";
import "./Ownable.sol";

interface INFT{
    function getTokenPrice(uint256 _tokenId) external view  returns(uint256);
    function sale(address _to, uint256 _tokenId) external;
}

contract NFTRouter is Ownable {
    address public brokerAddress;
    address public nftAddress;
    uint256 public blinkboxId;
    
    struct blinkboxEle{
        string  name;
        string  des;
        string  uri;
        uint256 cnt;
    }
    
    
    struct blinkboxCfg {
        string  name;
        string  des;
        string  uri;
    }

    mapping(uint256=>blinkboxCfg) public BBCFG;
    mapping(uint256=>blinkboxEle[]) public BBELE;

    string constant NFT_NOT_ONSALE = "001001";
    string constant NFT_INVALID = "001002";
    string constant NFT_SAME_ADDRESS = "001003";
    string constant BANLANCE_NOT_ENOUGH = "001004";
    string constant NOT_VALID_BBCFG = "001005";
    string constant NOT_VALID_BBCFG_ELE = "001006";
    
    modifier validBBCFG(uint256 _bbId){
        require(_bbId <= blinkboxId && _bbId > 0, NOT_VALID_BBCFG);
        _;
    }

    constructor(address _brokerAddress, address _nftAddress) public{
        brokerAddress = _brokerAddress;
        nftAddress = _nftAddress;
    }

    function setBrokerAddress(address _brokerAddress) public onlyManager {
        brokerAddress = _brokerAddress;
    }

    function setNFTAddress(address _nftAddress) public onlyManager {
        nftAddress = _nftAddress;
    }

    function buy(uint256 _tokenId) public returns(uint256, uint256) {
   
        address _to = ERC721(nftAddress).ownerOf(_tokenId);
        require(_to != address(0), NFT_INVALID);

        address _from = msg.sender;
        require(_to != _from, NFT_SAME_ADDRESS);

        uint256 price = INFT(nftAddress).getTokenPrice(_tokenId);
        require(price != 0, NFT_NOT_ONSALE);

        uint256 b = IERC20(brokerAddress).balanceOf(_from);
        require(b >= price, BANLANCE_NOT_ENOUGH);

        IERC20(brokerAddress).transferFrom(_from, _to, price);
        INFT(nftAddress).sale(_from, _tokenId);
        
        return (b, price);

    }
    
    function makeBlinkBoxCfg(string memory _name, string memory _des, string  memory _uri) public onlyManager returns(uint256){
        blinkboxId++;
        blinkboxCfg memory cfg;
        cfg.name = _name;
        cfg.des = _des;
        cfg.uri = _uri;
        BBCFG[blinkboxId] = cfg;
        return blinkboxId;
    }

    
    function addBlinkBoxEleCfg(uint256 _bbId, string memory _name, string memory _des, string  memory _uri, uint256 _cnt) public onlyManager validBBCFG(_bbId) {

        blinkboxEle memory ele;
        ele.name = _name;
        ele.des = _des;
        ele.uri = _uri;
        ele.cnt = _cnt;
        
        BBELE[_bbId].push(ele);
    }

    function delBlinkBoxEleCfg(uint256 _bbId, uint256 _eleIndex) public onlyManager validBBCFG(_bbId) {

        require(_eleIndex < BBELE[_bbId].length, NOT_VALID_BBCFG_ELE);
        blinkboxEle memory elast = BBELE[_bbId][_eleIndex];
        BBELE[_bbId][_eleIndex] = elast;
        BBELE[_bbId].pop();
    }
    
    
        
    function modifyBlinkBoxEleCfg(uint256 _bbId, uint256 _eleIndex, string memory _name, string memory _des, string  memory _uri, uint256 _cnt) public onlyManager validBBCFG(_bbId) {
        
        require(_eleIndex < BBELE[_bbId].length, NOT_VALID_BBCFG_ELE);
        blinkboxEle memory ele;
        ele.name = _name;
        ele.des = _des;
        ele.uri = _uri;
        ele.cnt = _cnt;
        
        BBELE[_bbId][_eleIndex] = ele;
    }
    
        
    function getBlinkBoxCfg(uint256 _bbId) public view validBBCFG(_bbId) returns(string memory _name, string memory _des, string  memory _uri){
        
        blinkboxCfg memory c = BBCFG[_bbId];
        _name = c.name;
        _des = c.des;
        _uri = c.uri;
    }

    function getBlinkBoxEleCfg(uint256 _bbId, uint256 _eleIndex) public view validBBCFG(_bbId) returns(string memory _name, string memory _des, string  memory _uri, uint256 _cnt){
        
        require(_eleIndex < BBELE[_bbId].length, NOT_VALID_BBCFG_ELE);
        blinkboxEle memory e = BBELE[_bbId][_eleIndex];
        _name = e.name;
        _des = e.des;
        _uri = e.uri;
        _cnt = e.cnt;
    }


    function getBlinkBoxEleLen(uint256 _bbId) public view validBBCFG(_bbId) returns(uint256) {
        
        return BBELE[_bbId].length;
    }
    
}