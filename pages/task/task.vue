<script setup>
import start_gray from "../../public/start.png"
import start_yellow from "../../public/start-yellow.png"
import { computed, ref } from 'vue';
import {onShow} from "@dcloudio/uni-app"
import { useUserContext } from '../../context/userContext';

const { token } = useUserContext()

const t = ref(0);
const starts = Array.from({length: 5}, (_, i) => ({id: i}));
const handleStartClick = (index)=>{
	t.value = index+1
}

const n = ref(0);
const points = Array.from({length: 4}, (_, i) => ({id: i}));

const handlePointClick = (index)=>{
	n.value = index+1
}

const h = ref(0)
const m = ref(0)
const s = ref(0)

let timer = null
const status = ref(false)
const text = ref("开始")

const startTime = ()=>{
	timer = setInterval(()=>{
		if(s.value+1<60){
			s.value = s.value+1
		}else{
			s.value = 0
			if(m.value+1<60){
				m.value=m.value+1
			}else{
				m.value=0
				h.value = h.value+1
			}
		}
	},1000)
}

const pauseTime = ()=>{
	clearInterval(timer)
}

const handleClick = ()=>{
	status.value=!status.value
	if(status.value){
		startTime()
		text.value="暂停"
	}
	else {
		pauseTime()
		text.value="开始"
	}
}

const timeStr = computed(()=>{
  let hh = h.value < 10 ? '0' + h.value : h.value;
  let mm = m.value < 10 ? '0' + m.value : m.value;
  let ss = s.value < 10 ? '0' + s.value : s.value;
  return `${hh}:${mm}:${ss}`;
})

const subject = ref("")
const task = ref("")
const taskid = ref("")
// 网络请求
onShow(()=>{
	uni.showLoading({
		title: '加载中...',
		mask: true
	})
	uni.request({
		url:"http://106.53.182.241:8000/api/task/trial",
		method:"GET",
		header:{
			"Content-Type": "application/json",
		},
		success:(res)=>{
			if(res.statusCode !== 200){
				uni.showToast({
				  title: `接口异常 ${res.statusCode}`,
				  icon: "none", 
				  duration: 2000
				})
				return
			}
			subject.value = res.data.data.subject_name
			task.value = res.data.data.sub_knowledge
			taskid.value = res.data.data.task_id
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

const planJump = ()=>{
	uni.navigateTo({
		url:"/pages/plan/plan"
	})
}
</script>
<template>
	<view class="page-container">
		<view class="main-content">
			<view class="header glass-card">
				试炼任务
			</view>
			<view class="body glass-card">
				<view class="title">
					<view class="project">{{subject}}</view>
					<view class="time">{{timeStr}}</view>
				</view>
				<view class="tasks">
					<text>{{task}}</text>
				</view>
				<button size="mini" class="start" @click="handleClick">{{text}}</button>
			</view>
			<view class="other">
				<view class="diff glass-card">
					<text>任务完成情况：</text>
					<view class="diff-list">
						<image 
						  v-for="(start, index) in starts" 
						  @click="handleStartClick(index)" 
						  class="diff-point" 
						  :key="index" 
						  :src="index >= t ? start_gray : start_yellow"
						  mode="aspectFit"
						/>
					</view>
				</view>
				<view class="master glass-card">
					<text>状态评估：</text>
					<view class="master-list">
						<view v-for="(point,index) in points" class="master-point" @click="handlePointClick(index)" :key="index" :class="{'active-master':index<n}"></view>
					</view>
				</view>
				<view class="plan" @click="planJump">查看调整后的计划</view>
				<button size="mini" class="confirm">确认</button>
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
/* 第1重：纯色兜底，小程序必显示 */
page {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #667eea;
  margin: 0;
  padding: 0;
}
/* 第2重：渐变主背景，兼容小程序语法 */
.page-container {
  width: 100%;
  min-height: 100vh;
  padding: 40rpx 30rpx;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #667eea 0%, #764ba2 100%);
}

.main-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  box-sizing: border-box;
}

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
}

/* 头部 */
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30rpx 0;
  font-size: 36rpx;
  font-weight: bold;
  color: white;
  text-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

/* 身体部分 */
.body {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  padding: 40rpx;
  align-items: center;
  
  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .project {
      background: $secondary-gradient;
      padding: 12rpx 24rpx;
      border-radius: 100rpx;
      font-size: 28rpx;
      color: white;
      font-weight: 600;
      box-shadow: 0 4rpx 12rpx rgba(79, 172, 254, 0.3);
    }
    
    .time {
      background: $gold-gradient;
      padding: 12rpx 24rpx;
      border-radius: 100rpx;
      font-size: 28rpx;
      color: white;
      font-weight: 600;
      box-shadow: 0 4rpx 12rpx rgba(246, 211, 101, 0.3);
    }
  }
  
  .tasks {
    width: 100%;
    min-height: 200rpx;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30rpx;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.15);
    
    text {
      font-size: 30rpx;
      color: white;
      line-height: 1.6;
      text-align: center;
      text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
    }
  }
  
  .start {
    border: none;
    background: $gold-gradient;
    color: white;
    padding: 20rpx 60rpx;
    border-radius: 100rpx;
    font-size: 30rpx;
    font-weight: bold;
    box-shadow: 0 8rpx 24rpx rgba(246, 211, 101, 0.35);
    transition: all 0.3s ease;
    
    &:active {
      transform: scale(0.95);
    }
  }
}

/* 其他部分 */
.other {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  
  .diff {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24rpx;
    padding: 30rpx;
    box-sizing: border-box;
    
    text {
      font-size: 30rpx;
      color: white;
      font-weight: 600;
      text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
    }
    
    .diff-list {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 20rpx;
      box-sizing: border-box;
      
      .diff-point {
        width: 60rpx;
        height: 60rpx;
        transition: all 0.3s ease;
        
        &:active {
          transform: scale(0.9);
        }
      }
    }
  }
  
  .master {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 24rpx;
    padding: 30rpx;
    box-sizing: border-box;
    
    text {
      font-size: 30rpx;
      color: white;
      font-weight: 600;
      text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
    }
    
    .master-list {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 20rpx;
      box-sizing: border-box;
      
      .master-point {
        width: 100rpx;
        height: 100rpx;
        border: 2rpx solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.15);
        box-sizing: border-box;
        transition: all 0.3s ease;
        
        &:active {
          transform: scale(0.9);
        }
      }
    }
  }
}

.active-master {
  background: $secondary-gradient !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  box-shadow: 0 8rpx 24rpx rgba(79, 172, 254, 0.4) !important;
}

.plan {
  background: $secondary-gradient;
  padding: 16rpx 32rpx;
  border-radius: 100rpx;
  font-size: 28rpx;
  color: white;
  font-weight: 600;
  box-shadow: 0 4rpx 12rpx rgba(79, 172, 254, 0.3);
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.95);
  }
}

.confirm {
  margin-bottom: 20rpx;
  border: none;
  background: $primary-gradient;
  color: white;
  padding: 20rpx 60rpx;
  border-radius: 100rpx;
  font-size: 30rpx;
  font-weight: bold;
  box-shadow: 0 8rpx 24rpx rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.95);
  }
}
</style>