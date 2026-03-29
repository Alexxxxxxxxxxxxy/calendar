<script setup>
import { ref } from 'vue';

// 模拟顶部数据
const subjectInfo = ref({
  title: "高等数学—极限计算",
  duration: "总时长: 2h"
});

// 模拟计时器数据
const timerDisplay = ref("00:50:47");

// 模拟底部按钮状态
const statusText = ref("状态");
</script>

<template>
  <view class="container">
    <!-- 1. 顶部信息栏 -->
    <view class="top-info">
      <view class="info-tag">
        <text class="subject">{{ subjectInfo.title }}</text>
        <text class="time-length">{{ subjectInfo.duration }}</text>
      </view>
    </view>

    <!-- 2. 中间核心计时器 -->
    <view class="timer-section">
      <view class="timer-circle">
        <view class="timer-label">计时器</view>
        <view class="timer-number">{{ timerDisplay }}</view>
      </view>
    </view>

    <!-- 3. 底部功能区 -->
    <view class="bottom-actions">
      <!-- 左侧状态 -->
      <view class="status-group">
        <view style="display: flex;align-items: center; gap: 5rpx;">
          <view class="status-tag">{{ statusText }}</view>
          <view class="status-icon">!</view>
        </view>
        <view class="status-tag">返回</view>
      </view>

      <!-- 右侧按钮组 -->
      <view class="button-group">
        <view class="action-btn">情绪反馈</view>
        <view class="action-btn">技能卡</view>
        <view class="action-btn">确认完成</view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
$bg-color: #f5f5f5;
$card-color: #e0e0e0;
$text-color: #333;
$primary-color: #007AFF;

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 40rpx; // 20px * 2
  box-sizing: border-box;
  background-color: #ffffff;
}

/* 1. 顶部信息样式 */
.top-info {
  display: flex;
  justify-content: center;
  margin-bottom: 60rpx; // 30px * 2
}

.info-tag {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16rpx 30rpx; // 8px/15px * 2
  background-color: $card-color;
  border-radius: 30rpx; // 15px * 2
  font-size: 28rpx; // 14px * 2
  color: $text-color;
}

.subject {
  font-weight: bold;
  margin-bottom: 4rpx; // 2px * 2
}

.time-length {
  font-size: 24rpx; // 12px * 2
  color: #555;
}

/* 2. 中间计时器样式 */
.timer-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.timer-circle {
  width: 480rpx; // 240px * 2
  height: 480rpx; // 240px * 2
  background-color: $card-color;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8rpx 20rpx rgba(0,0,0,0.05);
}

.timer-label {
  font-size: 32rpx; // 16px * 2
  color: #555;
  margin-bottom: 20rpx; // 10px * 2
}

.timer-number {
  font-size: 96rpx; // 48px * 2
  font-weight: bold;
  color: #333;
  font-family: 'DIN Alternate', 'Arial', sans-serif;
}

/* 3. 底部操作区样式 */
.bottom-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20rpx; // 10px * 2
  padding-top: 20rpx; // 10px * 2
}

.status-group {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10rpx; // 5px * 2
}

.status-tag {
  background-color: $card-color;
  padding: 8rpx 16rpx; // 4px/8px * 2
  border-radius: 20rpx; // 10px * 2
  font-size: 30rpx; // 15px * 2
  color: #555;
}

.status-icon {
  width: 36rpx; // 18px * 2
  height: 36rpx; // 18px * 2
  background-color: $primary-color;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20rpx; // 10px * 2
}

.button-group {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20rpx; // 10px * 2
}

.action-btn {
  width: 160rpx; // 80px * 2
  padding: 20rpx 0; // 10px * 2 (上下留白增加)
  background-color: $card-color;
  border-radius: 24rpx; // 12px * 2 (圆角增加)
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 28rpx; // 14px * 2
  color: #333;
  text-align: center;
  line-height: 1.5; // 增加行高，防止文字太挤
}
</style>