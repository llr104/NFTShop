pragma solidity ^0.5.0;
import "./IERC.sol";

interface INFT{
    function getTokenPrice(uint256 _tokenId) external view  returns(uint256);
    function sale(address _to, uint256 _tokenId) external;
}

contract NFTRouter {
    address public brokerAddress;
    address public nftAddress;

    string constant NFT_NOT_ONSALE = "001001";
    string constant NFT_INVALID = "001003";
    string constant NFT_SAME_ADDRESS = "001003";
    string constant BANLANCE_NOT_ENOUGH = "001004";

    constructor(address _brokerAddress, address _nftAddress) public{
        brokerAddress = _brokerAddress;
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

}