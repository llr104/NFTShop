<template>
	<view>
		<navigation></navigation>
		<view v-if="isFound" class="card1">
			<uni-title class="t" title="出售商品" type="h1"></uni-title>
			
			<view class="uri">
				<image class="uri" :src="product.uri" mode=""></image>
			</view>
			
			<view class="l">
				<view class="l1">
					<text>{{product.name}}</text>
				</view>
				<view class="l1">
					<text>链上标识:{{product.id}}</text>
				</view>
			</view>
		</view>
		<view class="card2">
			<uni-title class="t" title="出售单价" type="h1"></uni-title>
			<uni-easyinput class="pinput" type="number" trim="all" v-model="price" placeholder="请输入挂售的价格" />
			<button type="default"  class="approve" v-if="isApprove==false && approving==false"
			 @click="clickApprove">授权NFT挂售到平台</button>
			 
			<button type="default" class="approving" v-if="approving" loading="true">正在授权NFT...</button>
			
			<view class="bottom" v-if="isApprove && product.price==0">
				<view class="bottom-fixed">
					<button type="default" class="upSall" v-if="!upSalling" @click="clickUpSall">确认挂售</button>
					<button type="default" class="upSalling" v-if="upSalling" loading="true">挂售中...</button>
				</view>
				<view class="space">
				</view>
			</view> 
		</view>
	</view>
</template>

<script>
	import {addressShow} from "../../lib/utils";
	import navigation from "../../components/navigation/navigation.vue";

	
	var tokens = require('../../script/tokens.js');
	var storage = require('../../script/storage.js');
	
	let nft = tokens.getNFT();
	let eth = tokens.getETH();
	
	export default {
		data() {
			return {
				product:{},
				price:"",
				isFound:false,
				isApprove:true,
				approving:false,
				upSalling:false,
			};
		},
		
		onLoad(options) {
			
			console.log("options:", options);
			this.addressShow = addressShow;
			eth.getAccounts((error, result)=>{
				if(!error && result.length != 0){
					this.myAddress = result[0];
					this.checkApprove();
				}
			});
			
			
			if(options.id){
				let id = Number(options.id);
				this.queryToken(id);
				
				uni.$on("receiptHash", (hashObj)=>{
					if(!hashObj || Number(hashObj.tokenId) != id){
						return;
					}
					
					if(hashObj.op == storage.opType.ApprovingNFT){
						this.approving = false;
					}else if(hashObj.op == storage.opType.UpSalling){
						this.upSalling = false;
					}
					this.queryToken(id);
				});
			}
			
			console.log("this.product:", this.product);
		},
		
		methods:{
			
			queryToken:function(id){
				tokens.queryToken(id, (error, t)=>{
					console.log("queryToken", error, t);
					if(!error){
						this.isFound = true;
						this.product = t;
						this.checkApprove();
						
						let hashArr = storage.getTransactionPennding(t.id);
						if(hashArr){
							
							for (let i = 0; i < hashArr.length; i++) {
								let hashObj = hashArr[i];
								console.log("hashObj:", hashObj);
								if(hashObj.op == storage.opType.ApprovingNFT){
									this.approving = true;
								}else if(hashObj.op == storage.opType.UpSalling){
									this.upSalling = true;
								}
								console.log("this.approving:", this.approving);
							}
						}
					}else{
						this.isFound = false;
					}
				});
			},
			
			checkApprove:function(){
				if(this.myAddress && this.isFound){
					tokens.isApproveNFT( this.product.id, (error, r)=>{
						if(!error){
							this.isApprove = r;
						}else{
							this.isApprove = true;
						}
					});
				}
			},
			
			clickApprove:function(){
				console.log("clickApprove");
				this.approving = true;
				tokens.approveNFT(this.myAddress, this.product.id).on('transactionHash', (hash)=>{
					storage.setTransactionPennding(this.product.id, hash, storage.opType.ApprovingNFT);
				}).on('receipt', (receipt)=>{
					if(receipt.status){
						this.isApprove = true;
						uni.showToast({
							title:"授权成功"
						});
					}else{
						this.isApprove = false;
						uni.showToast({
							title:"授权失败",
							icon:"error"
						});
						
					}
					this.approving = false;
					
				}).on('error', (error)=>{
					this.approving = false;
					this.isApprove = false;
					uni.showToast({
						title:"授权失败",
						icon:"error"
					});
				}); 
			},
			
			clickUpSall:function(){
				console.log("clickUpSall");
				if(!this.isApprove){
					uni.showToast({
						title:"请先授权",
						icon:"error"
					})
					return;
				}
				
				let price = Number(this.price);
				console.log("price:", price);
				if(isNaN(price) || price <= 0){
					uni.showToast({
						title:"挂售金额输入有误",
						icon:"error"
					});
					return
				}
				
				if(!this.myAddress){
					uni.showToast({
						title:"钱包没有连接成功",
						icon:"error"
					});
					return
				}
				
				let tokenId = Number(this.product.id);
				console.log("tokenId:", tokenId);
				if(isNaN(tokenId) || tokenId <= 0){
					uni.showToast({
						title:"商品不存在",
						icon:"error"
					});
					return
				}
				
				nft.methods.setTokenPrice(tokenId, price).send({from: this.myAddress}).on('transactionHash', (hash)=>{
					uni.navigateTo({
						url:"../resell-result/resell-result?id=" + this.product.id+"&hash=" + hash,
					});
				}).on('error', (error)=>{
					uni.showToast({
						title:"挂售失败",
						icon:"error"
					});
				}); 
				
			}
		}
	}
</script>

<style lang="scss">
	.card1 {
		width: 100%;
		height: 300rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		
		.t {
			margin-left: 80rpx;
		}
		
		.uri {
			float: left;
			width: 140rpx;
			height: 140rpx;
			border-radius: 20rpx;
			margin-left: 40rpx;
			display: inline-block;
		}
		
		.l {
			float: left;
			margin-top: 40rpx;
			margin-left: 50rpx;
		}
		
		.l1 {
			color: #8c9fad;
			font-size: 28rpx;
			line-height: 1.5;
		}
	}
	
	.card2 {
		width: 100%;
		height: 300rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		margin-bottom: 2rpx;
		
		.t {
			margin-left: 80rpx;
		}
		
		.pinput {
			width: 85%;
			margin: 0 auto;
		}
		
		.approve,.approving{
			width: 80%;
			height: 80rpx;
			background-color: #000000;
			border-radius: 30rpx;
			text-align: center;
			line-height: 80rpx;
			font-weight: bold;
			color: #FFFFFF;
			margin: 20rpx auto;
		}
	}
	

	.bottom{
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		
		.space {
			width: 100%;
			height: 100rpx;
		}
		
		.bottom-fixed {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			z-index:1;
			line-height: 100rpx;
			background-color: #FFFFFF;

			.upSall, .upSalling{
				width: 80%;
				height: 80rpx;
				background-color: #000000;
				border-radius: 30rpx;
				text-align: center;
				line-height: 80rpx;
				font-weight: bold;
				color: #FFFFFF;
				margin: 10rpx auto;
			}
			
		}
	}
</style>
