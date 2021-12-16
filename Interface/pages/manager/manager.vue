<template>
	<view>
		<navigation address></navigation>
		<view class="topSpace"></view>
		<button class="btn" type="default" @click="clickNormal">普通锻造</button>
		<button class="btn" type="default" @click="clickBlindBox">盲盒锻造</button>
		<button class="btn" type="default" @click="clickSale">上下架</button>
		<button class="btn" type="default" @click="clickQuery">查询</button>
		<button class="btn" type="default" @click="clickDestory">销毁</button>
	</view>
</template>

<script>
	import navigation from "../../components/navigation/navigation.vue";
	export default {
		comments:{
			navigation
		},
		
		data() {
			return {
				
			};
		},
		
		methods:{
			clickNormal(){
				uni.navigateTo({
					url:"../manager/normal-mint",
					complete:function(r){
						console.log(r);
					}
				});
			},
			
			clickBlindBox(){
				uni.navigateTo({
					url:"../manager/blindbox-mint",
					complete:function(r){
						console.log(r);
					}
				});
			},
			
			clickDestory(){
				uni.navigateTo({
					url:"../manager/destory",
					complete:function(r){
						console.log(r);
					}
				});
			},
			
			clickQuery(){
				uni.navigateTo({
					url:"../manager/query",
					complete:function(r){
						console.log(r);
					}
				});
			},
			
			clickSale(){
				console.log("clickSale");
				uni.navigateTo({
					url:"../manager/sale",
					complete:function(r){
						console.log(r);
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.topSpace {
		margin-top: 30rpx;
	}
	
	.btn {
		width: 80%;
		background-color: #303133;
		color: #FFFFFF;
		margin-bottom: 30rpx;
	}
</style>
