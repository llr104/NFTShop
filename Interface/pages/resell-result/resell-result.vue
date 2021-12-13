<template>
	<view>
		<view class="top">
			<view class="t" v-if="finsh==false">
				<loading class="g-l"></loading>
				<text >挂售中...</text>
			</view>
			<view class="t" v-if="finsh">
				<image class="g-h" src="../../static/green-hook.svg" mode=""></image>
				<text >挂售成功</text>
			</view>
		</view>
		
		<view class="text" v-if="finsh">
			<text>您挂售的商品已成功上架【市场】，供全站用户购买。</text>
		</view>
		
		<view class="text red" v-if="!finsh">
			<text>商品上链中...需要几秒确认时间，请不要重新提交</text>
		</view>
		
		<button class="btn" type="default" @click="backToMy">返回个人中心</button>
	</view>
</template>

<script>
	import loading from "../../components/loading/loading.vue";
	let storage = require("../../script/storage.js");
	
	export default {
		
		components:{
			loading
		},
		
		data() {
			return {
				finsh:false,
			};
		},
		
		onLoad(options) {
			
			let hash = options.hash;
			let tokenId = options.id;
			storage.setTransactionPennding(tokenId, hash, storage.opType.upSaling);
			
			uni.$on("receiptHash", (hashObj)=>{
				if(hashObj.hash.toString().toLowerCase() == hash.toString().toLowerCase()){
					console.log("receiptHash:", hash);
					this.finsh = true;
				}
			});
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
		
		.g-l {
			display: inline-block;
			vertical-align: middle;
			width: 60rpx;
			height: 60rpx;
			margin-right: 10rpx;
			margin-top: 10rpx;
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
