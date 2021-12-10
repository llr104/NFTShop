var Web3 = require('./web3.min.js');

async function asyncFun() {
	try {
		await window.ethereum.enable();
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
var nftAddress = "0x5ABACd50139fbB8aBaCB886b5ABF20146D1A4d91";
var tokenAddress = "0x66a5a5ec3453C56a15d4ff65e0FFF85ac3A4F321";
var routerAddress = "0x643B9b296B1d25DC2A9e39d13e52a883C8C6235c";

module.exports = {
	"provider": provider,
	"nftAddress": nftAddress,
	"tokenAddress": tokenAddress,
	"routerAddress": routerAddress,
	
};