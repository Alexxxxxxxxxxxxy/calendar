<script setup>
const props = defineProps({
	text:{
		type:String,
		required:true
	},
	num:{
		type:Number,
		required:true
	}
})
</script>

<template>
	<view class="main">
		<view class="star">
			<text class="tag">{{props.text}}</text>
		</view>
		<view class="storage">
			<view class="num">X{{props.num}}</view>
			<view class="more">添加更多</view>
		</view>
	</view>
</template>


<style scoped lang="scss">
$background-light: #f5f5f5;
page{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.main{
	width: 100%;
	background-color: white;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	border-radius: 0.5rem;
	padding: 0.5rem;
}
.star {
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	/* 星形大小 */
	width: 150rpx;
	height: 150rpx;
	/* 星形颜色 */
	background: gold;
	/* 核心：裁剪成五角星形状（固定坐标，直接用） */
	clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
	.tag{
		font-size: 0.8rem;
	}
}
.storage{
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
	justify-content: center;
	align-items: center;
	.more{
		background-color: $background-light;
		padding: 0.2rem 0.5rem;
		border-radius: 10%;
		&:hover{
			background-color: darken($background-light, 10%);
		}
	}
}
</style>