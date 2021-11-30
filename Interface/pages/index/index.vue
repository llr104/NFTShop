<template>
	<view class="container">
		<!-- <product-list></product-list> -->
		<image class="nav-ctrl" src="../../static/nav-ctrl.svg" mode="" @click="onClickNavCtrl"></image>
	
		<uni-drawer ref="showRight" mode="left" :mask-click="false">
			<scroll-view style="height: 100%;" scroll-y="true">
				<button @click="closeDrawer" type="primary">关闭Drawer</button>
				<uni-list>
					<uni-list-item title="Home" note="" clickable @click="gotoPage('/pages/index/index')"></uni-list-item>
					<uni-list-item title="Market" note="" clickable @click="gotoPage('/pages/market/market')"></uni-list-item>
					<uni-list-item title="My" note="" clickable @click="gotoPage('/pages/my/my')"></uni-list-item>
				</uni-list>
			</scroll-view>
		</uni-drawer>

	</view>
</template>

<script>
	import productList from "../../components/product-list/product-list.vue";
	export default {
		components:{
			productList
		},
		
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			onClickNavCtrl:function(){
				console.log("onClickNavCtrl");
				this.showDrawer();
			},
			
			showDrawer() {
			    this.$refs.showRight.open();
			},
			closeDrawer() {
			    this.$refs.showRight.close();
			},
			
			gotoPage:function(page){
				console.log("gotoPage:", page)
				uni.navigateTo({
					url:page,
					complete:function(r){
						console.log(r);
					}
				})
			}
		}
	}
</script>

<style>
	.container {
		font-size: 14px;
		line-height: 24px;
	}
	
	.nav-ctrl {
		width: 60rpx;
		height: 60rpx;
	}
	
	.uni-list-item {
		width: 200rpx;
		height: 100rpx;
	}
	
	.uni-list-item {
		width: 200rpx;
		height: 100rpx;
	}
	
	.nav-item {
		display: block;
		width: 100%;
		height: 100%;
		background-color: #000000;
	}
	
</style>
