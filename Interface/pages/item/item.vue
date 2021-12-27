<template>
	<view>
		<navigation></navigation>
		<view class="c" v-if="isFound">
			<image class="product-image" :src="product.uri" mode="widthFix"></image>
			<uni-title class="product-title" :title=product.name></uni-title>
			<view class="center-card">
				<view class="one one-margin" @click="clickContactAddress">
					<text class="one-1">合约地址:</text>
					<text class="one-2 nftAddress">{{addressShow(nftAddress)}}</text>
				</view>
				<view class="one one-margin">
					<text class="one-1">链上标志:</text>
					<text class="one-2">{{product.id}}</text>
				</view>
				
				<view class="one">
					<text class="one-1">拥有者&nbsp;&nbsp;&nbsp;:</text>
					<text class="one-2 oAddress">{{addressShow(product.ownerAddress)}}</text>
					<image class="o-copy" src="../../static/copy-icon.svg" @click="clickOnwerAddress"></image>
					<text class="home" @click="clickOwnerHome">个人主页</text>
				</view>
			</view>
			<uni-title class="subTitle" type="h3" title="作品描述"></uni-title>
			<text class="product-des">{{product.describe}}</text>
			<view class="record">
				<uni-title class="subTitle saleTitle" type="h3" title="交易记录"></uni-title>
				<text class="more" @click="clickMore">更多</text>
			</view>
			
			<transaction-list :txEvents="txEvents" :unitSymbol="tokenSymbol" ref="txlist1" @clickLink="clickLink"></transaction-list>
			
			<view class="bottom">
				<view class="bottom-fixed">
					<view v-if="product.price" class="price">{{(product.showPrice)}}&nbsp;{{tokenSymbol}}</view> 
					
					<!-- 按钮 -->
					<button type="default" v-if="downSaling"
					class="downSaling" loading="true">下架中...</button>
					
					<button type="default" v-else-if="upSaling"
					class="upSaling" loading="true">上架中...</button>
					
					<button type="default" v-else-if="buying"
					class="buying" loading="true">购买中...</button>
					
					<button type="default" v-else-if="!product.price && isSameAddress(myAddress, product.ownerAddress)"
					class="upSale" @click="clickUpSale">立即挂售</button>
					
					<button type="default" v-else-if="product.price && isSameAddress(myAddress, product.ownerAddress)"
					class="downSale" @click="clickDownSale">取消挂售</button>
					
					<button type="default" v-else-if="product.price" class="buy" @click="clickBuy">立即购买</button>
					
					<button type="default" v-else-if="!product.price" class="SaleOut">已售罄</button>
					
				</view>
				<view class="space">
				</view>
			</view>
			
			<uni-popup class="downSale_popup" ref="downSale_popup" type="top">
				<view class="c">
					<uni-title class="t" title="您确定取消挂售吗？" type="h1"></uni-title>
					<button class="downSaleBtnLeft" type="default" @click="downSaleCancle">取消</button>
					<button class="downSaleBtnRight" type="default" @click="downSaleOK">确定</button>
				</view>
			</uni-popup>
			
			<uni-popup class="buy_confirm" ref="buy_confirm">
				<view class="c">
					<uni-title class="t" title="订单信息" type="h2"></uni-title>
					<view class="uri">
						<image class="uri" :src="product.uri" mode=""></image>
					</view>
					
					<view class="l">
						<view class="l1">
							<text>{{product.name}}</text>
						</view>
						<view class="l1">
							<text>链上标识:{{product.id}}</text>
						</view>
						<view class="l2">
							<text>价格:{{product.showPrice}}&nbsp;{{tokenSymbol}}</text>
						</view>
					</view>
					
					<button type="default" v-if="approving" class="approving2" loading="true">授权中...</button>
					<button type="default" v-else-if="isApprove==false && approving==false" class="approve" @click="clickApprove">授权</button>
					<button type="default" v-else class="pay" @click="clickPay">支付</button>
					
				</view>
			</uni-popup>
		</view>
		<uni-popup class="ph" ref="ph_popup" type="bottom">
			<view class="t">
				<uni-title class="tt" title="交易记录" type="h2"></uni-title>
			</view>
			<scroll-view class="sh" scroll-y="true">
				<transaction-list ref="txlist2" :txEvents="txEvents" :unitSymbol="tokenSymbol" @clickLink="clickLink"></transaction-list>
			</scroll-view>
		</uni-popup>
	</view>
</template>

<script>
	import {addressShow, copy, isSameAddress} from "../../lib/utils.js";
	import navigation from "../../components/navigation/navigation.vue";
	import transactionItem from "../../components/transaction/transaction-item.vue";
	import transactionList from "../../components/transaction/transaction-list.vue";
	import {fromBlock, nftAddress} from '../../script/chains.js';
	import {openTxHash, openAddress} from '../../script/openScan.js'
	var tokens = require('../../script/tokens.js');
	var storage = require("../../script/storage.js");
	
	let nft = tokens.getNFT();
	let eth = tokens.getETH();
	let router = tokens.getRouter();
	let provider = tokens.getProvider();
	
	export default {
		components:{
			navigation,
			transactionItem,
			transactionList
		},
		
		data() {
			return {
				nftAddress: "",
				isFound:false,
				myAddress:"",
				isApprove: false,
				downSaling:false,
				upSaling:false,
				buying:false,
				approving:false,
				product:{},
				txEvents:[],
				tokenSymbol:""
			}
		},
		
		onPullDownRefresh() {
			this.queryToken(this.id);
			uni.stopPullDownRefresh();
		},
		
		onLoad(options) {
			console.log("item onLoad");
			this.addressShow = addressShow;
			this.toTokenValue = tokens.toTokenValue;
			this.isSameAddress = isSameAddress;
			this.nftAddress = nftAddress();
			
			eth.getAccounts((error, result)=>{
				if(!error && result.length != 0){
					this.myAddress = result[0];
				}
			});
			
			uni.$on("accountChanged", (acount)=> {
				this.myAddress = acount;
			});
			
			
			if(options.id){
				let id = Number(options.id);
				this.id = id;
				uni.$on("receiptHash", (hashObj, receipt)=>{
					if(!hashObj || Number(hashObj.tokenId) != id){
						return;
					}
					
					if(hashObj.op == storage.opType.ApprovingToken){
						this.approving = false;
					}else if(hashObj.op == storage.opType.UpSalling){
						this.upSaling = false;
					}else if(hashObj.op == storage.opType.DownSaling){
						this.downSaling = false;
					}else if(hashObj.op == storage.opType.Buying){
						this.buying = false;
					}
					this.queryToken(id);
					
				});
				
				this.queryToken(id);
			}
		},
		
		onUnload() {
			uni.$off("accountChanged");
			uni.$off("receiptHash");
		},
		
		methods: {
			
			queryToken(id){
				console.log("queryToken:", id);
				
				tokens.ready(()=>{
					this.tokenSymbol = tokens.getTokenSymbol();
					this.tokenDecimals = tokens.getTokenDecimals();
					tokens.queryToken(id, (error, t)=>{
						if(!error){
							this.isFound = true;
							this.product = t;
							let hashArr = storage.getTransactionPennding(t.id);
							if(hashArr){
								
								for (let i = 0; i < hashArr.length; i++) {
									let hashObj = hashArr[i];
									console.log("hashObj:", hashObj);
									if(hashObj.op == storage.opType.ApprovingToken){
										this.approving = true;
									}else if(hashObj.op == storage.opType.UpSalling){
										this.upSaling = true;
									}else if(hashObj.op == storage.opType.DownSaling){
										this.downSaling = true;
									}else if(hashObj.op == storage.opType.Buying){
										this.buying = true;
									}
								}
							}
						}else{
							this.isFound = false;
						}
					});
					
					this.qryTX(id);
				});
			
			},
			
			qryTX:function(id){
				this.txEvents = [];
				eth.getBlockNumber((error, last)=>{
					if(error){
						return;
					}
					last = Number(last);
					for (var from = fromBlock(); from <= last; from+=5000) {
						let to = Math.min(last, from+5000);
				
						nft.getPastEvents(
						  'SetOnSale',
						  {
							filter:{
								_tokenId:id+""
							},
						    fromBlock: from,
						    toBlock: to
						  },(error, events)=>{
					
							if(!error){
								this.txEvents = this.txEvents.concat(events);
								if(this.$refs.txlist1){
									console.log("txlist1");
									this.$refs.txlist1.reload(this.txEvents, 4);
								}
								
								if(this.$refs.txlist2){
									this.$refs.txlist2.reload(this.txEvents);
								}
							}
						});
					}
				});
			
			},
			
			clickContactAddress:function(){
				console.log("clickContactAddress");
				openAddress(nftAddress());
			},
			
			clickOnwerAddress:function(){
				console.log("clickOnwerAddress:", this.product.ownerAddress);
				copy(this.product.ownerAddress, function(error){
					if(!error){
						uni.showToast({
							title:"复制成功"
						})
					}
				});
			},
			
			clickOwnerHome:function(){
				console.log("clickOwnerHome");
				uni.navigateTo({
					url:"../others/others?address="+this.product.ownerAddress,
					complete:function(r){
						console.log(r);
					}
				});
			},
			
			clickBuy:function(){
				console.log("clickBuy");
				this.$refs.buy_confirm.open("bottom");
				tokens.isApproveToken(this.myAddress, (error, v)=>{
					if(!error && v >= this.product.price){
						this.isApprove = true;
					}else{
						this.isApprove = false;
					}
				});
			},
			
			clickMore:function(){
				console.log("clickMore");
				this.$refs.ph_popup.open("bottom");
				
				setTimeout(()=>{
					if(this.$refs.txlist2){
						this.$refs.txlist2.reload(this.txEvents);
					}
				}, 100);
			
			},
			
			clickLink:function(hash){
				openTxHash(hash);
			},
			
			clickUpSale:function(){
				console.log("clickUpSale");
				uni.navigateTo({
					url:"../resell/resell?id="+this.product.id,
					complete:function(r){
						console.log(r);
					}
				});
			},
			
			clickDownSale:function(){
				console.log("clickDownSale");
				this.$refs.downSale_popup.open("bottom");
			},
			
			downSaleCancle:function(){
				console.log("downSaleCancle");
				this.$refs.downSale_popup.close();
			},
			
			downSaleOK:function(){
				console.log("downSaleOK");
				this.$refs.downSale_popup.close();
				
				nft.methods.setTokenPrice(this.product.id, 0).send({from: this.myAddress}).on('transactionHash', (hash)=>{
					this.downSaling = true;
					storage.setTransactionPennding(this.product.id, hash, storage.opType.DownSaling);
				}).on('receipt', (receipt)=>{
					console.log("receipt:", receipt);
					this.downSaling = false;
					if(receipt.status){
						uni.showToast({
							title:"取消挂售成功"
						});
						this.product.price = 0;
					}else{
						uni.showToast({
							title:"取消挂售失败",
							icon:"error"
						});
					}
					
				}).on('error', (error)=>{
					this.downSaling = false;
					uni.showToast({
						title:"取消挂售失败",
						icon:"error"
					});
				}); 
			},
			
			clickApprove:function(){
				console.log("clickApprove");
				this.approving = true;
				let price = this.product.price;
				tokens.approveToken(this.myAddress, price).on('transactionHash', (hash)=>{
					storage.setTransactionPennding(this.product.id, hash, storage.opType.ApprovingToken);
				}).on('receipt', (receipt)=>{
					this.approving = false;
					this.isApprove = true;
				}).on('error', (error)=>{
					this.approving = false;
				});
			},
			
			clickPay:function(){
				this.$refs.buy_confirm.close();
				console.log("clickPay", this.product.id, this.myAddress, this.product.price);
				
				tokens.buy(this.product.id, this.myAddress, this.product.price).on('transactionHash', (hash)=>{
					this.buying = true;
					uni.navigateTo({
						url:"../buy-result/buy-result?id=" + this.product.id + "&hash=" + hash,
						complete:function(r){
							console.log(r);
						}
					});
					
				}).on('error', (error)=>{
					this.downSaling = false;
					uni.showToast({
						title:"购买失败",
						icon:"error"
					});
				}); 
			
			},
			
		}
	}
</script>

<style lang="scss">
	.c {
		padding: 20rpx 20rpx 0 20rpx;
	}
	
	.product-image {
		width: 100%;
	}
	
	.product-title {
		margin-left: 20rpx;
	}
	
	.center-card {
		
		
		border-radius: 40rpx;
		background-color: #d9dcde;
		margin: 30rpx;
		padding: 40rpx;
		
		.one-margin {
			margin-bottom: 40rpx;
		}
		
		.one {
			position: relative;
			.one-1{
				color: #8c9fad;
			}
			
			.one-2{
				color: #000000;
			}
			
			.nftAddress::after{
				display: inline-block;
				position: absolute;
				content: "";
				width: 30rpx;
				height: 30rpx;
				right: 20rpx;
				
				background: url(../../static/right-row.svg) 50% no-repeat;
			}
			
			.o-copy{
				vertical-align: middle;
				width: 40rpx;
				height: 40rpx;
			}
			
			.home {
				display: inline-block;
				float: right;
				color: #8c9fad;
				font-size: 25rpx;
				line-height: 30rpx;
				margin-right: 60rpx;
			}
			
			.home::after{
				display: inline-block;
				position: absolute;
				content: "";
				width: 30rpx;
				height: 30rpx;
				right: 20rpx;
				background: url(../../static/right-row.svg) 50% no-repeat;
			}
		}
	}
	
	.subTitle {
		margin-left: 10rpx;
		margin-top: 20rpx;
	}
	
	.product-des {
		margin: 0rpx 30rpx 20rpx 30rpx;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #5e697a;
		font-size: 28rpx;
		line-height: 1.5;
	}
	
	.record{
		vertical-align: middle;
		.saleTitle {
			display: inline-block;
		}
		.more {
			display: inline-block;
			position: relative;
			height: 100%;
			float: right;
			right: 50rpx;
			top: 50rpx;
			font-size: 30rpx;
			color: #5e697a;
		}
		
		.more::after{
			display: inline-block;
			position: absolute;
			content: "";
			width: 30rpx;
			height: 30rpx;
			margin-top: 10rpx;
			right: -30rpx;
			background: url(../../static/right-row.svg) 50% no-repeat;
		}
		
	}
	
	.t {
		height: 100rpx;
		width: 100%;
		background-color: #ffffff;
		
		.tt {
			margin-left: 30rpx;
		}
	}
	
	
	
	.bottom{
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		
		.space {
			width: 100%;
			height: 100rpx;
		}
		
		.bottom-fixed {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			z-index:1;
			line-height: 100rpx;
			background-color: #FFFFFF;
			.price{
				float: left;
				display: inline-block;
				margin-left: 50rpx;
				font-weight: bolder;
				font-size: 40rpx;
				color: #ff56a7;
			}
			
			.upSale,
			.upSaling,
			.open,
			
				
			.downSale,
			.downSaling{
				float: right;
				display: inline-block;
				vertical-align: middle;
				width: 250rpx;
				height: 80rpx;
				background-color: #000000;
				border-radius: 30rpx;
				text-align: center;
				line-height: 80rpx;
				font-weight: bold;
				color: #FFFFFF;
				margin: 10rpx 20rpx;
			}
			
			.buy,
			.buying{
				float: right;
				display: inline-block;
				vertical-align: middle;
				width: 250rpx;
				height: 80rpx;
				background-color: #000000;
				border-radius: 30rpx;
				text-align: center;
				line-height: 80rpx;
				font-weight: bold;
				color: #FFFFFF;
				margin: 10rpx 20rpx;
			}
			
			.SaleOut {
				float: right;
				display: inline-block;
				vertical-align: middle;
				width: 250rpx;
				height: 80rpx;
				background-color: #e7e7e7;
				border-radius: 30rpx;
				text-align: center;
				line-height: 80rpx;
				font-weight: bold;
				color: #000000;
				margin: 10rpx 20rpx;
			}
		}
	}
	
	.ph {
		height: 800rpx;
		z-index: 2;
		touch-action: none;
	}
	
	.sh {
		width: 100%;
		height: 700rpx;
		background-color: #ffffff;
	}
	
	.downSale_popup {
		
		.c{
			width: 100%;
			height: 280rpx;
			background-color: #ffffff;
			
			.t {
				margin-left: 50rpx;
			}
			
			.downSaleBtnLeft{
				float: left;
				margin-left: 50rpx;
				width: 35%;
				border-radius: 20rpx;
			}
			
			.downSaleBtnRight{
				float: right;
				margin-right: 50rpx;
				width: 35%;
				background-color: #000000;
				color: #FFFFFF;
				border-radius: 20rpx;
			}
		}
	
	}
	
	.buy_confirm {
		.c {
			width: 100%;
			height: 300rpx;
			background-color: #ffffff;
			
			.t {
				margin-left: 50rpx;
			}
			
			.uri {
				float: left;
				width: 140rpx;
				height: 140rpx;
				border-radius: 20rpx;
				margin-left: 20rpx;
				display: inline-block;
			}
			
			.l {
				float: left;
				margin-top: 10rpx;
				margin-left: 30rpx;
			}
			
			.l1 {
				color: #8c9fad;
				font-size: 28rpx;
				line-height: 1.5;
			}
			
			.l2 {
				color: #ff0000;
				font-size: 28rpx;
				line-height: 1.5;
			}
			
			.pay{
				width: 200rpx;
				background-color: #000000;
				color: #FFFFFF;
				font-weight: bold;
				margin-top: 10rpx;
			}
			
			.approve{
				width: 200rpx;
				background-color: #000000;
				color: #FFFFFF;
				font-weight: bold;
				margin-top: 10rpx;
			}
			
			.approving2{
				width: 250rpx;
				background-color: #000000;
				color: #FFFFFF;
				font-weight: bold;
				margin-top: 10rpx;
			}
		}
		
	}
	
</style>
