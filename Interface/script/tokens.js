	import {provider, nftAddress, routerAddress, mainToken} from './eth.js';
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
				this.NFT = new this.ETH.Contract(nftAbi, nftAddress);
				this.Router = new this.ETH.Contract(routerAbi, routerAddress);
				this.isMainToken = true;
				this.ready();
			}
			
			this.show = ()=>{
				console.log("show:", this.name);
			}
		
			this.queryNFTPage = (page, prePage, address) =>{
				this.NFT.methods.tokenPage(page, prePage, address).call((error, result)=>{
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
				})
			}
			
			this.queryNFTPageIds = (page, prePage, address, cb) =>{
				if(!address){
					address = "0x0000000000000000000000000000000000000000";
				}
				this.NFT.methods.tokenPage(page, prePage, address).call((error, result)=>{
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
				})
			}
			
			this.queryToken = (id, cb)=>{
				id = Number(id);
				this.NFT.methods.ownerOf(id).call((error, result)=>{
					console.log("queryToken ownerOf:", result);
					if(error){
						if(cb){
							cb(error, result);
						}
						return;
					}
					let ownerAddress = result;
					this.NFT.methods.idToIndex(id).call((error, result)=>{
						// console.log("queryToken idToIndex:", result);
						if(error){
							if(cb){
								cb(error, result);
							}
							return;
						}
	
						let index = result;
						this.NFT.methods.cAttributes(index).call((error, result)=>{
							if(!error){
								console.log("queryToken cAttributes:", result);
								
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
				
			}
			
			this.getProvider = ()=>{
				return this.provider;
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
					// console.log("Number.MAX_SAFE_INTEGER:", Number.MAX_SAFE_INTEGER);
					// console.log("Number.MAX_VALUE:", Number.MAX_VALUE);
					if(value < Number.MAX_SAFE_INTEGER){
						value = Number.MAX_SAFE_INTEGER;
					}
					return this.Token.methods.approve(routerAddress, value+"").send({from:from});
				}
			}
			
			this.isApproveToken = (from, cb)=>{
				if(this.isMainToken){
					if(cb){
						cb(null, Number.MAX_VALUE);
					}
				}else{
					this.Token.methods.allowance(from, routerAddress).call((error, result)=>{
						if(cb){
							cb(error, Number(result));
						}
					});
				}
				
			}
			
			this.approveNFT = (from, id)=>{
				return this.NFT.methods.approve(routerAddress, id).send({from:from});
			}
			
			this.isApproveNFT = (from, cb)=>{
				console.log("isApproveNFT");
				this.NFT.methods.getApproved(from).call((error, result)=>{
					console.log("getApproved:", error, result);
					if(cb){
						if(!error){
							cb(error, result.toString().toLowerCase() == routerAddress.toString().toLowerCase());
						}else{
							cb(error, result);
						}
					}
				})
			}
			
			this.setApprovalForAll = (owner)=>{
				return this.NFT.methods.setApprovalForAll(routerAddress, true).send({from: owner});
			}
			
			this.isApprovedAllNFT = (owner, cb)=>{
				this.NFT.methods.isApprovedForAll(owner, routerAddress).call((error, result)=>{
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
					let BN = this.provider.utils.BN;
					let v = new BN(Number(price)).toString();
					console.log("v:", v, Number(price));
					return this.Router.methods.buy(id).send({from: from, value: v});
				}else{
					return this.Router.methods.buy(id).send({from: from});
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
					
					let v = "";
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
			
			this.ready = (cb)=>{
				if(this.TokenDecimals != null && this.TokenSymbol != null){
					if(cb){
						cb(true);
					}
					return;
				}
				
				console.log("this.Router.methods:", this.Router.methods);
				this.Router.methods.brokerAddress().call((error, tokenAddress)=>{
					if(!error){
						
						let is = isSameAddress(tokenAddress, "0x0000000000000000000000000000000000000000");
						if(!is){
							this.Token = new this.ETH.Contract(tokenAbi, tokenAddress);
							this.isMainToken = false;
							if(!this.TokenDecimals){
								this.Token.methods.decimals().call((error, result)=>{
									if(!error){
										console.log("decimals:", result);
										this.TokenDecimals = Number(result);
									}
									
									if(cb){
										if(error){
											cb(false);
											return
										}
										
										if(this.TokenSymbol){
											cb(true);
										}
									}
								});
							}
							
							if(!this.TokenSymbol){
								this.Token.methods.symbol().call((error, result)=>{
									if(!error){
										console.log("symbol:", result);
										this.TokenSymbol = result;
									}
									
									if(cb){
										if(error){
											cb(false);
											return
										}
										
										if(this.TokenDecimals){
											cb(true);
										}
									}
								});
							}
						}else{
							this.isMainToken = true;
							this.TokenDecimals = 0;
							this.TokenSymbol = mainToken;
							if(cb){
								cb(true);
							}
						}
					}
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
	
	tokens.show()
	module.exports = tokens;