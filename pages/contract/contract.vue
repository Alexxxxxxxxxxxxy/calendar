<script setup>
	
</script>

<template>
	<view class="main">
		<view class="current">
			<view class="tag">当前合约</view>
			<view class="tab">
				<view class="type">合约类型：免费版</view>
				<view class="time">合约时长:</view>
				<view class="deposit">押金：X元/X币</view>
			</view>
		</view>
		<view class="other">
			<view class="tag">其他合约</view>
			<view class="tab">
				<view class="type">合约类型：免费版</view>
				<view class="time">合约时长:</view>
				<view class="deposit">押金：X元/X币</view>
			</view>
			<view class="tab">
				<view class="type">合约类型：免费版</view>
				<view class="time">合约时长:</view>
				<view class="deposit">押金：X元/X币</view>
			</view>
			<view class="tab">
				<view class="type">合约类型：免费版</view>
				<view class="time">合约时长:</view>
				<view class="deposit">押金：X元/X币</view>
			</view>
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
	margin: 1rem;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	box-sizing: border-box;
}
.current{
	display: flex;
	flex-direction: column;
	gap: 1rem;
	box-sizing: border-box;
	.tag{
		background-color: $background-light;
		width: 30%;
		text-align: center;
		border-radius: 0.5rem;
		padding: 0.2rem 0.8rem;
		box-sizing: border-box;
	}
	.tab{
		background-color: $background-light;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		box-sizing: border-box;
		padding: 1rem 1.5rem;
		justify-content: center;
		align-items: flex-start;
		border-radius: 0.5rem;
	}
}
.other{
	display: flex;
	flex-direction: column;
	gap: 1rem;
	box-sizing: border-box;
	@extend .current;
}
</style>
