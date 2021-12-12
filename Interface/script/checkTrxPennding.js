
let storage = require("./storage.js");
let tokens = require("./tokens.js");
let eth = tokens.getETH();

const checkTrxPennding = (function () {
	function _mgr() {
		
		setInterval(()=>{
			var hashs = storage.getHashs();
			if(!hashs){
				return
			}
			Object.keys(hashs).forEach(function(key){
			     console.log("key:", key, hashs[key]);
				 //查询交易
				 eth.getTransactionReceipt(key, function(err, r){
				 	console.log("getTransactionReceipt:", err, r);
					if(!err && r){
						storage.deleteHash(key);
					}
				 });
			});
			
		}, 1000)
	}
	 
	return function () {
		if (!_mgr.instance) {
			_mgr.instance = new _mgr();
		}
		return _mgr.instance
	}
})()()

module.exports = checkTrxPennding;