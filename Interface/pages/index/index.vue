<template>
	<view class="container">
		<!-- <product-list></product-list> -->
		<navigation address="aaa"></navigation>
		

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
	
	.left {
		width: 250rpx;
		background-color: #303133;
	}
	
	
</style>
