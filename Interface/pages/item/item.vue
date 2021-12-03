<template>
	<view>
		<navigation></navigation>
		<view v-if="isFound">
			<image class="product-image" :src="product.image" mode="widthFix"></image>
			<uni-title class="product-title" :title=product.title></uni-title>
			<view class="center-card">
				<view class="one one-margin" @click="clickContactAddress">
					<text class="one-1">合约地址:</text>
					<text class="one-2 cAddress">0x0agag....aaaa</text>
				</view>
				<view class="one one-margin">
					<text class="one-1">链上标志:</text>
					<text class="one-2">12345</text>
				</view>
				
				<view class="one">
					<text class="one-1">拥有者&nbsp;&nbsp;&nbsp;:</text>
					<text class="one-2 oAddress">0xaaa....xxx</text>
					<image class="o-copy" src="../../static/copy-icon.svg" @click="clickOnwerAddress"></image>
					<text class="home" @click="clickOwnerHome">个人主页</text>
				</view>
			</view>
			<uni-title class="subTitle" type="h3" title="作品描述"></uni-title>
			<text class="product-des">{{product.des}}</text>
			<view class="record">
				<uni-title class="subTitle saleTitle" type="h3" title="交易记录"></uni-title>
				<text class="more" @click="clickMore">更多</text>
			</view>
			
			<transaction-list @clickLink="clickLink"></transaction-list>
			
			<view class="bottom">
				<view class="bottom-fixed">
					<text class="price">{{product.price}}&nbsp;usdt</text>
					<view class="buy" @click="clickBuy"><text>立即购买</text></view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import navigation from "../../components/navigation/navigation.vue";
	import productsMgr from "../../components/product-list/productsMgr.js";
	import productList from "../../components/product-list/product-list.vue";
	import transactionItem from "../../components/transaction/transaction-item.vue";
	import transactionList from "../../components/transaction/transaction-list.vue";
	
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
				product:{}
			}
		},
		
		onLoad(options) {
			console.log("options:", options);
			if(options.id){
				this.product = productsMgr.getProuductById(options.id);
				if(this.product){
					this.isFound = true;
				}else{
					this.isFound = false;
				}
			}
			
			console.log("this.product:", this.product);
		},
				
		methods: {
			clickContactAddress:function(){
				console.log("clickContactAddress");
			},
			
			clickOnwerAddress:function(){
				console.log("clickOnwerAddress");
			},
			
			clickOwnerHome:function(){
				console.log("clickOwnerHome");
			},
			
			clickBuy:function(){
				console.log("clickBuy");
			},
			
			clickMore:function(){
				console.log("clickMore");
			},
			
			clickLink:function(url){
				window.open(url);
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
			
			.cAddress::after{
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
	
	.bottom{
		width: 100%;
		height: 100rpx;
		.bottom-fixed {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			z-index:999;
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
				text {
					color: #FFFFFF;
				}
				margin: 10rpx 20rpx;
			}
		}
	}
	
</style>
