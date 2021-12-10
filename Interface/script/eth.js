var Web3 = require('./web3.min.js');

async function asyncFun() {
	try {
		await window.ethereum.enable();
		// eth_requestAccounts
	} catch (err) {
		console.error("User denied account access")
	}
}

console.log("window.web3:", window.web3);
var web3Provider;
if (window.ethereum) {
	web3Provider = window.ethereum;
	asyncFun();
	
} else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
	web3Provider = window.web3.currentProvider;
} else {
	web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
}
var provider = new Web3(web3Provider);//web3js就是你需要的web3实例
var nftAddress = "0xFbE111380edBC5F22Bd31A7888B248710b3F04D8";
var tokenAddress = "0x66a5a5ec3453C56a15d4ff65e0FFF85ac3A4F321";
var routerAddress = "0xe8a70c6E4FB00022a0FaAD97dABf8Afb7A74F590";

module.exports = {
	"provider": provider,
	"nftAddress": nftAddress,
	"tokenAddress": tokenAddress,
	"routerAddress": routerAddress,
};