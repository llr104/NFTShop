<template>
	<view>
		<navigation></navigation>
		
		<v-tabs v-model="current" :tabs="tabs" :bold="true" 
		:lineScale="0.8" fontSize="34rpx" @change="changeTab">
		</v-tabs>
		<product-list ref="pl1" :filter="address" :unitSymbol="tokenSymbol" v-if="current==0 && address" @clickProduct="onClickProduct" class="plist"></product-list>
		<product-list ref="pl2" :filter="address" :unitSymbol="tokenSymbol" v-if="current==1 && address" @clickProduct="onClickProduct" class="plist"></product-list>
		
	</view>
</template>

<script>
	
	import navigation from "../../components/navigation/navigation.vue";
	import vtab from "../../components/v-tabs/v-tabs.vue";
	import productList from "../../components/product-list/product-list.vue";
	
	var tokens = require('../../script/tokens.js');
	let nft = tokens.getNFT();
	let eth = tokens.getETH();
	
	export default {
		components:{
			navigation,
			vtab,
			productList
		},
		
		data() {
			return {
				current: 0,
				address: "",
				tabs: ['他拥有的', '他卖出的'],
				tokenSymbol:""
			};
		},
		
		onLoad(options) {
			this.address = options.address;
			this.tokenSymbol = tokens.getTokenSymbol();
		},
		
		onReachBottom() {
			if(this.current == 0){
				this.$refs.pl1.reachBottom();
			}else if(this.current == 1){
				this.$refs.pl2.reachBottom();
			}
		},
		
		onPullDownRefresh() {
		    
		    setTimeout(() => {
		        uni.stopPullDownRefresh();
		    }, 2000);
		},
		
		methods:{
			changeTab(index) {
				console.log('当前选中的项：' + index);
			},
			
			onClickProduct(product){
				console.log("onClickProduct:", product);
				uni.navigateTo({
					url:"../item/item?id="+product.id,
					complete:function(r){
						console.log(r);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.v-tabs {
		margin-top: 1rpx;
	}
	.plist {
		margin-top: 20rpx;
	}
</style>
