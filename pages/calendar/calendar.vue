<script setup>
import { ref } from 'vue';

import Progress from "@/components/Progress.vue"
import NewClass from "@/components/NewClass.vue"
import {onHide} from "@dcloudio/uni-app"
const progress = ref(50)
const show = ref(false)

onHide(()=>{
	show.value = false
})
	
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth()+1
const day = date.getDate()


const handleClick = ()=>{
	show.value = !show.value
}

const handleClose = ()=>{
	show.value = false
}

</script>

<template>
	<view class="form" v-if="show">
		<NewClass @close="handleClose"></NewClass>
	</view>
	<view class="main">
		<view class="header">
			<view class="title">连续打卡N天</view>
			<view class="add" @click="handleClick">+</view>
		</view>
		<view class="calendar">
			<text>日历</text>
		</view>
		<view class="time">
			<view class="date">
				{{year}}年{{month}}月{{day}}日
			</view>
			<view class="info">学习时长：</view>
			<view class="info">完成任务：</view>
			<view class="info">完成率：</view>
			<view class="info">学习状态：</view>
		</view>
		<view class="agree">
			<text>合约进度：</text>
			<view style="margin: 1rem 0;"><Progress :width="progress+'%'"></Progress></view>
		</view>
	</view>
</template>

<style scoped lang="scss">
$background-light: #f5f5f5;
$background-dark: #e0e0e0;
.page{
	margin: 0;
	padding: 0;
}
.form{
	margin: 0;
	position: fixed;
	width: 100vw;
	height: 100vh;
	z-index: 5;
	background-color: whitesmoke;
	box-sizing: border-box;
}
.main{
	margin-top: 1rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	box-sizing: border-box;
}
.header{
	margin:0.5rem;
	margin-top: 1rem;
	padding: 0.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	.title{
		font-size: 1.1rem;
		background-color: $background-light;
		padding: 0.3rem 1.5rem;
		border-radius: 0.5rem;
		box-sizing: border-box;
	}
	.add{
		width: 2rem;
		height: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.7rem;
		border-radius: 100%;
		background-color: $background-light;
		padding: 1rem;
		box-sizing: border-box;
		&:hover{
			background-color: gray;
			transition:all;
			transition-duration: 500ms;
		}
	}
}
.calendar{
	margin: 1rem;
	margin-top:0;
	padding: 0.5rem;
	position: relative;
	background-color: $background-light;
	min-height: 18rem;
	border-radius: 0.5rem;
	font-size: 1.2rem;
	box-sizing: border-box;
}
.time{
	margin: 1rem;
	padding: 0.5rem 1rem;
	gap: 0.5rem;
	background-color: $background-dark;
	border-radius: 0.5rem;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	.date{
		background-color: $background-light;
		width: 45%;
		padding: 0.2rem 0.5rem;
		text-align: center;
		border-radius: 0.3rem;
		font-size: 1rem;
		box-sizing: border-box;
	}
	.info{
		font-size: 1rem;
		box-sizing: border-box;
	}
}
.agree{
	background-color: $background-light;
	margin: 1rem;
	padding: 0.5rem;
	font-size: 1rem;
	border-radius: 0.5rem;
	min-height: 3rem;
	box-sizing: border-box;
}
</style>
