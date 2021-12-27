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
			<button class="basebtn" v-if="baseloading==false" @click="cllickBase">提交基础配置</button>
			<button class="baseloading" loading="true" v-if="baseloading">提交基础配置中...</button>
		</view>
		
		<view v-if="current==1" class="elem">
			<uni-forms :modelValue="elem">
				<uni-forms-item required name="id" label="盲盒配置id">
					<uni-easyinput type="number" v-model="elem.id" placeholder="请输入盲盒配置id" @input="idInput"/>
				</uni-forms-item>
			</uni-forms>
			<view class="split"></view>
			
			<view class="r" v-if="elem.hasBase">
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
							<text v-if="!elem.isMint && !elem.isRes" class="left" @click="clickModify(index)">修改</text>
							<text v-if="!elem.isMint && !elem.isRes" class="right" @click="clickDel(index)">删除</text>
						</uni-td>
					</uni-tr>
				</uni-table>
				<button v-if="!elem.isMint && !elem.isRes" type="default" class="elemAdd" @click="clickAdd">添加</button>
				<button v-if="!elem.isMint && !elem.isRes" type="default" class="bbResult" @click="clickBBResult">生成盲盒结果</button>
				<button v-if="!elem.isMint && elem.isRes" type="default" class="bbMint" @click="clickBBMint">锻造盲盒</button>
				
				<uni-popup class="pop" ref="popupadd" type="bottom">
					<view class="c">
						<uni-forms :modelValue="elem.add">
							<uni-forms-item required name="name" label="盲盒名字">
								<uni-easyinput type="text" v-model="elem.add.name" placeholder="请输入盲盒名字" />
							</uni-forms-item>
							<uni-forms-item required name="des" label="盲盒描述">
								<uni-easyinput type="text" v-model="elem.add.des" placeholder="请输入盲盒描述" />
							</uni-forms-item>
							<uni-forms-item required name="uri" label="盲盒 URI">
								<uni-easyinput type="text" v-model="elem.add.uri" placeholder="请输入盲盒 URI" />
							</uni-forms-item>
							<uni-forms-item required name="cnt" label="盲盒数量">
								<uni-easyinput type="number" v-model="elem.add.cnt" placeholder="请输入盲盒数量" />
							</uni-forms-item>
						</uni-forms>
						<button type="default" @click="clickAddComfirm">确认提交</button>
					</view>
				</uni-popup>
				<uni-popup class="pop" ref="popupmod" type="bottom">
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
	</view>
	
</template>

<script>
	
	import navigation from "../../components/navigation/navigation.vue";
	import vtabs from "../../components/v-tabs/v-tabs.vue";
	
	var tokens = require('../../script/tokens.js');
	let nft = tokens.getNFT();
	let eth = tokens.getETH();
	let router = tokens.getRouter();
	
	export default {
		
		components:{
			navigation,
			vtabs
		},
		
		data() {
			return {
				baseloading:false,
				
				base:{
					name:"盲盒1",
					des:"这是盲盒1",
					uri:"https://www.ibox.fan/file/oss/nft/image/nft-goods/503c96a67b154a2caa3f16165e59febb.png?style=st6",
				},
				
				elem:{
					hasBase:false,
					id:0,
					opIndex:0,
					isMint:true,
					isRes:true,
					
					data:[
						
					],
					modify:{
						name:"牛气冲天-new",
						des:"该作品象征着不轻言放弃、死磕到底的斗牛精神，初生牛犊不怕虎，熬夜盯盘不惧苦。蓝色是你的幸运色，因为你心在高空，志在远方，批一身金钢盔甲，不要怂，一把梭，拿起键盘就是干，赢，会所嫩模，输？你的字典没有输",
						uri:"https://www.ibox.fan/file/oss/nft/image/nft-goods/9530030d975d4831a2e83358915d275b.jpg?style=st6",
						cnt:3
					},
					add:{
						name:"牛气冲天-new",
						des:"该作品象征着不轻言放弃、死磕到底的斗牛精神，初生牛犊不怕虎，熬夜盯盘不惧苦。蓝色是你的幸运色，因为你心在高空，志在远方，批一身金钢盔甲，不要怂，一把梭，拿起键盘就是干，赢，会所嫩模，输？你的字典没有输",
						uri:"https://www.ibox.fan/file/oss/nft/image/nft-goods/9530030d975d4831a2e83358915d275b.jpg?style=st6",
						cnt:3
					},
					
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
				
				this.baseloading = true;
				eth.getAccounts((error, result)=>{
					if(!error && result.length > 0){
						router.methods.makeBlinkBoxCfg(this.base.name, this.base.des, this.base.uri).send({from: result[0]}).on('transactionHash', (hash)=>{
					}).on('receipt', (receipt)=>{
						this.baseloading = false;
					}).on('error', (error)=>{
						this.baseloading = false;
					});
					}
				});
			},
			
			idInput:function(id){
				
				if(id && Number(id)){
					router.methods.getIsMint(Number(id)).call((error, result)=>{
						if(!error){
							
							this.elem.isMint = result;
							console.log("this.elem.isMint:", this.elem.isMint);
						}
					});
					
					router.methods.getIsRes(Number(id)).call((error, result)=>{
						if(!error){
							this.elem.isRes = result;
							console.log("this.elem.isRes:", this.elem.isRes);
						}
					});
					
					this.elem.data = this.elem.data.slice(0, 0);
					router.methods.getBlinkBoxCfg(Number(id)).call((error, result)=>{
						if(error || !result){
							this.elem.hasBase = false;
							
						}else{
							this.elem.hasBase = true;
							router.methods.getBlinkBoxEleLen(Number(id)).call((error, cnt)=>{
								if(!error){
									for (let i = 0; i < Number(cnt); i++) {
										
										this.elem.data.push({name:"", uri:"", des:"", cnt:0});
										router.methods.getBlinkBoxEleCfg(Number(id), Number(i)).call((error, result)=>{
											if(!error){
												let obj = {};
												this.elem.data[i].name = result._name;
												this.elem.data[i].uri = result._uri;
												this.elem.data[i].des = result._des;
												this.elem.data[i].cnt = result._cnt;
											}
										});
									}
								}
							});
							
					
						}
					});
				}
			},
			
			changeTab:function(){
				
			},
			
			clickAdd:function(){
				console.log("clickAdd");
				this.opIndex = this.elem.data.length;
				this.$refs.popupadd.open("bottom");
			},
			
			clickModify:function(index){
				
				this.opIndex = index;
				let elem = this.elem.data[index];
				this.elem.modify.name = elem.name;
				this.elem.modify.des = elem.des;
				this.elem.modify.uri = elem.uri;
				this.elem.modify.cnt = elem.cnt;
				this.$refs.popupmod.open("bottom");
				
			},
			
			clickDel:function(index){
				console.log("clickDel:", index);
				uni.showModal({
					content:"是否确定删除？",
					 success: (res) =>{
						if (res.confirm) {
							eth.getAccounts((error, result)=>{
								if(!error && result.length){
									router.methods.delBlinkBoxEleCfg(Number(this.elem.id), 
									index).send({from:result[0]}, (error, result)=>{
										if(!error){
											this.elem.data.splice(index, 1);
										}
									});
								}
							});
						}
					}
				});
				
			},
			
			clickAddComfirm:function(){
				
				let add = this.elem.add;
				if(!add.name || !add.des || !add.uri || !add.cnt){
					uni.showToast({
						title:"输入有误",
						icon:"error"
					});
					return;
				}
				
				this.$refs.popupadd.close();
				
				eth.getAccounts((error, result)=>{
					if(!error && result.length > 0){
						
						let elem = {};
						elem.name = add.name;
						elem.des = add.des;
						elem.uri = add.uri;
						elem.cnt = add.cnt;
						
						router.methods.addBlinkBoxEleCfg(Number(this.elem.id), add.name, 
						add.des, add.uri, add.cnt).send({from: result[0]}, (error, result)=>{
							if(!error){
								this.elem.data.push(elem);
								console.log("this.elem.data:", this.elem.data);
							}
						});
					}
				});
				
			},
			
			clickModifyComfirm:function(){
				console.log("clickModifyComfirm:", this.elem.modify);
				let modify = this.elem.modify;
				let name = modify.name;
				let des = modify.des;
				let uri = modify.uri;
				let cnt = modify.cnt;
				
				if(!name || !des || !uri || !cnt){
					uni.showToast({
						title:"输入有误",
						icon:"error"
					});
					return;
				}
				
				this.$refs.popupmod.close();
				
				eth.getAccounts((error, result)=>{
					if(!error && result.length > 0){
					
						router.methods.modifyBlinkBoxEleCfg(Number(this.elem.id), this.elem.opIndex, name, des, uri, cnt).send({from: result[0]}, (error, result)=>{
							if(!error){
								this.elem.data[this.elem.opIndex].name = name;
								this.elem.data[this.elem.opIndex].des = des;
								this.elem.data[this.elem.opIndex].uri = uri;
								this.elem.data[this.elem.opIndex].cnt = cnt;
								console.log("this.elem.data:", this.elem.data);
							}
						});
					}
				});
				
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
				eth.getAccounts((error, account)=>{
					if(!error && account.length > 0){
						router.methods.setBlinkBoxResult(Number(this.elem.id), result).send({from: account[0]}, (error, result)=>{
							console.log("setBlinkBoxResult:", error, result);
							if(!error){
								this.elem.isRes = true;
							}
						});
					}
				});
				
			},
			
			clickBBMint:function(){
				console.log("锻造");
				eth.getAccounts((error, account)=>{
					if(!error && account.length > 0){
						router.methods.mintBlinkBox(this.elem.id).send({from: account[0]}, (error, result)=>{
							console.log("mintBlinkBox:", error, result);
						});
					}
				});
				
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
		
		.bbResult, .bbMint {
			margin-top: 50rpx;
		}

		
		.clickAdd {
			
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
