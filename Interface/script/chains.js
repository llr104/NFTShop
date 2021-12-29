var Supported = {
	ROPSTEN: 3,
	HECOMAIN: 128,
	HECOTEST: 256,
};

var SupportedChainId = [
	Supported.ROPSTEN, 
	Supported.HECOTEST, 
	Supported.HECOMAIN
]

var Chains = {
	[Supported.ROPSTEN]:{
		nftAddress: "0x075F6e291cAb2D9405D643965bD40f80882cA49D",
		routerAddress: "0x10EE20A42876888400d582F9B5f822aD58bFB742",
		scanUrl: "https://ropsten.etherscan.io",
		symbol: "ETH",
		fromBlock: 11704947,
		name:"ropsten"
	},
	
	[Supported.HECOMAIN]:{
		nftAddress: "0xd27eFBFad51B29D30Ef90e2265ed838724b8fF4A",
		routerAddress: "0x4804fF7AB5765BC8FCae6d3cD6c8E3ae7367661b",
		scanUrl: "https://hecoinfo.com",
		symbol: "HT",
		fromBlock: 11085000,
		name:"heco"
	},
	
	[Supported.HECOTEST]:{
		nftAddress: "0x075F6e291cAb2D9405D643965bD40f80882cA49D",
		routerAddress: "0x10EE20A42876888400d582F9B5f822aD58bFB742",
		scanUrl: "https://testnet.hecoinfo.com",
		symbol: "HT",
		fromBlock: 11085000,
		name:"hecoTest"
	}
}

var myNId = 0;
uni.$on("chainId", (nId)=>{
	console.log("chainId:", nId);
	myNId = Number(nId);
});


function nftAddress(){
	
	if(Chains[myNId]){
		return Chains[myNId].nftAddress;
	}
}

function routerAddress(){
	
	if(Chains[myNId]){
		return Chains[myNId].routerAddress;
	} 
}

function scanUrl(){

	if(Chains[myNId]){
		return Chains[myNId].scanUrl;
	} 
}

function symbol(){
	
	if(Chains[myNId]){
		return Chains[myNId].symbol;
	} 
}

function fromBlock(){

	if(Chains[myNId]){
		return Number(Chains[myNId].fromBlock);
	} 
}

function isSupport(nId){
	return SupportedChainId.indexOf(Number(nId))>=0;
}


module.exports = {
	Chains: Chains,
	isSupport: isSupport,
	nftAddress: nftAddress,
	routerAddress: routerAddress,
	scanUrl: scanUrl,
	symbol: symbol,
	fromBlock: fromBlock
}