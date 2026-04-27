<script setup>
import { ref } from 'vue';
import { useUserContext,useUserContextProvider } from '@/context/userContext.js';
const emit = defineEmits(['close',"successLogin"]);
useUserContextProvider()
const { updateToken, updateVip, updateCoins, updateContinuousDay, token, updateName } = useUserContext()

const toggle = ref(true)

const handleClick = () => {
	toggle.value = !toggle.value;
}

const name = ref("")
const password = ref("")

const closeLogin = () => {
    emit('close');
}

const handleSubmit = () => {
	// 前端空值校验
	if (!name.value.trim() || !password.value.trim()) {
		uni.showToast({
			title: '请输入用户名和密码',
			icon: 'none'
		})
		return
	}

	uni.showLoading({
		title: '加载中...',
		mask: true
	})
	
	if (toggle.value) {
		// 登录请求
		uni.request({
			url: "http://106.53.182.241:8000/api/login",
			method: "POST",
			header: {
				"Content-Type": 'application/x-www-form-urlencoded'
			},
			data: {
				username: name.value,
				password: password.value,
				scope: "",
				client_id: "",
				client_secret: "",
				grant_type: "password"
			},
			success: (res) => {
				if (res.statusCode !== 200 || res.data.code!==200) {
					uni.showToast({
						title: `接口异常 ${res.statusCode}`,
						icon: "none"
					})
					return
				}
				
				// 安全取值
				const responseData = res.data?.data || res.data
				
				const tokenValue = responseData.token || ''
				
				// 更新上下文
				updateToken(tokenValue)
				updateVip(responseData.is_vip !== undefined ? responseData.is_vip : false)
				updateCoins(responseData.coins || 0)
				updateContinuousDay(responseData.continuous_days || 0)
				updateName(name.value)
				
				// 同时存本地
				uni.setStorageSync('token', tokenValue)
				uni.setStorageSync("NameUser",name.value)
				
				uni.showToast({
					title: "登录成功！",
					icon: "success",
					duration: 1000
				})
				
				// ✅ 优化：延迟关闭，确保状态更新完成 + 用户看到成功提示
				setTimeout(() => {
					emit("successLogin",name.value)
					name.value = ""
					password.value = ""
					emit("close")
				}, 1000)
			},
			fail: (err) => {
				uni.showToast({
					title: err.errMsg || "网络请求失败",
					icon: "none"
				})
			},
			complete: () => {
				uni.hideLoading()
			}
		})
	} else {
		// 注册请求
		uni.request({
			url: "http://106.53.182.241:8000/api/register",
			method: "POST",
			header: {
				"Content-Type": "application/json"
			},
			data: {
				username: name.value,
				password: password.value
			},
			success: (res) => {
				console.log('注册返回：', res)
				
				if (res.statusCode !== 200) {
					uni.showToast({
						title: `接口异常 ${res.statusCode}`,
						icon: "none"
					})
					return
				}
				
				// 注册成功：清空输入框 + 自动切换到登录
				name.value = ""
				password.value = ""
				toggle.value = true
				
				uni.showToast({
					title: "注册成功！",
					icon: "success",
					mask: true,
					duration: 1000
				})
			},
			fail: (err) => {
				uni.showToast({
					title: err.errMsg || "网络请求失败",
					icon: "none"
				})
			},
			complete: () => {
				uni.hideLoading()
			}
		})
	}
}
</script>

<template>
	<view class="main">
		<view class="delete" @click="closeLogin">X</view>
		<view class="head">
			{{toggle?"登录":"注册"}}
		</view>
		<view class="body">
			<view class="in">
				<label for="name">用户名：</label>
				<input type="text" id="name" v-model="name"/>
			</view>
			<view class="in">
				<label for="password">密码：</label>
				<input type="password" id="password" v-model="password"/>
			</view>
			<button class="login-btn" @click="handleSubmit">{{ toggle ? "登录" : "注册" }}</button>
		</view>
		<view class="footer">
			<text class="message">{{toggle?"没有账号？":"已有账号?"}}点击这里进行<text @click="handleClick" class="toggle">{{toggle?"注册":"登录"}}</text></text>
		</view>
	</view>
</template>

<style scoped lang="scss">
/* 样式完全不变，省略 */
.main{
	position: relative;
	z-index: 9999;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	width: 100vw;
	height: 100vh;
	padding: 40rpx;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	overflow: hidden;
	
	&::before {
		content: '';
		position: absolute;
		width: 600rpx;
		height: 600rpx;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 50%;
		top: -200rpx;
		right: -200rpx;
	}
	
	&::after {
		content: '';
		position: absolute;
		width: 400rpx;
		height: 400rpx;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 50%;
		bottom: -100rpx;
		left: -100rpx;
	}
}

.delete {
	position: absolute;
	top: 40rpx;
	right: 40rpx;
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: rgba(255, 255, 255, 0.8);
	font-size: 36rpx;
	font-weight: bold;
	cursor: pointer;
	z-index: 10;
	backdrop-filter: blur(10rpx);
	background: rgba(255, 255, 255, 0.1);
	border-radius: 50%;
	transition: all 0.3s ease;
	
	&:active {
		background: rgba(255, 255, 255, 0.2);
		transform: scale(0.95);
	}
}

.head{
	position: relative;
	z-index: 5;
	font-size: 56rpx;
	font-weight: bold;
	color: #ffffff;
	margin-bottom: 60rpx;
	text-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
	letter-spacing: 4rpx;
}

.body{
	position: relative;
	z-index: 5;
	width: 100%;
	max-width: 600rpx;
	backdrop-filter: blur(20rpx);
	-webkit-backdrop-filter: blur(20rpx);
	background: rgba(255, 255, 255, 0.15);
	border: 2rpx solid rgba(255, 255, 255, 0.2);
	border-radius: 32rpx;
	padding: 60rpx 40rpx;
	box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}

.in{
	display: flex;
	flex-direction: column;
	
	label {
		color: rgba(255, 255, 255, 0.9);
		font-size: 28rpx;
		margin-bottom: 16rpx;
		font-weight: 500;
		letter-spacing: 1rpx;
	}
	
	input {
		width: 100%;
		height: 88rpx;
		background: rgba(255, 255, 255, 0.2);
		border: 2rpx solid rgba(255, 255, 255, 0.25);
		border-radius: 20rpx;
		padding: 0 24rpx;
		font-size: 30rpx;
		color: #ffffff;
		box-sizing: border-box;
		transition: all 0.3s ease;
		backdrop-filter: blur(10rpx);
		
		&::placeholder {
			color: rgba(255, 255, 255, 0.5);
		}
		
		&:focus {
			outline: none;
			background: rgba(255, 255, 255, 0.25);
			border-color: rgba(255, 255, 255, 0.5);
			box-shadow: 0 0 0 4rpx rgba(255, 255, 255, 0.1);
		}
	}
}

.login-btn {
  position: relative;
  z-index: 5;
  width: 100%;
  height: 88rpx;
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
  backdrop-filter: blur(10rpx);
  -webkit-backdrop-filter: blur(10rpx);
  border: 2rpx solid rgba(255, 255, 255, 0.3);
  border-radius: 24rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
  letter-spacing: 2rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;
  
  &:active {
    transform: scale(0.97);
    background: linear-gradient(90deg, rgba(102, 126, 234, 1), rgba(118, 75, 162, 1));
    box-shadow: 0 4rpx 20rpx rgba(102, 126, 234, 0.4);
  }
}

.footer{
	position: relative;
	z-index: 5;
	margin-top: 50rpx;
	text-align: center;
}

.message{
	color: rgba(255, 255, 255, 0.85);
	font-size: 28rpx;
	letter-spacing: 0.5rpx;
}

.toggle{
	color: #ffffff;
	font-weight: bold;
	font-size: 30rpx;
	margin-left: 8rpx;
	padding: 8rpx 16rpx;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 12rpx;
	backdrop-filter: blur(10rpx);
	transition: all 0.3s ease;
	cursor: pointer;
	
	&:active {
		background: rgba(255, 255, 255, 0.3);
		transform: scale(0.96);
	}
}
</style>