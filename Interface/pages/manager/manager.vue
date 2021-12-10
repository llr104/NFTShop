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
				<uni-forms-item required name="uri" label="NFT URI">
					<uni-easyinput type="text" v-model="ptdzData.uri" placeholder="请输入NFT URI" />
				</uni-forms-item>
				<uni-forms-item required name="count" label="NFT数量">
					<uni-easyinput type="number" v-model="ptdzData.count" placeholder="请输入NFT数量" />
				</uni-forms-item>
			</uni-forms>
			<button @click="cllickPTDZ">普通锻造</button>
		</view>
		<view class="mhdz" v-if="current==1">
			<uni-forms :modelValue="ptdzData">
				<uni-forms-item required name="name" label="盲盒名字">
					<uni-easyinput type="text" v-model="ptdzData.name" placeholder="请输入盲盒名字" />
				</uni-forms-item>
				<uni-forms-item required name="des" label="盲盒描述">
					<uni-easyinput type="text" v-model="ptdzData.des" placeholder="请输入盲盒描述" />
				</uni-forms-item>
				<uni-forms-item required name="uri" label="盲盒 URI">
					<uni-easyinput type="text" v-model="ptdzData.uri" placeholder="请输入盲盒 URI" />
				</uni-forms-item>
				<uni-forms-item required name="count" label="盲盒数量">
					<uni-easyinput type="number" v-model="ptdzData.count" placeholder="请输入盲盒数量" />
				</uni-forms-item>
			</uni-forms>
			<button @click="cllickMHDZ">盲盒锻造</button>
		</view>
		<view class="xh" v-if="current==2">
			<uni-forms-item required name="tokenId" label="tokenId">
				<uni-easyinput type="number" v-model="xhData.tokenId" placeholder="请输入需要销毁的tokenId" />
			</uni-forms-item>
			<button @click="cllickXH">销毁</button>
		</view>
		<view class="cx" v-if="current==3">
			<uni-forms-item required name="tokenId" label="tokenId">
				<uni-easyinput type="number" v-model="cxData.tokenId" placeholder="请输入需要查询的tokenId" />
			</uni-forms-item>
			<button @click="cllickCH">查询</button>
		</view>
		<view class="gs" v-if="current==4">
			<uni-forms-item required name="tokenId" label="tokenId">
				<uni-easyinput type="number" v-model="gsData.tokenId" placeholder="请输入tokenId" />
			</uni-forms-item>
			<uni-forms-item required name="price" label="价格">
				<uni-easyinput type="number" v-model="gsData.price" placeholder="请输入挂售金额,金额为0即为取消挂售" />
			</uni-forms-item>
			<button @click="cllickGS">提交</button>
		</view>

	</view>
</template>

<script>
	import navigation from "../../components/navigation/navigation.vue";
	import vtab from "../../components/v-tabs/v-tabs.vue";
	
	var tokens = require('../../script/tokens.js');
	
	export default {
		comments:{
			navigation,
			vtab
		},
		
		data() {
			return {
				current: 0,
				tabs: ['普通锻造', "盲盒锻造",'销毁', '查询', "挂售"],
				ptdzData:{
					name: "",
					des: "",
					count: 0,
					uri: ""
				},
				mhdzData:{
					name: "",
					des: "",
					count: 0,
					uri: ""
				},
				xhData:{
					tokenId:"",
				},
				cxData: {
					tokenId:"",
				},
				gsData: {
					tokenId:"",
					price:0,
				}
			};
		},
		
		methods:{
			
			test() {
				provider.eth.getAccounts((error, result) =>{
					if (!error){
						if(result.length>0){
							provider.eth.getTransactionCount(result[0], (err, txCount) => {
								const txObject = {
								  nonce:    provider.utils.toHex(txCount),
								  gasLimit: provider.utils.toHex(800000),
								  gasPrice: provider.utils.toHex(provider.utils.toWei('10', 'gwei')),
								  to: nftAddress,
								}
								
								const contract = new provider.eth.Contract(abi, nftAddress);
								contract.methods.name().call((err, result) => { console.log("data:", result) })
							});
						}
					}
				});
			},
			
			changeTab(index) {
				console.log('当前选中的项：' + index)
			},
			
			cllickPTDZ:function(){
				console.log("cllickPTDZ:", this.ptdzData);
				
				if (typeof web3 !== 'undefined') {
					let nftc = tokens.getNFTC();
					let eth = tokens.getETH();
					
					uni.showLoading({
						title:"锻造中",
					});
					eth.accounts((error, result)=>{
						console.log("accounts:", error, result);
						
						if(!error && result.length != 0){
							
							let name = "生肖头像";
							let des = "漂亮的NFT";
							let count = 1;
							let uri ="https://www.ibox.fan/file/oss/nft/image/nft-goods/821aecc4c6eb4327be81fdea9fabbc98.png?style=st6";
							let _to = result[0];
							let _from = result[0];
							let _name = this.ptdzData.name ? this.ptdzData.name : name;
							let _uri = this.ptdzData.uri ? this.ptdzData.uri : uri
							let _count = this.ptdzData.count ? this.ptdzData.count : count;
							let _des = this.ptdzData.des ? this.ptdzData.des : des;
							let _isGroup = true;
							let _type = 1;
							
							nftc.mint(_to, _name, _uri, _des, _type, _count, _isGroup, {from: _from}, (error, result)=>{
								console.log("mint error:", error);
								console.log("mint result:", result);
								if(!error){
									uni.showToast({
										title:"锻造成功"
									});
								}else{
									uni.showToast({
										title:"锻造失败"
									});
								}
							});
						}else{
							uni.hideLoading();
							uni.showToast({
								title:"锻造失败"
							});
						}
					});
					
				} else {
				    alert("No currentProvider for web3");
				}
			},
			
			cllickMHDZ:function(){
				console.log("cllickMHDZ:", this.mhdzData);
			},
			
			
			cllickXH:function(){
				console.log("cllickXH:", this.xhData);
			},
			
			cllickCH:function(){
				console.log("cllickCH:", this.cxData);
				tokens.queryAllToken();
			},
			
			cllickGS:function(){
				console.log("cllickGS:", this.gsData);
				
				let nftc = tokens.getNFTC();
				let eth = tokens.getETH();
				
				if(this.gsData.tokenId){
					
					eth.accounts((error, result)=>{
						let _from = result[0];
						let tokenId = Number(this.gsData.tokenId);
						if(this.gsData.price){
							let price = Number(this.gsData.price);
							nftc.setTokenPrice(tokenId, price, {from: _from}, (error, result)=>{
								if(error){
									uni.showToast({
										title:"修改失败"
									})
								}
								console.log("setTokenPrice:", error, result);
							});
						}
						
					});
					
				}
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
	
	.mhdz {
		margin-top: 2rpx;
		padding: 50rpx;
		background-color: #FFFFFF;
	}
	
	.xh {
		margin-top: 2rpx;
		padding: 50rpx;
		background-color: #FFFFFF;
	}
	
	.cx {
		margin-top: 2rpx;
		padding: 50rpx;
		background-color: #FFFFFF;
	}
	
	.gs {
		margin-top: 2rpx;
		padding: 50rpx;
		background-color: #FFFFFF;
	}
	
</style>
