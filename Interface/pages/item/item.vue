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
					<text class="one-1">拥有者:</text>
					<text class="one-2 oAddress">0xaaa....xxx</text>
					<image class="o-copy" src="../../static/copy-icon.svg" @click="clickOnwerAddress"></image>
					<text class="home" @click="clickOwnerHome">个人主页</text>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import navigation from "../../components/navigation/navigation.vue";
	import productsMgr from "../../components/product-list/productsMgr.js";
	
	export default {
		components:{
			navigation
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
				width: 40rpx;
				height: 40rpx;
				right: 100rpx;
				background: url(../../static/right-row.svg) 94% 50% no-repeat;
			}
			
			.o-copy{
				vertical-align: middle;
				width: 40rpx;
				height: 40rpx;
			}
			
			.home {
				vertical-align: middle;
				display: inline-block;
				float: right;
				color: #8c9fad;
				margin-right: 100rpx;
			}
			
			.home::after{
				display: inline-block;
				position: absolute;
				vertical-align: middle;
				content: "";
				width: 40rpx;
				height: 40rpx;
				right: 100rpx;
				color: #8c9fad;
				background: url(../../static/right-row.svg) 94% 50% no-repeat;
			}
		}
	}
</style>
