<template>
  <view class="page-container">
    <!-- 微信小程序专属渐变背景 -->
    <view class="bg-layer"></view>

    <!-- 顶部标题 -->
    <view class="header">
      <text class="header-text">🔄 请重排任务</text>
    </view>

    <!-- 任务列表区域 -->
    <view class="task-list">
      <view
        v-for="(item, index) in taskList"
        :key="item.id"
        class="task-card glass-card"
        @click="handleSwap(index)"
      >
        <!-- 卡片头部：复选框 + 标题 + 总时长 -->
        <view class="card-header">
          <view class="left-part">
            <radio :checked="true" color="#ffffff" style="transform: scale(0.8)" />
            <text class="title">{{ item.name }}</text>
          </view>

          <view class="tag">
            <text class="tag-text">共{{ item.totalHours }}h</text>
          </view>
        </view>

        <!-- 子任务列表 -->
        <view class="sub-tasks">
          <view
            v-for="(sub, subIndex) in item.subTasks"
            :key="subIndex"
            class="sub-item"
          >
            <text class="sub-text">{{ sub }}h</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部确认按钮 -->
    <view class="footer">
      <button class="confirm-btn">确认重排</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 任务列表数据 ✅ 逻辑完全不变
const taskList = ref([
  {
    id: 1,
    name: '高等数学',
    totalHours: 3.5,
    subTasks: [1.5, 1.5, 0.5]
  },
  {
    id: 2,
    name: '程序设计',
    totalHours: 3,
    subTasks: [1, 1, 1]
  }
]);

/**
 * 交换位置逻辑 ✅ 逻辑完全不变
 * 点击当前项，与它上面的一项交换位置
 */
const handleSwap = (currentIndex) => {
  // 如果点击的是第一项（索引为0），则无法向上交换，直接返回
  if (currentIndex === 0) {
    uni.showToast({ title: '已经在最顶部了', icon: 'none' });
    return;
  }

  // 使用数组解构赋值快速交换数组中的两项
  const prevIndex = currentIndex - 1;
  [taskList.value[prevIndex], taskList.value[currentIndex]] = [
    taskList.value[currentIndex],
    taskList.value[prevIndex]
  ];
};
</script>

<style lang="scss" scoped>
// 统一项目全局配色
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$glass-bg: rgba(255, 255, 255, 0.25);
$glass-border: rgba(255, 255, 255, 0.3);

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
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 40rpx;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

/* 毛玻璃卡片通用样式 */
.glass-card {
  background: $glass-bg;
  border: 1px solid $glass-border;
  border-radius: 24rpx;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.98);
  }
}

/* 顶部标题样式 */
.header {
  display: flex;
  justify-content: center;
  margin-bottom: 30rpx;
}

.header-text {
  background: $glass-bg;
  color: #fff;
  padding: 12rpx 40rpx;
  border-radius: 20rpx;
  font-size: 32rpx;
  font-weight: bold;
  border: 1px solid $glass-border;
}

/* 任务列表容器 */
.task-list {
  flex: 1;
  padding: 0 30rpx;
}

/* 任务卡片样式 */
.task-card {
  padding: 30rpx;
  margin-bottom: 20rpx;
}

/* 卡片头部布局 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25rpx;
}

.left-part {
  display: flex;
  align-items: center;
}

.title {
  font-size: 32rpx;
  color: #fff;
  font-weight: 500;
  margin-left: 10rpx;
}

/* 右侧胶囊标签 */
.tag {
  background: rgba(255, 255, 255, 0.3);
  padding: 6rpx 20rpx;
  border-radius: 20rpx;
}

.tag-text {
  font-size: 24rpx;
  color: #fff;
}

/* 子任务项 */
.sub-item {
  background: rgba(255, 255, 255, 0.2);
  height: 60rpx;
  border-radius: 30rpx;
  margin-bottom: 15rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 30rpx;
  box-sizing: border-box;
}

.sub-text {
  font-size: 26rpx;
  color: #fff;
}

/* 底部按钮区域 */
.footer {
  padding: 40rpx 60rpx;
  background: transparent !important;
}

.confirm-btn {
  background: $primary-gradient !important;
  color: #fff !important;
  border-radius: 100rpx;
  font-size: 30rpx;
  font-weight: bold;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  border: none;
}

/* 去除button默认边框 */
.confirm-btn::after {
  border: none;
}
</style>