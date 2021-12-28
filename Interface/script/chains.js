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
		nftAddress: "0x820e41B57B21110F16f50F1c26044A2D4eF8A02A",
		routerAddress: "0x5F0dB59E07bFb052228C3f5A8Be20092738658C0",
		scanUrl: "https://ropsten.etherscan.io",
		symbol: "ETH",
		fromBlock: 11704947
	},
	
	[Supported.HECOMAIN]:{
		nftAddress: "0xd27eFBFad51B29D30Ef90e2265ed838724b8fF4A",
		routerAddress: "0x4804fF7AB5765BC8FCae6d3cD6c8E3ae7367661b",
		scanUrl: "https://hecoinfo.com",
		symbol: "HT",
		fromBlock: 11085000
	},
	
	[Supported.HECOTEST]:{
		nftAddress: "0xd27eFBFad51B29D30Ef90e2265ed838724b8fF4A",
		routerAddress: "0x4804fF7AB5765BC8FCae6d3cD6c8E3ae7367661b",
		scanUrl: "https://testnet.hecoinfo.com",
		symbol: "HT",
		fromBlock: 11085000
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


module.exports = {
	Chains: Chains,
	SupportedChainId: SupportedChainId,
	nftAddress: nftAddress,
	routerAddress: routerAddress,
	scanUrl: scanUrl,
	symbol: symbol,
	fromBlock: fromBlock
}