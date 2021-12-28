<template>
	<view>
		<navigation address></navigation>
		<view class="topSpace">
			<text class="t">普通锻造</text>
		</view>

		<view class="ptdz">
			<uni-forms :modelValue="data">
				<uni-forms-item required name="name" label="NFT名字">
					<uni-easyinput type="text" v-model="data.name" placeholder="请输入NFT名字" />
				</uni-forms-item>
				<uni-forms-item required name="des" label="NFT描述">
					<uni-easyinput type="text" v-model="data.des" placeholder="请输入NFT描述" />
				</uni-forms-item>
				<uni-forms-item required name="uri" label="NFT URI">
					<uni-easyinput type="text" v-model="data.uri" placeholder="请输入NFT URI" />
				</uni-forms-item>
				<uni-forms-item required name="count" label="NFT数量">
					<uni-easyinput type="number" v-model="data.count" placeholder="请输入NFT数量" />
				</uni-forms-item>
			</uni-forms>
			<button @click="cllickPTDZ">普通锻造</button>
		</view>
	</view>
</template>

<script>
	import navigation from "../../components/navigation/navigation.vue";
	var tokens = require('../../script/tokens.js');
	let eth = tokens.getETH();
	
	export default {
		comments:{
			navigation
		},
		
		data() {
			return {
				data:{
					name:"生肖头像",
					des:"漂亮的NFT",
					uri:"https://www.ibox.fan/file/oss/nft/image/nft-goods/821aecc4c6eb4327be81fdea9fabbc98.png?style=st6",
					count:0
				}
			};
		},
		
		methods:{
			cllickPTDZ:function(){
				let nft = tokens.getNFT();
				console.log("cllickPTDZ:", this.data);
				uni.showLoading({
						title:"锻造中",
					});
					eth.getAccounts((error, result)=>{
						console.log("accounts:", error, result);
						
						if(!error && result.length != 0){
							
							let _to = result[0];
							let _from = result[0];
							let _name = this.data.name ? this.data.name : name;
							let _uri = this.data.uri ? this.data.uri : uri
							let _count = this.data.count ? this.data.count : count;
							let _des = this.data.des ? this.data.des : des;
							let _group = -1;
							let _type = 1;
			
							nft.methods.mint(_to, _name, _uri, _des, _type, _count, _group, 0).send({from: _from}, (error, result)=>{
								
								if(!error){
									uni.showToast({
										title:"锻造成功"
									});
								}else{
									uni.showToast({
										title:"锻造失败"
									});
								}
							})
						}else{
							uni.hideLoading();
							uni.showToast({
								title:"锻造失败"
							});
						}
					})
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
	
	.ptdz {
		margin-top: 2rpx;
		padding: 50rpx;
		background-color: #FFFFFF;
	}
	
	
</style>
