<template>
	<view>
		<view class="top">
			<view class="t">
				<image class="g-h" src="../../static/green-hook.svg" mode=""></image>
				<text >挂售成功</text>
			</view>
		</view>
		
		<view class="text">
			<text>您挂售的商品已成功上架【市场】，供全站用户购买。</text>
		</view>
		
		<view class="text red">
			<text>商品上链中...需要几秒确认时间，请不要重新提交</text>
		</view>
		
		<button class="btn" type="default" @click="backToMy">返回个人中心</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		
		methods:{
			backToMy:function(){
				uni.navigateTo({
					url:"../my/my",
					complete:function(r){
						console.log(r);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.top {
		margin-top: 100rpx;
	}
	
	.t {
		display: inline-block;
		width: 100%;
		height: 60rpx;
		font-size: 40rpx;
		text-align: center;
		margin: 100rpx auto;
		.g-h {
			vertical-align: middle;
			width: 60rpx;
			height: 60rpx;
			margin-right: 10rpx;
		}
	}
	
	.text {
		font-size: 30rpx;
		width: 80%;
		margin: 30rpx auto;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.red {
		color: #aa0000;
	}
	
	
	.btn {
		width: 80%;
		margin: 30rpx auto;
		color: #FFFFFF;
		background-color: #14181f;
	}
</style>
