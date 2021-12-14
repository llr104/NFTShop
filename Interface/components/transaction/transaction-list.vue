<template>
	<view>
		<uni-list >
			
			<transaction-item v-for="(item,index) in txEvents" :key="index"
			:border="true" :address="item.returnValues._from" 
			:price="Number(item.returnValues._price)"
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
				
			};
		},
		
		created() {
			
			console.log("txEvents:", this.txEvents);
		},
		
		methods:{
			clickLink:function(txHash) {
				console.log("clickLink:", txHash);
				this.$emit("clickLink", txHash)
			}
		}
	}
</script>

<style lang="scss">
</style>
