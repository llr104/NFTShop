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
var caddress = "0xaA55fD19bb7E318C3A715950c508231853817fF9";

module.exports = {
	"provider": provider,
	"caddress": caddress,
};