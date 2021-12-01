<template>
	<view class="container">
		
		<navigation address="aaa"></navigation>
		<!-- <product-list></product-list> -->
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
			
			}
		},
		methods: {
			clickAd:function(){
				uni.showToast({
					title:"功能尚未开放，敬请期待"
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
	
	
</style>
