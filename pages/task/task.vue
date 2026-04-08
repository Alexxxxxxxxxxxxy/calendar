<script setup>
import start_gray from "../../public/start.png"
import start_yellow from "../../public/start-yellow.png"
import { computed, ref } from 'vue';
import {onLoad} from "@dcloudio/uni-app"

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
onLoad(()=>{
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
			console.log(res.data.data)
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
	<view class="main">
		<view class="header">
			试炼任务
		</view>
		<view class="body">
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
			<view class="diff">
				<text>任务完成情况：</text>
				<view class="diff-list">
					<image 
					  v-for="(start, index) in starts" 
					  @click="handleStartClick(index)" 
					  class="diff-point" 
					  :key="index" 
					  :src="index >= t ? start_gray : start_yellow"
					/>
				</view>
			</view>
			<view class="master">
				<text>状态评估：</text>
				<view class="master-list">
					<view v-for="(point,index) in points" class="master-point" @click="handlePointClick(index)" :key="index" :class="{'active-master':index<n}"></view>
				</view>
			</view>
			<view class="plan" @click="planJump">查看调整后的计划</view>
			<button size="mini" class="confirm">确认</button>
		</view>
	</view>
</template>

<style scoped lang="scss">
$background-light: #f5f5f5;
$background-dark: #e0e0e0;
$primary-color: #4a90e2;   
page{
	margin: 0;
	padding: 0;
}
.main{
	display: flex;
	flex-direction: column;
	margin: 1rem;
	background-color: $background-light;
	gap: 1rem;
	box-sizing: border-box;
	border-radius: 0.5rem;
	box-sizing: border-box;
}
.header{
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.5rem 0;
	background-color: $background-dark;
	border-radius: 0.5rem 0.5rem 0 0;
	box-sizing: border-box;
}
.body{
	@extend .header;
	flex-direction: column;
	background-color: inherit;
	gap: 1rem;
	.title{
		width: 100%;
		display: flex;
		box-sizing: border-box;
		justify-content: space-between;
		align-items: center;
		padding: 0 0.5rem;
		.project{
			background-color: $background-dark;
			padding: 0.2rem;
			border-radius: 0.2rem 0.3rem;
			box-sizing: border-box;
		}
		.time{
			@extend .project;
		}
	}
	.tasks{
		width: 80%;
		min-height: 5rem;
		background-color: $background-dark;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}
	.start{
		border: none;
		background-color: $primary-color;
		color: white;
		&:hover{
			background-color: darken($color: $primary-color, $amount: 10%);
		}
	}
}
.other{
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	
	.diff{
		width: 100%;
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 0.5rem;
		margin: 0.2rem;
		font-size: 1rem;
		box-sizing: border-box;
		flex-direction: row;
		justify-content: space-between;
		.diff-list{
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			box-sizing: border-box;
			align-items: center;
			width: 50%;
			.diff-point{
				width: 1.5rem;
				height: 1.5rem;
			}
		}
	}
	.master{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 1rem;
		padding: 0.5rem;
		margin: 0.2rem;
		font-size: 1rem;
		box-sizing: border-box;
		.master-list{
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			box-sizing: border-box;
			.master-point{
				width: 3rem;
				height: 3rem;
				border: solid 1px $background-dark;
				border-radius: 100%;
				background-color: $background-light;
				box-sizing: border-box;
			}
			.master-point::hover{
				cursor: pointer;
				box-sizing: border-box;
			}
		}
	}
}
.active-master {
  background-color: greenyellow !important;
  border-color: #4a90e2 !important;
}
.plan{
	background-color: $background-dark;
	padding: 0.2rem 0.5rem;
	border-radius: 0.3rem;
}
.confirm{
	margin-bottom: 1rem;
	border: none;
	background-color: $primary-color;
	color: white;
	&:hover{
		background-color: darken($color: $primary-color, $amount: 10%);
	}
}
</style>
