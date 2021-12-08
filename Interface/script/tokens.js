	import {provider, caddress} from './eth.js';
	var abi = require('@/static/json/abi.json');
	var Eth = require('./ethjs-query.js');
	var EthContract = require('./ethjs-contract.js');
	import productsMgr from "../components/product-list/productsMgr.js";
	
	const tokens= (function () {
	    function _mgr() {
	        this.name = 'tokens';
			this.tokenMap = new Map();
			
			var eth = new Eth(web3.currentProvider);
			var contract = new EthContract(eth);
			var NFTContract = contract(abi);
			this.NFTC = NFTContract.at(caddress);
			this.ETH = eth;
			
			this.show = ()=>{
				console.log("show:", this.name);
			}
			
			this.test = ()=>{
				console.log("this.NFTC:", this.NFTC, _mgr.instance);
				this.NFTC.cAttributes(1, function(error, result){
					console.log("error:", error);
					console.log("result:", result, result.nftType.toNumber());
				});
				
				eth.accounts((error, result)=>{
					this.NFTC.ownerTokens(result[0], function(error, result){
						console.log("ownerTokens error:", error);
						console.log("ownerTokens result:", result);
					})
				});
				
				this.NFTC.totalTokens((error, result)=>{
					console.log("totalTokens error:", error);
					console.log("totalTokens result:", result);
				})
			}
			
			this.queryAllToken = ()=>{
				this.NFTC.totalTokens((error, result)=>{
					if(!error){
						let ids = result[0];
						console.log("totalTokens ids:", ids);
						for (let i = 0; i < ids.length; i++) {
							let id = ids[i].toNumber();
							this.queryToken(id);
						}
					}
				})
			}
			
			this.queryToken = (id)=>{
				this.NFTC.cAttributes(id, (error, result)=>{
					if(!error){
						console.log("cAttributes:", result);
						
						let token = {};
						token.id = id;
						token.describe = result.describe;
						token.groupId = result.groupId.toNumber();
						token.nftType = result.nftType.toNumber();
						token.onSale = result.onSale;
						token.price = result.price.toNumber();
						token.uri = result.uri;
						token.name = result.name;
						token.ownerAddress = "";
						
						this.NFTC.ownerOf(id, (error, result)=>{
							if(!error){
								token.ownerAddress = result[0];
								this.tokenMap.set(id, token);
								
								let ts = [...this.tokenMap.values()];
								productsMgr.putProducts(ts);
								uni.$emit("TokensUpdate", this.tokenMap);
							}
						});
						
					}
				});
			}
			
			this.getAllToken = ()=>{
				return this.tokenMap;
			}
			
			this.getNFTC = ()=> {
				return this.NFTC;
			}
			
			this.getETH = ()=> {
				return this.ETH;
			}
		}
		
	    return function () {
	        if (!_mgr.instance) {
	            _mgr.instance = new _mgr();
				
	        }
	        return _mgr.instance
	    }
		
	})()()
	
	tokens.show()
	module.exports = tokens;