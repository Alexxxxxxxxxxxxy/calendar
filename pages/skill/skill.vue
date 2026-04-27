<script setup>
import SkillCar from "../../components/SkillCar.vue"
import { useUserContext,useUserContextProvider } from '../../context/userContext';

useUserContextProvider()
const { token, updateContinuousDay, updateProgress } = useUserContext()

import {onShow} from "@dcloudio/uni-app"

import {ref} from "vue"
const incre = ref(0)
const replace = ref(0)
const remit = ref(0)
onShow(()=>{
	uni.showLoading({
		title:"加载中...",
		mask:true
	})
	uni.request({
		url:"http://106.53.182.241:8000/api/client/bag",
		method:"GET",
		header:{
			"Content-Type":"application/json",
			"Authorization": "Bearer " + token.value,
		},
		success:(res)=>{
			if(res.statusCode!=200){
				uni.showToast({
					icon:"none",
					title:"请求失败"+res.statusCode,
					duration:2000
				})
				return 
			}
			incre.value = res.data.data.cards[0].count
			replace.value = res.data.data.cards[1].count
			remit.value = res.data.data.cards[2].count
		},
		fail:(err)=>{
			uni.showToast({
			  title: err.errMsg || "网络请求失败",
			  icon: "none", 
			  duration: 2000
			})
			
		},complete:()=>{
			uni.hideLoading()
		}
	})
})

const jumpReduce = ()=>{
	uni.navigateTo({
		url:"/pages/reduce/reduce"
	})
}
const jumpReorder = () =>{
	uni.navigateTo({
		url:"/pages/reorder/reorder"
	})
}
</script>

<template>
	<view class="page-container">
		<!-- 微信小程序专用背景层 -->
		<view class="bg-layer"></view>
		
		<view class="main">
			<view class="page-header">
				<view class="header-title">💎 技能卡库存</view>
				<view class="header-subtitle">你的专属学习道具</view>
			</view>
			
			<view class="card-container">
				<view @click="jumpReduce"><SkillCar text="减负卡" :num="incre" color="#667eea"></SkillCar></view>
				<view @click="jumpReorder"><SkillCar text="重排卡" :num="replace" color="#f093fb"></SkillCar></view>
				<SkillCar text="免罚卡" :num="remit" color="#f6d365"></SkillCar>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
$glass-bg: rgba(255, 255, 255, 0.25);
$glass-border: rgba(255, 255, 255, 0.3);

/* 微信小程序 page 样式 */
page {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #667eea;
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
  gap: 1.5rem;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

/* 页面头部 */
.page-header {
  text-align: center;
  padding: 1rem 0;
  
  .header-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .header-subtitle {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.85);
  }
}

/* 卡片容器 */
.card-container {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 0.5rem;
}
</style>