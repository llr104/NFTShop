
pragma solidity ^0.5.0;
import "./IERC.sol";


contract Token is IERC20 {
    string public  name;
    string public  symbol;
    uint8  public  decimals;
    uint256 tSupply;

    event  Approval(address indexed src, address indexed guy, uint wad);
    event  Transfer(address indexed src, address indexed dst, uint wad);


    mapping (address => uint)                       public balanceOf;
    mapping (address => mapping (address => uint))  public allowance;

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply, uint8 _decimals) public{
        name = _name;
        symbol = _symbol;
        tSupply = _totalSupply;
        decimals = _decimals;
        balanceOf[msg.sender] = tSupply;
    }
    

    function totalSupply() public view returns (uint) {
        return tSupply;
    }

    function approve(address guy, uint wad) public returns (bool) {
        allowance[msg.sender][guy] = wad;
        emit Approval(msg.sender, guy, wad);
        return true;
    }

    function transfer(address dst, uint wad) public returns (bool) {
        return transferFrom(msg.sender, dst, wad);
    }

    function transferFrom(address src, address dst, uint wad)
        public
        returns (bool)
    {
        require(balanceOf[src] >= wad);

        if (src != msg.sender && allowance[src][msg.sender] != uint(-1)) {
            require(allowance[src][msg.sender] >= wad);
            allowance[src][msg.sender] -= wad;
        }

        balanceOf[src] -= wad;
        balanceOf[dst] += wad;

        emit Transfer(src, dst, wad);

        return true;
    }
}

contract ERC20Factory {
    
    constructor(string memory _name, string memory _symbol, uint256 _totalSupply, uint8 _decimals) public{
       create(_name, _symbol, _totalSupply, _decimals);
    }
    
    function create(string memory _name, string memory _symbol, uint256 _totalSupply, uint8 _decimals) private{
        Token t = new Token(_name, _symbol, _totalSupply, _decimals);
        t.transfer(msg.sender, _totalSupply);
    }
   
}