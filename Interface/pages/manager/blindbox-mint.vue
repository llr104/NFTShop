<template>
	<view>
		<navigation address></navigation>
		<view class="topSpace">
			<text class="t">盲盒锻造</text>
		</view>
		
		<v-tabs v-model="current" :tabs="tabs" fontSize="32rpx" @change="changeTab"></v-tabs>
		<view v-if="current==0" class="base">
			<uni-forms :modelValue="base">
				<uni-forms-item required name="name" label="盲盒名字">
					<uni-easyinput type="text" v-model="base.name" placeholder="请输入盲盒名字" />
				</uni-forms-item>
				<uni-forms-item required name="des" label="盲盒描述">
					<uni-easyinput type="text" v-model="base.des" placeholder="请输入盲盒描述" />
				</uni-forms-item>
				<uni-forms-item required name="uri" label="盲盒 URI">
					<uni-easyinput type="text" v-model="base.uri" placeholder="请输入盲盒 URI" />
				</uni-forms-item>
			</uni-forms>
			<button class="basebtn" @click="cllickBase">提交基础配置</button>
		</view>
		
		<view v-if="current==1" class="elem">
			<uni-forms :modelValue="elem">
				<uni-forms-item required name="id" label="盲盒配置id">
					<uni-easyinput type="number" v-model="base.name" placeholder="请输入盲盒配置id" @input="idInput"/>
				</uni-forms-item>
			</uni-forms>
			<view class="split"></view>
			<uni-table class="tb" stripe emptyText="暂无更多数据">
				<uni-tr>
					<uni-th align="center">名字</uni-th>
					<uni-th align="center">数量</uni-th>
					<uni-th align="center">uri</uni-th>
					<uni-th align="center">描述</uni-th>
					<uni-th align="center">设置</uni-th>
				</uni-tr>
				<uni-tr v-for="(e,index) in elem.data" :key="index">
					<uni-td align="center">{{e.name}}</uni-td>
					<uni-td align="center">{{e.cnt}}</uni-td>
					<uni-td align="center">{{e.uri}}</uni-td>
					<uni-td align="center">{{e.des}}</uni-td>
					<uni-td align="center">
						<text class="left" @click="clickModify(index)">修改</text>
						<text class="right" @click="clickDel(index)">删除</text>
					</uni-td>
				</uni-tr>
			</uni-table>
			<button type="default" class="bbResult" @click="clickBBResult">生成盲盒结果</button>
			<uni-popup class="pop" ref="popup" type="bottom">
				<view class="c">
					<uni-forms :modelValue="elem.modify">
						<uni-forms-item required name="name" label="盲盒名字">
							<uni-easyinput type="text" v-model="elem.modify.name" placeholder="请输入盲盒名字" />
						</uni-forms-item>
						<uni-forms-item required name="des" label="盲盒描述">
							<uni-easyinput type="text" v-model="elem.modify.des" placeholder="请输入盲盒描述" />
						</uni-forms-item>
						<uni-forms-item required name="uri" label="盲盒 URI">
							<uni-easyinput type="text" v-model="elem.modify.uri" placeholder="请输入盲盒 URI" />
						</uni-forms-item>
						<uni-forms-item required name="cnt" label="盲盒数量">
							<uni-easyinput type="number" v-model="elem.modify.cnt" placeholder="请输入盲盒数量" />
						</uni-forms-item>
					</uni-forms>
					<button type="default" @click="clickModifyComfirm">确认提交</button>
				</view>
			</uni-popup>
		</view>
	</view>
	
</template>

<script>
	
	import navigation from "../../components/navigation/navigation.vue";
	import vtabs from "../../components/v-tabs/v-tabs.vue";
	
	var tokens = require('../../script/tokens.js');
	let nft = tokens.getNFT();
	let eth = tokens.getETH();
	
	export default {
		
		components:{
			navigation,
			vtabs
		},
		
		data() {
			return {
				base:{
					name:"",
					des:"",
					uri:"",
				},
				
				elem:{
					id:0,
					data:[
						{
							name:"第一个盲盒",
							des:"这里是第一个盲盒的描述啊，哈哈哈哈哈哈哈哈哈哈哈",
							uri:"http://www.manhe.com",
							cnt:10
						},
						{
							name:"第2个盲盒",
							des:"这里是第一个盲盒的描述啊，哈哈哈哈哈哈哈哈哈哈哈",
							uri:"http://www.manhe.com",
							cnt:10
						}
					],
					modify:{
						name:"",
						des:"",
						uri:"",
						cnt:0
					},
					modifyIndex:0,
				},
				
				tabs:["基础", "元素"],
				current:0,
			}
		},
		methods: {
			cllickBase:function(){
				if(!this.base.name || !this.base.des || !this.base.uri){
					uni.showToast({
						title:"输入数据有误",
						icon:"error"
					})
					return;
				}
			},
			
			idInput:function(id){
				console.log(id);
			},
			
			changeTab:function(){
				
			},
			
			clickModify:function(index){
				console.log("clickModify:", index);
				this.modifyIndex = index;
				let elem = this.elem.data[index];
				
				this.elem.modify.name = elem.name;
				this.elem.modify.des = elem.des;
				this.elem.modify.uri = elem.uri;
				this.elem.modify.cnt = elem.cnt;
				
				this.$refs.popup.open("bottom");
			},
			
			clickDel:function(index){
				console.log("clickDel:", index);
				uni.showModal({
					content:"是否确定删除？",
					 success: (res) =>{
						if (res.confirm) {
							this.elem.data = this.elem.data.slice(index, 1);
						}
					}
				})
			},
			
			clickModifyComfirm:function(){
				console.log("clickModifyComfirm:", this.elem.modify);
				let modify = this.elem.modify;
				if(!modify.name || !modify.des || !modify.uri || !modify.cnt){
					uni.showToast({
						title:"输入有误",
						icon:"error"
					});
					return;
				}
				let elem = this.elem.data[this.modifyIndex];
				elem.name = modify.name;
				elem.des = modify.des;
				elem.uri = modify.uri;
				elem.cnt = modify.cnt;
				
				this.$refs.popup.close();
				
			},
			
			clickBBResult:function(){
				console.log("clickBBResult");
				if(!this.elem.data || !this.elem.data.length){
					uni.showToast({
						title:"请先配置盲盒元素",
						icon:"error"
					});
					return;
				}
				
				let result = [];
				for (var i = 0; i < this.elem.data.length; i++) {
					let data = this.elem.data[i];
					for (var j = 0; j < data.cnt; j++) {
						result.push(i);
					}
				}
				
				result.sort(function() {
				    return .5 - Math.random();
				});
				
				console.log("result:", result);
			}
		}
	}
</script>

<style lang="scss">
	.topSpace {
		width: 100%;
		background-color: #808080;
		text-align: center;
		.t {
			line-height: 1.8;
			font-size: 40rpx;
			font-weight: bolder;
		}
	}
	
	.base, .elem {
		margin-top: 2rpx;
		padding: 50rpx;
		background-color: #FFFFFF;
	}
	
	.split{
		margin: 30rpx auto;
		height: 2rpx;
		background-color: #000000;
	}
	
	.elem {
		.left{
			display: inline-block;
			background-color: #2979FF;
			padding: 10rpx 20rpx;
			border-radius: 8rpx;
			margin: 20rpx 30rpx;
		}
		
		.right{
			display: inline-block;
			background-color: #FF3333;
			padding: 10rpx 20rpx;
			border-radius: 8rpx;
			margin: 20rpx 30rpx;
		}
		
		.bbResult {
			margin-top: 50rpx;
		}
		
		.pop{
			
			.c{
				height: 800rpx;
				padding: 50rpx;
				background-color: #ffffff;
				
			}
		}
	}
</style>
