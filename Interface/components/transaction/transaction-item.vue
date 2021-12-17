<template>
	<view class>
		<view class="c">
			<view class>
				<text v-if="op == 1" class="address l-margin">{{addressShow(to)}}</text>
				<text v-else class="address l-margin">{{addressShow(from)}}</text>
			</view>
			<view class @click="clickLink">
				<text class="op" v-if="op == 0">锻造</text>
				<text class="op" v-else-if="op == 1">买入</text>
				<text class="op" v-else-if="op == 2">挂售&nbsp;{{showPrice}}&nbsp;{{unitSymbol}}</text>
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
	import {addressShow, fromTokenValue} from "../../lib/utils.js";
	var tokens = require('../../script/tokens.js');
	var eth = tokens.getETH();
	
	export default {
		name:"transaction-item",
		emits:["clickLink"],
		
		props: {
			border: {
				type: [Boolean],
				default: false
			},
			
			from: {
				type: [String],
				default: ""
			},
			
			to: {
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
			},
			
			unitSymbol: {
			  type: String,
			  default() {
			    return "";
			  }
			},
		},
		
		created() {
			this.addressShow = addressShow;
			this.fromTokenValue = fromTokenValue;
			
			console.log("blockNumber :", this.blockNumber);
			if(this.blockNumber ){
				eth.getBlock(this.blockNumber , (error, block)=>{
					if(!error){
						this.date = new Date(parseInt(block.timestamp) * 1000).format("yyyy-MM-dd hh:mm:ss");
					}
				});
			}
		},
		
		updated() {
			console.log("updated");
			this.showPrice = fromTokenValue(this.price, tokens.getTokenDecimals());
		},
		
		data() {
			return {
				date:"",
				showPrice:"",
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
