<script setup>
import { ref } from 'vue';
import user from "../../public/client-o.png"

const img = ref(null)
const show = ref(true)
const status = ref(false)

const chooseAvatar = () => {
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'], 
    sourceType: ['album', 'camera'],
    success: (res) => {
      img.value = res.tempFilePaths[0];
	  show.value=false
    },
    fail: (err) => {
      console.error("选择图片失败:", err);
    }
  });
};
</script>

<template>
	<view class="main">
		<view class="layout">
			<view class="profile">
				<view class="msg">
					<label for="icon" class="icon-set" @click="chooseAvatar">
						<image :src="img?img:user"></image>
					</label>
					<view class="name">未登录</view>
				</view>
				<view class="login" v-if="!status">登录/注册</view>
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
$background-light: #f5f5f5;
$background-dark: #e0e0e0;
page{
	margin: 0;
	padding: 0;
}
.main{
	margin: 3rem 1rem;
	padding: 0.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
}
.layout{
	background-color: $background-light;
	width: 100%;
	padding: 1rem 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	border-radius: 0.5rem;
	box-sizing: border-box;
}
.profile{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	font-size: 1.2rem;
	position: relative;
	box-sizing: border-box;
	width: 100%;
	.msg{
		display: flex;
		align-items: center;
		gap: 0.5rem;
		.icon-set{
			top: 38%;
			left:1.5rem;
			z-index: 5;
			font-size: 1rem;
		}
		image{
			width: 5rem;
			height: 5rem;
			border-radius: 100%;
			// background-color: $background-dark;
			border:solid 1px $background-dark;
		}
	}
	.login{
		background-color: gray;
		padding: 0.2rem;
		border-radius: 0.5rem;
	}
}
.buts{
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	gap: 1.5rem;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	// background-color: $background-dark;
	border-radius: 0.5rem;
	padding: 1rem;
	.buts-point{
		width: 100%;
		background-color: lightgray;
		padding: 0.7rem;
		font-size: 1.2rem;
		border-radius: 0.5rem;
		box-sizing: border-box;
		&:hover{
			background-color: white;
			transition:all;
			transition-duration: 500ms;
		}
	}
}
</style>
