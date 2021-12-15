<template>
	<view>
		<navigation></navigation>
		<product-list ref="pl" :unitSymbol="tokenSymbol" @clickProduct="onClickProduct"></product-list>
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
				tokenSymbol:""
			};
			
		},

		onLoad(){
			this.tokenSymbol = tokens.getTokenSymbol(); 
		},
		
		methods:{
			
			onReachBottom() {
				console.log("market onReachBottom");
				this.$refs.pl.loadData();
			},
			
			onPullDownRefresh() {
			    
			    setTimeout(() => {
			        uni.stopPullDownRefresh();
			    }, 2000);
			},
			
			onClickProduct(product){
				console.log("onClickProduct:", product);
				uni.navigateTo({
					url:"../item/item?id="+product.id,
					complete:function(r){
						console.log(r);
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.product-list {
		margin-top: 20rpx;
	}
</style>
