<script setup>
import { ref } from 'vue';
import { useUserContext, useUserContextProvider } from '../../context/userContext';
import { onShow } from "@dcloudio/uni-app"
useUserContextProvider()


const {continuous_day , token} = useUserContext()

const continuous = ref(continuous_day || 0)

// 模拟任务数据
const tasks = ref([
	{
	    id: 1,
	    title: '高等数学',
	    status: '正在进行',
	    points: ['知识点1', '知识点2', '知识点3']
	  },
]);

const fetchData = ()=>{
	if (!token.value) {
	  return
	}
	
	uni.showLoading({
	  title: '加载中...',
	  mask: true
	})
	
	uni.request({
	  url: "http://106.53.182.241:8000/api/subjects/list",
	  method: 'GET',
	  header: {
	    "Content-Type": "application/json",
	    "Authorization": "Bearer " + token.value,
	  },
	  success: (res) => {
	    if (res.statusCode !== 200) {
	      uni.showToast({
	        title: `接口异常 ${res.statusCode}`,
	        icon: "none",
	        duration: 2000
	      })
	      return
	    }
		tasks.value = res.data.data.subjects
	  },
	  fail: (err) => {
	    uni.showToast({
	      title: err.errMsg || "网络请求失败",
	      icon: "none",
	      duration: 2000
	    })
	  },
	  complete: () => {
	    uni.hideLoading()
	  }
	})
}

onShow(()=>{
	fetchData()
})

const focusJump = ()=>{
	uni.navigateTo({
		url:"/pages/focus/focus"
	})
}
</script>

<template>
  <view class="page-container">
    <view class="content">
      <!-- 顶部状态区 -->
      <view class="status-section">
        <view class="status-tag">🔥</view>
        <view class="streak-tag">坚持 第 {{continuous}} 天</view>
      </view>

      <!-- 计时器卡片 -->
      <view class="card">
        <view class="card-title">⏱️ 专注计时器</view>
        <view class="btn" @click="focusJump">进入专注界面</view>
      </view>

      <!-- 任务列表 -->
      <view class="section">
        <view class="section-title">📋 今日任务</view>

        <view class="task-card" v-for="task in tasks" :key="task.id">
          <view class="task-header">
            <view class="task-dot"></view>
            <view class="task-name">{{ task.title }}</view>
            <view class="task-state" v-if="task.status">{{ task.status }}</view>
          </view>

          <view class="task-points">
			<view class="point" v-for="(point,index) in task.points" :key="index">
				{{point}}
			</view>
          </view>
        </view>
      </view>

      <!-- 完结按钮 -->
      <view class="btn-container">
        <view class="submit-btn" @click="">✅ 完结</view>
      </view>
    </view>
  </view>
</template>

<style scoped>
/* 微信小程序 page 样式 */
:global(page) {
  width: 100%;
  min-height: 100%;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  margin: 0;
  padding: 0;
}

.page-container {
  width: 100%;
  min-height: 100vh;
  padding: 40rpx 30rpx;
  box-sizing: border-box;
}

.content {
  width: 100%;
}

/* 顶部状态区 */
.status-section {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
}

.status-tag {
  width: 100rpx;
  height: 100rpx;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48rpx;
  margin-right: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
}

.streak-tag {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  padding: 20rpx 48rpx;
  border-radius: 100rpx;
  font-size: 30rpx;
  color: white;
  font-weight: bold;
  box-shadow: 0 8rpx 24rpx rgba(79, 172, 254, 0.3);
}

/* 通用卡片样式 */
.card {
  background: rgba(255, 255, 255, 0.28);
  border-radius: 40rpx;
  padding: 50rpx 40rpx;
  margin-bottom: 40rpx;
  position: relative;
  box-shadow: 0 12rpx 40rpx rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.card-title {
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 70rpx;
  color: white;
  text-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.btn {
  position: absolute;
  bottom: 40rpx;
  right: 40rpx;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  padding: 20rpx 48rpx;
  border-radius: 100rpx;
  font-size: 28rpx;
  color: white;
  font-weight: bold;
  box-shadow: 0 8rpx 24rpx rgba(246, 211, 101, 0.35);
}

/* 任务区域 */
.section {
  margin-bottom: 40rpx;
}

.section-title {
  background: rgba(255, 255, 255, 0.25);
  display: inline-block;
  padding: 20rpx 48rpx;
  border-radius: 100rpx;
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
}

.task-card {
  background: rgba(255, 255, 255, 0.28);
  border-radius: 36rpx;
  padding: 40rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 12rpx 40rpx rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.task-header {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
}

.task-dot {
  width: 28rpx;
  height: 28rpx;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  border-radius: 50%;
  margin-right: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(246, 211, 101, 0.4);
}

.task-name {
  font-size: 34rpx;
  font-weight: bold;
  flex: 1;
  color: white;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.task-state {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  padding: 10rpx 28rpx;
  border-radius: 100rpx;
  font-size: 24rpx;
  color: white;
  font-weight: bold;
  box-shadow: 0 4rpx 12rpx rgba(79, 172, 254, 0.3);
}

.task-points {
  margin-top: 12rpx;
}

.point {
  background: rgba(255, 255, 255, 0.25);
  min-height: 72rpx;
  border-radius: 36rpx;
  margin-bottom: 18rpx;
  padding: 20rpx 32rpx;
  font-size: 28rpx;
  color: white;
  line-height: 1.5;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.point:last-child {
  margin-bottom: 0;
}

/* 按钮容器 */
.btn-container {
  display: flex;
  justify-content: center;
  margin-top: 30rpx;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24rpx 80rpx;
  border-radius: 100rpx;
  font-size: 30rpx;
  color: white;
  font-weight: bold;
  border: 2px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 12rpx 40rpx rgba(102, 126, 234, 0.4);
}
</style>