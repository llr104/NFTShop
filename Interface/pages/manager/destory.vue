<template>
	<view>
		<navigation address></navigation>
		<view class="xh">
			<uni-forms-item required name="tokenId" label="tokenId">
				<uni-easyinput type="number" v-model="data.tokenId" placeholder="请输入需要销毁的tokenId" />
			</uni-forms-item>
			<button @click="cllickXH">销毁</button>
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
			cllickXH:function(){
				console.log("cllickXH:", this.data);
				if(this.data.tokenId && Number(this.data.tokenId)){
					eth.getAccounts((error, result)=>{
						if(error){
							return;
						}
						let _from = result[0];
						nft.methods.burn(this.data.tokenId).send({from: _from}, (error, result)=>{
							console.log("burn:", error, result);
							if(!error){
								uni.showToast({
									title:"销毁成功"
								});
							}else{
								uni.showToast({
									title:"销毁失败"
								});
								
							}
						});
					});
				}
			},
		}
	}
</script>

<style lang="scss">
	.xh {
			margin-top: 2rpx;
			padding: 50rpx;
			background-color: #FFFFFF;
		}
</style>
