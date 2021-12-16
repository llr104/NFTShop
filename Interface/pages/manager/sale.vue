<template>
	<view>
		<navigation address></navigation>
		<view class="gs">
			<uni-forms-item required name="tokenId" label="tokenId">
				<uni-easyinput type="number" v-model="data.tokenId" @input="gsTokenIdInput" placeholder="请输入tokenId" />
			</uni-forms-item>
			<uni-forms-item required name="price" label="价格">
				<uni-easyinput type="number" v-model="data.price" placeholder="请输入挂售金额,金额为0即为取消挂售" />
			</uni-forms-item>
			
			<uni-forms-item label="授权" name="approve" v-if="data.isApprove==false && data.tokenId">
				<button type="default" class="approve" @click="clickApprove">授权NFT挂售到平台</button>
			</uni-forms-item>
			
			<uni-forms-item label="授权" name="approvedis" v-if="data.isApprove==false && data.tokenId && data.approving">
				<button type="default" class="approvedis" loading="true"
				disabled="true">授权NFT中...</button>
			</uni-forms-item>
			
			<button @click="cllickGS" v-if="data.isApprove && data.tokenId && data.approving==false">提交</button>
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
				data: {
					tokenId:"",
					price:0,
					approving:false,
					isApprove:true,
				}
			};
		},
		
		methods:{
			gsTokenIdInput:function(text){
				this.data.approving = false;
				if(Number(text)){
					this.checkApprove();
				}
			},
			
			checkApprove:function(){
				
				eth.getAccounts((error, result)=>{
					if(!error){
						tokens.isApproveNFT(this.data.tokenId, (error, r)=>{
							if(!error){
								this.data.isApprove = r;
							}else{
								this.data.isApprove = true;
							}
						});
					}
				});
			},
			
			cllickGS:function(){
				console.log("cllickGS:", this.data);
				
				if(this.data.tokenId){
			
					eth.getAccounts((error, result)=>{
						if(error){
							return;
						}
						
						let _from = result[0];
						let tokenId = Number(this.data.tokenId);
						if(this.data.price){
							let price = Number(this.data.price);
							nft.methods.setTokenPrice(tokenId, price).send({from: _from}).on('transactionHash', (hash)=>{
								
							}).on('receipt', (receipt)=>{
								console.log("receipt:", receipt);
								
							}).on('error', (error)=>{
								
							}); 
						}
					});
				}
			},
		}
	}
</script>

<style lang="scss">
	.gs {
		margin-top: 2rpx;
		padding: 50rpx;
		background-color: #FFFFFF;
		
		.approve{
			height: 80rpx;
			background-color: #000000;
			border-radius: 30rpx;
			text-align: center;
			line-height: 80rpx;
			font-weight: bold;
			color: #FFFFFF;
		}
		
		.approvedis{
			height: 80rpx;
			background-color: #a3a3a3;
			border-radius: 30rpx;
			text-align: center;
			line-height: 80rpx;
			font-weight: bold;
			color: #000000;
		}
	}
	
</style>
