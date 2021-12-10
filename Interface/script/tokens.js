	import {provider, nftAddress, routerAddress} from './eth.js';
	var nftAbi = require('@/static/json/nft-abi.json');
	var routerAbi = require('@/static/json/router-abi.json');
	var Eth = require('./ethjs-query.js');
	var EthContract = require('./ethjs-contract.js');

	
	const tokens= (function () {
	    function _mgr() {
	        this.name = 'tokens';
			this.tokenMap = new Map();
			
			var eth = new Eth(web3.currentProvider);
			var contract = new EthContract(eth);
			var NFTContract = contract(nftAbi);
			this.NFT = NFTContract.at(nftAddress);
			this.ETH = eth;
			
			contract = new EthContract(eth);
			var RouterContract = contract(routerAbi);
			this.Router = RouterContract.at(routerAddress);
			
			this.show = ()=>{
				console.log("show:", this.name);
			}
			
			this.test = ()=>{
				console.log("this.NFTC:", this.NFTC, _mgr.instance);
				this.NFT.cAttributes(1, function(error, result){
					console.log("error:", error);
					console.log("result:", result, result.nftType.toNumber());
				});
				
				eth.accounts((error, result)=>{
					this.NFT.ownerTokens(result[0], function(error, result){
						console.log("ownerTokens error:", error);
						console.log("ownerTokens result:", result);
					})
				});
				
				this.NFT.totalTokens((error, result)=>{
					console.log("totalTokens error:", error);
					console.log("totalTokens result:", result);
				})
			}
			
			this.queryAllToken = ()=>{
				this.NFT.totalTokens((error, result)=>{
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
			
			this.queryToken = (id, cb)=>{
				this.NFT.cAttributes(id, (error, result)=>{
					if(!error){
						console.log("cAttributes:", result);
						
						let token = {};
						token.id = id;
						token.describe = result.describe;
						token.groupId = result.groupId.toNumber();
						token.nftType = result.nftType.toNumber();
						token.price = result.price.toNumber();
						token.uri = result.uri;
						token.name = result.name;
						token.ownerAddress = "";
						
						this.NFT.ownerOf(id, (error, result)=>{
							if(!error){
								token.ownerAddress = result[0];
								this.tokenMap.set(Number(id), token);
								uni.$emit("TokensUpdate", this.tokenMap);
								
								if(cb){
									cb(error, token);
								}
							}else{
								if(cb){
									cb(error, null);
								}
							}
						});
					}else{
						if(cb){
							cb(error, null);
						}
					}
					
				});
			}
			
			this.getAllToken = ()=>{
				return this.tokenMap;
			}
			
			this.updateToken = (t)=>{
				this.tokenMap.set(Number(t.id), t);
				uni.$emit("TokensUpdate", this.tokenMap);
			}
			
			this.getTokenById = (id)=>{
				return this.tokenMap.get(Number(id));
			}
			
			this.getNFT = ()=> {
				return this.NFT;
			}
			
			this.getETH = ()=> {
				return this.ETH;
			}
			
			this.getRouter = ()=>{
				return this.Router;
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