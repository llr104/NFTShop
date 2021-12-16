<template>
	<view class="product-list">
	    <view class="product" v-for="(product,index) in productList" :key="index" @click="clickProduct(product)">
	        <view class="image-view">
	            <image v-if="renderImage" class="product-image" :src="product.uri"></image>
	        </view>
			
			<view class="product-text">
				<view class="product-title">{{product.name}}</view>
				<view class="product-onwer">{{addressShow(product.ownerAddress)}}</view>
				<view class="product-price" v-if="product.price">{{product.showPrice}}&nbsp;{{unitSymbol}}</view>
			</view>
			 <view class="right-row"></view>
	    </view>
		<view v-if="isEnd" class="end">
			<text>---没有更多了---</text>
		</view>
	</view>
</template>

<script>
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
			unitSymbol: {
				type: String,
				default: ''
			},
		},
		
		data() {
		    return {
		        title: 'product-list',
		        productList: [],
		        renderImage: false,
				isEnd: false,
		    };
		},
		methods: {
			
		    loadData() {
				console.log("loadData");
				this.qryPage(1);
		    },
			
			changeFilter(filter){
				this.myFilter = filter;
				this.tokenMap = new Map();
				this.productList = [];
				
				this.loadData();
			},
			
			qryPage(page){
				tokens.queryNFTPageIds(page, 10, this.myFilter, (error, ids)=>{
					if(!error){
						if(ids.length>0){
							for (let i = 0; i < ids.length; i++) {
								let id = Number(ids[i]);
								tokens.queryToken(id, (error, nft) =>{
									if(!error){
										this.tokenMap.set(id+"", nft);
										this.productList = [...this.tokenMap.values()];
									}
								})
							}
							this.page = page;
						}else{
							this.isEnd = true;
						}
					}
				});
			},
			
			clear(){
				this.productList = [];
			},
			
			clickProduct:function(product){
				console.log("clickProduct:", product);
				this.$emit("clickProduct", product);
			},
			
			reachBottom(){
				console.log("pl reachBottom", this.page+1);
				this.qryPage(this.page+1);
			}
		},
		
		created() {
			console.log("created");
			this.myFilter = this.filter;
		},
		
		mounted() {
			console.log("mounted");
			this.tokenMap = new Map();
			this.page = 1;
			this.addressShow = addressShow;
		    this.loadData();
			
		    setTimeout(() => {
		        this.renderImage = true;
		    }, 300);
			
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
	
	.end {
		margin: 10rpx auto;
		margin-top: -15rpx;
		color: #626262;
	}
</style>
