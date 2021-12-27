import {scanUrl} from './chains.js';

function openTxHash(hash){
	if(!hash) return;
	window.open(scanUrl()+"/tx/"+hash);
}

function openAddress(address){
	if(!address) return;
	window.open(scanUrl()+"/address/"+address);
}

module.exports = {
	"openTxHash": openTxHash,
	"openAddress": openAddress
}
