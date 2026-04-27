<script setup>
import SkillCar from "../../components/SkillCar.vue"

const backJump = ()=>{
	uni.navigateBack()
}
</script>

<template>
	<view class="page-container">
		<view class="main">
			<view class="car glass-card">
				<view class="title">😌 情绪反馈</view>
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
	</view>
</template>

<style scoped lang="scss">
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$secondary-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
$gold-gradient: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
$glass-bg: rgba(255, 255, 255, 0.25);
$glass-border: rgba(255, 255, 255, 0.3);

/* ========================================
   微信小程序背景修复（仅修改此处）
   ======================================== */
/* 第1重：纯色兜底，确保小程序必显示 */
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
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #667eea 0%, #764ba2 100%);
}

.main {
  width: 100%;
  box-sizing: border-box;
}

/* 毛玻璃卡片 */
.glass-card {
  background: $glass-bg;
  border: 1px solid $glass-border;
  border-radius: 40rpx;
  box-shadow: 0 12rpx 40rpx rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(20rpx);
  -webkit-backdrop-filter: blur(20rpx);
  overflow: hidden;
}

.car {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  .title {
    padding: 40rpx 0 20rpx 0;
    font-size: 36rpx;
    font-weight: bold;
    color: white;
    text-shadow: 0 2rpx 8rpx rgba(0,0,0,0.1);
  }

  .display {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24rpx;
    box-sizing: border-box;
    padding: 40rpx 30rpx;
    background: rgba(255, 255, 255, 0.15);
    width: 100%;
    box-sizing: border-box;

    .circ {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      gap: 20rpx;

      .content {
        flex: 1;
        background: $secondary-gradient;
        box-sizing: border-box;
        border-radius: 100rpx;
        padding: 30rpx 20rpx;
        text-align: center;
        font-size: 26rpx;
        font-weight: bold;
        color: white;
        box-shadow: 0 8rpx 20rpx rgba(79, 172, 254, 0.25);
      }
    }

    .point {
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.25);
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24rpx 20rpx;
      border-radius: 30rpx;
      font-size: 28rpx;
      color: white;
      font-weight: 500;
      transition: all 0.3s ease;
      border: 1px solid rgba(255,255,255,0.2);

      &:active {
        transform: scale(0.96);
        background: rgba(255, 255, 255, 0.35);
      }
    }
  }
}
</style>