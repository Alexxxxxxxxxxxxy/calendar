<template>
  <view class="calendar">
    <!-- 日历头部：月份 + 年份 -->
    <view class="calendar-head glass-card">
      <view class="month-shower">📅 {{ currentMonthName }}</view>
      <view class="year-picker">
        <view class="year-shower">📆 {{ currentYear }}</view>
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
        <!-- 日期项：今日样式 + 完成样式 区分显示 -->
        <view 
          class="item" 
          v-for="(date, idx) in monthDays" 
          :key="'date-' + idx"
          :class="{ 
            'active-item': activeDays.includes(date), 
            'today-item': isCurrentMonthToday && date === todayDay && !activeDays.includes(date)
          }"
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

// 新增：今日日期数据
const todayDate = ref(new Date());
const todayYear = computed(() => todayDate.value.getFullYear());
const todayMonth = computed(() => todayDate.value.getMonth());
const todayDay = computed(() => todayDate.value.getDate());
// 判断：当前日历月份 是否为 今日所在月份
const isCurrentMonthToday = computed(() => {
  return currentYear.value === todayYear.value && currentMonth.value === todayMonth.value;
});

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

<style scoped lang="scss">
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$secondary-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
$gold-gradient: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
$glass-bg: rgba(255, 255, 255, 0.25);
$glass-border: rgba(255, 255, 255, 0.3);
$glass-bg-light: rgba(255, 255, 255, 0.18);

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
  transition: all 0.3s ease;
}

/* 日历容器（完全透明，透出父页面渐变） */
.calendar {
  width: 100%;
  max-width: 700rpx;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

/* 日历头部 */
.calendar-head {
  box-sizing: border-box;
  width: 100%;
  padding: 24rpx 40rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 32rpx;
  font-weight: 600;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.month-shower, .year-shower {
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(1.08);
  }
}

.year-picker {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20rpx;
}

/* 日历主体 */
.days-picker {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24rpx;
  padding: 0;
}

.days-list {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  place-items: center;
  gap: 16rpx;
  width: 100%;
  box-sizing: border-box;
  padding: 16rpx 10rpx;
  border-radius: 30rpx;
  background: $glass-bg-light;
  border: 1px solid $glass-border;
}

.week-item {
  padding: 12rpx 16rpx;
  border-radius: 20rpx;
  font-size: 28rpx;
  color: white;
  font-weight: 600;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.days-shower {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  place-items: center;
  gap: 16rpx;
  width: 100%;
  box-sizing: border-box;
  padding: 10rpx;
}

.empty {
  padding: 12rpx 16rpx;
  border-radius: 20rpx;
  width: 60rpx;
  height: 60rpx;
  box-sizing: border-box;
}

.item {
  padding: 12rpx 16rpx;
  border-radius: 20rpx;
  width: 60rpx;
  height: 60rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 28rpx;
  color: white;
  font-weight: 500;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  background: $glass-bg-light;
  
  &:active {
    transform: scale(0.92);
    background: rgba(255, 255, 255, 0.3);
  }
}

/* ========== 样式区分 ========== */
/* 1. 今日日期：蓝色渐变（专属样式） */
.today-item {
  background: $secondary-gradient !important;
  box-shadow: 0 8rpx 24rpx rgba(79, 172, 254, 0.4) !important;
  font-weight: 700 !important;
}
/* 2. 完成日期：金色渐变（props传入） */
.active-item {
  background: $gold-gradient !important;
  box-shadow: 0 8rpx 24rpx rgba(246, 211, 101, 0.4) !important;
  font-weight: 700 !important;
}
</style>