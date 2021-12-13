<template>
	<view class="uni-load-more">
		<view class="uni-load-more__img">
			<view class="load1 load">
				<view :style="{ background: color }" class="uni-load-view_wrapper" />
				<view :style="{ background: color }" class="uni-load-view_wrapper" />
				<view :style="{ background: color }" class="uni-load-view_wrapper" />
				<view :style="{ background: color }" class="uni-load-view_wrapper" />
			</view>
			<view class="load2 load">
				<view :style="{ background: color }" class="uni-load-view_wrapper" />
				<view :style="{ background: color }" class="uni-load-view_wrapper" />
				<view :style="{ background: color }" class="uni-load-view_wrapper" />
				<view :style="{ background: color }" class="uni-load-view_wrapper" />
			</view>
			<view class="load3 load">
				<view :style="{ background: color }" class="uni-load-view_wrapper" />
				<view :style="{ background: color }" class="uni-load-view_wrapper" />
				<view :style="{ background: color }" class="uni-load-view_wrapper" />
				<view :style="{ background: color }" class="uni-load-view_wrapper" />
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		
		data() {
			return {
				color:"#000",
			};
		},
	}
		

</script>

<style>
	@charset "UTF-8";

	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}

	.uni-load-more__img {
		position: relative;
		height: 24px;
		width: 24px;
		margin-right: 10px;
	}

	.uni-load-more__img>.load {
		position: absolute
	}

	.uni-load-more__img>.load .uni-load-view_wrapper {
		width: 6px;
		height: 2px;
		background: #999;
		position: absolute;
		opacity: .2; 
		transform-origin: 50%;
		animation: load .96s ease infinite
	}

	.uni-load-more__img>.load .uni-load-view_wrapper:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}

	.uni-load-more__img>.load .uni-load-view_wrapper:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}

	.uni-load-more__img>.load .uni-load-view_wrapper:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}

	.uni-load-more__img>.load .uni-load-view_wrapper:nth-child(4) {
		top: 11px;
		left: 0
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}

	.load2 {
		transform: rotate(30deg)
	}

	.load3 {
		transform: rotate(60deg)
	}

	.load1 .uni-load-view_wrapper:nth-child(1) {
		animation-delay: 0s
	}

	.load2 .uni-load-view_wrapper:nth-child(1) {
		animation-delay: 80ms
	}

	.load3 .uni-load-view_wrapper:nth-child(1) {
		animation-delay: .16s
	}

	.load1 .uni-load-view_wrapper:nth-child(2) {
		animation-delay: .24s
	}

	.load2 .uni-load-view_wrapper:nth-child(2) {
		animation-delay: .32s
	}

	.load3 .uni-load-view_wrapper:nth-child(2) {
		animation-delay: .40s
	}

	.load1 .uni-load-view_wrapper:nth-child(3) {
		animation-delay: .48s
	}

	.load2 .uni-load-view_wrapper:nth-child(3) {
		animation-delay: .56s
	}

	.load3 .uni-load-view_wrapper:nth-child(3) {
		animation-delay: .64s
	}

	.load1 .uni-load-view_wrapper:nth-child(4) {
		animation-delay: .72s
	}

	.load2 .uni-load-view_wrapper:nth-child(4) {
		animation-delay: .8s
	}

	.load3 .uni-load-view_wrapper:nth-child(4) {
		animation-delay: .88s
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1
		}

		100% {
			opacity: .2
		}
	}
</style>