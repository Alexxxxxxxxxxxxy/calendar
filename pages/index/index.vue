<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { onLoad, onShow, onHide } from "@dcloudio/uni-app"
import { useUserContext,useUserContextProvider } from '../../context/userContext';

import Progress from "@/components/Progress.vue"

import clientImg from "../../public/client-o.png"
import coinImg from "../../public/Coin.png"

const img = ref(clientImg)
const coin = ref(coinImg)
const continuousDay = ref(0)
const currency = ref(0)
const progress = ref(0)

useUserContextProvider()
const { token, updateContinuousDay, updateProgress } = useUserContext()

const fetchHomeData = () => {
  if (!token.value) {
    return
  }

  uni.showLoading({
    title: '加载中...',
    mask: true
  })

  uni.request({
    url: "http://106.53.182.241:8000/api/index/home_data",
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
      currency.value = res.data.data.coin_balance
      progress.value = Math.floor(res.data.data.completion_rate * 100)
      continuousDay.value = res.data.data.continuous_days
      updateContinuousDay(res.data.data.continuous_days)
      updateProgress(Math.floor(res.data.data.completion_rate * 100))
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

const handleLoginSuccess = () => {
  setTimeout(() => {
    fetchHomeData()
  }, 300)
}

onMounted(() => {
  uni.$on('loginSuccess', handleLoginSuccess)
})

onUnmounted(() => {
  uni.$off('loginSuccess', handleLoginSuccess)
})

onLoad(() => {
  if (token.value) {
    fetchHomeData()
  } else {
	  return
  }
})

onShow(() => {
  if (token.value) {
    fetchHomeData()
  }
})

onHide(() => {
  // 页面隐藏时不需要特殊处理
})

watch(token, (newVal, oldVal) => {
  console.log('token watch 触发:', newVal ? '有token' : '无token')
  if (newVal && !oldVal) {
    fetchHomeData()
  }
})

const achiveJump = () => {
  uni.navigateTo({
    url: "/pages/achievement/achievement",
  })
}

const taskJump = () => {
  uni.navigateTo({
    url: "/pages/task/task",
  })
}

const todayJump = () => {
  uni.navigateTo({
    url: "/pages/today/today"
  })
}

const contractJump = ()=>{
	uni.navigateTo({
		url:"/pages/contract/contract"
	})
}

const skillJump = ()=>{
	uni.navigateTo({
		url:"/pages/skill/skill"
	})
}
</script>

<template>
  <view class="page-container">
    <!-- 微信小程序专用背景层 -->
    <view class="bg-layer"></view>
    
    <view class="main">
      <!-- 用户信息区域 -->
      <view class="user-card glass-card">
        <view class="avatar-section">
          <image :src="img" class="avatar" mode="aspectFill"/>
          <view class="user-info">
            <view class="welcome-text">你好，学习者</view>
            <view class="streak-text">已坚持 {{ continuousDay }} 天</view>
          </view>
        </view>
        <view class="coin-section glass-card-inner">
          <image :src="coin" class="coin-icon" mode="aspectFit"/>
          <view class="coin-value">{{ currency }}</view>
        </view>
      </view>
      
      <!-- 合约进度 -->
      <view class="progress-card glass-card" @click="contractJump">
        <view class="card-header">
          <text class="card-title">合约进度</text>
          <text class="progress-text">{{ progress }}%</text>
        </view>
        <view class="progress-bar-container">
          <Progress :width="progress+'%'"></Progress>
        </view>
      </view>
      
      <!-- 今日计划 -->
      <view class="plan-card glass-card" @click="taskJump">
        <view class="plan-header">
          <text class="plan-days">坚持第 {{ continuousDay }} 天</text>
        </view>
        <view class="plan-action">
          <text class="action-text">开始今日计划</text>
        </view>
      </view>
      
      <!-- 功能区域 -->
      <view class="fun-section">
        <view class="today-card glass-card" @click="todayJump">
          <view class="card-icon">📋</view>
          <view class="card-label">查看</view>
          <view class="card-label">今日计划</view>
        </view>
        <view class="skill-group">
          <view class="skill-card glass-card" @click="achiveJump">
            <view class="card-icon">🏆</view>
            <view class="card-label">成就</view>
          </view>
          <view class="skill-card glass-card" @click="skillJump">
            <view class="card-icon">💎</view>
            <view class="card-label">技能卡</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
$glass-bg: rgba(255, 255, 255, 0.25);
$glass-border: rgba(255, 255, 255, 0.3);
$text-primary: #2d3748;
$text-secondary: #718096;

/* 微信小程序 page 样式 */
page {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #667eea; /* 兜底背景色 */
}

/* 微信小程序专用固定背景层 */
.bg-layer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  z-index: -1;
}

.page-container {
  min-height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
}

.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

/* 微信小程序兼容的毛玻璃卡片 */
.glass-card {
  background: $glass-bg;
  /* 降级处理：微信小程序不支持 backdrop-filter 时使用半透明背景 */
  border: 1px solid $glass-border;
  border-radius: 1.2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  
  &:active {
    transform: scale(0.98);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
}

.glass-card-inner {
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 0.8rem;
}

/* 用户卡片 */
.user-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem;
  
  .avatar-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .avatar {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.35);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
  
  .user-info {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  
  .welcome-text {
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
  }
  
  .streak-text {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .coin-section {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
  }
  
  .coin-icon {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
  }
  
  .coin-value {
    font-size: 1.2rem;
    font-weight: 700;
    color: white;
  }
}

/* 进度卡片 */
.progress-card {
  padding: 1.2rem;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .card-title {
    font-size: 1rem;
    font-weight: 600;
    color: white;
  }
  
  .progress-text {
    font-size: 1.3rem;
    font-weight: 700;
    color: white;
  }
  
  .progress-bar-container {
    margin-top: 0.5rem;
  }
}

/* 计划卡片 */
.plan-card {
  padding: 1.5rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
  
  .plan-header {
    .plan-days {
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.95);
      font-weight: 500;
    }
  }
  
  .plan-action {
    text-align: center;
    
    .action-text {
      font-size: 1.8rem;
      font-weight: 700;
      color: white;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    }
  }
}

/* 功能区域 */
.fun-section {
  display: flex;
  gap: 1rem;
  
  .today-card {
    width: 48%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    padding: 1.5rem 0.5rem;
  }
  
  .skill-group {
    width: 48%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .skill-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    justify-content: center;
    align-items: center;
    padding: 0.8rem 0.5rem;
  }
  
  .card-icon {
    font-size: 1.8rem;
    margin-bottom: 0.3rem;
  }
  
  .card-label {
    font-size: 1rem;
    font-weight: 600;
    color: white;
  }
}
</style>