<template>
	<view class="container">
		<product-list></product-list>
	</view>
</template>

<script>
	import productList from "../../components/product-list/product-list.vue";
	export default {
		components:{
			productList
		},
		
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {

		}
	}
</script>

<style>
	.container {
		font-size: 14px;
		line-height: 24px;
	}
</style>
