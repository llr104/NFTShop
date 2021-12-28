pragma solidity ^0.5.0;
import "./IERC.sol";
import "./Ownable.sol";
import "./IEnumDef.sol";


interface INFT{
        
    function getTokenPrice(uint256 _tokenId) external view  returns(uint256);
    function sale(address _to, uint256 _tokenId) external;
    function mint(address _to, string calldata _name, string calldata _uri, string calldata _des, 
    IEnumDef.NFTType _type,  uint32 _count, int256 _groupId, uint256 _BBCfgId) external;
    function burn(uint256 _tokenId) external;
    function idToIndex(uint256 _tokenId) external returns(uint256);
    function idToOwner(uint256 _tokenId) external returns(address);
    function isBlindBox(uint256 _tokenId) external view  returns(bool);
    function groupId() external view returns(uint256);
    function getAttributesValuebyIndex(uint256 _tokenId, uint256 _index) external view  returns(uint256);

}


contract NFTRouter is Ownable {
    address public brokerAddress; //when zero address, use main chain token
    address public nftAddress;
    uint256 public blinkboxId;
    
    struct blinkboxEle{
        string  name;
        string  des;
        string  uri;
        uint32  cnt;
    }
    
    
    struct blinkboxCfg {
        string  name;
        string  des;
        string  uri;
        uint256 groupId;
    }

    mapping(uint256=>blinkboxCfg) public BBCFG;
    mapping(uint256=>blinkboxEle[]) public BBELE;
    mapping(uint256=>uint32[]) private BBRES;
    mapping(uint256=>uint32) public BBRESIndex;

    modifier validBBCFG(uint32 _bbId){
        require(_bbId <= blinkboxId && _bbId > 0, NOT_VALID_BBCFG);
        _;
    }

    modifier BBElemIsEmpty(uint32 _bbId){
        require(BBELE[_bbId].length > 0, BB_ELEM_IS_EMPTY);
        _;
    }

    modifier BBIsNotMint(uint32 _bbId){
        require(BBCFG[_bbId].groupId == 0, NOT_VALID_BB_IS_MINT);
        _;
    }

    modifier NoRES(uint32 _bbId){
        require(BBRES[_bbId].length == 0, BB_HAS_RES);
        _;
    }

    modifier HasRES(uint32 _bbId){
        require(BBRES[_bbId].length != 0, BB_NO_RES);
        _;
    }


    constructor(address _nftAddress) public{
        nftAddress = _nftAddress;
    }

    function setBrokerAddress(address _brokerAddress) public onlyManager {
        brokerAddress = _brokerAddress;
    }

    function setNFTAddress(address _nftAddress) public onlyManager {
        nftAddress = _nftAddress;
    }

    function buy(uint256 _tokenId) public payable {
   
        address  _to = ERC721(nftAddress).ownerOf(_tokenId);
        require(_to != address(0), NFT_INVALID);

        address _from = msg.sender;
        require(_to != _from, NFT_SAME_ADDRESS);

        uint256 price = INFT(nftAddress).getTokenPrice(_tokenId);
        require(price != 0, NFT_NOT_ONSALE);
      
        if(brokerAddress == address(0)){
            uint256 b = _from.balance;
            require(b >= price, BANLANCE_NOT_ENOUGH);
            address payable to = address(uint256(_to));
            to.transfer(price);
        }else{
            uint256 b = IERC20(brokerAddress).balanceOf(_from);
            require(b >= price, BANLANCE_NOT_ENOUGH);
            IERC20(brokerAddress).transferFrom(_from, _to, price);
        }
       
        INFT(nftAddress).sale(_from, _tokenId); 
    
    }

    function mintBlinkBox(uint32 _bbId) public onlyManager validBBCFG(_bbId) BBIsNotMint(_bbId) BBElemIsEmpty(_bbId) HasRES(_bbId){
       
        uint32 cnt = 0;
        for (uint32 i = 0; i < BBELE[_bbId].length; i++) {
            blinkboxEle memory ele = BBELE[_bbId][i];
            cnt += ele.cnt;
        }

        blinkboxCfg memory cfg = BBCFG[_bbId];
        INFT(nftAddress).mint(msg.sender, cfg.name, cfg.uri, cfg.des, IEnumDef.NFTType.BlindBox, cnt, -1, _bbId);

        BBCFG[_bbId].groupId = INFT(nftAddress).groupId();
        
    }

    function openBlinkBox(uint256 _tokenId)public{

        bool ok = INFT(nftAddress).isBlindBox(_tokenId);
        require(ok, NOT_BLINDBOX);

        address _owner = INFT(nftAddress).idToOwner(_tokenId);
        require(_owner == msg.sender, NOT_OWNER);

        
        uint256 bbId = INFT(nftAddress).getAttributesValuebyIndex(_tokenId, 0);
        uint32 index = BBRESIndex[bbId];
        uint256 eleIndex = BBRES[bbId][index];
        blinkboxCfg memory cfg = BBCFG[bbId];
        blinkboxEle memory ele = BBELE[bbId][eleIndex];
        
        INFT(nftAddress).mint(_owner, ele.name, ele.uri, ele.des, IEnumDef.NFTType.Normal, 1, int256(cfg.groupId), 0);

        BBRESIndex[bbId] = index+1;
        INFT(nftAddress).burn(_tokenId);
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

    
    function addBlinkBoxEleCfg(uint32 _bbId, string memory _name, string memory _des, string  memory _uri, uint32 _cnt) 
    public onlyManager validBBCFG(_bbId) BBIsNotMint(_bbId) NoRES(_bbId) {

        blinkboxEle memory ele;
        ele.name = _name;
        ele.des = _des;
        ele.uri = _uri;
        ele.cnt = _cnt;
        
        BBELE[_bbId].push(ele);
    }

    function delBlinkBoxEleCfg(uint32 _bbId, uint32 _eleIndex) public onlyManager validBBCFG(_bbId) BBIsNotMint(_bbId) NoRES(_bbId){

        require(_eleIndex < BBELE[_bbId].length, NOT_VALID_BBCFG_ELE);
        blinkboxEle memory elast = BBELE[_bbId][_eleIndex];
        BBELE[_bbId][_eleIndex] = elast;
        BBELE[_bbId].pop();
    }
    
    
        
    function modifyBlinkBoxEleCfg(uint32 _bbId, uint32 _eleIndex, string memory _name, string memory _des, string  memory _uri, uint32 _cnt) 
    public onlyManager validBBCFG(_bbId) BBIsNotMint(_bbId) NoRES(_bbId){
        
        require(_eleIndex < BBELE[_bbId].length, NOT_VALID_BBCFG_ELE);
        blinkboxEle memory ele;
        ele.name = _name;
        ele.des = _des;
        ele.uri = _uri;
        ele.cnt = _cnt;
        
        BBELE[_bbId][_eleIndex] = ele;
    }
    
    function setBlinkBoxResult(uint32 _bbId, uint32[] memory _res) public onlyManager validBBCFG(_bbId) BBIsNotMint(_bbId){
        uint256 cnt = 0;
        for (uint32 i = 0; i < BBELE[_bbId].length; i++) {
            blinkboxEle memory ele = BBELE[_bbId][i];
            cnt += ele.cnt;
        }
        require(cnt == _res.length, BB_RES_NOT_MATCH);
        BBRES[_bbId] = _res;
    }
    
    function getBlinkBoxResult(uint32 _bbId) public view onlyManager returns(uint32[] memory) {
        return BBRES[_bbId];
    }
        
    function getBlinkBoxCfg(uint32 _bbId) public view validBBCFG(_bbId) returns(string memory _name, string memory _des, string  memory _uri){
        
        blinkboxCfg memory c = BBCFG[_bbId];
        _name = c.name;
        _des = c.des;
        _uri = c.uri;
    }

    function getBlinkBoxEleCfg(uint32 _bbId, uint32 _eleIndex) public view validBBCFG(_bbId) returns(string memory _name, string memory _des, string  memory _uri, uint256 _cnt){
        
        require(_eleIndex < BBELE[_bbId].length, NOT_VALID_BBCFG_ELE);
        blinkboxEle memory e = BBELE[_bbId][_eleIndex];
        _name = e.name;
        _des = e.des;
        _uri = e.uri;
        _cnt = e.cnt;
    }


    function getBlinkBoxEleLen(uint32 _bbId) public view validBBCFG(_bbId) returns(uint256) {
        return BBELE[_bbId].length;
    }
    

    function getIsMint(uint32 _bbId) public view validBBCFG(_bbId) returns(bool){
        return BBCFG[_bbId].groupId != 0;
    }

    function getIsRes(uint32 _bbId) public view validBBCFG(_bbId) returns(bool){
        return BBRES[_bbId].length != 0;
    }

    function setUri(uint32 _bbId, uint32 _eleIndex, string memory _uri) public  validBBCFG(_bbId) onlyManager{
        require(_eleIndex < BBELE[_bbId].length, NOT_VALID_BBCFG_ELE);
        BBELE[_bbId][_eleIndex].uri = _uri;
    }


}