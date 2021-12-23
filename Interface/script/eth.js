var Web3 = require('./web3.min.js');
var nftAddress = "0xf9a1c4B155Cf13CA0DBC362a7D4BbD456a853002";
var routerAddress = "0xC31F86E81E0f55D4A5EB462fC8E6E65b593F7eB8";
var scanUrl = "https://ropsten.etherscan.io";
var mainToken = "ETH"
var supportNetwork = [3, 128, 256];

async function asyncFun() {
	try {
		await window.ethereum.enable();
	} catch (err) {
		console.error("User denied account access")
	}
}


function connectWallet(isFirst=false){
	
	if (window.ethereum) {
		asyncFun();
		
		window.ethereum.on("accountsChanged", (acounts)=> {
			if(acounts.length>0){
				uni.$emit("accountChanged", acounts[0]);
			}
		});
		
		window.ethereum.on("networkChanged", (nId)=>{
			console.log("nId:", nId, supportNetwork.indexOf(Number(nId))>=0);
			uni.showModal({
				title:"错误",
				content:"不支持该链，请选择正确的链",
				showCancel:false,
			}); 
			
		});
		
		setTimeout(()=>{
			let isSupport = supportNetwork.indexOf(Number(ethereum.networkVersion)) >= 0;
			console.log("isSupport:", isSupport, ethereum.networkVersion);
			if(!isSupport){
				
				uni.showModal({
					title:"错误",
					content:"不支持该链，请选择正确的链",
					showCancel:false,
				}); 
			}
		}, 1000);
		
		
		
	}else{
		console.log("没有钱包插件");
		if(!isFirst){
			if (navigator.userAgent.indexOf('Mobile')>-1) {
				uni.showModal({
					title:"错误",
					content:"请从钱包中打开",
					showCancel:false,
				}); 
			}else{
				uni.showModal({
				    title: '错误',
				    content: "请先安装钱包插件",
					showCancel:false,
				    success: function (res) {
				        if (res.confirm) {
				            window.open("https://metamask.io/");
				        } 
				    }
				});
			}
		}
	}
}

function provider(){
	
	var web3Provider;
	if (window.ethereum) {
		web3Provider = window.ethereum;
	} else if (window.web3) {
		web3Provider = window.web3.currentProvider;
	} else {
		web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
	}
	
	return new Web3(web3Provider);
}

connectWallet(true);


module.exports = {
	"provider": provider,
	"nftAddress": nftAddress,
	"routerAddress": routerAddress,
	"scanUrl": scanUrl,
	"mainToken": mainToken,
	"connectWallet": connectWallet,
};