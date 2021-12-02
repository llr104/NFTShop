<template>
	<view class="product-list">
	    <view class="product" v-for="(product,index) in productList" :key="index">
	        <view class="image-view">
	            <image v-if="renderImage" class="product-image" src="./item.png"></image>
	        </view>
			
			<view class="product-text">
				<view class="product-title">{{product.title}}</view>
				<view class="product-onwer">{{product.displayOwner}}</view>
				<view class="product-price">{{product.price}}usdt</view>
			</view>
			 <view class="right-row"></view>
	    </view>
	</view>
</template>

<script>
	export default {
		name:"product-list",
		data() {
		    return {
		        title: 'product-list',
		        productList: [],
		        renderImage: false
		    };
		},
		methods: {
		    loadData(action = 'add') {
		        const data = [{
		                image: "./item.png",
		                title: 'CyberZodiac',
		                price: 9999,
		                displayOwner: "0x1245****1241",
		            },
					{
						image: "./item.png",
						title: 'CyberZodiac',
						price: 9999,
						displayOwner: "0x1245****1241",
					},
		        ];
		
		        if (action === 'refresh') {
		            this.productList = [];
		        }
		
		        data.forEach(item => {
		            this.productList.push(item);
		        });
		    }
		},
		mounted() {
		    this.loadData();
		    setTimeout(() => {
		        this.renderImage = true;
		    }, 300);
		},
		onPullDownRefresh() {
		    this.loadData('refresh');
		    // 实际开发中通常是网络请求，加载完数据后就停止。这里仅做演示，加延迟为了体现出效果。
		    setTimeout(() => {
		        uni.stopPullDownRefresh();
		    }, 2000);
		},
		onReachBottom() {
		    this.loadData();
		}
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
        background: url(../../static/right-row.svg) no-repeat center;
		background-size: 60rpx;
    }
</style>
