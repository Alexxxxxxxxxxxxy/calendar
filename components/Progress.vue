<template>
	<view class="bar">
		<view class="progress" :style="{'width':`${props.width}`}">
			<view class="shine"></view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	width:{
		type:String,
		required:true,
	}
})
</script>

<style scoped lang="scss">
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$track-bg: rgba(255, 255, 255, 0.3);

.bar {
	margin: 0.5rem 0;
	width: 100%;
	height: 0.8rem;
	background: rgba(0, 0, 0, 0.15);
	border-radius: 1rem;
	overflow: hidden;
	position: relative;
	box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
	
	.progress {
		height: 100%;
		border-radius: 1rem;
		position: relative;
		overflow: hidden;
		transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		background: $primary-gradient;
		/* 微信小程序兼容：简化背景动画 */
		background-size: 200% 200%;
		
		.shine {
			position: absolute;
			top: 0;
			left: -100%;
			width: 50%;
			height: 100%;
			background: linear-gradient(
				90deg,
				transparent 0%,
				rgba(255, 255, 255, 0.4) 50%,
				transparent 100%
			);
			/* 微信小程序兼容：保持光泽动画 */
			animation: shine 2s infinite;
		}
	}
}

/* 简化的渐变动画，确保小程序兼容 */
@keyframes gradientMove {
	0%, 100% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
}

@keyframes shine {
	0% {
		left: -100%;
	}
	100% {
		left: 200%;
	}
}
</style>