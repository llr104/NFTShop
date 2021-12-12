pragma solidity ^0.5.0;
import "./Library.sol";
import "./IERC.sol";


contract NFToken is ERC721 {
    
    using SafeMath for uint256;
    using AddressUtils for address;

    string constant ZERO_ADDRESS = "003001";
    string constant NOT_VALID_NFT = "003002";
    string constant NOT_OWNER_OR_OPERATOR = "003003";
    string constant NOT_OWNER_APPROWED_OR_OPERATOR = "003004";
    string constant NOT_ABLE_TO_RECEIVE_NFT = "003005";
    string constant NFT_ALREADY_EXISTS = "003006";
    string constant NOT_OWNER = "003007";
    string constant IS_OWNER = "003008";

    bytes4 internal constant MAGIC_ON_ERC721_RECEIVED = 0x150b7a02;

  
    mapping (uint256 => address) public idToOwner;
    mapping (address => mapping (address => bool)) internal ownerToOperators;

    uint256 internal tokenID;
    mapping (uint256 => address) internal idToApproval;
    mapping (address => uint256) private ownerToNFTokenCount;

    event Transfer(address indexed _from, address indexed _to,uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner,address indexed _operator,bool _approved);
 


    modifier canOperate(uint256 _tokenId){
        address tokenOwner = idToOwner[_tokenId];
        require(
            tokenOwner == msg.sender
            || idToApproval[_tokenId] == msg.sender
            || ownerToOperators[tokenOwner][msg.sender],
            NOT_OWNER_APPROWED_OR_OPERATOR
        );
        _;
    }

    modifier validNFToken(uint256 _tokenId){
        require(idToOwner[_tokenId] != address(0), NOT_VALID_NFT);
        _;
    }

    constructor() public{
        //supportedInterfaces[0x80ac58cd] = true; // ERC721
    }
  
    function viewTokenID() view public returns(uint256){
        return tokenID;
    }
  
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata _data)external
    {
        _safeTransferFrom(_from, _to, _tokenId, _data);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external{
        _safeTransferFrom(_from, _to, _tokenId, "");
    }

 
    function transferFrom(address _from, address _to, uint256 _tokenId) external
    canOperate(_tokenId)
    validNFToken(_tokenId){
        address tokenOwner = idToOwner[_tokenId];
        require(tokenOwner == _from, NOT_OWNER);
        require(_to != address(0), ZERO_ADDRESS);

        _transfer(_to, _tokenId);
    }
  
    function transferList(address _to, uint256[] calldata _tokenIdList) external{
        uint256 len = _tokenIdList.length;
        address tokenOwner;// = idToOwner[_tokenId];
        uint256 _tokenId;
        require(len <= 100,"token list too length");
        for(uint256 i=0;i<len;i++){
            _tokenId = _tokenIdList[i];
            tokenOwner = idToOwner[_tokenId];
            require(tokenOwner != address(0), NOT_VALID_NFT);
            require(
                tokenOwner == msg.sender
                || idToApproval[_tokenId] == msg.sender
                || ownerToOperators[tokenOwner][msg.sender],
                NOT_OWNER_APPROWED_OR_OPERATOR
            );
            _transfer(_to, _tokenId);
        }
      
    }

    
    function approve(address _approved, uint256 _tokenId) external{
        _approve(_approved, _tokenId);
    }

    function _approve(address _approved, uint256 _tokenId) internal
    canOperate(_tokenId)
    validNFToken(_tokenId){
        address tokenOwner = idToOwner[_tokenId];
        require(_approved != tokenOwner, IS_OWNER);

        idToApproval[_tokenId] = _approved;
        emit Approval(tokenOwner, _approved, _tokenId);
    }

    function getApproved(uint256 _tokenId) external view validNFToken(_tokenId) returns (address) {
        return idToApproval[_tokenId];
    }
 
    function setApprovalForAll(address _operator, bool _approved) external{
        ownerToOperators[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function isApprovedForAll( address _owner, address _operator) external view returns (bool) {
        return ownerToOperators[_owner][_operator];
    }

    function balanceOf(address _owner) external view returns (uint256) {
        require(_owner != address(0), ZERO_ADDRESS);
        return _getOwnerNFTCount(_owner);
    }

 
    function ownerOf(uint256 _tokenId) external view returns (address _owner){
        _owner = idToOwner[_tokenId];
        require(_owner != address(0), NOT_VALID_NFT);
    }

    function _transfer(address _to, uint256 _tokenId) internal{
        address from = idToOwner[_tokenId];
        _clearApproval(_tokenId);

        _removeNFToken(from, _tokenId);
        _addNFToken(_to, _tokenId);

        emit Transfer(from, _to, _tokenId);
    }

    function _mint(address _to)internal returns(uint256){
        require(_to != address(0), ZERO_ADDRESS);
        tokenID++;
        _addNFToken(_to, tokenID);

        emit Transfer(address(0), _to, tokenID);
        return tokenID;
    }


    function _burn(uint256 _tokenId) internal validNFToken(_tokenId){
        address tokenOwner = idToOwner[_tokenId];
        _clearApproval(_tokenId);
        _removeNFToken(tokenOwner, _tokenId);
        emit Transfer(tokenOwner, address(0), _tokenId);
    }
    
    function _removeNFToken(address _from, uint256 _tokenId) internal{
        require(idToOwner[_tokenId] == _from, NOT_OWNER);
        ownerToNFTokenCount[_from] = ownerToNFTokenCount[_from] - 1;
        delete idToOwner[_tokenId]; 
    }

    function _addNFToken(address _to,uint256 _tokenId) internal{
        require(idToOwner[_tokenId] == address(0), NFT_ALREADY_EXISTS);

        idToOwner[_tokenId] = _to;
        ownerToNFTokenCount[_to] = ownerToNFTokenCount[_to].add(1);
    }

    function _getOwnerNFTCount(address _owner) internal view returns (uint256) {
        return ownerToNFTokenCount[_owner];
    }

    function _safeTransferFrom(address _from, address _to, uint256 _tokenId,bytes memory _data) private
    canOperate(_tokenId)
    validNFToken(_tokenId){
        address tokenOwner = idToOwner[_tokenId];
        require(tokenOwner == _from, NOT_OWNER);
        require(_to != address(0), ZERO_ADDRESS);

        _transfer(_to, _tokenId);

        if (_to.isContract()){
            bytes4 retval = ERC721TokenReceiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);
            require(retval == MAGIC_ON_ERC721_RECEIVED, NOT_ABLE_TO_RECEIVE_NFT);
        }
    }

    function _clearApproval(uint256 _tokenId) internal{
        if (idToApproval[_tokenId] != address(0)){
            delete idToApproval[_tokenId];
        }
    }

    function test1(uint256 _tokenId)  external view validNFToken(_tokenId) canOperate(_tokenId) returns(address, address){
        return (msg.sender, idToApproval[_tokenId]) ;
    }

    function test2(uint256 _tokenId)  external view validNFToken(_tokenId) returns(address, address){
        return (msg.sender, idToApproval[_tokenId]) ;
    }
}
