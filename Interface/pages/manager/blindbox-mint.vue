<template>
	<view>
		<navigation address></navigation>
		<view class="mhdz">
			<uni-forms :modelValue="data">
				<uni-forms-item required name="name" label="盲盒名字">
					<uni-easyinput type="text" v-model="data.name" placeholder="请输入盲盒名字" />
				</uni-forms-item>
				<uni-forms-item required name="des" label="盲盒描述">
					<uni-easyinput type="text" v-model="data.des" placeholder="请输入盲盒描述" />
				</uni-forms-item>
				<uni-forms-item required name="uri" label="盲盒 URI">
					<uni-easyinput type="text" v-model="data.uri" placeholder="请输入盲盒 URI" />
				</uni-forms-item>
				<uni-forms-item required name="count" label="盲盒数量">
					<uni-easyinput type="number" v-model="data.count" placeholder="请输入盲盒数量" />
				</uni-forms-item>
			</uni-forms>
			<button class="mhdzbtn" @click="cllickMHDZ">盲盒锻造</button>
		</view>
	</view>
	
</template>

<script>
	import navigation from "../../components/navigation/navigation.vue";
	var tokens = require('../../script/tokens.js');
	let nft = tokens.getNFT();
	let eth = tokens.getETH();
	
	export default {
		data() {
			return {
				data:{
					name:"",
					des:"",
					uri:"",
					count:0
				}
			}
		},
		methods: {
			cllickMHDZ:function(){
				
			},
		}
	}
</script>

<style>
	.mhdz {
		margin-top: 2rpx;
		padding: 50rpx;
		background-color: #FFFFFF;
	}
</style>
