<template>
  <view class="page-container">
    <!-- 微信小程序专属渐变背景 -->
    <view class="bg-layer"></view>

    <!-- 顶部导航 -->
    <view class="navbar">
      <view class="back-btn" @click="goBack">
        <text class="back-text">← 返回</text>
      </view>
      <view class="title-box">
        <text class="title">📝 合约选择</text>
      </view>
    </view>

    <!-- 周期选择按钮组 -->
    <view class="segment-control glass-card">
      <view
        v-for="day in days"
        :key="day.value"
        class="seg-item"
        :class="{ active: selectedDays === day.value }"
        @click="selectDay(day.value)"
      >
        <text>{{ day.label }}</text>
      </view>
    </view>

    <!-- 信息展示卡片 -->
    <view class="info-card glass-card">
      <view class="info-row">
        <text class="label">合约总学习时长：</text>
        <text class="value">{{ contractInfo.total }} 小时</text>
      </view>
      <view class="info-row">
        <text class="label">每日学习时长范围：</text>
        <text class="value">{{ contractInfo.range }}</text>
      </view>
    </view>

    <!-- 系统推荐 -->
    <view class="recommend-box glass-card">
      <text class="rec-label">根据考试日期系统推荐：</text>
      <text class="rec-value">{{ recommendDays }}天</text>
    </view>

    <!-- 计划选择区域 -->
    <view class="plan-section glass-card">
      <!-- 普通计划 -->
      <view class="plan-item main-plan">
        <text>普通计划</text>
      </view>

      <!-- 会员专享列表 -->
      <text class="section-title">✨ 会员专享</text>
      <view class="vip-list">
        <view
          v-for="(plan, index) in vipPlans"
          :key="index"
          class="vip-item"
        >
          <text>{{ plan.name }}</text>
          <view class="arrow-icon">→</view>
        </view>
      </view>
    </view>

    <!-- 底部输入与按钮 -->
    <view class="footer-action">
      <view class="input-group glass-card">
        <text class="input-label">请输入首日学习时长：</text>
        <input
          type="number"
          v-model="firstDayHours"
          placeholder="例如：2.5"
          class="custom-input"
        />
      </view>

      <view class="submit-btn" @click="createContract">
        <text class="btn-text">创建合约</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';

// --- 数据定义 --- ✅ 逻辑完全不变
const days = [
  { label: '7天', value: 7 },
  { label: '14天', value: 14 },
  { label: '30天', value: 30 },
];

const selectedDays = ref(14); 
const firstDayHours = ref('');

const vipPlans = [
  { name: '基础夯实计划' },
  { name: '模考强化计划' },
  { name: '考前冲刺计划' },
];

// --- 逻辑处理 --- ✅ 逻辑完全不变
const goBack = () => {
  uni.navigateBack();
};

const selectDay = (val) => {
  selectedDays.value = val;
};

// 动态计算合约信息
const contractInfo = computed(() => {
  if (selectedDays.value === 7) {
    return { total: 15, range: '1.5 - 3 小时' };
  } else if (selectedDays.value === 14) {
    return { total: 35, range: '2.0 - 4 小时' };
  } else {
    return { total: 80, range: '2.5 - 5 小时' };
  }
});

// 模拟系统推荐天数
const recommendDays = computed(() => {
  return selectedDays.value + 5;
});

// 保留创建合约点击位（不影响原有逻辑）
const createContract = () => {}
</script>

<style scoped lang="scss">
// 统一项目全局配色
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$glass-bg: rgba(255, 255, 255, 0.25);
$glass-border: rgba(255, 255, 255, 0.3);
$text-white: #ffffff;

/* 微信小程序 page 适配 */
page {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #667eea;
}

/* 固定渐变背景层（小程序兼容核心） */
.bg-layer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  z-index: -1;
}

/* 页面容器 */
.page-container {
  min-height: 100vh;
  padding: 30rpx 30rpx;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

/* 毛玻璃卡片通用样式 */
.glass-card {
  background: $glass-bg;
  border: 1rpx solid $glass-border;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

/* --- 顶部导航 --- */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40rpx;
  padding: 20rpx 0;
}
.back-btn {
  background: rgba(255,255,255,0.2);
  padding: 15rpx 25rpx;
  border-radius: 20rpx;
  border: 1rpx solid $glass-border;
}
.back-text {
  font-size: 26rpx;
  color: $text-white;
  font-weight: 500;
}
.title-box {
  background: rgba(255,255,255,0.2);
  padding: 15rpx 40rpx;
  border-radius: 30rpx;
  border: 1rpx solid $glass-border;
}
.title {
  font-size: 30rpx;
  font-weight: bold;
  color: $text-white;
}

/* --- 周期选择 --- */
.segment-control {
  display: flex;
  justify-content: center;
  padding: 30rpx;
  margin-bottom: 30rpx;
  gap: 20rpx;
}
.seg-item {
  width: 160rpx;
  height: 100rpx;
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.15);
  transition: all 0.3s;
  
  &.active {
    // background: #ffffff;
	background-color: darken(#ffffff,30);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  text {
    font-size: 32rpx;
    font-weight: bold;
    color: $text-white;
    
    .seg-item.active & {
      color: #667eea;
    }
  }
}

/* --- 信息卡片 --- */
.info-card {
  padding: 30rpx;
  margin-bottom: 20rpx;
}
.info-row {
  margin-bottom: 20rpx;
  font-size: 28rpx;
  color: $text-white;
  display: flex;
  align-items: center;
}
.info-row:last-child {
  margin-bottom: 0;
}
.label {
  font-weight: 600;
}
.value {
  margin-left: 10rpx;
}

/* --- 系统推荐 --- */
.recommend-box {
  padding: 25rpx 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
  font-size: 28rpx;
  color: $text-white;
}
.rec-value {
  font-weight: bold;
  background: rgba(255,255,255,0.2);
  padding: 8rpx 20rpx;
  border-radius: 20rpx;
}

/* --- 计划选择 --- */
.plan-section {
  padding: 30rpx;
  margin-bottom: 40rpx;
}
.main-plan {
  background: rgba(255,255,255,0.2);
  height: 80rpx;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  font-weight: bold;
  color: $text-white;
  margin-bottom: 30rpx;
}
.section-title {
  font-size: 26rpx;
  color: $text-white;
  margin-bottom: 20rpx;
  display: block;
  font-weight: 600;
}
.vip-item {
  background: rgba(255,255,255,0.15);
  height: 70rpx;
  border-radius: 35rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  margin-bottom: 20rpx;
  font-size: 28rpx;
  color: $text-white;
  transition: all 0.3s;
  
  &:active {
    transform: scale(0.98);
    background: rgba(255,255,255,0.25);
  }
}
.vip-item:last-child {
  margin-bottom: 0;
}
.arrow-icon {
  font-size: 24rpx;
  font-weight: bold;
  color: $text-white;
}

/* --- 底部操作 --- */
.footer-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30rpx;
}
.input-group {
  padding: 25rpx 30rpx;
  width: 100%;
  box-sizing: border-box;
}
.input-label {
  display: block;
  margin-bottom: 15rpx;
  font-weight: 600;
  color: $text-white;
  font-size: 28rpx;
}
.custom-input {
  background: rgba(255,255,255,0.9);
  height: 60rpx;
  border-radius: 15rpx;
  padding: 0 20rpx;
  font-size: 26rpx;
  color: #333;
  border: none;
  width: 100%;
  box-sizing: border-box;
}

.submit-btn {
  background: $primary-gradient;
  padding: 25rpx 80rpx;
  border-radius: 30rpx;
  box-shadow: 0 10rpx 25rpx rgba(102, 126, 234, 0.3);
  transition: all 0.3s;
  
  &:active {
    transform: scale(0.98);
  }
}
.btn-text {
  font-size: 32rpx;
  font-weight: bold;
  color: $text-white;
}
</style>