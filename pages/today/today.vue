<script setup>
import { ref } from 'vue';

const progress = ref(33);

const tasks = ref([
  {
    id: 1,
    title: '高等数学',
    items: ['知识点1', '知识点2', '知识点3']
  },
  {
    id: 2,
    title: '程序设计',
    items: ['任务A', '任务B', '任务C', '任务D']
  }
]);

const stats = ref({
  count: 2,
  totalHours: '4h'
});
</script>

<template>
  <view class="container">
    <view class="progress-section">
      <view class="section-title">今日计划</view>
      <view class="progress-bar">
        <view class="progress-fill" :style="{ width: progress + '%' }"></view>
      </view>
    </view>

    <view class="task-list">
      <view class="task-card" v-for="task in tasks" :key="task.id">
        <view class="task-header">
          <view class="checkbox"></view>
          <text class="task-title">{{ task.title }}</text>
        </view>
        <view class="subtask-list">
          <view class="subtask-item" v-for="(item, index) in task.items" :key="index"></view>
        </view>
      </view>
    </view>

    <view class="stats-section">
      <text>需复习科目数: {{ stats.count }}</text>
      <text>总时长: {{ stats.totalHours }}</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
$bg-color: #f5f5f5;
$card-color: #ffffff;
$primary-color: #4cd964;
$gray-color: #e0e0e0;

page {
  background-color: $bg-color;
  padding: 20rpx;
  box-sizing: border-box;
}

.progress-section {
  margin-bottom: 30rpx;
  .section-title {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $gray-color;
    color: #333;
    width: 200rpx;
    height: 60rpx;
    border-radius: 30rpx;
    margin: 0 auto 20rpx auto;
    font-size: 28rpx;
    font-weight: bold;
  }
  .progress-bar {
    height: 16rpx;
    background-color: $gray-color;
    border-radius: 8rpx;
    overflow: hidden;
    .progress-fill {
      height: 100%;
      background-color: $primary-color;
      border-radius: 8rpx;
    }
  }
}

.task-list {
  max-height: 30rem;
  overflow-y: scroll;
  .task-card {
    background-color: $card-color;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 4rpx 10rpx rgba(0,0,0,0.05);
    &:last-child {
      margin-bottom: 0;
    }
  }
  .task-header {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    .checkbox {
      width: 32rpx;
      height: 32rpx;
      border-radius: 50%;
      background-color: $gray-color;
      margin-right: 20rpx;
    }
    .task-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
    }
  }
  .subtask-item {
    width: 100%;
    height: 40rpx;
    background-color: $gray-color;
    border-radius: 20rpx;
    margin-bottom: 15rpx;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.stats-section {
  margin-top: 40rpx;
  padding: 20rpx;
  background-color: $gray-color;
  border-radius: 15rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28rpx;
  color: #333;
}
</style>