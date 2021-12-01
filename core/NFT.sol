

pragma solidity ^0.5.0;

library SafeMath{
    
    /**
    * List of revert message codes. Implementing dApp should handle showing the correct message.
    * Based on 0xcert framework error codes.
    */
    string constant OVERFLOW = "008001";
    string constant SUBTRAHEND_GREATER_THEN_MINUEND = "008002";
    string constant DIVISION_BY_ZERO = "008003";

    /**
    * @dev Multiplies two numbers, reverts on overflow.
    * @param _factor1 Factor number.
    * @param _factor2 Factor number.
    * @return product The product of the two factors.
    */
    function mul(uint256 _factor1,uint256 _factor2)
    internal
    pure
    returns (uint256 product){
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (_factor1 == 0){return 0;}

        product = _factor1 * _factor2;
        require(product / _factor1 == _factor2, OVERFLOW);
    }

    /**
    * @dev Integer division of two numbers, truncating the quotient, reverts on division by zero.
    * @param _dividend Dividend number.
    * @param _divisor Divisor number.
    * @return quotient The quotient.
    */
    function div(uint256 _dividend,uint256 _divisor)
    internal
    pure
    returns (uint256 quotient){
        // Solidity automatically asserts when dividing by 0, using all gas.
        require(_divisor > 0, DIVISION_BY_ZERO);
        quotient = _dividend / _divisor;
        // assert(_dividend == _divisor * quotient + _dividend % _divisor); // There is no case in which this doesn't hold.
    }

    /**
    * @dev Substracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
    * @param _minuend Minuend number.
    * @param _subtrahend Subtrahend number.
    * @return difference Difference.
    */
    function sub(uint256 _minuend,uint256 _subtrahend)
    internal
    pure
    returns (uint256 difference){
        require(_subtrahend <= _minuend, SUBTRAHEND_GREATER_THEN_MINUEND);
        difference = _minuend - _subtrahend;
    }

    /**
    * @dev Adds two numbers, reverts on overflow.
    * @param _addend1 Number.
    * @param _addend2 Number.
    * @return sum Sum.
    */
    function add(uint256 _addend1,uint256 _addend2)
    internal
    pure
    returns (uint256 sum){
        sum = _addend1 + _addend2;
        require(sum >= _addend1, OVERFLOW);
    }

    /**
    * @dev Divides two numbers and returns the remainder (unsigned integer modulo), reverts when
    * dividing by zero.
    * @param _dividend Number.
    * @param _divisor Number.
    * @return remainder Remainder.
    */
    function mod(uint256 _dividend,uint256 _divisor)
    internal
    pure
    returns (uint256 remainder){
        require(_divisor != 0, DIVISION_BY_ZERO);
        remainder = _dividend % _divisor;
    }
}

library AddressUtils{
    /**
   * @dev Returns whether the target address is a contract.
   * @param _addr Address to check.
   * @return addressCheck True if _addr is a contract, false if not.
   */
   function isContract(address _addr)
    internal
    view
    returns (bool addressCheck){
        // This method relies in extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.

        // According to EIP-1052, 0x0 is the value returned for not-yet created accounts
        // and 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470 is returned
        // for accounts without code, i.e. `keccak256('')`
        bytes32 codehash;
        bytes32 accountHash = 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470;
        assembly { codehash := extcodehash(_addr) } // solhint-disable-line
        addressCheck = (codehash != 0x0 && codehash != accountHash);
    }
}

interface ERC721{
    
  event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);

  event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
  
  event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

  function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata _data) external;
    
  function safeTransferFrom(address _from, address _to, uint256 _tokenId) external;
    
  function transferFrom(address _from, address _to, uint256 _tokenId) external;

  function approve(address _approved, uint256 _tokenId) external;
    
  function setApprovalForAll(address _operator, bool _approved) external;

  function balanceOf(address _owner) external view returns (uint256);

  function ownerOf(uint256 _tokenId) external view returns (address);

  function getApproved(uint256 _tokenId) external view returns (address);

  function isApprovedForAll(address _owner,address _operator) external view returns (bool);
}

interface ERC721TokenReceiver{
    
    function onERC721Received(address _operator,address _from,uint256 _tokenId,bytes calldata _data) external returns(bytes4);
}

contract Ownable{
    /**
    * @dev Error constants.
    */
    string public constant NOT_CURRENT_OWNER = "018001";
    string public constant CANNOT_TRANSFER_TO_ZERO_ADDRESS = "018002";
    string public constant NOT_CURRENT_MANAGER = "018003";

    address public owner;
    mapping(address=>bool) public Manager;


    event OwnershipTransferred(address indexed previousOwner,address indexed newOwner);


    constructor() public {
        owner = msg.sender;
        Manager[owner] = true;
    }
    
    modifier onlyOwner(){
        require(msg.sender == owner, NOT_CURRENT_OWNER);
        _;
    }
  
    modifier onlyManager(){
        require(Manager[msg.sender], NOT_CURRENT_MANAGER);
        _;
    }

    function addManager(address _maddr) public onlyOwner{
        Manager[_maddr] = true;
    }
  
    function delManager(address _maddr) public onlyOwner{
        Manager[_maddr] = false;
    }
    
    function transferOwnership(address _newOwner) public onlyOwner{
        require(_newOwner != address(0), CANNOT_TRANSFER_TO_ZERO_ADDRESS);
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }

}

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

    uint256 internal tokenID;
    mapping (uint256 => address) internal idToApproval;

    mapping (address => uint256) private ownerToNFTokenCount;

    mapping (address => mapping (address => bool)) internal ownerToOperators;

    event Transfer(address indexed _from,address indexed _to,uint256 indexed _tokenId);

    event Approval(address indexed _owner,address indexed _approved,uint256 indexed _tokenId);

    event ApprovalForAll(address indexed _owner,address indexed _operator,bool _approved);


    modifier canOperate(uint256 _tokenId) {
        address tokenOwner = idToOwner[_tokenId];
        require(tokenOwner == msg.sender || ownerToOperators[tokenOwner][msg.sender], NOT_OWNER_OR_OPERATOR);
        _;
    }

    modifier canTransfer(uint256 _tokenId){
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
    canTransfer(_tokenId)
    validNFToken(_tokenId){
        address tokenOwner = idToOwner[_tokenId];
        require(tokenOwner == _from, NOT_OWNER);
        require(_to != address(0), ZERO_ADDRESS);

        _transfer(_to, _tokenId);
    }
  
    function transferList(address _to,uint256[] calldata _tokenIdList) external{
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

    
    function approve(address _approved, uint256 _tokenId) external
    canOperate(_tokenId)
    validNFToken(_tokenId){
        address tokenOwner = idToOwner[_tokenId];
        require(_approved != tokenOwner, IS_OWNER);

        idToApproval[_tokenId] = _approved;
        emit Approval(tokenOwner, _approved, _tokenId);
    }

 
    function setApprovalForAll(address _operator, bool _approved) external{
        ownerToOperators[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

 
    function balanceOf(address _owner) external view returns (uint256) {
        require(_owner != address(0), ZERO_ADDRESS);
        return _getOwnerNFTCount(_owner);
    }

 
    function ownerOf(uint256 _tokenId) external view returns (address _owner){
        _owner = idToOwner[_tokenId];
        require(_owner != address(0), NOT_VALID_NFT);
    }

    function getApproved(uint256 _tokenId) external view validNFToken(_tokenId) returns (address) {
        return idToApproval[_tokenId];
    }


    function isApprovedForAll( address _owner,  address _operator) external view returns (bool) {
        return ownerToOperators[_owner][_operator];
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
    canTransfer(_tokenId)
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

    function _clearApproval(uint256 _tokenId)private{
        if (idToApproval[_tokenId] != address(0)){
            delete idToApproval[_tokenId];
        }
    }
}

contract NFTMdata is NFToken {
    
    enum NFTType { BlindBox, Normal }
    string internal nftName;
    string internal nftSymbol;

    string constant INVALID_INDEX = "005007";
    string constant INVALID_BLINKBOX = "005008";

    uint256[] public tokens;
    mapping(uint256 => uint256) public idToIndex;
    mapping(address => uint256[]) public ownerToIds;
    mapping(uint256 => uint256) public idToOwnerIndex;
    mapping(uint256 => cAttributesStruct) public cAttributes;
    
    struct cAttributesStruct{
        NFTType     nftType;
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
    
    function _mint(address _to) internal returns(uint256){
        uint256 _tokenId = super._mint(_to);
        tokens.push(_tokenId);
        idToIndex[_tokenId] = tokens.length - 1;
        return _tokenId;
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


    function _addNFToken(address _to,uint256 _tokenId) internal {
        require(idToOwner[_tokenId] == address(0), NFT_ALREADY_EXISTS);
        idToOwner[_tokenId] = _to;

        ownerToIds[_to].push(_tokenId);
        idToOwnerIndex[_tokenId] = ownerToIds[_to].length - 1;
    }
    
    function _getOwnerNFTCount(address _owner) internal view returns (uint256){
        return ownerToIds[_owner].length;
    }

    function _openBlindBox(uint256 _tokenId) internal validNFToken(_tokenId){
        address _to = idToOwner[_tokenId];
        cAttributesStruct memory cattr = cAttributes[_tokenId];
        require(cattr.nftType == NFTType.BlindBox, INVALID_BLINKBOX);
        _burn(_tokenId);

        uint256 _newTokenId = _mint(_to);
        cattr.nftType = NFTType.Normal;
        cAttributes[_newTokenId] = cattr;
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

contract NFTBox is NFTMdata, Ownable{
   
    constructor(string memory _name, string memory _symbol) public {
        nftName = _name;
        nftSymbol = _symbol;
    }

    function mint(address _to, string calldata _uri, NFTType _type) external onlyManager{
        uint256 _tokenId = super._mint(_to);
        _setTokenUri(_tokenId, _uri);
        _setNFTType(_tokenId, _type);
    }
    
    function burn(uint256 _tokenId) external onlyManager {
        super._burn(_tokenId);
    }

    function openBlindBox(uint256 _tokenId) external canOperate(_tokenId) {
        super._openBlindBox(_tokenId);
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

    function setTokenOnSale(uint256 _tokenId, bool _onSale) external canOperate(_tokenId){
        super._setTokenOnSale(_tokenId, _onSale);
    }

    function setAttribute(uint256 _tokenId, uint256 _index, uint256 _tvalue) external onlyManager{
        super._setTokenAttributes(_tokenId, _index, _tvalue);
    }
    
    function addTokenAttributes(uint256 _tokenId,uint256 _tvalue) external onlyManager{
        super._addTokenAttributes(_tokenId,_tvalue);
    }

}