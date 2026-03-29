<script setup>
import start_gray from "../public/start.png"
import start_yellow from "../public/start-yellow.png"
import { ref } from "vue";

const n = ref(0);
const points = Array.from({length: 5}, (_, i) => ({id: i}));

const handlePointClick = (index)=>{
	n.value = index+1
}

const t = ref(0);
const starts = Array.from({length: 5}, (_, i) => ({id: i}));
const handleStartClick = (index)=>{
	t.value = index+1
}

const project = ref("")
const knowledge = ref("")
const knowledges = ref([])
const testTime = ref("")
const targetScore = ref(null)
const credit = ref(null)

const handleSubmit = ()=>{
	if(!project.value){
		uni.showModal({
			title: '错误请求',
			content: '请输入学习科目！',
			showCancel:false,
		});
		return;
	}
	if(knowledges.value.length===0){
		uni.showModal({
			title: '错误请求',
			content: '请输入知识点！',
			showCancel:false,
		});
		return;
	}
	if(!testTime.value){
		uni.showModal({
			title: '错误请求',
			content: '请输入考试时间！',
			showCancel:false,
		});
		return;
	}
	if(!targetScore.value){
		uni.showModal({
			title: '错误请求',
			content: '请输入目标分数！',
			showCancel:false,
		});
		return;
	}
	if(!credit.value){
		uni.showModal({
			title: '错误请求',
			content: '请输入学分！',
			showCancel:false,
		});
		return;
	}
	project.value=""
	knowledge.value=""
	knowledges.value=[]
	testTime.value=""
	targetScore.value=null
	credit.value=null
	n.value=0
	t.value=0
}

const handleAdd = ()=>{
	if(knowledge.value.trim() === "" || !knowledge.value){
		uni.showModal({
			title: '错误请求',
			content: '知识点输入不能为空！',
			showCancel:false,
		});
		return;
	}
	knowledges.value.push(knowledge.value)
}

const emit = defineEmits(["close"])
const handleX = ()=>{
	emit("close",true)
}

</script>

<template>
	<view class="main">
		<view class="layout">
			<view class="close" @click="handleX">X</view>
			<view class="course">
				<label for="course">输入学习科目：</label>
				<input type="text" placeholder="高等数学" id="course" name="course" placeholder-class="course-holder" v-model="project"/>
			</view>
			<view class="point">
				<view class="input-point">
					<label for="point">请添加知识点：</label>
					<input type="text" placeholder="微积分" id="point" name="point" placeholder-class="point-holder" v-model="knowledge"/>
					<button class="addPoint" size="mini" @click="handleAdd">添加</button>
				</view>
				<view class="point-list">
					<view class="list-point" v-for="(kn, index) in knowledges" :key="index">
					  {{ kn }}
					</view>
				</view>
			</view>
			<view class="date">
				<label for="date">考试日期：</label>
				<input type="text" placeholder="1.11" id="date" name="date" placeholder-class="date-holder" v-model="testTime"/>
			</view>
			<view class="score">
				<label for="score">目标分数：</label>
				<input type="text" placeholder="100" id="score" name="score" placeholder-class="score-holder" v-model="targetScore"/>
			</view>
			<view class="credit">
				<label for="credit">学分：&emsp;&emsp;</label>
				<input type="number" placeholder="2" id="credit" name="credit" placeholder-class="credit-holder" v-model="credit"/>
			</view>
			<view class="master">
				<text>掌握程度：</text>
				<view class="master-list">
					<view v-for="(point,index) in points" class="master-point" @click="handlePointClick(index)" :key="index" :class="{'active-master':index<n}"></view>
				</view>
			</view>
			<view class="diff">
				<text>难度自评：</text>
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
		</view>
		<button size="mini" class="generate" @click="handleSubmit">生成计划</button>
	</view>
</template>

<style scoped lang="scss">
$primary-color: #4a90e2;    
$secondary-color: #5cb85c;  
$background-light: #f5f5f5;    
$card-background: #ffffff;     
$text-dark: #333333;           
$text-light: #666666;          
$border-color: #e0e0e0;

input:hover {
  border-color: $primary-color;
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
}
.main {
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 1rem;
  padding: 0.2rem;
  box-sizing: border-box;
  // background-color: $background-light;
}
.layout{
	display: block;
	width: 100%;
	height: auto;
	background-color: $card-background;
	padding: 0.2rem;
	padding-top: 1rem;
	padding-bottom: 1rem;
	border-radius: 0.5rem;
	border: solid 1px;
	border-color: $border-color;
	box-shadow: 5px 10px 5px rgba(0, 0, 0, 0.05);
	position: relative;
	box-sizing: border-box;
}
.close{
	width: 1rem;
	height: 1rem;
	position: absolute;
	text-align: right;
	right: 0.5rem;
	top: 0.5rem;
	box-sizing: border-box;
}
.course {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: flex-start;
  align-items: center;
  margin: 0.2rem;
  font-size: 0.8rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-sizing: border-box;

  #course {
    border:solid 1px #e0e0e0;
    border-radius: 0.5rem;
	background-color: $card-background;
	transition: border-color 0.3s;
    padding: 0.2rem;
  }
}	
.course-holder{
	font-size: 0.8rem;
	padding: 0.2rem;
	color: $text-light;
	box-sizing: border-box;
}
.point{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 1em;
	padding: 0.5rem;
	margin: 0.2rem;
	font-size: 0.8rem;
	box-sizing: border-box;
	.input-point{
		display: flex;
		flex-direction: row;
		gap: 1rem;
		justify-content: center;
		align-items: center;
		#point{
			border: solid 1px $border-color;
			border-radius: 0.5rem;
			padding: 0.2rem;
		}
	}
	.point-list{
		width: 100%;
		display: flex;
		flex-direction: row;
		gap: 1rem;
		justify-content: flex-start;
		align-items: center;
		.list-point{
			border: solid 1px $border-color;
		    padding: 0.3rem;
		    border-radius: 0.5rem;
		    background-color: $background-light;
		    color: $text-dark;
		}
	}
	.addPoint{
		background-color: $primary-color;
		border: none;
		color: white;
		&:hover{
			cursor: pointer;
			background-color: darken($primary-color, 10%);
		}
	}
}
.point-holder{
	@extend .course-holder;
}
.date{
	@extend .course;
	background-color: inherit;
	#date{
		@extend #course;
	}
}
.date-holder{
		@extend .course-holder;
}
.score{
	@extend .course;
	background-color: inherit;
	#score{
		@extend #course;
	}
}
.score-holder{
	@extend .course-holder;
}
.master{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 1rem;
	padding: 0.5rem;
	margin: 0.2rem;
	font-size: 0.8rem;
	box-sizing: border-box;
	.master-list{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		box-sizing: border-box;
		.master-point{
			width: 2rem;
			height: 2rem;
			border: solid 1px $border-color;
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
.active-master {
  background-color: greenyellow !important;
  border-color: #4a90e2 !important;
}
.credit{
	@extend .course;
	background-color: inherit;
	#credit{
		@extend #course;
	}
}
.credit-holder{
	@extend .course-holder;
}
.diff{
	@extend .master;
	flex-direction: row;
	justify-content: space-between;
	.diff-list{
		@extend .master-list;
		width: 50%;
		.diff-point{
			width: 1rem;
			height: 1rem;
		}
	}
}
.generate{
		background-color: $primary-color;
		color: white;
		border: none;
		box-sizing: border-box;
		&:hover{
			cursor: pointer;
			background-color: darken($primary-color, 10%);
		}
}
</style>