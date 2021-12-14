<template>
	<view class>
		<view class="c">
			<view class>
				<text class="address l-margin">{{addressShow(address)}}</text>
			</view>
			<view class @click="clickLink">
				<text class="op" v-if="op == 0">锻造</text>
				<text class="op" v-else-if="op == 1">买入</text>
				<text class="op" v-else-if="op == 2">挂售{{price}}ustd</text>
				<text class="op" v-else-if="op == 3">取消挂售</text>
				
			</view>
			<view class>
				<text class="date l-margin">{{date}}</text>
			</view>
		</view>
		<view class="border-bottom" v-if="border"></view>
	</view>
	
</template>

<script>
	import {addressShow} from "../../lib/utils";
	var tokens = require('../../script/tokens.js');
	let eth = tokens.getETH();
	
	export default {
		name:"transaction-item",
		emits:["clickLink"],
		
		props: {
			border: {
				type: [Boolean],
				default: false
			},
			
			address: {
				type: [String],
				default: ""
			},
			
			txHash: {
				type: [String],
				default: ""
			},
			
			price: {
				type: [Number],
				default: 0
			},
			
			op: {
				type: [Number],
				default: false
			},
			
			blockNumber :{
				type: [Number],
				default: ""
			}
		},
		
		created() {
			this.addressShow = addressShow;
			
			console.log("blockNumber :", this.blockNumber );
			if(this.blockNumber ){
				eth.getBlock(this.blockNumber , (error, block)=>{
					if(!error){
						this.date = new Date(parseInt(block.timestamp) * 1000).format("yyyy-MM-dd hh:mm:ss");
					}
				});
			}
		},
		
		data() {
			return {
				date:""
			};
		},
		
		methods:{
			clickLink:function(){
				this.$emit("clickLink", this.txHash);
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
	
	.date {
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
