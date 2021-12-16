<template>
	<view>
		<navigation address></navigation>
		<view class="cx">
			<uni-forms-item required name="tokenId" label="tokenId">
				<uni-easyinput type="number" v-model="data.tokenId" placeholder="请输入需要查询的tokenId" />
			</uni-forms-item>
			<button @click="cllickQuery">查询</button>
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
					tokenId:"",
				},
			};
		},
		
		methods:{
			cllickQuery:function(){
				console.log("cllickQuery:", this.data);
				if(this.data.tokenId && Number(this.data.tokenId)){
					tokens.queryToken(this.data.tokenId);
				}
			},
		}
	}
</script>

<style lang="scss">
	.cx {
		margin-top: 2rpx;
		padding: 50rpx;
		background-color: #FFFFFF;
	}
</style>
