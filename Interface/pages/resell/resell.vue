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
			<view class="bottom">
				<view class="bottom-fixed">
					<view class="upSell" @click="clickUpSell"><text>确认挂售</text></view>
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
	import productList from "../../components/product-list/product-list.vue";
	import transactionItem from "../../components/transaction/transaction-item.vue";
	import transactionList from "../../components/transaction/transaction-list.vue";
	
	import {nftAddress} from '../../script/eth.js';
	var tokens = require('../../script/tokens.js');
	let nftc = tokens.getNFTC();
	let eth = tokens.getETH();
	
	export default {
		data() {
			return {
				product:{},
				price:"",
				isFound:false
			};
		},
		
		onLoad(options) {
			console.log("options:", options);
		
			eth.accounts((error, result)=>{
				if(!error && result.length != 0){
					this.myAddress = result[0];
				}
			});
			
			if(options.id){
				uni.$on("TokensUpdate", (ref)=>{
					console.log("TokensUpdate updateItem");
					this.updateItem(options.id);
				});
				console.log("aaaaaaa");
				this.updateItem(options.id);
				if(!this.isFound){
					tokens.queryToken(options.id);
				}
			}
			
			console.log("this.product:", this.product);
		},
		
		methods:{
			updateItem:function(id){
				console.log("updateItem id:", id);
				this.product = tokens.getTokenById(id);
				console.log("this.product:", this.product, tokens.getAllToken());
				if(this.product){
					this.isFound = true;
				}else{
					this.isFound = false;
				}
			},
			
			clickUpSell:function(){
				console.log("clickUpSell");
				let price = Number(this.price);
				console.log("price:", price);
				if(isNaN(price) || price <= 0){
					uni.showToast({
						title:"挂售金额输入有误"
					});
					return
				}
				
				if(!this.myAddress){
					uni.showToast({
						title:"钱包没有连接成功"
					});
					return
				}
				
				let tokenId = Number(this.product.id);
				console.log("tokenId:", tokenId);
				if(isNaN(tokenId) || tokenId <= 0){
					uni.showToast({
						title:"商品不存在"
					});
					return
				}
				
				nftc.setTokenPrice(tokenId, price, {from: this.myAddress}, (error, result)=>{
					if(error){
						uni.showToast({
							title:"挂售失败"
						});
					}else{
						uni.showToast({
							title:"挂售成功"
						});
						
						this.product.price = price;
						tokens.updateToken(this.product);
					}
					console.log("setTokenPriceAndSale:", error, result);
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

			.upSell{
				width: 80%;
				height: 80rpx;
				background-color: #000000;
				border-radius: 30rpx;
				text-align: center;
				line-height: 80rpx;
				font-weight: bold;
				text {
					color: #FFFFFF;
				}
				margin: 10rpx auto;
			}
		}
	}
</style>
