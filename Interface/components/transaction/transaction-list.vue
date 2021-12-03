<template>
	<view>
		<uni-list>
			<transaction-item :border="true" @clickLink="clickLink"></transaction-item>
			<transaction-item :border="true" @clickLink="clickLink"></transaction-item>
			<transaction-item :border="true" @clickLink="clickLink"></transaction-item>
		</uni-list>
	</view>
</template>

<script>
	import transactionItem  from "./transaction-item";
	
	export default {
		name:"transaction-list",
		emits:["clickLink"],
		components:{
			transactionItem
		},
		
		data() {
			return {
				
			};
		},
		
		methods:{
			clickLink:function(url) {
				console.log("clickLink:", url);
				this.$emit("clickLink", url)
			}
		}
	}
</script>

<style lang="scss">
</style>
