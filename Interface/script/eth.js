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


var nftAddress = "0xf9a1c4B155Cf13CA0DBC362a7D4BbD456a853002";
var routerAddress = "0xC31F86E81E0f55D4A5EB462fC8E6E65b593F7eB8";
var scanUrl = "https://ropsten.etherscan.io";
var mainToken = "ETH"

module.exports = {
	"provider": provider,
	"nftAddress": nftAddress,
	"routerAddress": routerAddress,
	"scanUrl": scanUrl,
	"mainToken": mainToken
};