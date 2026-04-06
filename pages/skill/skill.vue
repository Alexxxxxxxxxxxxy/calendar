<script setup>
import SkillCar from "../../components/SkillCar.vue"
</script>

<template>
	<view class="main">
		<view class="car">
			<view class="title">技能卡库存</view>
			<view class="display">
				<SkillCar text="减负卡" num="12"></SkillCar>
				<SkillCar text="重排卡" num="11"></SkillCar>
				<SkillCar text="免罚卡" num="12"></SkillCar>
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
	background-color: $background-light;
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
		gap: 1rem;
		box-sizing: border-box;
		padding: 3rem 1rem;
		background-color: $background-dark;
		width: 100%;
		border-radius: 0 0 0.5rem 0.5rem;
	}
}
</style>
