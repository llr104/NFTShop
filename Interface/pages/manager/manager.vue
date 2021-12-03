<template>
	<view>
		<navigation address="aaa"></navigation>
		<v-tabs v-model="current" :tabs="tabs" :bold="true"
		:lineScale="0.6" fontSize="34rpx" @change="changeTab">
		</v-tabs>
		
		<view class="ptdz" v-if="current==0">
			<uni-forms :modelValue="ptdzData">
				<uni-forms-item required name="name" label="NFT名字">
					<uni-easyinput type="text" v-model="ptdzData.name" placeholder="请输入NFT名字" />
				</uni-forms-item>
				<uni-forms-item required name="des" label="NFT描述">
					<uni-easyinput type="text" v-model="ptdzData.des" placeholder="请输入NFT描述" />
				</uni-forms-item>
				<uni-forms-item required name="count" label="NFT数量">
					<uni-easyinput type="number" v-model="ptdzData.count" placeholder="请输入NFT数量" />
				</uni-forms-item>
			</uni-forms>
			<button @click="cllickPTDZ">普通锻造</button>
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
				tabs: ['普通锻造', "盲盒锻造",'销毁', '查询'],
				ptdzData:{
					name: "",
					des: "",
					count: 0
				}
			};
		},
		
		methods:{
			changeTab(index) {
				console.log('当前选中的项：' + index)
			},
			
			cllickPTDZ:function(){
				console.log("cllickPTDZ:", this.ptdzData);
			}
		}
	}
</script>

<style lang="scss">
	.ptdz {
		margin-top: 2rpx;
		padding: 50rpx;
		background-color: #FFFFFF;
	}
</style>
