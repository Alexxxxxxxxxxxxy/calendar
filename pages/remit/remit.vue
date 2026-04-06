<script setup>
import SkillCar from "../../components/SkillCar.vue"

const backJump = ()=>{
	uni.navigateBack()
}
</script>

<template>
	<view class="main">
		<view class="car">
			<view class="title">突发事件豁免	</view>
			<view class="display">
				<text>是否发生了突发事件？</text>
				<text>本月还剩N次豁免机会</text>
				<view class="point">生病</view>
				<view class="point">临时紧急安排</view>
				<view class="point">确认</view>
				<view class="point" @click="backJump">返回</view>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
$background-light: #f5f5f5;
$background-dark: #e0e0e0;
page{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.main{
	box-sizing: border-box;
	margin: 5rem 1rem;
}
.car{
	box-sizing: border-box;
	background-color: $background-dark;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 0.5rem;
	gap: 0.5rem;
	.title{
		padding: 0.5rem;
	}
	.display{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		box-sizing: border-box;
		padding: 3rem 1rem;
		background-color: $background-light;
		width: 100%;
		border-radius: 0 0 0.5rem 0.5rem;
		.point{
			background-color: $background-dark;
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			padding: 0.5rem;
			border-radius: 0.5rem;
			&:hover{
				background-color: darken($color: $background-dark, $amount: 10%);
			}
		}
	}
}
</style>
