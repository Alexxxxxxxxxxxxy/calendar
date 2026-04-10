<script setup>

</script>
<template>
	<view class="main">
		<view class="achivement">
			<view class="title">我的成就</view>
			<view class="wall">
				<view class="left">
					<view class="col">&emsp;</view>
					<view class="bot">成就1</view>
				</view>
				<view class="mid">
					<view class="col">&emsp;</view>
					<view class="bot">成就2</view>
				</view>
				<view class="right">
					<view class="col">&emsp;</view>
					<view class="bot">成就3</view>
				</view>
			</view>
		</view>
		<view class="honor">
			<view class="title">荣誉墙</view>
			<view class="place">
				<view v-for="(i,index) in 6" :key="index" class="item"><text>荣誉</text></view>
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
}
.main{
	margin: 1rem;
	display: flex;
	flex-direction: column;
	gap: 3rem;
	align-items: flex-start;
	justify-content: center;
}
@mixin achivement-style{
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: center;
	align-items: flex-start;
	box-sizing: border-box;
	.title{
		background-color:$background-light;
		padding: 0.3rem 0.6rem;
		border-radius: 0.5rem;
		margin-bottom: 3rem;
		box-sizing: border-box;
	}
};
.achivement{
	@include achivement-style;
	.wall{
		box-sizing: border-box;
		width: 100%;
		// background-color: $background-light;
		padding: 0.5rem 1.5rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-radius: 3rem;
		position: relative;
		.left,.mid,.right{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 1rem;
			.col{
				min-width: 3rem;
				min-height: 5rem;
				background-color: yellow;
				border-radius: 0.6rem;
				box-sizing: border-box;
			}
			.bot{
				box-sizing: border-box;
				background-color: $background-light;
				padding: 0.2rem 0.8rem;
				border-radius: 0.3rem;
			}
		}
		.mid{
			position: absolute;
			z-index: 5;
			left: 40.5%;
			bottom: -5%;
			.col{
				min-width: 4rem;
				min-height: 10rem;
			}
			.bot{
				font-size: 1.2rem;
			}
		}
	}
}
.honor{
	@include achivement-style;
	.place{
		width: 100%;
		padding: 2rem;
		background-color: $background-light;
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 4rem;
		box-sizing: border-box;
		justify-content: space-around;
		align-items: center;
		.item{
			box-sizing: border-box;
			background-color: $background-dark;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 4.5rem;
			height: 4.5rem;
			transform: rotate(45deg);
			text{
				transform: rotate(-45deg);
			}
		}
	}
}
</style>
