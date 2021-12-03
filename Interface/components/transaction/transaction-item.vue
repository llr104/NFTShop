<template>
	<view class>
		<view class="c">
			<view class>
				<text class="address l-margin">{{address}}</text>
			</view>
			<view class>
				<text class="op" @click="clickLink">挂售555ustd</text>
			</view>
			<view class>
				<text class="time l-margin">{{time}}</text>
			</view>
		</view>
		<view class="border-bottom" v-if="border"></view>
	</view>
	
</template>

<script>
	export default {
		name:"transaction-item",
		emits:["clickLink"],
		
		props: {
			border: {
				type: [Boolean, String],
				default: false
			},
		},
		
		data() {
			return {
				address:"0xaasg...agsag",
				time:"2021-11-5 9:24:50",
				url:"https://www.baidu.com"
			};
		},
		
		methods:{
			clickLink:function(){
				console.log("clickLink");
				this.$emit("clickLink", this.url);
			}
		}
	}
</script>

<style lang="scss">
	
	.c {
		position: relative;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		background-color: #FFFFFF;
	}
	
	.l-margin {
		margin-left: 30rpx;
	}
	
	.address{
		font-size: 24rpx;
	}
	
	.op {
		display: inline-block;
		position: absolute;
		right: 60rpx;
		bottom: 40rpx;
		font-size: 24rpx;
		color: #8c9fad;
	}
	
	.op::after {
		display: inline-block;
		position: absolute;
		content: "";
		margin-top: 10rpx;
		width: 30rpx;
		height: 30rpx;
		right: -30rpx;
		background: url(../../static/right-row.svg) 50% no-repeat;
	}
	
	.time {
		font-size: 24rpx;
		color: #8c9fad;
	}
	
	.border-bottom {
		height: 1px;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #e5e5e5;
	}
	
</style>
