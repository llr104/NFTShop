<template>
	<view>
		<navigation></navigation>
		<product-list ref="pl" @clickProduct="onClickProduct"></product-list>
	</view>
</template>

<script>
	import productList from "../../components/product-list/product-list.vue";
	import navigation from "../../components/navigation/navigation.vue";
	export default {
		components:{
			navigation,
			productList
		},
		
		data() {
			return {
				
			};
			
		},
		
		methods:{
			onClickProduct(product){
				console.log("onClickProduct:", product);
			},
			
			onReachBottom() {
				console.log("market onReachBottom");
				this.$refs.pl.loadData();
			},
			
			onPullDownRefresh() {
			    
			    setTimeout(() => {
			        uni.stopPullDownRefresh();
			    }, 2000);
			},
		}
	}
</script>

<style lang="scss">
	.product-list {
		margin-top: 20rpx;
	}
</style>
