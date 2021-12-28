<template>
	<view>
		<navigation address></navigation>
		<view class="topSpace">
			<text class="t">查询</text>
		</view>
		<view class="cx">
			<uni-forms-item required name="tokenId" label="tokenId">
				<uni-easyinput type="number" v-model="data.tokenId" placeholder="请输入需要查询的tokenId" />
			</uni-forms-item>
			
			<view class="product" v-if="token!=null" @click="clickToken">
				<view class="image-view">
				    <image class="product-image" :src="token.uri"></image>
				</view>
				
				<view class="product-text">
					<view class="product-title">{{token.name}}</view>
					<view class="product-onwer">{{addressShow(token.ownerAddress)}}</view>
					<view class="product-price" v-if="token.price">{{token.showPrice}}&nbsp;{{unitSymbol}}</view>
				</view>
				<view class="right-row"></view>
			</view>
			<view class="space" v-if="token!=null">
				
			</view>
			<button @click="cllickQuery">查询</button>
		</view>
	</view>
</template>

<script>
	
	import navigation from "../../components/navigation/navigation.vue";
	import {addressShow} from "../../lib/utils";
	var tokens = require('../../script/tokens.js');
	let eth = tokens.getETH();
	
	export default {
		data() {
			return {
				data:{
					tokenId:"",
				},
				token:null,
			};
		},
		
		onLoad() {
			this.addressShow = addressShow;
		},
		
		methods:{
			cllickQuery:function(){
				console.log("cllickQuery:", this.data);
				this.token = null;
				
				if(this.data.tokenId && Number(this.data.tokenId)){
					tokens.queryToken(this.data.tokenId, (error, token)=>{
						if(error){
							uni.showToast({
								title:"查询不到该NFT",
								icon:"error"
							});
						}else{
							this.token = token;
						}
					});
				}
			},
			
			clickToken:function(){
				uni.navigateTo({
					url:"../item/item?id="+this.token.id,
					complete:function(r){
						console.log(r);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.topSpace {
		width: 100%;
		background-color: #808080;
		text-align: center;
		.t {
			line-height: 1.8;
			font-size: 40rpx;
			font-weight: bolder;
		}
	}
	
	.cx {
		margin-top: 2rpx;
		padding: 50rpx;
		background-color: #FFFFFF;
	}
	
	
	.product {
		position: relative;
		width: 330rpx;
		background-color: #eaeaea;
		border-radius: 30rpx;
		overflow: hidden;
		margin: 20rpx auto;
	}
	
	.image-view {
	    height: 330rpx;
	    width: 330rpx;
	}
	
	.product-image {
	    height: 330rpx;
	    width: 330rpx;
	}
	
	.product-text {
		margin-left: 20rpx;
	}
	
	.product-title {
	    width: 300rpx;
		color: #14181f;
	    word-break: break-all;
	    display: -webkit-box;
	    overflow: hidden;
	    line-height: 1.5;
	    text-overflow: ellipsis;
	    -webkit-box-orient: vertical;
	    -webkit-line-clamp: 2;
	}
	
	.product-onwer {
		color: #8c9fad;
	}
	
	.product-price {
	    font-size: 28rpx;
	    line-height: 1.5;
		color: #14181f;
	}
	
	.right-row {
		width: 60rpx;
		height: 60rpx;
	    position: absolute;
	    right: 20rpx;
		bottom: 10rpx;
	    background: url(../../static/right-row-radius.svg) no-repeat center;
		background-size: 60rpx;
	}
	
	.space {
		margin-bottom: 70rpx;
	}
</style>
