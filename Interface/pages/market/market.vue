<template>
	<view>
		<navigation></navigation>
		<product-list ref="pl" :unitSymbol="tokenSymbol" @clickProduct="onClickProduct"></product-list>
	</view>
</template>

<script>
	import productList from "../../components/product-list/product-list.vue";
	import navigation from "../../components/navigation/navigation.vue";
	var tokens = require('../../script/tokens.js');
	
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
			console.log("onLoad");
			tokens.ready(()=>{
				this.tokenSymbol = tokens.getTokenSymbol(); 
			});
			
		},
		
		onReachBottom() {
			this.$refs.pl.reachBottom();
		},
		
		onPullDownRefresh() {
		    
		    setTimeout(() => {
		        uni.stopPullDownRefresh();
		    }, 2000);
		},
		
		methods:{
			
			onClickProduct(product){
			
				console.log("onClickProduct:", product);
				let uri = "";
				if(product.nftType == 0){
					uri = "../itembb/itembb?id="+product.id
				}else{
					uri = "../item/item?id="+product.id;
				}
				uni.navigateTo({
					url:uri,
					complete:function(r){
						console.log(r);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.product-list {
		margin-top: 20rpx;
	}
</style>
