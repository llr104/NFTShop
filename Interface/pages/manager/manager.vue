<template>
	<view>
		<navigation address="aaa"></navigation>
		<v-tabs v-model="current" :tabs="tabs" :bold="true"
		:lineScale="0.6" fontSize="34rpx" @change="changeTab">
		</v-tabs>
		
		<view class="ptdz" v-if="current==0">
			<text>普通锻造</text>
		</view>
		<view class="mhdz" v-if="current==1">
			<text>盲盒锻造</text>
		</view>
		<view class="xh" v-if="current==2">
			销毁
		</view>
		<view class="cx" v-if="current==3">
			查询
		</view>

	</view>
</template>

<script>
	import navigation from "../../components/navigation/navigation.vue";
	import vtab from "../../components/v-tabs/v-tabs.vue";
	
	export default {
		comments:{
			navigation,
			vtab
		},
		
		data() {
			return {
				current: 0,
				tabs: ['普通锻造', "盲盒锻造",'销毁', '查询']
			};
		},
		
		methods:{
			changeTab(index) {
				console.log('当前选中的项：' + index)
			}
		}
	}
</script>

<style>

</style>
