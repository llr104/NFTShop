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
		nftAddress: "0xd27eFBFad51B29D30Ef90e2265ed838724b8fF4A",
		routerAddress: "0x4804fF7AB5765BC8FCae6d3cD6c8E3ae7367661b",
		scanUrl: "https://testnet.hecoinfo.com",
		symbol: "ETH",
		fromBlock: 11085000
	},
	
	[Supported.HECOMAIN]:{
		nftAddress: "0xd27eFBFad51B29D30Ef90e2265ed838724b8fF4A",
		routerAddress: "0x4804fF7AB5765BC8FCae6d3cD6c8E3ae7367661b",
		scanUrl: "https://testnet.hecoinfo.com",
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

function nftAddress(){

	if(Chains[ethereum.networkVersion]){
		return Chains[ethereum.networkVersion].nftAddress;
	}
}

function routerAddress(){

	if(Chains[ethereum.networkVersion]){
		return Chains[ethereum.networkVersion].routerAddress;
	} 
}

function scanUrl(){

	if(Chains[ethereum.networkVersion]){
		return Chains[ethereum.networkVersion].scanUrl;
	} 
}

function symbol(){
	
	if(Chains[ethereum.networkVersion]){
		return Chains[ethereum.networkVersion].symbol;
	} 
}

function fromBlock(){

	if(Chains[ethereum.networkVersion]){
		return Number(Chains[ethereum.networkVersion].fromBlock);
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