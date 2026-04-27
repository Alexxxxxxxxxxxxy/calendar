<script setup>
import { computed, ref, watch } from 'vue';
import user from "../../public/client-o.png"
import Login from "@/components/Login.vue"
import { onHide, onShow } from "@dcloudio/uni-app"
import { useUserContextProvider, useUserContext } from "@/context/userContext.js"


const { token, UserName, updateName } = useUserContext()

const img = ref(null)
const show = ref(true)
const status = ref(false)
const loginshow = ref(false)
const userinfo = ref(UserName.value || "未登录")

watch(UserName, (newVal) => {
	if (newVal) {
		userinfo.value = newVal
		status.value = true
	}
})

onShow(() => {
	if (token.value) {
		status.value = true
		if (UserName.value) {
			userinfo.value = UserName.value
		}
	}
})

onHide(() => {
	loginshow.value = false;
})

const chooseAvatar = () => {
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'], 
    sourceType: ['album', 'camera'],
    success: (res) => {
      const avatarPath = res.tempFilePaths[0]
      img.value = avatarPath
      show.value = false
      uni.setStorageSync('avatar', avatarPath)
    },
    fail: (err) => {
      console.error("选择图片失败:", err);
    }
  });
};

const handleClick = () => {
	loginshow.value = true;
}

const handleClose = () => {
	loginshow.value = false;
}
</script>

<template>
	<view class="form" v-if="loginshow">
		<Login @close="handleClose"></Login>
	</view>
	<view class="main">
		<view class="layout">
			<view class="profile">
				<view class="msg">
					<label for="icon" class="icon-set" @click="chooseAvatar">
						<image :src="img?img:user" class="avatar-img"></image>
						<view class="avatar-edit-icon">+</view>
					</label>
					<view class="name">{{ userinfo }}</view>
				</view>
				<view class="login" v-if="!status" @click="handleClick">登录/注册</view>
			</view>
			<view class="buts">
				<view class="buts-point">我的数据和报告</view>
				<view class="buts-point">我的合约</view>
				<view class="buts-point">我的货币</view>
				<view class="buts-point">会员中心</view>
				<view class="buts-point">帮助中心</view>
				<view class="buts-point">设置</view>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
// ... 样式完全不变，直接复制你原来的样式 ...
$primary-color: #6366f1;
$glass-bg: rgba(255, 255, 255, 0.6);
$glass-border: rgba(255, 255, 255, 0.3);

page {
	margin: 0;
	padding: 0;
	background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 50%, #c7d2fe 100%);
	min-height: 100vh;
}

.main {
	position: relative;
	padding: 60rpx 30rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	min-height: 100vh;
}

.form{
	margin: 0;
	position: fixed;
	width: 100vw;
	height: 100vh;
	z-index: 5;
	background-color: whitesmoke;
	box-sizing: border-box;
}

.layout {
	background: $glass-bg;
	backdrop-filter: blur(40rpx);
	-webkit-backdrop-filter: blur(40rpx);
	border: 2rpx solid $glass-border;
	width: 100%;
	max-width: 650rpx;
	padding: 50rpx 40rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	border-radius: 40rpx;
	box-sizing: border-box;
	box-shadow: 0 25rpx 50rpx -12rpx rgba(0, 0, 0, 0.1);
}

.profile {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 30rpx;
	font-size: 1.2rem;
	position: relative;
	box-sizing: border-box;
	width: 100%;
	margin-bottom: 50rpx;
	
	.msg {
		display: flex;
		align-items: center;
		gap: 24rpx;
		
		.icon-set {
			position: relative;
			display: block;
			cursor: pointer;
			
			.avatar-img {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				border: 6rpx solid rgba(255, 255, 255, 0.8);
				box-shadow: 0 10rpx 25rpx rgba(99, 102, 241, 0.2);
				background-color: #e0e7ff;
			}
			
			.avatar-edit-icon {
				position: absolute;
				bottom: 5rpx;
				right: 5rpx;
				width: 44rpx;
				height: 44rpx;
				background: $primary-color;
				color: white;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32rpx;
				font-weight: bold;
				border: 4rpx solid white;
				box-shadow: 0 4rpx 10rpx rgba(99, 102, 241, 0.3);
			}
		}
		
		.name {
			font-size: 36rpx;
			font-weight: 600;
			color: #1f2937;
			letter-spacing: 1rpx;
		}
	}
	
	.login {
		background: linear-gradient(135deg, $primary-color 0%, #8b5cf6 100%);
		color: white;
		padding: 18rpx 40rpx;
		border-radius: 50rpx;
		font-size: 28rpx;
		font-weight: 500;
		box-shadow: 0 10rpx 20rpx rgba(99, 102, 241, 0.3);
		transition: all 0.3s ease;
		
		&:active {
			transform: scale(0.95);
		}
	}
}

.buts {
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 24rpx;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	padding: 0;
	
	.buts-point {
		width: 100%;
		background: rgba(255, 255, 255, 0.7);
		padding: 30rpx 32rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #374151;
		border-radius: 24rpx;
		box-sizing: border-box;
		border: 2rpx solid rgba(255, 255, 255, 0.5);
		box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.03);
		transition: all 0.3s ease;
		position: relative;
		
		&::after {
			content: '›';
			position: absolute;
			right: 32rpx;
			top: 50%;
			transform: translateY(-50%);
			font-size: 40rpx;
			color: #9ca3af;
			font-weight: 300;
		}
		
		&:active {
			background: white;
			transform: translateY(-2rpx);
			border-color: $primary-color;
		}
	}
}
</style>