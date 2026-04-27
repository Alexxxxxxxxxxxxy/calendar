<script setup>
const props = defineProps({
	text:{
		type:String,
		required:true
	},
	num:{
		type:Number,
		required:true
	},
	color:{
		type:String,
		default:"#667eea"
	}
})
</script>

<template>
	<view class="main glass-card">
		<view class="card-left">
			<view class="star-badge" :style="{'background-color': props.color}">
				<view class="star-icon">⭐</view>
			</view>
			<view class="card-info">
				<view class="card-name">{{props.text}}</view>
				<view class="card-desc">学习助力道具</view>
			</view>
		</view>
		
		<view class="card-right">
			<view class="storage-display">
				<view class="storage-num">× {{props.num}}</view>
			</view>
			<view class="action-btn">
				<text class="action-text">使用</text>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
$glass-bg: rgba(255, 255, 255, 0.3);
$glass-border: rgba(255, 255, 255, 0.35);

/* 微信小程序兼容的毛玻璃卡片 */
.glass-card {
  background: $glass-bg;
  border: 1px solid $glass-border;
  border-radius: 1.2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.98);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
}

.main {
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 1.2rem;
}

.card-left {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
}

/* 星形徽章 */
.star-badge {
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
	position: relative;
	
	.star-icon {
		font-size: 2rem;
	}
}

.card-info {
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
	
	.card-name {
		font-size: 1.1rem;
		font-weight: 700;
		color: white;
	}
	
	.card-desc {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.7);
	}
}

.card-right {
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
	align-items: flex-end;
}

.storage-display {
	.storage-num {
		font-size: 1.3rem;
		font-weight: 700;
		color: white;
	}
}

.action-btn {
	padding: 0.4rem 1rem;
	background: rgba(255, 255, 255, 0.25);
	border-radius: 2rem;
	border: 1px solid rgba(255, 255, 255, 0.3);
	
	.action-text {
		font-size: 0.85rem;
		font-weight: 600;
		color: white;
	}
}
</style>