<template>
	<view class="product-list">
	    <view class="product" v-for="(product,index) in productList" :key="index">
	        <view class="image-view">
	            <image v-if="renderImage" class="product-image" :src="product.image"></image>
	        </view>
	        <view class="product-title">{{product.title}}</view>
	        <view class="product-price">
	            <text class="product-price-favour">￥{{product.originalPrice}}</text>
	            <text class="product-price-original">￥{{product.favourPrice}}</text>
	            <text class="product-tip">{{product.tip}}</text>
	        </view>
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
		                image: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/161702/3/17741/170198/6072a532Eb396e3a2/6cf07262dde69bb9.jpg',
		                title: 'Apple iPhone X 256GB 深空灰色 移动联通电信4G手机',
		                originalPrice: 9999,
		                favourPrice: 8888,
		                tip: '自营'
		            },
		            {
		                image: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/161702/3/17741/170198/6072a532Eb396e3a2/6cf07262dde69bb9.jpg',
		                title: 'Apple iPad 平板电脑 2018年新款9.7英寸',
		                originalPrice: 3499,
		                favourPrice: 3399,
		                tip: '优惠'
		            },
		            {
		                image: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/161702/3/17741/170198/6072a532Eb396e3a2/6cf07262dde69bb9.jpg',
		                title: 'Apple MacBook Pro 13.3英寸笔记本电脑（2017款Core i5处理器/8GB内存/256GB硬盘 MrpxT2CH/A）',
		                originalPrice: 12999,
		                favourPrice: 10688,
		                tip: '秒杀'
		            },
		            {
		                image: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/161702/3/17741/170198/6072a532Eb396e3a2/6cf07262dde69bb9.jpg',
		                title: 'Kindle Paperwhite电纸书阅读器 电子书墨水屏 6英寸wifi 黑色',
		                originalPrice: 999,
		                favourPrice: 958,
		                tip: '秒杀'
		            },
		            {
		                image: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/161702/3/17741/170198/6072a532Eb396e3a2/6cf07262dde69bb9.jpg',
		                title: '微软（Microsoft）新Surface Pro 二合一平板电脑笔记本 12.3英寸（i5 8G内存 256G存储）',
		                originalPrice: 8888,
		                favourPrice: 8288,
		                tip: '优惠'
		            },
		            {
		                image: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/161702/3/17741/170198/6072a532Eb396e3a2/6cf07262dde69bb9.jpg',
		                title: 'Apple Watch Series 3智能手表（GPS款 42毫米 深空灰色铝金属表壳 黑色运动型表带 MQL12CH/A）',
		                originalPrice: 2899,
		                favourPrice: 2799,
		                tip: '自营'
		            }
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
        padding: 20rpx;
        display: flex;
        flex-direction: column;
    }

    .image-view {
        height: 330rpx;
        width: 330rpx;
        margin: 12rpx 0;
    }

    .product-image {
        height: 330rpx;
        width: 330rpx;
    }

    .product-title {
        width: 300rpx;
        word-break: break-all;
        display: -webkit-box;
        overflow: hidden;
        line-height: 1.5;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .product-price {
        margin-top: 10rpx;
        font-size: 28rpx;
        line-height: 1.5;
        position: relative;
    }

    .product-price-original {
        color: #e80080;
    }

    .product-price-favour {
        color: #888888;
        text-decoration: line-through;
        margin-left: 10rpx;
    }

    .product-tip {
        position: absolute;
        right: 10rpx;
        background-color: #ff3333;
        color: #ffffff;
        padding: 0 10rpx;
        border-radius: 5rpx;
    }
</style>
