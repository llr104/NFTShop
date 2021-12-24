<template>
	<view>
		<uni-list >
			
			<transaction-item v-for="(item,index) in txShowEvents" :key="index"
			:border="true" 
			:from="item.returnValues._from"
			:to="item.returnValues._to"
			:price="Number(item.returnValues._price)"
			:op="Number(item.returnValues._op)"
			:txHash="item.transactionHash"
			:blockNumber ="item.blockNumber"
			:unitSymbol = "unitSymbol" 
			@clickLink="clickLink">
			</transaction-item>
			
		</uni-list>
	</view>
</template>

<script>
	import transactionItem  from "./transaction-item";

	export default {
		name:"transaction-list",
		emits:["clickLink"],
		
		props: {
		  txEvents: {
		    type: Array,
		    default() {
		      return [];
		    }
		  },
		  
		  unitSymbol: {
		    type: String,
		    default() {
		      return "";
		    }
		  },
		},
		
		components:{
			transactionItem
		},
		
		data() {
			return {
				txShowEvents:[],
			};
		},
		
		created() {
			console.log("transaction-list created");
			this.maps = new Map();
			this.txShowEvents = this.after(this.txEvents); 
		},
		
	
		methods:{
			clickLink:function(txHash) {
				console.log("clickLink:", txHash);
				this.$emit("clickLink", txHash)
			},
			
			reload(txEvents, cnt){
				console.log("reload");
				let ret = this.after(txEvents);
				if(cnt>0){
					this.txShowEvents = ret.splice(-cnt, -1);
				}else{
					this.txShowEvents = ret;
				}
			},
			
			after(txEvents){
				for (var i = 0; i < txEvents.length; i++) {
					this.maps.set(txEvents[i].transactionHash, txEvents[i]); 
				}
		
				return this.sort([...this.maps.values()]);
			},
			
			
			sort(txEvents){
				txEvents.sort((a, b)=>{
					return b.blockNumber - a.blockNumber;
				});
				return txEvents;
			}
		}
	}
</script>

<style lang="scss">
</style>
