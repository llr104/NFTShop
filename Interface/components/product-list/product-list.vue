<template>
	<view class="product-list">
	    <view class="product" v-for="(product,index) in productList" :key="index" @click="clickProduct(product)">
	        <view class="image-view">
	            <image v-if="renderImage" class="product-image" :src="product.uri"></image>
	        </view>
			
			<view class="product-text">
				<view class="product-title">{{product.name}}</view>
				<view class="product-onwer">{{addressShow(product.ownerAddress)}}</view>
				<view class="product-price">{{product.price}}&nbsp;usdt</view>
			</view>
			 <view class="right-row"></view>
	    </view>
	</view>
</template>

<script>
	import productsMgr from "./productsMgr.js";
	import tokens from "../../script/tokens.js";
	import {addressShow} from "../../lib/utils";
	
	export default {
		name:"product-list",
		emits:["clickProduct"],
		
		props: {
			filter: {
				type: String,
				default: ''
			},
		},
		
		data() {
		    return {
		        title: 'product-list',
		        productList: [],
		        renderImage: false,
		    };
		},
		methods: {
			
		    loadData() {
				console.log("filter:", this.filter);
				
				let all = tokens.getAllToken();
				let ts = [...all.values()];
				productsMgr.putProducts(ts);
				
				if(!this.filter){
					console.log("no filter");
					this.productList = ts;
				}else{
					console.log("has filter");
					let filters = [];
					for (var i = 0; i < ts.length; i++) {
						var t = ts[i];
						if(t.ownerAddress == this.filter){
							filters.push(t);
						}
					}
					this.productList = filters;
				}
				
		    },
			
			clear(){
				productsMgr.clearProuducts();
			},
			
			clickProduct:function(product){
				console.log("clickProduct:", product);
				this.$emit("clickProduct", product);
				productsMgr.show();
			}
		},
		
		created() {
			console.log("created");
		},
		
		mounted() {
			console.log("mounted");
			this.addressShow = addressShow;
		    this.loadData();
			
		    setTimeout(() => {
		        this.renderImage = true;
		    }, 300);
			
			uni.$on("ProductUpdate", ()=>{
				console.log("ProductUpdate");
				this.loadData();
			})
		},
		
	}
</script>

<style>
 view {
        font-size: 28rpx;
    }

	.product-list {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        flex-direction: row;
    }

    .product {
		position: relative;
        display: flex;
        flex-direction: column;
		background-color: #FFFFFF;
		border-radius: 30rpx;
		overflow: hidden;
		margin-left: 30rpx;
		margin-bottom: 30rpx;
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
        background: url(./right-row-radius.svg) no-repeat center;
		background-size: 60rpx;
    }
</style>
