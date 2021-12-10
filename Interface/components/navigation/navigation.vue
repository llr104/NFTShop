<template>
	<view class="root">
		<view class="navigation">
			<view class="navigation-ctrl" mode="" @click="onClickNavCtrl"></view>
			<view class="navigation-logo" mode=""></view>
			<view v-if="address.length==0" class="navigation-wallet" mode="" @click="onClickWallet"></view>
			<view v-else class="navigation-address">
				<text>{{addressShow(address)}}</text>
			</view>
			<uni-drawer ref="showRight" mode="left" :mask-click="true" :width=250>
				<scroll-view class="left" scroll-y="true">
					<uni-list class="left">
						<uni-list-item title="Home" note="" clickable @click="gotoPage('/pages/index/index')"></uni-list-item>
						<uni-list-item title="Market" note="" clickable @click="gotoPage('/pages/market/market')"></uni-list-item>
						<uni-list-item title="My" note="" clickable @click="gotoPage('/pages/my/my')"></uni-list-item>
						<uni-list-item title="Manager" note="" clickable @click="gotoPage('/pages/manager/manager')"></uni-list-item>
					</uni-list>
				</scroll-view>
			</uni-drawer>
		</view>
		<view class="space"></view>
	</view>
	
</template>

<script>
	import {provider} from '../../script/eth.js';

	export default {
		name:"navigation",
		emits: ['clickWallet'],
		
		
		data() {
			return {
				address:"",
			}
		},
		
		created() {
			this.connect();
			console.log("created:", this.address);
		},
		
		methods:{
			
			connect(){
				
				provider.eth.getAccounts((error, result) =>{
					if (!error){
						console.log(result)//授权成功后result能正常获取到账号了
						if(result.length>0){
							this.address = result[0];
						}
					}
				});
			},
			
			onClickNavCtrl:function(){
				console.log("onClickNavCtrl");
				this.showDrawer();
			},
			
			
			onClickWallet(){
				console.log("onClickWallet");
				this.connect();
			},
			
			addressShow:function(address){
				var b = address.substring(0,6);
				var a = address.substring(address.length-4);
				return b + "****" + a;
			},
			
			
			showDrawer() {
			    this.$refs.showRight.open();
			},
			
			closeDrawer() {
			    this.$refs.showRight.close();
			},
			
			gotoPage:function(page){
				console.log("gotoPage:", page);
				console.log("uni:", uni);
				uni.navigateTo({
					url:page,
					complete:function(r){
						console.log(r);
					}
				})
			},
		}
		
	}
</script>

<style lang="scss">
	
	.root {
		width: 100%;
		.space {
			height: 90rpx;
		}
		.navigation {
			position: fixed;
			left: 0;
			top:0;
			z-index:999;
			width: 100%;
			height: 90rpx;
			background-color: #ffffff;
			.navigation-ctrl {
				float: left;
				width: 80rpx;
				height: 100%;
				background: url("nav-ctrl.svg")  50% no-repeat;;
				background-size:80% auto;
			}
			
			.navigation-logo {
				float: left;
				width: 200rpx;
				height: 100%;
				background: url("logo.svg")  50% no-repeat;;
				background-size:130% auto;
			}
			
			.navigation-wallet {
				float: right;
				width: 80rpx;
				height: 100%;
				background: url("wallet.svg")  50% no-repeat;;
				background-size:80% auto;
			}
			
			.navigation-address {
				float: right;
				width: 250rpx;
				margin: 20rpx 10rpx 20rpx 0;
				height: 50rpx;
				line-height: 50rpx;
				text-align: center;
				background-color: #ffaaff;
				border-radius: 10rpx;
			}
		}
	}
	
	
		
</style>
