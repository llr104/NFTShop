pragma solidity ^0.5.0;

interface IERC20 {
    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);

    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
    function totalSupply() external view returns (uint);
    function balanceOf(address owner) external view returns (uint);
    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint value) external returns (bool);
    function transfer(address to, uint value) external returns (bool);
    function transferFrom(address from, address to, uint value) external returns (bool);
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

  function isApprovedForAll(address _owner, address _operator) external view returns (bool);
}

interface ERC721TokenReceiver{
    
    function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes calldata _data) external returns(bytes4);
}
