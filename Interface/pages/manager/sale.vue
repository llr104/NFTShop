<template>
	<view>
		<navigation address></navigation>
		<view class="topSpace">
			<text class="t">上下架</text>
		</view>
		
		<view class="gs">
			<uni-forms-item required name="tokenId" label="tokenId">
				<uni-easyinput type="number" v-model="tokenId" @input="gsTokenIdInput" placeholder="请输入tokenId" />
			</uni-forms-item>
			<uni-forms-item required name="price" label="价格">
				<uni-easyinput type="number" v-model="price" placeholder="请输入挂售金额,金额为0即为取消挂售" />
			</uni-forms-item>
			
			<uni-forms-item label="授权" name="approve" v-if="isApprove==false && tokenId && approving==false">
				<button type="default" class="approve" @click="clickApprove">授权NFT挂售到平台</button>
			</uni-forms-item>
			
			<uni-forms-item label="授权" name="approving" v-if="isApprove==false && tokenId && approving">
				<button type="default" class="approving" loading="true"
				disabled="true">授权NFT中...</button>
			</uni-forms-item>
			
			<button v-if="saling" loading="true">修改上链中...</button>
			<button @click="cllickGS" v-else-if="isApprove && tokenId && approving==false">提交</button>
		</view>
		
	</view>
</template>

<script>
	
	import navigation from "../../components/navigation/navigation.vue";
	var storage = require("../../script/storage.js");
	var tokens = require('../../script/tokens.js');
	let eth = tokens.getETH();
	
	export default {
		data() {
			return {
				tokenId:0,
				price:0,
				approving:false,
				isApprove:true,
				saling:false,
			};
		},
		
		onLoad() {
			tokens.ready();
		},
		
		methods:{
			gsTokenIdInput:function(text){
				this.approving = false;
				if(Number(text)){
					setTimeout(()=>{
						this.checkApprove();
					}, 10);
				}
			},
			
			checkApprove:function(){
				eth.getAccounts((error, result)=>{
					if(!error && result.length != 0){
						tokens.isApprovedAllNFT(result[0], (error, r)=>{
							if(!error){
								this.isApprove = r;
							}else{
								this.isApprove = true;
							}
						});
					}
				});
			},
			
			
			clickApprove:function(){
				console.log("clickApprove");
				
				eth.getAccounts((error, result)=>{
					if(!error && result.length != 0){
						this.approving = true;
						
						tokens.setApprovalForAll(result[0]).on('transactionHash', (hash)=>{
							storage.setTransactionPennding(this.tokenId, hash, storage.opType.ApprovingNFT);
						}).on('receipt', (receipt)=>{
							console.log("receipt:", receipt);
							if(receipt.status){
								this.isApprove = true;
								uni.showToast({
									title:"授权成功"
								});
							}else{
								this.isApprove = false;
								uni.showToast({
									title:"授权失败",
									icon:"error"
								});
								
							}
							this.approving = false;
							
						}).on('error', (error)=>{
							this.approving = false;
							this.isApprove = false;
							uni.showToast({
								title:"授权失败",
								icon:"error"
							});
						}); 
					}
				});
				
			},
			
			cllickGS:function(){
				let nft = tokens.getNFT();
				if(this.tokenId){
					tokens.ready(()=>{
						this.tokenSymbol = tokens.getTokenSymbol();
						this.tokenDecimals = tokens.getTokenDecimals();
						eth.getAccounts((error, result)=>{
							if(error){
								return;
							}
							
							let _from = result[0];
							let tokenId = Number(this.tokenId);
							if(this.price){
								let price = Number(this.price);
								price = tokens.toTokenValue(price);
								nft.methods.setTokenPrice(tokenId, price).send({from: _from}).on('transactionHash', (hash)=>{
									this.saling = true;
								}).on('receipt', (receipt)=>{
									this.saling = false;
									uni.showToast({
										title:"上架成功",
										icon:"success"
									});
								}).on('error', (error)=>{
									this.saling = false;
									uni.showToast({
										title:"上架失败",
										icon:"error"
									});
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
	.topSpace {
		width: 100%;
		background-color: #808080;
		text-align: center;
		.t {
			line-height: 1.8;
			font-size: 40rpx;
			font-weight: bolder;
		}
	}
	
	.gs {
		margin-top: 2rpx;
		padding: 50rpx;
		background-color: #FFFFFF;
		
		.approve, .approving{
			height: 80rpx;
			background-color: #000000;
			border-radius: 30rpx;
			text-align: center;
			line-height: 80rpx;
			font-weight: bold;
			color: #FFFFFF;
		}
	}
	
</style>
