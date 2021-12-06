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

	</view>
</template>

<script>
	import navigation from "../../components/navigation/navigation.vue";
	import vtab from "../../components/v-tabs/v-tabs.vue";
	
	var abi = require('@/static/json/abi.json');
	var provider = require('../../script/eth.js');
	
	console.log("abi: " + JSON.stringify(abi));
	
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
				}
			};
		},
		
		methods:{
			changeTab(index) {
				console.log('当前选中的项：' + index)
			},
			
			cllickPTDZ:function(){
				console.log("cllickPTDZ:", this.ptdzData);
				
				var caddress = "0xc25Af90c6AE3ec827936a3AD214e1D1491DFafB1";
				console.log("provider.eth:", provider.eth);
				provider.eth.getTransactionCount("0xB501879444f197eb6a7fDDE3B749488D769ABb2e", (err, txCount) => {
					const txObject = {
					  nonce:    provider.utils.toHex(txCount),
					  gasLimit: provider.utils.toHex(800000),
					  gasPrice: provider.utils.toHex(provider.utils.toWei('10', 'gwei')),
					  to: caddress,
					}
					
					const contract = new provider.eth.Contract(abi, caddress);
					contract.methods.name().call((err, result) => { console.log("data:", result) })
				});
			},
			
			cllickMHDZ:function(){
				console.log("cllickMHDZ:", this.mhdzData);
			},
			
			
			cllickXH:function(){
				console.log("cllickXH:", this.xhData);
			},
			
			cllickCH:function(){
				console.log("cllickCH:", this.cxData);
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
	
</style>
