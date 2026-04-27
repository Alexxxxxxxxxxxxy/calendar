<script setup>
import { ref } from 'vue';
import { onShow } from "@dcloudio/uni-app"
import { useUserContext } from '../../context/userContext';

const {progress, token} = useUserContext()

const Progress = ref(progress);

const tasks = ref([]);

const stats = ref({
  count: 0,
  totalHours: '0h'
});

// 网络请求
onShow(()=>{
	if(!token.value)return
	uni.showLoading({
		title:"加载中...",
		mask:true
	})
	uni.request({
		url:"http://106.53.182.241:8000/api/today/list",
		method:'GET',
		header:{
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token.value,
		},
		success:(res)=>{
			if(res.statusCode !=200){
				uni.showToast({
				  title: `接口异常 ${res.statusCode}`,
				  icon: "none", 
				  duration: 2000
				})
				return
			}
			stats.value.totalHours = res.data.data.total_required_minutes/60 +"h"
			stats.value.count = res.data.data.total_subjects
			res.data.data.subjects.forEach((content)=>{
				tasks.value.push({
					id:tasks.value.length+1,
					title:content.subject_name,
					items:content.today_tasks
				})
			})
		},
		fail:(err)=>{
			uni.showToast({
			  title: err.errMsg || "网络请求失败",
			  icon: "none", 
			  duration: 2000
			})
		},
		complete:()=>{
			uni.hideLoading()
		}
	})
})
</script>

<template>
  <view class="page-container">
    <view class="container">
      <view class="progress-section">
        <view class="section-title">今日计划</view>
        <view class="progress-bar">
          <view class="progress-fill" :style="{ width: Progress + '%' }"></view>
        </view>
      </view>

      <view class="task-list">
        <view class="task-card" v-for="task in tasks" :key="task.id">
          <view class="task-header">
            <view class="checkbox"></view>
            <text class="task-title">{{ task.title }}</text>
          </view>
          <view class="subtask-list">
            <view class="subtask-item" v-for="(item, index) in task.items" :key="index">
              <text>{{item}}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="stats-section">
        <text>需复习科目数: {{ stats.count }}</text>
        <text>总时长: {{ stats.totalHours }}</text>
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
   微信小程序背景 - 三重保障方案
   ======================================== */

/* 第1重：page 标签 - 纯色兜底 */
page {
  width: 100%;
  min-height: 100%;
  height: 100%;
  background-color: #667eea;
  margin: 0;
  padding: 0;
}

/* 第2重：page-container - 渐变背景（主要显示） */
.page-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, #667eea 0%, #764ba2 100%);
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

/* 第3重：container - 再次确保背景 */
.container {
  width: 100%;
  min-height: 100vh;
  padding: 40rpx 30rpx;
  box-sizing: border-box;
  background: transparent;
}

/* ========================================
   以下样式保持不变
   ======================================== */

/* 进度条区域 */
.progress-section {
  margin-bottom: 40rpx;
  
  .section-title {
    display: flex;
    justify-content: center;
    align-items: center;
    background: $primary-gradient;
    color: white;
    width: 220rpx;
    height: 70rpx;
    border-radius: 100rpx;
    margin: 0 auto 30rpx auto;
    font-size: 30rpx;
    font-weight: bold;
    box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.3);
  }
  
  .progress-bar {
    height: 20rpx;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 10rpx;
    overflow: hidden;
    border: 1px solid $glass-border;
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
      border-radius: 10rpx;
      box-shadow: 0 0 12rpx rgba(79, 172, 254, 0.5);
    }
  }
}

/* 任务列表 */
.task-list {
  max-height: 1000rpx;
  overflow-y: scroll;
  
  .task-card {
    background: $glass-bg;
    border: 1px solid $glass-border;
    border-radius: 36rpx;
    padding: 40rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 12rpx 40rpx rgba(0, 0, 0, 0.12);
    backdrop-filter: blur(20rpx);
    -webkit-backdrop-filter: blur(20rpx);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .task-header {
    display: flex;
    align-items: center;
    margin-bottom: 24rpx;
    
    .checkbox {
      width: 36rpx;
      height: 36rpx;
      border-radius: 50%;
      background: $gold-gradient;
      margin-right: 24rpx;
      box-shadow: 0 4rpx 12rpx rgba(246, 211, 101, 0.4);
    }
    
    .task-title {
      font-size: 34rpx;
      font-weight: bold;
      color: white;
      text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
    }
  }
  
  .subtask-item {
    width: 100%;
    min-height: 72rpx;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 36rpx;
    margin-bottom: 18rpx;
    padding: 20rpx 32rpx;
    font-size: 28rpx;
    color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.15);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

/* 统计区域 */
.stats-section {
  margin-top: 40rpx;
  padding: 30rpx;
  background: $glass-bg;
  border: 1px solid $glass-border;
  border-radius: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28rpx;
  color: white;
  box-shadow: 0 12rpx 40rpx rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(20rpx);
  -webkit-backdrop-filter: blur(20rpx);
}
</style>