<template>
  <view class="calendar">
    <!-- 日历头部：月份 + 年份 -->
    <view class="calendar-head">
      <view class="month-shower">{{ currentMonthName }}</view>
      <view class="year-picker">
        <view class="year-shower">{{ currentYear }}</view>
      </view>
    </view>
    <!-- 日历主体：星期 + 日期 -->
    <view class="days-picker">
      <!-- 星期列表 -->
      <view class="days-list">
        <view v-for="(day, idx) in weekday" :key="idx" class="week-item">{{ day }}</view>
      </view>
      <!-- 日期列表 -->
      <view class="days-shower">
        <!-- 前置空项（补全星期） -->
        <view class="empty" v-for="(_, idx) in emptyItems" :key="'empty-' + idx">  </view>
        <!-- 日期项（根据 activeDays 高亮） -->
        <view 
          class="item" 
          v-for="(date, idx) in monthDays" 
          :key="'date-' + idx"
          :style="{ backgroundColor: activeDays.includes(date) ? 'antiquewhite' : '' }"
          @click="handleDateClick(date)"
        >
          {{ date }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// 1. 定义 Props：接收需要高亮的日期列表
const props = defineProps({
  activeDays: {
    type: Array,
    default: () => [],
    // 验证：确保数组元素是 1-31 的有效日期
    validator: (val) => val.every(item => typeof item === 'number' && item > 0 && item < 32)
  }
});

// 2. 基础常量
const weekday = ['日', '一', '二', '三', '四', '五', '六']; // 星期
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // 月份

// 3. 响应式数据
const currentDate = ref(new Date()); // 当前日期
const currentYear = ref(currentDate.value.getFullYear()); // 当前年
const currentMonth = ref(currentDate.value.getMonth()); // 当前月
const emptyItems = ref([]); // 前置空项（补全星期）
const monthDays = ref([]); // 当月所有日期

// 4. 计算当月天数（处理闰年）
const getMonthDaysCount = (year, month) => {
  const dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // 闰年判断：2月补为29天
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    dayCount[1] = 29;
  }
  return dayCount[month];
};

// 5. 初始化日历数据
const initCalendar = () => {
  const year = currentYear.value;
  const month = currentMonth.value;
  // 获取当月第一天是星期几（决定前置空项数量）
  const firstDayWeek = new Date(year, month, 1).getDay();
  // 生成前置空项
  emptyItems.value = Array.from({ length: firstDayWeek }, (_, i) => i);
  // 生成当月日期列表
  const daysCount = getMonthDaysCount(year, month);
  monthDays.value = Array.from({ length: daysCount }, (_, i) => i + 1);
};

// 6. 计算属性：当前月份名称
const currentMonthName = computed(() => months[currentMonth.value]);

// 7. 日期点击事件（可选扩展）
const handleDateClick = (date) => {
  // 可扩展：触发父组件事件
  // emit('date-click', date);
};

// 8. 挂载时初始化
onMounted(() => {
  initCalendar();
});
</script>

<style scoped>
/* 页面背景（Uniapp 适配：rpx 单位 + 移除 vw/vh 改用 rpx 适配） */
page {
  margin: 200rpx 0; /* 原 100px → 200rpx */
  padding: 0;
  width: 750rpx; /* Uniapp 标准屏幕宽度基准 */
  min-height: 100vh; /* 保留高度自适应 */
  background: linear-gradient(to right bottom, purple, rgb(232, 116, 215));
}

/* 日历容器（核心：px → rpx 换算） */
.calendar {
  background-color: white;
  width: 800rpx; /* 原 400px → 800rpx */
  max-width: 750rpx; /* 限制最大宽度适配屏幕 */
  height: 760rpx; /* 原 380px → 760rpx */
  margin: 0 auto;
  padding: 40rpx; /* 原 20px → 40rpx */
  border-radius: 40rpx; /* 原 20px → 40rpx */
  box-shadow: 10rpx 20rpx 20rpx rgba(0, 0, 0, 0.2); /* 原 5px 10px 10px → 等比放大 */
  box-sizing: border-box;
}

/* 日历头部 */
.calendar-head {
  box-sizing: border-box;
  background-color: blueviolet;
  width: 100%;
  padding: 20rpx 40rpx; /* 原 10px 20px → 40rpx */
  border-radius: 40rpx; /* 原 20px → 40rpx */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 30rpx; /* 原 15px → 30rpx */
  box-shadow: 10rpx 10rpx 20rpx rgba(0, 0, 0, 0.2); /* 原 5px 5px 10px → 等比放大 */
}

.month-shower, .year-shower {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.month-shower:hover, .year-shower:hover {
  transform: scale(1.12); /* 缩放比例不变 */
}

.year-picker {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20rpx; /* 原 10px → 20rpx */
}

/* 日历主体 */
.days-picker {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40rpx; /* 原 20px → 40rpx */
  padding: 20rpx 20rpx; /* 原 10px 10px → 20rpx */
}

.days-list {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  place-items: center;
  gap: 20rpx; /* 原 10px → 20rpx */
  width: 100%;
  box-sizing: border-box;
  border: solid 2rpx rgb(140, 140, 140); /* 原 1px → 2rpx 适配高清屏 */
  padding: 10rpx; /* 原 5px → 10rpx */
  border-radius: 20rpx; /* 原 10px → 20rpx */
  box-shadow: 10rpx 10rpx 20rpx rgba(0, 0, 0, 0.2); /* 原 5px 5px 10px → 等比放大 */
}

.week-item {
  padding: 10rpx; /* 原 5px → 10rpx */
  border-radius: 10rpx; /* 原 5px → 10rpx */
  font-size: 28rpx; /* 补充适配字体大小 */
}

.days-shower {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  place-items: center;
  gap: 20rpx; /* 原 10px → 20rpx */
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10rpx; /* 原 5px → 10rpx */
}

.empty {
  padding: 10rpx; /* 原 5px → 10rpx */
  border-radius: 10rpx; /* 原 5px → 10rpx */
}

.item {
  padding: 10rpx; /* 原 5px → 10rpx */
  border-radius: 10rpx; /* 原 5px → 10rpx */
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 28rpx; /* 补充适配字体大小 */
}

.item:hover {
  background-color: antiquewhite;
}
</style>