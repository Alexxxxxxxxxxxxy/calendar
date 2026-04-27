<script setup>
import { ref } from 'vue';
import { useUserContext,useUserContextProvider } from '../../context/userContext';
import {onShow} from "@dcloudio/uni-app"

const { token, updateContinuousDay, updateProgress } = useUserContext()

const rewards = ref([])
const honors = ref([])

const fetchData = ()=>{
	if (!token.value) {
	  return
	}
	
	uni.showLoading({
	  title: '加载中...',
	  mask: true
	})
	
	uni.request({
	  url: "http://106.53.182.241:8000/api/achievement/list",
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
		rewards.value = res.data.data
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
	uni.showLoading({
	  title: '加载中...',
	  mask: true
	})
	uni.request({
	  url: "http://106.53.182.241:8000/api/honor/list",
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
		honors.value = res.data.data
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

const handleItemClick = (item)=>{
	
}

</script>

<template>
	<view class="page-container">
		<!-- 微信小程序专用背景层 -->
		<view class="bg-layer"></view>
		
		<view class="main">
			<!-- 成就墙 - 金色主题，代表个人成长里程碑 -->
			<view class="page-header achievement-header">
				<view class="header-title">🏆 成就墙</view>
				<view class="header-subtitle">见证你的每一次成长</view>
			</view>
			
			<view class="achievement-wall glass-card">
				<view class="wall-grid">
					<view v-for="(item,index) in rewards" :key="index" class="achievement-item" @click="handleItemClick(item)">
						<view class="achievement-badge">
							<view class="badge-inner">
								<view class="badge-icon">⭐</view>
							</view>
						</view>
						<view class="achievement-name">{{item.name}}</view>
					</view>
					
					<!-- 成就空状态 -->
					<view v-if="rewards.length === 0" class="empty-state achievement-empty">
						<view class="empty-icon">🎯</view>
						<view class="empty-text">暂无成就</view>
						<view class="empty-subtext">继续努力，解锁更多成就</view>
					</view>
				</view>
			</view>
			
			<!-- 荣誉墙 - 蓝色水晶主题，代表更高的认可与奖励 -->
			<view class="page-header honor-header">
				<view class="header-title">💎 荣誉墙</view>
				<view class="header-subtitle">记录你的高光时刻</view>
			</view>
			
			<view class="honor-wall glass-card">
				<view class="wall-grid">
					<view v-for="(item,index) in honors" :key="index" class="honor-item" @click="handleItemClick(item)">
						<view class="honor-badge">
							<view class="badge-inner">
								<view class="badge-icon">🏅</view>
							</view>
						</view>
						<view class="honor-name">{{item.name}}</view>
					</view>
					
					<!-- 荣誉空状态 -->
					<view v-if="honors.length === 0" class="empty-state honor-empty">
						<view class="empty-icon">✨</view>
						<view class="empty-text">暂无荣誉</view>
						<view class="empty-subtext">再接再厉，创造更多高光</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
$glass-bg: rgba(255, 255, 255, 0.18);
$glass-border: rgba(255, 255, 255, 0.25);
$glass-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.12);

/* 成就墙配色 - 金色暖调 */
$achievement-gold: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
$achievement-bg: rgba(255, 215, 0, 0.15);
$achievement-border: rgba(255, 215, 0, 0.3);

/* 荣誉墙配色 - 蓝色水晶调 */
$honor-blue: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
$honor-bg: rgba(79, 172, 254, 0.15);
$honor-border: rgba(79, 172, 254, 0.3);

$text-primary: #2d3748;
$text-secondary: #718096;

/* 微信小程序 page 样式 */
page {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #667eea;
  overflow-x: hidden;
}

/* 微信小程序专用固定背景层 */
.bg-layer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $primary-gradient;
  z-index: -1;
  
  /* 增加背景层次感 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.12) 0%, transparent 50%);
  }
}

.page-container {
  min-height: 100vh;
  padding: 40rpx 30rpx;
  box-sizing: border-box;
  position: relative;
}

.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60rpx;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

/* 页面头部 - 通用 */
.page-header {
  text-align: center;
  padding: 20rpx 0;
  position: relative;
  
  .header-title {
    font-size: 48rpx;
    font-weight: 800;
    color: white;
    margin-bottom: 16rpx;
    text-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
    letter-spacing: 2rpx;
  }
  
  .header-subtitle {
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 400;
  }
}

/* 成就墙专属头部 */
.achievement-header {
  .header-title {
    text-shadow: 0 4rpx 20rpx rgba(255, 215, 0, 0.3);
  }
}

/* 荣誉墙专属头部 */
.honor-header {
  .header-title {
    text-shadow: 0 4rpx 20rpx rgba(79, 172, 254, 0.3);
  }
}

/* 微信小程序兼容的毛玻璃卡片 */
.glass-card {
  background: $glass-bg;
  border: 1px solid $glass-border;
  border-radius: 40rpx;
  box-shadow: $glass-shadow;
  padding: 50rpx 40rpx;
  position: relative;
  box-sizing: border-box;
  backdrop-filter: blur(20rpx);
  -webkit-backdrop-filter: blur(20rpx); /* 兼容 iOS 微信小程序 */
}

/* 通用网格布局 */
.wall-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40rpx 30rpx;
  padding: 10rpx;
}

/* ==================== 成就墙样式 - 金色圆形徽章 ==================== */
.achievement-wall {
  .achievement-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24rpx;
    padding: 30rpx 20rpx;
    background: $achievement-bg;
    border-radius: 32rpx;
    border: 1px solid $achievement-border;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    
    /* 金色光泽层 */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, transparent 50%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:active {
      transform: scale(0.96);
      background: rgba(255, 215, 0, 0.25);
      
      &::before {
        opacity: 1;
      }
    }
    
    .achievement-badge {
      width: 120rpx;
      height: 120rpx;
      background: $achievement-gold;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 12rpx 40rpx rgba(246, 211, 101, 0.4);
      position: relative;
      
      .badge-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        
        /* 徽章高光 */
        &::after {
          content: '';
          position: absolute;
          top: 10rpx;
          left: 20rpx;
          width: 40rpx;
          height: 20rpx;
          background: rgba(255, 255, 255, 0.45);
          border-radius: 50%;
          transform: rotate(-30deg);
        }
      }
      
      .badge-icon {
        font-size: 56rpx;
        z-index: 1;
      }
    }
    
    .achievement-name {
      font-size: 26rpx;
      font-weight: 700;
      color: white;
      text-align: center;
      line-height: 1.3;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
    }
  }
}

/* ==================== 荣誉墙样式 - 蓝色六边形水晶徽章 ==================== */
.honor-wall {
  .honor-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24rpx;
    padding: 30rpx 20rpx;
    background: $honor-bg;
    border-radius: 24rpx;
    border: 1px solid $honor-border;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    
    /* 蓝色光泽层 */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(79, 172, 254, 0.2) 0%, transparent 50%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:active {
      transform: scale(0.96);
      background: rgba(79, 172, 254, 0.25);
      
      &::before {
        opacity: 1;
      }
    }
    
    .honor-badge {
      width: 120rpx;
      height: 120rpx;
      background: $honor-blue;
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 12rpx 40rpx rgba(79, 172, 254, 0.4);
      position: relative;
      
      .badge-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        
        /* 水晶高光 */
        &::after {
          content: '';
          position: absolute;
          top: 15rpx;
          left: 15rpx;
          width: 30rpx;
          height: 30rpx;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
        }
      }
      
      .badge-icon {
        font-size: 52rpx;
        z-index: 1;
      }
    }
    
    .honor-name {
      font-size: 26rpx;
      font-weight: 700;
      color: white;
      text-align: center;
      line-height: 1.3;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
    }
  }
}

/* 空状态 - 通用 */
.empty-state {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30rpx;
  padding: 100rpx 40rpx;
  
  .empty-icon {
    font-size: 120rpx;
    opacity: 0.7;
    animation: float 3s ease-in-out infinite; /* 浮动动画 */
  }
  
  .empty-text {
    font-size: 32rpx;
    font-weight: 700;
    color: white;
    text-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  }
  
  .empty-subtext {
    font-size: 26rpx;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 400;
  }
}

/* 成就空状态 */
.achievement-empty {
  .empty-icon {
    animation-delay: 0s;
  }
}

/* 荣誉空状态 */
.honor-empty {
  .empty-icon {
    animation-delay: 0.5s;
  }
}

/* 浮动动画关键帧 */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20rpx);
  }
}
</style>