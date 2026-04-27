<script setup>
import { computed, ref, ssrContextKey } from 'vue';

// 模拟顶部数据
const subjectInfo = ref({
  title: "高等数学—极限计算",
  duration: "总时长: 2h"
});

// 配置
const TOTAL_SECONDS = ref(1 * 60 * 60) // 1小时

// 状态
const left_time = ref(TOTAL_SECONDS.value) // 剩余秒数（核心！）
const paused = ref(true)
let timer = null

// 时间格式化（完全不变）
const timerDisplay = computed(() => {
  let left = left_time.value
  if (isNaN(left) || left < 0) left = 0

  const h = Math.floor(left / 3600)
  const m = Math.floor((left % 3600) / 60)
  const s = Math.floor(left % 60)

  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
})

// 开始 / 继续
const start = () => {
  if (timer) return // 正在运行，不重复启动
  paused.value = false
  timer = setInterval(() => {
    if (left_time.value <= 0) {
      clearInterval(timer)
      timer = null
      paused.value = true
      return
    }
    left_time.value -= 1
  }, 1000)
}

// 暂停
const pause = () => {
  if (!timer) return
  clearInterval(timer)
  timer = null
  paused.value = true
}

// 点击开关
const handleClick = () => {
  if (paused.value) {
    start()
  } else {
    pause()
  }
}


// 模拟底部按钮状态
const statusText = ref("状态");

const skillJump = ()=>{
	uni.navigateTo({
		url:"/pages/skill/skill"
	})
}


const emotionJump = ()=>{
	uni.navigateTo({
		url:"/pages/emotion/emotion"
	})
}
</script>

<template>
  <view class="page-container">
    <view class="container">
      <!-- 1. 顶部信息栏 -->
      <view class="top-info">
        <view class="info-tag glass-card">
          <text class="subject">{{ subjectInfo.title }}</text>
          <text class="time-length">{{ subjectInfo.duration }}</text>
        </view>
      </view>

      <!-- 2. 中间核心计时器 -->
      <view class="timer-section" @click="handleClick">
        <view class="timer-circle glass-card">
          <view class="timer-label">⏱️ 计时器</view>
          <view class="timer-number">{{ timerDisplay }}</view>
          <view class="timer-hint">{{ paused ? '点击开始' : '点击暂停' }}</view>
        </view>
      </view>

      <!-- 3. 底部功能区 -->
      <view class="bottom-actions">
        <!-- 左侧状态 -->
        <view class="status-group">
          <view class="status-tag glass-card">{{ statusText }}</view>
          <view class="status-tag glass-card">返回</view>
        </view>

        <!-- 右侧按钮组 -->
        <view class="button-group">
          <view class="action-btn" @click="emotionJump">情绪反馈</view>
          <view class="action-btn" @click="skillJump">技能卡</view>
          <view class="action-btn confirm-btn">确认完成</view>
        </view>
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

/* 微信小程序兼容背景 - 三重保障 */
page {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #667eea; /* 纯色兜底 */
  margin: 0;
  padding: 0;
}
.page-container {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #667eea 0%, #764ba2 100%); /* 兼容小程序渐变 */
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 40rpx 30rpx;
  box-sizing: border-box;
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
}

/* 1. 顶部信息样式 */
.top-info {
  display: flex;
  justify-content: center;
  margin-bottom: 60rpx;
}

.info-tag {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30rpx 50rpx;
  font-size: 28rpx;
}

.subject {
  font-weight: bold;
  margin-bottom: 12rpx;
  color: white;
  font-size: 32rpx;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.time-length {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.85);
}

/* 2. 中间计时器样式 */
.timer-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.timer-circle {
  width: 520rpx;
  height: 520rpx;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.98);
  }
}

.timer-label {
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20rpx;
  font-weight: 600;
}

.timer-number {
  font-size: 100rpx;
  font-weight: bold;
  color: white;
  font-family: 'DIN Alternate', 'Arial', sans-serif;
  text-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.15);
  letter-spacing: 4rpx;
}

.timer-hint {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 20rpx;
}

/* 3. 底部操作区样式 */
.bottom-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30rpx;
  padding-top: 20rpx;
  padding-bottom: 40rpx;
}

.status-group {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20rpx;
}

.status-tag {
  padding: 16rpx 32rpx;
  font-size: 28rpx;
  color: white;
  font-weight: 600;
}

.button-group {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20rpx;
}

.action-btn {
  flex: 1;
  padding: 24rpx 16rpx;
  background: $secondary-gradient;
  border-radius: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 26rpx;
  color: white;
  text-align: center;
  line-height: 1.5;
  font-weight: 600;
  box-shadow: 0 8rpx 24rpx rgba(79, 172, 254, 0.3);
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.95);
  }
}

.confirm-btn {
  background: $gold-gradient;
  box-shadow: 0 8rpx 24rpx rgba(246, 211, 101, 0.35);
}
</style>