<script setup>
import start_gray from "../public/start.png"
import start_yellow from "../public/start-yellow.png"
import { ref } from "vue";
import { useUserContext } from '../context/userContext.js';

const { token , coins } = useUserContext()

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
const available_time = ref(0)
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
	else{
		let result = testTime.value.split(",")
		console.log(result)
		if(result.length!==3 || result[0].length<4 || result[1].length!==2 || result[2].length!==2){
			uni.showModal({
				title: '错误请求',
				content: '考试时间格式不正确！(YYYY-MM-DD)',
				showCancel:false,
			});
			return;
		}
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
	if(!token.value){
		uni.showToast({
			title:"请先登录！",
			icon:"none",
			duration:1500
		})
		return
	}
	
	uni.showLoading({
		title: '加载中...',
		mask: true
	})
	uni.request({
		url:"http://106.53.182.241:8000/api/plan/generate",
		method:"POST",
		header:{
			"Content-Type":"application/json",
			"Authorization": "Bearer " + token.value,
		},
		data:{
			subject_name:project.value,
			knowledge_scope:knowledges.value,
			exam_date:testTime.value,
			target_score:targetScore.value,
			daily_available_minutes:0,
			credits:credit.value,
			mastery_level:n.value,
			difficulty_rating:t.value,
			contract_days:30,
			deposit_coins:coins.value,
			plan_type:"string",
			first_day_minutes:0,
		}
	})
	
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
	knowledge.value = ""
}

const emit = defineEmits(["close"])
const handleX = ()=>{
	emit("close",true)
}

</script>

<template>
	<view class="modal-overlay">
		<!-- 微信小程序专用背景层 -->
		<view class="modal-bg"></view>
		
		<view class="main">
			<view class="layout glass-card">
				<view class="close-btn" @click="handleX">
					<text class="close-icon">✕</text>
				</view>
				
				<view class="form-title">创建学习计划</view>
				
				<view class="form-group">
					<label class="form-label">输入学习科目</label>
					<input type="text" placeholder="例如：高等数学" class="form-input" v-model="project"/>
				</view>
				
				<view class="form-group">
					<label class="form-label">添加知识点</label>
					<view class="input-with-btn">
						<input type="text" placeholder="例如：微积分" class="form-input flex-1" v-model="knowledge"/>
						<button class="add-btn" size="mini" @click="handleAdd">
							<text class="add-icon">+</text>
						</button>
					</view>
					<view class="tag-list" v-if="knowledges.length > 0">
						<view class="tag-item" v-for="(kn, index) in knowledges" :key="index">
							{{ kn }}
						</view>
					</view>
				</view>
				
				<view class="form-row">
					<view class="form-group flex-1">
						<label class="form-label">考试日期</label>
						<input type="text" placeholder="2026-01-11" class="form-input" v-model="testTime"/>
					</view>
					<view class="form-group flex-1">
						<label class="form-label">目标分数</label>
						<input type="text" placeholder="100" class="form-input" v-model="targetScore"/>
					</view>
				</view>
				
				<view class="form-group">
					<label class="form-label">学分</label>
					<input type="number" placeholder="2" class="form-input" v-model="credit"/>
				</view>
				
				<view class="form-group">
					<label class="form-label">掌握程度</label>
					<view class="rating-row">
						<view 
						  v-for="(point,index) in points" 
						  class="rating-dot" 
						  @click="handlePointClick(index)" 
						  :key="index" 
						  :class="{'active': index < n}"
						></view>
					</view>
				</view>
				
				<view class="form-group">
					<label class="form-label">难度自评</label>
					<view class="rating-row">
						<image 
						  v-for="(start, index) in starts" 
						  @click="handleStartClick(index)" 
						  class="rating-star" 
						  :key="index" 
						  :src="index >= t ? start_gray : start_yellow"
						/>
					</view>
				</view>
			</view>
			
			<button class="submit-btn" @click="handleSubmit">
				<text class="submit-text">生成计划</text>
			</button>
		</view>
	</view>
</template>

<style scoped lang="scss">
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$success-gradient: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
$glass-bg: rgba(255, 255, 255, 0.95);
$glass-border: rgba(255, 255, 255, 0.3);
$input-border: rgba(102, 126, 234, 0.3);
$text-primary: #2d3748;
$text-secondary: #718096;
$text-light: #a0aec0;

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 1rem;
  box-sizing: border-box;
}

/* 微信小程序专用模态框背景 */
.modal-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
  z-index: -1;
}

.main {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

/* 微信小程序兼容的卡片样式 */
.glass-card {
  background: $glass-bg;
  border: 1px solid $glass-border;
  border-radius: 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  position: relative;
  box-sizing: border-box;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:active {
    background: rgba(0, 0, 0, 0.1);
    transform: scale(0.9);
  }
  
  .close-icon {
    font-size: 1.2rem;
    color: $text-secondary;
    font-weight: 300;
  }
}

.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: $text-primary;
  margin-bottom: 1.5rem;
  text-align: center;
  /* 微信小程序兼容：简化渐变文字 */
  background: $primary-gradient;
  -webkit-background-clip: text;
  background-clip: text;
  /* 兜底颜色 */
  color: #667eea;
}

.form-group {
  margin-bottom: 1.2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.form-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid $input-border;
  border-radius: 0.8rem;
  background: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  color: $text-primary;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: $text-light;
  }
}

.form-row {
  display: flex;
  gap: 1rem;
}

.flex-1 {
  flex: 1;
}

.input-with-btn {
  display: flex;
  gap: 0.8rem;
  align-items: center;
}

.add-btn {
  width: 3rem;
  height: 3rem;
  background: $primary-gradient;
  border: none;
  border-radius: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.95);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
  }
  
  .add-icon {
    font-size: 1.5rem;
    color: white;
    font-weight: 300;
    line-height: 1;
  }
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.8rem;
}

.tag-item {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
  border: 1px solid rgba(102, 126, 234, 0.25);
  border-radius: 2rem;
  font-size: 0.85rem;
  color: $text-primary;
  font-weight: 500;
}

.rating-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.rating-dot {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.08);
  border: 3px solid rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
  
  &.active {
    background: $success-gradient;
    border-color: transparent;
    box-shadow: 0 4px 15px rgba(17, 153, 142, 0.35);
  }
  
  &:active {
    transform: scale(0.9);
  }
}

.rating-star {
  width: 2rem;
  height: 2rem;
  transition: all 0.2s ease;
  
  &:active {
    transform: scale(0.85);
  }
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: $primary-gradient;
  border: none;
  border-radius: 1rem;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.35);
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.98);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.45);
  }
  
  .submit-text {
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
  }
}
</style>