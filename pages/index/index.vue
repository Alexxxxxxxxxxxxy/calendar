<script setup>
import { ref } from 'vue';
import Progress from "@/components/Progress.vue"

import clientImg from "../../public/client-o.png"
import coinImg from "../../public/Coin.png"

const img = ref(clientImg)
const coin = ref(coinImg)
const currency = ref(0)
const progress = ref(50)

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
  <view class="main">
    <view class="dum">
      <image :src="img" class="dum-point1" mode="aspectFill"/>
      <view class="dum-point2">
        <image :src="coin" class="coin" mode="aspectFit"/>
        <view class="currency">{{currency}}</view>
      </view>
    </view>
    
    <view class="agree" @click="contractJump">
      <text>合约进度：</text>
      <view style="margin: 1rem 0;"><Progress :width="progress+'%'"></Progress></view>
      <text>已完成50%</text>
    </view>
    
    <view class="plan" @click="taskJump">
      <text>坚持第N天</text>
      <text>开始今日计划</text>
    </view>
    
    <view class="fun">
      <view class="check" @click="todayJump">
        <view>查看</view>
        <view>今日计划</view>
      </view>
      <view class="skill">
        <view class="skill-point" @click="achiveJump">成就</view>
        <view class="skill-point" @click="skillJump">技能卡</view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
$background-light: #f5f5f5;

page {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.main {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
}

.dum {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
  padding: 0.5rem;
  box-sizing: border-box;

  .dum-point1 {
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
    box-sizing: border-box;
    border: solid 1px $background-light;
    background-color: $background-light;
  }

  .dum-point2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 7rem;
    height: 2rem;
    border-radius: 0.2rem;
    box-sizing: border-box;
    padding: 0.5rem;

    .coin {
      width: 1.8rem;
      height: 1.8rem;
      flex-shrink: 0;
    }
  }
}

.agree {
  text-align: center;
  align-items: center;
  margin: 1rem;
  height: auto;
  padding: 0.5rem;
  background-color: $background-light;
  border-radius: 0.5rem;
  font-size: 1rem;
  box-sizing: border-box;
}

.plan {
  @extend .agree;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.8rem;
  justify-content: center;
  align-items: start;

  text:nth-child(1) {
    font-size: 1rem;
  }

  text:nth-child(2) {
    width: 100%;
    margin: 2rem 0;
    margin-bottom: 3rem;
    text-align: center;
    font-size: 2rem;
  }
}

.fun {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
  height: auto;
  box-sizing: border-box;

  .check {
    background-color: $background-light;
    width: 47%;
    height: 10rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    font-size: 1.5rem;
    border-radius: 0.3rem;
    box-sizing: border-box;
  }

  .skill {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    font-size: 1.5rem;
    width: 47%;
    height: 10rem;
    box-sizing: border-box;

    .skill-point {
      background-color: $background-light;
      width: 100%;
      height: 50%;
      padding: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      border-radius: 0.3rem;
      box-sizing: border-box;
    }
  }
}
</style>