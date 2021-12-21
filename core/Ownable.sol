pragma solidity ^0.5.0;
import "./Const.sol";

contract Ownable is Const{
   

    address public owner;
    mapping(address=>bool) public Manager;


    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);


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
