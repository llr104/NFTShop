<template>
	<view>
		<navigation address></navigation>
		<view class="mhdz">
			<uni-forms :modelValue="data">
				<uni-forms-item required name="name" label="盲盒名字">
					<uni-easyinput type="text" v-model="data.name" placeholder="请输入盲盒名字" />
				</uni-forms-item>
				<uni-forms-item required name="des" label="盲盒描述">
					<uni-easyinput type="text" v-model="data.des" placeholder="请输入盲盒描述" />
				</uni-forms-item>
				<uni-forms-item required name="uri" label="盲盒 URI">
					<uni-easyinput type="text" v-model="data.uri" placeholder="请输入盲盒 URI" />
				</uni-forms-item>
				<uni-forms-item required name="level" label="盲盒级数">
					<uni-easyinput type="number" v-model="data.level" placeholder="请输入盲盒级数" @input="levelInput"/>
				</uni-forms-item>
				
				<view class="" v-if="Number(data.level)>0">
					<uni-forms-item :label="getName(i)" v-for="i in Number(data.level)" :key="i">
						<view class="">
							<uni-easyinput type="text" v-model="data.levels[i-1].name" placeholder="请输入该等级名字" />
							<uni-easyinput type="text" v-model="data.levels[i-1].des" placeholder="请输入该等级描述" />
							<uni-easyinput type="text" v-model="data.levels[i-1].uri" placeholder="请输入该等级uri" />
							<uni-easyinput type="number" v-model="data.levels[i-1].count" placeholder="请输入该等级数量" />
						</view>
					</uni-forms-item>
				</view>
				
				
			</uni-forms>
			
			<button class="mhdzbtn" @click="cllickMHDZ">盲盒锻造</button>
		</view>
	</view>
	
</template>

<script>
	import navigation from "../../components/navigation/navigation.vue";
	var tokens = require('../../script/tokens.js');
	let nft = tokens.getNFT();
	let eth = tokens.getETH();
	
	export default {
		data() {
			return {
				data:{
					name:"",
					des:"",
					uri:"",
					level:0,
					levels:[
						
					],
				}
			}
		},
		
		
		methods: {
			
			levelInput:function(level){
				console.log("level:", level);
				let n = Number(level);
				this.data.levels = [];
				for (var i = 0; i < n; i++) {
					let obj = {
						name:"",
						des:"",
						uri:"",
						count:0
					}
					this.data.levels.push(obj);
				}
			},
			
			getLevel:function(index){
				return "level"+index;
			},
			
			getName:function(index){
				return "等级"+index;
			},
			
			cllickMHDZ:function(){
				console.log("data:", this.data);
				let ok = true;
				if(this.data.name && this.data.des && this.data.uri && Number(this.data.level)){
					for (var i = 0; i < this.data.levels.length; i++) {
						let item = this.data.levels[i];
						if(!item.name || !item.des || !item.uri || !Number(item.count)){
							ok = false;
							break
						}
					}
				}else{
					console.log("1111:", ok);
					ok = false;
				}
				
				if(!ok){
					uni.showToast({
						title:"输入的数据有误",
						icon:"error"
					});
				}
			},
		}
	}
</script>

<style>
	.mhdz {
		margin-top: 2rpx;
		padding: 50rpx;
		background-color: #FFFFFF;
	}
</style>
