<template>
	<view>
		<navigation></navigation>
		<view v-if="isFound">
			<image class="product-image" :src="product.uri" mode="widthFix"></image>
			<uni-title class="product-title" :title=product.name></uni-title>
			<view class="center-card">
				<view class="one one-margin" @click="clickContactAddress">
					<text class="one-1">合约地址:</text>
					<text class="one-2 nftAddress">{{addressShow(nftAddress)}}</text>
				</view>
				<view class="one one-margin">
					<text class="one-1">链上标志:</text>
					<text class="one-2">{{product.id}}</text>
				</view>
				
				<view class="one">
					<text class="one-1">拥有者&nbsp;&nbsp;&nbsp;:</text>
					<text class="one-2 oAddress">{{addressShow(product.ownerAddress)}}</text>
					<image class="o-copy" src="../../static/copy-icon.svg" @click="clickOnwerAddress"></image>
					<text class="home" @click="clickOwnerHome">个人主页</text>
				</view>
			</view>
			<uni-title class="subTitle" type="h3" title="作品描述"></uni-title>
			<text class="product-des">{{product.describe}}</text>
			<view class="record">
				<uni-title class="subTitle saleTitle" type="h3" title="交易记录"></uni-title>
				<text class="more" @click="clickMore">更多</text>
			</view>
			
			<transaction-list @clickLink="clickLink"></transaction-list>
			
			<view class="bottom">
				<view class="bottom-fixed">
					<text v-if="product.price" class="price">{{product.price}}&nbsp;usdt</text>
					
					<view v-if="!product.price && myAddress==product.ownerAddress"
					class="upSell" @click="clickUpSell"><text>立即挂售</text></view>
					
					<view v-else-if="product.price && myAddress==product.ownerAddress"
					class="downSell" @click="clickDownSell"><text>取消挂售</text></view>
					
					<view v-else-if="product.price" class="buy" @click="clickBuy"><text>立即购买</text></view>
					<view v-else-if="!product.price" class="sellOut" @click="clickBuy"><text>已售罄</text></view>
				</view>
				<view class="space">
				</view>
			</view>
			
			<uni-popup class="downSale_popup" ref="downSale_popup" type="top">
				<view class="c">
					<uni-title class="t" title="您确定取消挂售吗？" type="h1"></uni-title>
					<button class="downSaleBtnLeft" type="default" @click="downSaleCancle">取消</button>
					<button class="downSaleBtnRight" type="default" @click="downSaleOK">确定</button>
				</view>
				
			</uni-popup>
		</view>
		<uni-popup class="ph" ref="ph_popup" type="bottom">
			<view class="t">
				<uni-title class="tt" title="交易记录" type="h2"></uni-title>
			</view>
			<scroll-view class="sh" scroll-y="true">
				<transaction-list></transaction-list>
			</scroll-view>
		</uni-popup>
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
		components:{
			navigation,
			productList,
			transactionItem,
			transactionList
		},
		
		data() {
			return {
				isFound:false,
				nftAddress:nftAddress,
				myAddress:"",
				product:{}
			}
		},
		
		onLoad(options) {
			console.log("options:", options);
			this.addressShow = addressShow;
			eth.accounts((error, result)=>{
				if(!error && result.length != 0){
					this.myAddress = result[0];
				}
			});
			
			if(options.id){
				
				uni.$on("TokensUpdate", (ref)=>{
					console.log("TokensUpdate updateItem:", ref);
					this.updateItem(options.id);
				});
				
				this.updateItem(options.id);
				if(!this.isFound){
					tokens.queryToken(options.id);
				}
			}
			
			console.log("this.product:", this.product);
		},
			
		methods: {
			updateItem:function(id){
				this.product = tokens.getTokenById(id);
				if(this.product){
					this.isFound = true;
				}else{
					this.isFound = false;
				}
			},
			
			moveStop:function(){
				console.log("moveStop");
			},
			
			clickContactAddress:function(){
				console.log("clickContactAddress");
			},
			
			clickOnwerAddress:function(){
				console.log("clickOnwerAddress");
			},
			
			clickOwnerHome:function(){
				console.log("clickOwnerHome");
				uni.navigateTo({
					url:"../others/others?address="+this.product.ownerAddress,
					complete:function(r){
						console.log(r);
					}
				})
			},
			
			clickBuy:function(){
				console.log("clickBuy");
			},
			
			clickMore:function(){
				console.log("clickMore");
				this.$refs.ph_popup.open("bottom");
			},
			
			clickLink:function(url){
				window.open(url);
			},
			
			clickUpSell:function(){
				console.log("clickUpSell");
				uni.navigateTo({
					url:"../resell/resell?id="+this.product.id,
					complete:function(r){
						console.log(r);
					}
				})
			},
			
			clickDownSell:function(){
				console.log("clickDownSell");
				this.$refs.downSale_popup.open("bottom");
			},
			
			downSaleCancle:function(){
				console.log("downSaleCancle");
				this.$refs.downSale_popup.close();
			},
			
			downSaleOK:function(){
				console.log("downSaleOK");
				this.$refs.downSale_popup.close();
				
				nftc.setTokenPrice(this.product.id, 0, {from: this.myAddress}, (error, result)=>{
					if(error){
						uni.showToast({
							title:"取消挂售失败"
						})
					}else{
						uni.showToast({
							title:"取消挂售成功"
						})
						
						this.product.price = 0;
					}
					console.log("setTokenPrice:", error, result);
				});
			}
			
		}
	}
</script>

<style lang="scss">
	.product-image {
		width: 100%;
	}
	
	.product-title {
		margin-left: 20rpx;
	}
	
	.center-card {
		width: 85%;
		
		border-radius: 40rpx;
		background-color: #d9dcde;
		margin: 0 auto;
		padding: 40rpx;
		
		.one-margin {
			margin-bottom: 40rpx;
		}
		
		.one {
			
			.one-1{
				margin-left: 20rpx;
				color: #8c9fad;
			}
			
			.one-2{
				margin-left: 20rpx;
				color: #000000;
			}
			
			.nftAddress::after{
				display: inline-block;
				position: absolute;
				content: "";
				width: 30rpx;
				height: 30rpx;
				right: 60rpx;
				margin-top: 10rpx;
				background: url(../../static/right-row.svg) 50% no-repeat;
			}
			
			.o-copy{
				vertical-align: middle;
				width: 40rpx;
				height: 40rpx;
			}
			
			.home {
				display: inline-block;
				float: right;
				color: #8c9fad;
				margin-right: 60rpx;
			}
			
			.home::after{
				display: inline-block;
				position: absolute;
				content: "";
				width: 30rpx;
				height: 30rpx;
				right: 60rpx;
				margin-top: 10rpx;
				background: url(../../static/right-row.svg) 50% no-repeat;
			}
		}
	}
	
	.subTitle {
		margin-left: 30rpx;
		margin-top: 20rpx;
	}
	
	.product-des {
		margin: -20rpx 30rpx 20rpx 30rpx;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #5e697a;
		font-size: 28rpx;
		line-height: 1.5;
	}
	
	.record{
		vertical-align: middle;
		.saleTitle {
			display: inline-block;
		}
		.more {
			display: inline-block;
			position: relative;
			height: 100%;
			float: right;
			right: 50rpx;
			top: 50rpx;
			font-size: 30rpx;
			color: #5e697a;
		}
		
		.more::after{
			display: inline-block;
			position: absolute;
			content: "";
			width: 30rpx;
			height: 30rpx;
			margin-top: 10rpx;
			right: -30rpx;
			background: url(../../static/right-row.svg) 50% no-repeat;
		}
		
	}
	
	.t {
		height: 100rpx;
		width: 100%;
		background-color: #ffffff;
		
		.tt {
			margin-left: 30rpx;
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
			.price{
				float: left;
				display: inline-block;
				margin-left: 50rpx;
				font-weight: bolder;
				font-size: 40rpx;
				color: #ff56a7;
			}
			
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
			
			.downSell{
				float: right;
				display: inline-block;
				vertical-align: middle;
				width: 250rpx;
				height: 80rpx;
				background-color: #000000;
				border-radius: 30rpx;
				text-align: center;
				line-height: 80rpx;
				font-weight: bold;
				text {
					color: #FFFFFF;
				}
				margin: 10rpx 20rpx;
			}
			
			.buy{
				float: right;
				display: inline-block;
				vertical-align: middle;
				width: 250rpx;
				height: 80rpx;
				background-color: #000000;
				border-radius: 30rpx;
				text-align: center;
				line-height: 80rpx;
				font-weight: bold;
				text {
					color: #FFFFFF;
				}
				margin: 10rpx 20rpx;
			}
			
			.sellOut {
				float: right;
				display: inline-block;
				vertical-align: middle;
				width: 250rpx;
				height: 80rpx;
				background-color: #e7e7e7;
				border-radius: 30rpx;
				text-align: center;
				line-height: 80rpx;
				font-weight: bold;
				text {
					color: #FFFFFF;
				}
				margin: 10rpx 20rpx;
			}
		}
	}
	
	.ph {
		height: 800rpx;
		z-index: 2;
		touch-action: none;
	}
	
	.sh {
		width: 100%;
		height: 700rpx;
		background-color: #ffffff;
	}
	
	.downSale_popup {
		
		.c {
			width: 100%;
			height: 280rpx;
			background-color: #ffffff;
			
			.t {
				margin-left: 50rpx;
			}
			
			.downSaleBtnLeft{
				float: left;
				margin-left: 50rpx;
				width: 35%;
				border-radius: 20rpx;
			}
			
			.downSaleBtnRight{
				float: right;
				margin-right: 50rpx;
				width: 35%;
				background-color: #000000;
				color: #FFFFFF;
				border-radius: 20rpx;
			}
		}
	
	}
	
</style>
