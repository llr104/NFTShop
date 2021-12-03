<template>
	<view>
		<navigation></navigation>
		
		<v-tabs v-model="current" :tabs="tabs" :bold="true" 
		:lineScale="0.8" fontSize="34rpx" @change="changeTab">
		</v-tabs>
		<product-list v-if="current==0" class="plist"></product-list>
		<product-list v-if="current==1" class="plist"></product-list>
		
	</view>
</template>

<script>
	import navigation from "../../components/navigation/navigation.vue";
	import vtab from "../../components/v-tabs/v-tabs.vue";
	import productList from "../../components/product-list/product-list.vue";
	
	export default {
		components:{
			navigation,
			vtab,
			productList
		},
		
		data() {
			return {
				current: 0,
				tabs: ['我拥有的', '我卖出的']
			};
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
