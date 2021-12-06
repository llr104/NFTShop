<template>
	<view class="container">
		
		<navigation></navigation>
		
		<!-- 轮播图 -->
		 <swiper class="swiper" :indicatorDots="true" :autoplay="true" :interval="2000" :duration="500">
			<swiper-item>
				<image src="../../static/ad.png" @click="clickAd" mode=""></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/ad.png" @click="clickAd" mode=""></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/ad.png" @click="clickAd" mode=""></image>
			</swiper-item>
		</swiper>
		
		<uni-title class="subTitle" type="h3" title="发现NFT"></uni-title>
		<product-list @clickProduct="onClickProduct"></product-list>
		<view class="more" @click="clickMore">
			<text>查看更多</text>
		</view>
		<uni-title class="subTitle" type="h3" title="什么是NFT"></uni-title>
		
		<!-- 三个介绍 -->
		<view class="one-des" v-for="(desItem,index) in desArray" :key="index">
			<view class="left">
				<uni-title class="title" :title="desItem.title" type="h4"></uni-title>
				<text class="content">
					{{desItem.des}}
				</text>
			</view>
			<image class="desImg" :src="desItem.img"></image>
		</view>
		<view class="space">
			
		</view>
	</view>
</template>

<script>
	import productList from "../../components/product-list/product-list.vue";
	import navigation from "../../components/navigation/navigation.vue";
	
	export default {
		components:{
			productList
		},
		
		data() {
			return {
				desArray:[
					{
						title:"唯一性",
						des:"每个NFT都是独一无二的，且具有不同属性，这些属性通常存储在元数据中，且铸造后不可篡改。",
						img:"../../static/one.png"
					},
					{
						title:"可证明的稀缺性",
						des:"NFT铸造数量可通过公共区块链网络验证，数量固定，永恒不变，具有可证明性。",
						img:"../../static/two.png"
					},
					{
						title:"不可分割性",
						des:"每个NFT都是一个独立的个体，无法拆分，因此不能购买或转让NFT的一部分，因此具有不可分割性。",
						img:"../../static/three.png"
					}
				]
			}
		},
		methods: {
			clickAd:function(){
				uni.showToast({
					title:"功能尚未开放，敬请期待"
				})
			},
			
			clickMore:function(){
				uni.navigateTo({
					url:"/pages/market/market",
					complete:function(r){
						console.log(r);
					}
				})
			},
			
			onClickProduct(product){
				console.log("onClickProduct:", product);
				uni.navigateTo({
					url:"../item/item?id="+product.id,
					complete:function(r){
						console.log(r);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.container {
		font-size: 14px;
		line-height: 24px;
	}
	
	
	.uni-list-item {
		width: 200rpx;
		height: 100rpx;
	}
	
	.uni-list-item {
		width: 200rpx;
		height: 100rpx;
	}
	
	.uni-drawer {
		.uni-list-item {
			width: 250rpx;
			// background-color: #ffff7f;
		}
	}
	
	.swiper {
		width: 100%;
		height: 400rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.subTitle {
		margin-left: 30rpx;
		margin-top: 20rpx;
	}
	
	.product-list {
		margin-top: -20rpx;
	}
	
	.more {
		position: relative;
		width: 260rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 20rpx;
		margin: 20rpx auto;
		background-color: #e7ebee;
		border-radius: 25rpx;
	}
	
	.more::after{
		display: inline-block;
		position: absolute;
		content: "";
		width: 30rpx;
		height: 30rpx;
		margin-top: 15rpx;
		right: 15rpx;
		background: url(../../static/right-row.svg) 50% no-repeat;
	}
	
	.one-des {
		
		width: 92%;
		height: 300rpx;
		border-radius: 30rpx;
		background-color: #FFFFFF;
		margin: 0 auto;
		margin-bottom: 20rpx;
		
		.left {
			
			float: left;
			margin-left: 40rpx;
			width: 60%;
			height: 100%;
			
			.content {	
				word-break: break-all;
				display: -webkit-box;
				overflow: hidden;
				text-overflow: ellipsis;
				color: #5e697a;
				font-size: 20rpx;
				line-height: 1.5;
			}
		}
		.desImg {
			float: right;
			width: 200rpx;
			height: 240rpx;
			margin-top: 20rpx;
		}
	
	}
	
	.space {
		width: 100%;
		height: 20rpx;
	}
	

		
</style>
