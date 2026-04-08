<script setup>
import { ref } from 'vue';
import {onLoad} from "@dcloudio/uni-app"
import { useUserContext } from '../../context/userContext';

const {progress} = useUserContext()

const Progress = ref(progress);

const tasks = ref([
]);

const stats = ref({
  count: 2,
  totalHours: '4h'
});

// 网络请求
onLoad(()=>{
	uni.showLoading({
		title:"加载中...",
		mask:true
	})
	uni.request({
		url:"http://106.53.182.241:8000/api/today/list",
		method:'GET',
		header:{
			"Content-Type": "application/json",
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
.container{
	margin: 0.5rem;
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
    box-shadow: 0rpx 10rpx 10rpx rgba(0,0,0,0.5);
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
    height: 60rpx;
    background-color: $gray-color;
    border-radius: 20rpx;
    margin-bottom: 15rpx;
	padding: 0.2rem 0.8rem;
	font-size: 30rpx;
	display: flex;
	justify-items: flex-start;
	align-items: center;
	box-sizing: border-box;
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