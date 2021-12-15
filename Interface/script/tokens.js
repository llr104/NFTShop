	import {provider, nftAddress, routerAddress, tokenAddress} from './eth.js';
	var nftAbi = require('@/static/json/nft-abi.json');
	var routerAbi = require('@/static/json/router-abi.json');
	var tokenAbi = require('@/static/json/token-abi.json');


	const tokens = (function () {
	    function _mgr() {
	        this.name = 'tokens';
			
			this.__init__ = ()=>{
				
				this.ETH = provider.eth;
				this.NFT = new provider.eth.Contract(nftAbi, nftAddress);
				this.Router = new provider.eth.Contract(routerAbi, routerAddress);
				this.Token = new provider.eth.Contract(tokenAbi, tokenAddress);
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
								token.uri = result.uri;
								token.name = result.name;
								token.ownerAddress = ownerAddress;
							
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
			
			this.approveToken = (from, value)=>{
				return this.Token.methods.approve(routerAddress, value).send({from:from});
			}
			
			this.isApproveToken = (from, cb)=>{
				this.Token.methods.allowance(from, routerAddress).call((error, result)=>{
					if(cb){
						cb(error, Number(result));
					}
				})
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
			
			this.ready = (cb)=>{
				if(this.TokenDecimals && this.TokenSymbol){
					if(cb){
						cb(true);
					}
					return;
				}
				
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