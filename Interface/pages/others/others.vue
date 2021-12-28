<template>
	<view>
		<navigation></navigation>
		
		<v-tabs v-model="current" :tabs="tabs" :bold="true" 
		:lineScale="0.8" fontSize="34rpx" @change="changeTab">
		</v-tabs>
		<product-list ref="pl1" :filter="address" :unitSymbol="tokenSymbol" v-if="current==0 && address" @clickProduct="onClickProduct" class="plist"></product-list>
		<product-list-1 ref="pl2" :unitSymbol="tokenSymbol" v-if="current==1 && address" @clickProduct="onClickProduct" class="plist"></product-list-1>
		
	</view>
</template>

<script>
	import {isSameAddress} from "../../lib/utils.js";
	import navigation from "../../components/navigation/navigation.vue";
	import vtab from "../../components/v-tabs/v-tabs.vue";
	import productList from "../../components/product-list/product-list.vue";
	import productList1 from "../../components/product-list/product-list-1.vue";
	import {fromBlock} from '../../script/chains.js';
	
	var tokens = require('../../script/tokens.js');
	let eth = tokens.getETH();
	
	export default {
		components:{
			navigation,
			vtab,
			productList,
			productList1
		},
		
		data() {
			return {
				current: 0,
				address: "",
				tabs: ['他拥有的', '他卖出的'],
				tokenSymbol:""
			};
		},
		
		onLoad(options) {
			this.address = options.address;
			
			tokens.ready(()=>{
				this.tokenSymbol = tokens.getTokenSymbol(); 
			})
		},
		
		onUnload() {
			uni.$off("accountChanged");
		},
		
		onReachBottom() {
			if(this.$refs.pl1){
				this.$refs.pl1.reachBottom();
			}
			if(this.$refs.pl2){
				this.$refs.pl2.reachBottom();
			}
		},
		
		onPullDownRefresh() {
		    
		    setTimeout(() => {
		        uni.stopPullDownRefresh();
		    }, 2000);
		},
		
		methods:{
			changeTab(index) {
				console.log('当前选中的项：' + index);
				if(index == 1){
					this.saleHistory();
				}
			},
			
			saleHistory(){
				let nft = tokens.getNFT();
				eth.getBlockNumber().then((last)=>{
					last = Number(last);
					for (var from = fromBlock(); from <= last; from+=5000) {
						let to = Math.min(last, from+5000);
				
						nft.getPastEvents(
						  'SetOnSale',
						  {
							filter:{
								_from: this.address,
								_op: "1",
							},
						    fromBlock: from,
						    toBlock: to
						  },(error, events)=>{
					
							if(!error){
								let txEvents = events.reverse();
								let ids = this.cal(txEvents);
								
								if(this.$refs.pl2){
									this.$refs.pl2.loadIds(ids);
								}
							}
						});
					}
				});
			},
			
			cal:function(txEvents){
				if(!txEvents){
					return [];
				}
				
				let maps = new Map();
				for (var i = 0; i < txEvents.length; i++) {
					let from = txEvents[i].returnValues._from;
					let op = txEvents[i].returnValues._op;
					if(op == "1" && isSameAddress(this.address, from)){
						let id = txEvents[i].returnValues._tokenId;
						maps.set(id ,id);
					
					}
				}
				return [...maps.values()];
			},
			
			onClickProduct(product){
			
				console.log("onClickProduct:", product);
				let uri = "";
				if(product.nftType == 0){
					uri = "../itembb/itembb?id="+product.id
				}else{
					uri = "../item/item?id="+product.id;
				}
				uni.navigateTo({
					url:uri,
					complete:function(r){
						console.log(r);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.v-tabs {
		margin-top: 1rpx;
	}
	.plist {
		margin-top: 20rpx;
	}
</style>
