pragma solidity ^0.5.0;
import "./IERC.sol";

interface INFT{
    function getTokenPriceAndSale(uint256 _tokenId) external view  returns(uint256, bool);
    function sale(uint256 _tokenId, bool _onSale) external;
    function test1(uint256 _tokenId) external view  returns(address, address);
    function test2(uint256 _tokenId) external view returns(address, address);
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

        uint256 price;
        bool onSale;
        address _from = msg.sender;

         require(_to != _from, NFT_SAME_ADDRESS);

        (price, onSale) = INFT(nftAddress).getTokenPriceAndSale(_tokenId);
        require(onSale, NFT_NOT_ONSALE);

       
        uint256 b = IERC20(brokerAddress).balanceOf(_from);
        require(b >= price, BANLANCE_NOT_ENOUGH);

        IERC20(brokerAddress).transferFrom(_from, _to, price);
        ERC721(nftAddress).sale(_to, _from, _tokenId);
        
        return (b, price);

    }

    function testhere1(uint256 _tokenId) external view returns(address, address){
        return INFT(nftAddress).test1(_tokenId);
    }

    function testhere2(uint256 _tokenId) external view returns(address, address){
        return INFT(nftAddress).test2(_tokenId);
    }

}