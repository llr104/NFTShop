var Web3 = require('./web3.min.js');



async function asyncFun() {
	try {
		await window.ethereum.enable();
		//eth_requestAccounts;
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
console.log("Web3:", provider);


// var nftAddress = "0x597A658dFF7555B5251113F54D888d4A14B16789";
// var tokenAddress = "0x66a5a5ec3453C56a15d4ff65e0FFF85ac3A4F321";
// var routerAddress = "0xcf4402E11eaD7C287e9d3f3d67F2A34Fe7F028e3";

var nftAddress = "0x9a094e1d8A671F259fA6FFB942C7eF202C4FC18F";
var tokenAddress = "0x29d957447c2a173ecda68801ba42b2957959a428";
var routerAddress = "0xf99aEABfAae8eb17f01FC5865c2f863B88A4D9d3";

var scanUrl = "https://ropsten.etherscan.io"

module.exports = {
	"provider": provider,
	"nftAddress": nftAddress,
	"tokenAddress": tokenAddress,
	"routerAddress": routerAddress,
	"scanUrl": scanUrl
};