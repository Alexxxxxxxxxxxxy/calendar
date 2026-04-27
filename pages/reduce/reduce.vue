<script setup>
import { ref, computed } from 'vue';

// 模拟数据源 ✅ 逻辑完全不变
const categories = ref([
  {
    name: '高等数学',
    total: 3.5,
    checked: false,
    tasks: [
      { id: 1, time: 1.5, checked: false },
      { id: 2, time: 1.5, checked: false },
      { id: 3, time: 0.5, checked: false },
    ],
  },
  {
    name: '程序设计',
    total: 3,
    checked: false,
    tasks: [
      { id: 4, time: 1, checked: false },
      { id: 5, time: 1, checked: false },
      { id: 6, time: 1, checked: false },
    ],
  },
]);

// 计算已选择的扁平化任务列表 ✅ 逻辑完全不变
const selectedTasks = computed(() => {
  let tasks = [];
  categories.value.forEach((cat) => {
    cat.tasks.forEach((task) => {
      if (task.checked) {
        tasks.push({ name: cat.name, time: task.time });
      }
    });
  });
  return tasks;
});

// 计算总时长 ✅ 逻辑完全不变
const totalSelectedTime = computed(() => {
  return selectedTasks.value.reduce((sum, item) => sum + item.time, 0);
});

// 切换分类全选/全不选 ✅ 逻辑完全不变
const toggleCategory = (category) => {
  const newVal = !category.checked;
  category.checked = newVal;
  category.tasks.forEach((task) => {
    task.checked = newVal;
  });
};

// 切换单个子任务 ✅ 逻辑完全不变
const toggleTask = (category, task) => {
  task.checked = !task.checked;
  // 检查分类是否需要更新全选状态
  const allChecked = category.tasks.every((t) => t.checked);
  category.checked = allChecked;
};

// 确认按钮 ✅ 逻辑完全不变
const onConfirm = () => {
  uni.showToast({
    title: `已确认减负 ${totalSelectedTime.value} 小时`,
    icon: 'none',
  });
};
</script>

<template>
  <view class="page-container">
    <!-- 微信小程序专属渐变背景 -->
    <view class="bg-layer"></view>

    <!-- 顶部标题 -->
    <view class="header">
      <text class="header-text">🎯 请选择想要减负的任务</text>
    </view>

    <!-- 任务列表区域 -->
    <view class="task-list">
      <view
        v-for="(category, index) in categories"
        :key="index"
        class="category-card glass-card"
      >
        <!-- 分类头部：复选框 + 标题 + 总时长标签 -->
        <view class="category-header" @click="toggleCategory(category)">
          <radio
            :checked="category.checked"
            color="#ffffff"
            style="transform: scale(0.8)"
          />
          <text class="category-title">{{ category.name }}</text>
          <view class="total-tag">共{{ category.total }}h</view>
        </view>

        <!-- 子任务列表 -->
        <view class="sub-tasks">
          <view
            v-for="(task, tIndex) in category.tasks"
            :key="tIndex"
            class="sub-task-item"
            :class="{ active: task.checked }"
            @click="toggleTask(category, task)"
          >
            <text>{{ task.time }}h</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部已选择区域 -->
    <view class="bottom-panel glass-card">
      <view class="selected-header">
        <text class="selected-text">已选择的任务</text>
      </view>

      <view class="selected-content">
        <view
          v-for="(item, i) in selectedTasks"
          :key="i"
          class="selected-item-pill"
        >
          <text class="pill-text">{{ item.name }} - {{ item.time }}h</text>
        </view>

        <!-- 空状态 -->
        <view v-if="selectedTasks.length === 0" class="empty-state">
          <text>暂无选择</text>
        </view>
      </view>

      <view class="total-duration">
        <text>📊 总减负时长：{{ totalSelectedTime }}h</text>
      </view>
    </view>

    <!-- 确认按钮 -->
    <view class="footer-btn">
      <button type="primary" @click="onConfirm">确认减负</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 统一全局配色
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

/* 全局容器 */
.page-container {
  padding: 20rpx 40rpx;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

/* 毛玻璃卡片样式 */
.glass-card {
  background: $glass-bg;
  border: 1px solid $glass-border;
  border-radius: 24rpx;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

/* 顶部标题 */
.header {
  background: $glass-bg;
  padding: 24rpx;
  border-radius: 30rpx;
  text-align: center;
  margin-bottom: 40rpx;
  border: 1px solid $glass-border;
}
.header-text {
  color: #ffffff;
  font-size: 32rpx;
  font-weight: bold;
}

/* 任务卡片 */
.category-card {
  padding: 30rpx;
  margin-bottom: 30rpx;
}

.category-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.category-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #ffffff;
  margin-left: 10rpx;
  margin-right: auto;
}

/* 总时长胶囊标签 */
.total-tag {
  background: rgba(255,255,255,0.3);
  color: #fff;
  font-size: 24rpx;
  padding: 6rpx 20rpx;
  border-radius: 20rpx;
  font-weight: 600;
}

/* 子任务项 */
.sub-task-item {
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255,255,255,0.8);
  padding: 20rpx 0;
  text-align: center;
  border-radius: 40rpx;
  margin-bottom: 20rpx;
  font-size: 28rpx;
  transition: all 0.3s ease;

  /* 选中状态样式 */
  &.active {
    background: #ffffff;
    color: #667eea;
    font-weight: bold;
    transform: scale(0.98);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

/* 底部面板 */
.bottom-panel {
  padding: 30rpx;
  margin-top: 20rpx;
}

.selected-header {
  background: rgba(255,255,255,0.3);
  align-self: flex-start;
  padding: 10rpx 25rpx;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
}
.selected-text {
  color: #ffffff;
  font-size: 26rpx;
  font-weight: 600;
}

/* 已选任务占位条 */
.selected-content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.selected-item-pill {
  background: rgba(255,255,255,0.2);
  height: 60rpx;
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  padding-left: 30rpx;
}
.pill-text {
  color: #ffffff;
  font-size: 24rpx;
}

.empty-state {
  color: rgba(255,255,255,0.7);
  font-size: 24rpx;
  margin-top: 10rpx;
}

.total-duration {
  margin-top: 40rpx;
  font-size: 30rpx;
  font-weight: bold;
  color: #ffffff;
}

/* 底部按钮 */
.footer-btn {
  margin-top: 60rpx;
  padding: 0 40rpx;
}
/* 小程序按钮样式优化 */
button {
  background: $primary-gradient !important;
  color: #ffffff !important;
  border-radius: 40rpx;
  font-weight: bold;
  border: none;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

button:active {
  transform: scale(0.98);
}
</style>