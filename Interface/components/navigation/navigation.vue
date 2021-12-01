<template>
	<view class="navigation">
		<view class="navigation-ctrl" mode="" @click="onClickNavCtrl"></view>
		<view class="navigation-logo" mode=""></view>
		<view v-if="address.length==0" class="navigation-wallet" mode="" @click="onClickWallet"></view>
		<view v-else class="navigation-address">
			<text>{{address}}</text>
		</view>
		
		<uni-drawer ref="showRight" mode="left" :mask-click="true" :width=250>
			<scroll-view class="left" scroll-y="true">
				<uni-list class="left">
					<uni-list-item title="Home" note="" clickable @click="gotoPage('/pages/index/index')"></uni-list-item>
					<uni-list-item title="Market" note="" clickable @click="gotoPage('/pages/market/market')"></uni-list-item>
					<uni-list-item title="My" note="" clickable @click="gotoPage('/pages/my/my')"></uni-list-item>
				</uni-list>
			</scroll-view>
		</uni-drawer>
		
	</view>
</template>

<script>
	export default {
		name:"navigation",
		emits: ['clickWallet'],
		
		props: {
			address: {
				type: String,
				default: ''
			},
			
		},
		data() {
			return {
			
			};
		},
		
		created() {
			console.log("created:", this.address);
		},
		
		methods:{
			onClickNavCtrl:function(){
				console.log("onClickNavCtrl");
				this.showDrawer();
			},
			
			onClickWallet(){
				console.log("onClickWallet")
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
	.navigation {
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
			width: 180rpx;
			margin: 20rpx 10rpx 20rpx 0;
			height: 50rpx;
			line-height: 50rpx;
			text-align: center;
			background-color: #ffaaff;
			border-radius: 10rpx;
		}
	}
		
</style>
