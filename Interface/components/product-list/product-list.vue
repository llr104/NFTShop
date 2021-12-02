<template>
	<view class="product-list">
	    <view class="product" v-for="(product,index) in productList" :key="index" @click="clickProduct(product)">
	        <view class="image-view">
	            <image v-if="renderImage" class="product-image" :src="product.image"></image>
	        </view>
			
			<view class="product-text">
				<view class="product-title">{{product.title}}</view>
				<view class="product-onwer">{{product.displayOwner}}</view>
				<view class="product-price">{{product.price}}&nbsp;usdt</view>
			</view>
			 <view class="right-row"></view>
	    </view>
	</view>
</template>

<script>
	import productsMgr from "./productsMgr.js";
	console.log("productsMgr:", productsMgr);
	export default {
		name:"product-list",
		emits:["clickProduct"],
		data() {
		    return {
		        title: 'product-list',
		        productList: [],
		        renderImage: false,
		    };
		},
		methods: {
		    loadData(action = 'add') {
				productsMgr.putProducts([
					{
						id:1,
		                image: "../../static/item.png",
		                title: 'CyberZodiac',
		                price: 9999,
		                displayOwner: "0x1245****1241",
		            },
					{
						id:2,
						image: "../../static/item.png",
						title: 'CyberZodiac',
						price: 9999,
						displayOwner: "0x1245****1241",
					},
					{
						id:3,
						image: "../../static/item.png",
						title: 'CyberZodiac',
						price: 9999,
						displayOwner: "0x1245****1241",
					},
					{
						id:4,
						image: "../../static/item.png",
						title: 'CyberZodiac',
						price: 9999,
						displayOwner: "0x1245****1241",
					},
					{
						id:5,
					    image: "../../static/item.png",
					    title: 'CyberZodiac',
					    price: 9999,
					    displayOwner: "0x1245****1241",
					},
					{
						id:6,
						image: "../../static/item.png",
						title: 'CyberZodiac',
						price: 9999,
						displayOwner: "0x1245****1241",
					},
					{
						id:7,
						image: "../../static/item.png",
						title: 'CyberZodiac',
						price: 9999,
						displayOwner: "0x1245****1241",
					},
					{
						id:8,
						image: "../../static/item.png",
						title: 'CyberZodiac',
						price: 9999,
						displayOwner: "0x1245****1241",
					},
					
		        ]);
		        if (action === 'refresh') {
		            productsMgr.clearProuducts();
		        }
				this.productList = productsMgr.getProuducts();
				
				console.log("productList:", this.productList);
		    },
			
			clickProduct:function(product){
				console.log("clickProduct:", product);
				this.$emit("clickProduct", product);
				productsMgr.show();
			}
		},
		mounted() {
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
</style>
