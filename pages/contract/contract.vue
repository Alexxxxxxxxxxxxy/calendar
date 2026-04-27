<script setup>
	
</script>

<template>
	<view class="page-container">
		<view class="main">
			<view class="current">
				<view class="tag">🔥 当前合约</view>
				<view class="tab glass-card current-tab">
					<view class="type">合约类型：免费版</view>
					<view class="time">📅 合约时长:</view>
					<view class="deposit">💰 押金：X元/X币</view>
				</view>
			</view>
			<view class="other">
				<view class="tag other-tag">📋 其他合约</view>
				<view class="tab glass-card">
					<view class="type">基础夯实计划</view>
					<view class="time">📅 介绍:适配一轮复习/基础薄弱/跨考人群</view>
					<view class="deposit">⭐ 核心目标：全覆盖知识点、搭建知识框架、基础提醒正确率&geq;60%</view>
				</view>
				<view class="tab glass-card">
					<view class="type">模块强化计划</view>
					<view class="time">📅 介绍:</view>
					<view class="deposit">⭐ 核心目标：定位薄弱点、错题率下降至10%、模考平均成绩&geq;70分</view>
				</view>
				<view class="tab glass-card">
					<view class="type">考前冲刺计划</view>
					<view class="time">📅 介绍:</view>
					<view class="deposit">⭐ 核心目标：聚集高频考点、易错题复盘、保持题感，高频考点掌握率&geq;70%</view>
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
$glass-bg-light: rgba(255, 255, 255, 0.18);

/* 微信小程序兼容背景 - 三重保障 */
page {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #667eea; /* 纯色兜底，小程序必显示 */
  margin: 0;
  padding: 0;
}
.page-container {
  width: 100%;
  min-height: 100vh;
  padding: 40rpx 30rpx;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #667eea 0%, #764ba2 100%); /* 兼容小程序渐变 */
}

.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50rpx;
  box-sizing: border-box;
}

/* 微信小程序兼容的毛玻璃卡片 */
.glass-card {
  background: $glass-bg-light;
  border: 1px solid $glass-border;
  border-radius: 36rpx;
  box-shadow: 0 12rpx 40rpx rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(20rpx);
  -webkit-backdrop-filter: blur(20rpx);
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.98);
  }
}

.current-tab {
  background: $glass-bg;
  border-color: rgba(255, 255, 255, 0.4);
}

/* 通用标签样式 */
.tag {
  display: inline-flex;
  align-items: center;
  background: $primary-gradient;
  color: white;
  text-align: center;
  border-radius: 100rpx;
  padding: 16rpx 40rpx;
  box-sizing: border-box;
  font-size: 30rpx;
  font-weight: bold;
  box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.3);
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  margin-bottom: 24rpx;
}

.other-tag {
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid $glass-border;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
}

/* 通用卡片内容样式 */
.current, .other {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  box-sizing: border-box;
}

.tab {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  box-sizing: border-box;
  padding: 40rpx 50rpx;
  justify-content: center;
  align-items: flex-start;
}

.type {
  background: $secondary-gradient;
  padding: 10rpx 28rpx;
  border-radius: 100rpx;
  font-size: 26rpx;
  color: white;
  font-weight: 600;
  box-shadow: 0 4rpx 12rpx rgba(79, 172, 254, 0.3);
}

.time {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.deposit {
  background: $gold-gradient;
  padding: 10rpx 28rpx;
  border-radius: 100rpx;
  font-size: 26rpx;
  color: white;
  font-weight: 600;
  box-shadow: 0 4rpx 12rpx rgba(246, 211, 101, 0.35);
}
</style>