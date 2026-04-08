<script setup>
import { ref } from 'vue';
import { useUserContext } from '../../context/userContext';
const {continuous_day} = useUserContext()

const continuous = ref(continuous_day || 0)

// 模拟任务数据
const tasks = ref([
  {
    id: 1,
    title: '高等数学',
    status: '正在进行',
    points: ['知识点1', '知识点2', '知识点3']
  },
  {
    id: 2,
    title: '程序设计',
    status: '',
    points: ['知识点A', '知识点B', '知识点C']
  },
  {
    id: 3,
    title: '线性代数',
    status: '',
    points: ['知识点A', '知识点B', '知识点C']
  }
]);

const focusJump = ()=>{
	uni.navigateTo({
		url:"/pages/focus/focus"
	})
}
</script>

<template>
  <view class="container">
    <view class="status-section">
      <view class="status-tag">状态</view>
      <view class="streak-tag">坚持 第 {{continuous}} 天</view>
    </view>

    <view class="timer-card">
      <view class="timer-title">计时器</view>
      <view class="focus-btn" @click="focusJump">进入专注界面</view>
    </view>

    <view class="task-section">
      <view class="section-title">任务列表</view>

      <view class="task-item" v-for="task in tasks" :key="task.id">
        <view class="task-header">
          <view class="task-dot"></view>
          <view class="task-title">{{ task.title }}</view>
          <view class="task-status" v-if="task.status">{{ task.status }}</view>
        </view>

        <view class="points-list">
          <view class="point-item">{{ task.points[0] }}</view>
          <view class="point-item">{{ task.points[1] }}</view>
          <view class="point-item">{{ task.points[2] }}</view>
        </view>
      </view>
    </view>
	<view style="display: flex; justify-content: center;"><button size="mini" class="over">完结</button></view>
  </view>
</template>

<style scoped lang="scss">
$primary-color: #4a90e2;
$primary-bg: #f9f9f9;
$card-bg: #f0f0f0;
$border-radius-sm: 8rpx;
$border-radius-lg: 16rpx;
$padding-base: 20rpx;
$font-color-light: #666;

.container {
  padding: $padding-base;
  background-color: $primary-bg;
  min-height: 100vh;
}

/* --- 1. 顶部状态 --- */
.status-section {
  display: flex;
  align-items: center;
  margin-bottom: $padding-base;
  gap: 16rpx;

  .status-tag,
  .streak-tag {
    background-color: $card-bg;
    padding: 6rpx 16rpx;
    border-radius: $border-radius-sm;
    font-size: 28rpx;
    margin-right: 20rpx;
    color: #333;
  }
  .status-tag{
	  border-radius: 100%;
	  padding: 16rpx;
  }
}

/* --- 2. 计时器卡片 --- */
.timer-card {
  background-color: $card-bg;
  border-radius: $border-radius-lg;
  padding: $padding-base;
  margin-bottom: $padding-base;
  position: relative;
  min-height: 8rem;

  .timer-title {
    font-size: 36rpx;
    font-weight: bold;
    text-align: center;
    margin-bottom: 40rpx;
    color: #333;
  }

  .focus-btn {
    position: absolute;
    bottom: $padding-base;
    right: $padding-base;
    background-color: #e0e0e0;
    padding: 6rpx 20rpx;
    border-radius: 12rpx;
    font-size: 24rpx;
    color: #333;
  }
}

/* --- 3. 任务列表 --- */
.task-section {
  overflow-y: scroll;
  max-height: 30rem;
  .section-title {
    background-color: #e0e0e0;
    display: inline-block;
    padding: 6rpx 20rpx;
    border-radius: 12rpx;
    font-size: 28rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
    color: #333;
  }

  .task-item {
    background-color: #fff; // 任务卡片背景为白，更突出
    border-radius: $border-radius-lg;
    padding: $padding-base;
    margin-bottom: 20rpx;
    box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);

    .task-header {
      display: flex;
      align-items: center;
      margin-bottom: 16rpx;

      .task-dot {
        width: 30rpx;
        height: 30rpx;
        background-color: #e0e0e0;
        border-radius: 50%;
        margin-right: 16rpx;
      }

      .task-title {
        font-size: 32rpx;
        font-weight: bold;
        flex: 1;
        color: #333;
      }

      .task-status {
        background-color: #e0e0e0;
        padding: 4rpx 12rpx;
        border-radius: 12rpx;
        font-size: 24rpx;
        color: #333;
      }
    }

    .points-list {
      .point-item {
        background-color: $card-bg;
        height: 36rpx;
        border-radius: 18rpx;
        margin-bottom: 12rpx;
		padding: 10rpx;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
.over{
	margin-top: 1rem;
	border: none;
	background-color: $primary-color;
	&:hover{
		background-color: darken($color: $primary-color, $amount: 10%);
	}
}
</style>