var Web3 = require('./web3.min.js');

async function asyncFun() {
	try {
		// await window.ethereum.enable();
		await window.eth_requestAccounts
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

ethereum.on('accountsChanged', function(a){
	console.log("accountsChanged:", a);
});

var nftAddress = "0xE6906C4124527A3C9268E9842E19818394D19CbD";
var tokenAddress = "0x66a5a5ec3453C56a15d4ff65e0FFF85ac3A4F321";
var routerAddress = "0xf558DA94D4B05E598A88278189769199D61C6729";

module.exports = {
	"provider": provider,
	"nftAddress": nftAddress,
	"tokenAddress": tokenAddress,
	"routerAddress": routerAddress,
};