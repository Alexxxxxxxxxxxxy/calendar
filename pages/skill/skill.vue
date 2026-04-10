<script setup>
import SkillCar from "../../components/SkillCar.vue"

import {onLoad} from "@dcloudio/uni-app"

import {ref} from "vue"
const incre = ref(0)
const replace = ref(0)
const remit = ref(0)
onLoad(()=>{
	uni.showLoading({
		title:"加载中...",
		mask:true
	})
	uni.request({
		url:"http://106.53.182.241:8000/api/client/bag",
		method:"GET",
		header:{
			"Content-Type":"application/json"
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
</script>

<template>
	<view class="main">
		<view class="car">
			<view class="title">技能卡库存</view>
			<view class="display">
				<SkillCar text="减负卡" :num="incre"></SkillCar>
				<SkillCar text="重排卡" :num="replace"></SkillCar>
				<SkillCar text="免罚卡" :num="remit"></SkillCar>
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
	box-sizing: border-box;
}
.main{
	box-sizing: border-box;
	margin: 5rem 1rem;
}
.car{
	box-sizing: border-box;
	background-color: $background-light;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 0.5rem;
	gap: 0.5rem;
	.title{
		padding: 0.5rem;
	}
	.display{
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
		box-sizing: border-box;
		padding: 3rem 1rem;
		background-color: $background-dark;
		width: 100%;
		border-radius: 0 0 0.5rem 0.5rem;
	}
}
</style>
