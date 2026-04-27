<script setup>
import { ref,watch } from 'vue';

import Progress from "@/components/Progress.vue"
import NewClass from "@/components/NewClass.vue"
import Calendar from "@/components/Calendar.vue"
import {onHide,onShow} from "@dcloudio/uni-app"
import { useUserContext } from '../../context/userContext';

const {continuous_day, progress, token} = useUserContext()

const continuous = ref(continuous_day)
const ProGress = ref(progress)
const show = ref(false)
const study = ref(0)
const completeTask = ref(0)
const rate = ref(0)

onHide(()=>{
	show.value = false
})
	
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth()+1
const day = date.getDate()

const mm = month<10?"0"+month:month
const dd = day<10?"0"+day:day

// 网络请求
onShow(() => {

  uni.showLoading({
    title: '加载中...',
    mask: true
  })

  uni.request({
    url: "http://106.53.182.241:8000/api/calendar/daily",
    method: 'GET',
    header: {
      "Content-Type": "application/json",
	  "Authorization": "Bearer " + token.value,
    },
	data:{
		date: `${year}-${mm}-${dd}`
	},
    success: (res) => {
      if (res.statusCode !== 200) {
        uni.showToast({
          title: `接口异常 ${res.statusCode}`,
          icon: "none", 
          duration: 2000
        })
        return
      }
	  // study.value = res.data.data.study_duration/60
	  // completeTask.value = res.data.data.completed_tasks
	  // rate.value = res.data.data.completion_rate*100
    },
    fail: (err) => {
      uni.showToast({
        title: err.errMsg || "网络请求失败",
        icon: "none", 
        duration: 2000
      })
    },
    complete: () => {
      uni.hideLoading()
    }
  })
})

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
	<view class="page-container">
		<view class="main">
			<view class="header">
				<view class="title glass-card">🔥 连续打卡{{continuous}}天</view>
				<view class="add glass-card" @click="handleClick">+</view>
			</view>
			<view class="calendar-wrapper glass-card"><Calendar ></Calendar></view>
			<view class="time glass-card">
				<view class="date">📅 {{year}}年{{month}}月{{day}}日</view>
				<view class="info">⏱️ 学习时长：{{study}}h</view>
				<view class="info">📊 完成率：{{rate}}%</view>
				<view class="info">💪 学习状态：✨ 继续加油</view>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$secondary-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
$gold-gradient: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
$glass-bg: rgba(255, 255, 255, 0.25);
$glass-border: rgba(255, 255, 255, 0.3);
$glass-bg-light: rgba(255, 255, 255, 0.18);

/* ========================================
   微信小程序背景修复（仅修改此处）
   ======================================== */
/* 第1重：纯色兜底，小程序必显示 */
page {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #667eea;
  margin: 0;
  padding: 0;
}
/* 第2重：渐变主背景，使用小程序兼容语法 to bottom */
.page-container {
  width: 100%;
  min-height: 100vh;
  padding: 40rpx 30rpx;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #667eea 0%, #764ba2 100%);
}

.form{
	margin: 0;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 999;
	background-color: rgba(0, 0, 0, 0.5);
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
}

.main{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	box-sizing: border-box;
	gap: 30rpx;
}

/* 微信小程序兼容的毛玻璃卡片 */
.glass-card {
  background: $glass-bg;
  border: 1px solid $glass-border;
  border-radius: 36rpx;
  box-shadow: 0 12rpx 40rpx rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(20rpx);
  -webkit-backdrop-filter: blur(20rpx);
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.header{
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	gap: 20rpx;
	
	.title{
		flex: 1;
		font-size: 32rpx;
		font-weight: bold;
		color: white;
		padding: 20rpx 40rpx;
		text-align: center;
		text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	}
	
	.add{
		width: 100rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 60rpx;
		line-height: 1;
		color: white;
		font-weight: 300;
		background: $gold-gradient;
		box-shadow: 0 8rpx 24rpx rgba(246, 211, 101, 0.35);
		
		&:active{
			transform: scale(0.95);
			background: rgba(255, 255, 255, 0.35);
		}
	}
}

.calendar-wrapper{
	width: 100%;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	padding: 30rpx 20rpx;
	background: $glass-bg-light;
}

.time{
	padding: 40rpx;
	gap: 24rpx;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	
	.date{
		background: $secondary-gradient;
		width: fit-content;
		padding: 12rpx 32rpx;
		text-align: center;
		border-radius: 100rpx;
		font-size: 28rpx;
		color: white;
		font-weight: 600;
		box-shadow: 0 4rpx 12rpx rgba(79, 172, 254, 0.3);
	}
	
	.info{
		font-size: 30rpx;
		color: white;
		font-weight: 500;
		text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	}
}
</style>