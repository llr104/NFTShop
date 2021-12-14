<template>
	<view>
		<uni-list >
			
			<transaction-item v-for="(item,index) in txShowEvents" :key="index"
			:border="true" :address="item.returnValues._from" 
			:price="Number(item.returnValues._price)"
			:op="Number(item.returnValues._op)"
			:txHash="item.transactionHash"
			:blockNumber ="item.blockNumber" @clickLink="clickLink">
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
		      return []
		    }
		  },
		},
		
		components:{
			transactionItem
		},
		
		data() {
			return {
				txShowEvents:[]
			};
		},
		
		created() {
			this.txShowEvents = this.txEvents;
		},
		
	
		methods:{
			clickLink:function(txHash) {
				console.log("clickLink:", txHash);
				this.$emit("clickLink", txHash)
			},
			
			reload(txEvents){
				this.txShowEvents = txEvents;
			},
		}
	}
</script>

<style lang="scss">
</style>
