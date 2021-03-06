	import {provider} from './eth.js';
	import {nftAddress, routerAddress, symbol, isSupport} from './chains.js';
	
	import {isSameAddress} from '../lib/utils.js';
	
	var nftAbi = require('@/static/json/nft-abi.json');
	var routerAbi = require('@/static/json/router-abi.json');
	var tokenAbi = require('@/static/json/token-abi.json');


	const tokens = (function () {
	    function _mgr() {
	        this.name = 'tokens';
			
			this.__init__ = ()=>{
				
				this.provider = provider();
				this.ETH = this.provider.eth;
				this.isMainToken = true;
				this.zeroAddress = "0x0000000000000000000000000000000000000000";
			
			}
			
	
			this.queryNFTPage = (page, prePage, address) =>{
				this.ready(()=>{
					this.getNFT().methods.tokenPage(page, prePage, address).call((error, result)=>{
						if(!error){
							let ids = result;
							for (let i = 0; i < ids.length; i++) {
								let id = Number(ids[i]);
								if(id == 0){
									break;
								}
								this.queryToken(id);
							}
						}
					});
				});
			}
			
			this.queryNFTPageIds = (page, prePage, address, cb) =>{
				if(!address){
					address = this.zeroAddress;
				}
				
				this.ready(()=>{
					this.getNFT().methods.tokenPage(page, prePage, address).call((error, result)=>{
						let rids = [];
						if(!error){
							let ids = result;
							for (let i = 0; i < ids.length; i++) {
								let id = Number(ids[i]);
								if(id == 0){
									break;
								}
								rids.push(id);
							}
						}
						cb(error, rids);
					});
				});
				
			}
			
			this.queryToken = (id, cb)=>{
			
				id = Number(id);
				this.ready(()=>{
					this.getNFT().methods.ownerOf(id).call((error, result)=>{
						console.log("queryToken ownerOf:", result);
						if(error){
							if(cb){
								cb(error, result);
							}
							return;
						}
						let ownerAddress = result;
						this.getNFT().methods.idToIndex(id).call((error, result)=>{
							// console.log("queryToken idToIndex:", result);
							if(error){
								if(cb){
									cb(error, result);
								}
								return;
							}
						
							let index = result;
							this.getNFT().methods.cAttributes(index).call((error, result)=>{
								if(!error){
									// console.log("queryToken cAttributes:", result);
									
									let token = {};
									token.id = id;
									token.describe = result.describe;
									token.groupId = Number(result.groupId)
									token.nftType = Number(result.nftType);
									token.price = Number(result.price);
									token.showPrice = this.fromTokenValue(result.price);
									
									token.uri = result.uri;
									token.name = result.name;
									token.ownerAddress = ownerAddress;
									
									console.log("token:", token);
									if(cb){
										cb(error, token);
									}
					
								}else{
									if(cb){
										cb(error, null);
									}
								}
							});
						})
					});
				});
			
			}
			
			this.getProvider = ()=>{
				return this.provider;
			}
			
			this.getNFT = ()=> {
				var nft = new this.ETH.Contract(nftAbi, nftAddress());
				return nft;
			}
			
			this.getETH = ()=> {
				return this.ETH;
			}
			
			this.getRouter = ()=>{
				var router = new this.ETH.Contract(routerAbi, routerAddress());
				return router;
			}
			
			this.getToken = ()=>{
				return this.Token;
			}
			
			this.getTokenSymbol = ()=>{
				return this.TokenSymbol;
			}
			
			this.getTokenDecimals = ()=>{
				return this.TokenDecimals;
			}
		
			
			this.approveToken = (from, value)=>{
				if(!this.isMainToken){
					
					if(value < Number.MAX_SAFE_INTEGER){
						value = Number.MAX_SAFE_INTEGER;
					}
					return this.Token.methods.approve(routerAddress(), value+"").send({from:from});
				}
			}
			
			this.isApproveToken = (from, cb)=>{
				if(this.isMainToken){
					if(cb){
						cb(null, Number.MAX_VALUE);
					}
				}else{
					this.Token.methods.allowance(from, routerAddress()).call((error, result)=>{
						if(cb){
							cb(error, Number(result));
						}
					});
				}
				
			}
			
			this.approveNFT = (from, id)=>{
				return this.getNFT().methods.approve(routerAddress(), id).send({from:from});
			}
			
			this.isApproveNFT = (from, cb)=>{
				console.log("isApproveNFT");
				this.getNFT().methods.getApproved(from).call((error, result)=>{
					console.log("getApproved:", error, result);
					if(cb){
						if(!error){
							cb(error, result.toString().toLowerCase() == routerAddress().toString().toLowerCase());
						}else{
							cb(error, result);
						}
					}
				})
			}
			
			this.setApprovalForAll = (owner)=>{
				return this.getNFT().methods.setApprovalForAll(routerAddress(), true).send({from: owner});
			}
			
			this.isApprovedAllNFT = (owner, cb)=>{
				this.getNFT().methods.isApprovedForAll(owner, routerAddress()).call((error, result)=>{
					console.log("isApprovedForAll:", error, result);
					if(cb){
						if(!error){
							cb(error, result);
						}else{
							cb(error, result);
						}
					}
				});
			}
			
			this.buy = (id, from, price) =>{
				if(this.isMainToken){
					
					let v = "0";
					let BN = this.provider.utils.BN;
					try{
						v = new BN(price).toString();
					}catch(err){
						let gwei = 1000000000;
						let g = Number(price)/gwei;
						v = new BN(g).toString()+"000000000";
					}
					
					return this.getRouter().methods.buy(id).send({from: from, value: v});
				}else{
					return this.getRouter().methods.buy(id).send({from: from});
				}
			}
			
			this.toTokenValue = (value) =>{
				if(this.isMainToken){
					return this.provider.utils.toWei(value+"", "ether");
				}else{
					return value*(10**this.TokenDecimals);
				}
			}
			
			this.fromTokenValue = (value) =>{
				if(this.isMainToken){
					
					let v = "0";
					let BN = this.provider.utils.BN;
					try{
						v = new BN(value).toString();
					}catch(err){
						let gwei = 1000000000;
						let g = Number(value)/gwei;
						v = new BN(g).toString()+"000000000";
					}
					
					return this.provider.utils.fromWei(v, "ether");
				}else{
					return value/(10**this.TokenDecimals);
				}
			}
			
			this.getNetId = ()=>{
				return this.provider.eth.net.getId();
			}
			
			this.ready = (cb)=>{
				
				if(this.TokenDecimals != null && this.TokenSymbol != null){
					if(cb){
						cb();
					}
					return;
				}
			
				this.provider.eth.net.getId().then((nId)=>{
					uni.$emit("chainId", nId);
						
					if(!isSupport(nId)){
						return;
					}
					this.getRouter().methods.brokerAddress().call().then((tokenAddress)=>{
						console.log("tokenAddress:", tokenAddress);
						let is = isSameAddress(tokenAddress, this.zeroAddress);
						if(!is){
							this.Token = new this.ETH.Contract(tokenAbi, tokenAddress);
							this.isMainToken = false;
							this.Token.methods.decimals().call().then((decimals)=>{
								console.log("decimals:", decimals);
								this.TokenDecimals = Number(decimals);
								
								if(cb){
									if(this.TokenSymbol){
										cb();
									}
								}
							});
							
							this.Token.methods.symbol().call().then((symbol)=>{
								console.log("symbol:", symbol);
								this.TokenSymbol = symbol;
								
								if(cb){
									
									if(this.TokenDecimals){
										cb();
									}
								}
							});
							
						}else{
							this.isMainToken = true;
							this.TokenDecimals = 0;
							this.TokenSymbol = symbol();
							if(cb){
								cb();
							}
						}
					});
				});
			
			}
		}
		
	    return function () {
	        if (!_mgr.instance) {
	            _mgr.instance = new _mgr();
				_mgr.instance.__init__();
	        }
	        return _mgr.instance
	    }
		
	})()()
	
	module.exports = tokens;