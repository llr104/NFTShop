<template>
	<view>
		<navigation></navigation>
		
		<v-tabs v-model="current" :tabs="tabs" :bold="true" 
		:lineScale="0.8" fontSize="34rpx" @change="changeTab">
		</v-tabs>
		<product-list :filter="address" v-if="current==0 && address" class="plist"></product-list>
		<product-list :filter="address" v-if="current==1 && address" class="plist"></product-list>
		
	</view>
</template>

<script>
	
	import navigation from "../../components/navigation/navigation.vue";
	import vtab from "../../components/v-tabs/v-tabs.vue";
	import productList from "../../components/product-list/product-list.vue";
	
	var tokens = require('../../script/tokens.js');
	let nftc = tokens.getNFTC();
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
				tabs: ['我拥有的', '我卖出的']
			};
		},
		
		onLoad() {
			eth.accounts((error, result)=>{
				if(!error && result.length != 0){
					this.address = result[0];
				}
			});
		},
		
		methods:{
			changeTab(index) {
				console.log('当前选中的项：' + index)
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
