<script setup>
import SkillCar from "../../components/SkillCar.vue"

const backJump = ()=>{
	uni.navigateBack()
}
</script>

<template>
	<view class="main">
		<view class="car">
			<view class="title">情绪反馈</view>
			<view class="display">
				<view class="circ">
					<view class="content">活力</view>
					<view class="content">困惑</view>
					<view class="content">疲惫</view>
				</view>
				<view class="point">加油！</view>
				<view class="point">增加任务（减少任务）？</view>
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
		padding: 2rem 1rem;
		background-color: $background-light;
		width: 100%;
		border-radius: 0 0 0.5rem 0.5rem;
		.circ{
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			width: 100%;
			justify-content: space-between;
			align-items: center;
			.content{
				background-color: $background-dark;
				box-sizing: border-box;
				border-radius: 100%;
				padding: 1.5rem;
			}
		}
		.point{
			box-sizing: border-box;
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
