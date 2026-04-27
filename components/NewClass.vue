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
		let result = testTime.value
		if(result.length!==10 || result[4]!=='-' || result[7]!=='-'){
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
		},
		success:(res)=>{
			if (res.statusCode !== 200) {
			  uni.showToast({
			    title: `接口异常 ${res.statusCode}`,
			    icon: "none", 
			    duration: 2000
			  })
			  return
			}
      uni.showToast({
        title:"计划生成成功！",
        icon:"success"
      })
		},fail:(err)=>{
			uni.showToast({
			  title: err.errMsg || "网络请求失败",
			  icon: "none", 
			  duration: 2000
			})
		},complete:()=>{
			uni.hideLoading()
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
	uni.navigateTo({
		url:"/pages/contract_select/contract_select"
	})
}
const handleless = ()=>{
	emit("close",true)
}
</script>

<template>
	<view class="modal-overlay">
		<!-- 微信小程序专用背景层 -->
		<view class="modal-bg"></view>
		
		<view class="main">
			<view class="layout glass-card">
				<!-- 返回按钮 - 左侧 -->
				<view class="close-btn back-btn" @click="handleless">
					<text class="close-icon">←</text>
				</view>
				<!-- 关闭按钮 - 右侧 -->
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
// 统一项目全局配色
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$success-gradient: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
$glass-bg: rgba(255, 255, 255, 1);
$glass-border: rgba(102, 126, 234, 0.2);
$input-border: rgba(102, 126, 234, 0.3);
$text-primary: #2d3748;
$text-secondary: #718096;
$text-light: #a0aec0;

/* 微信小程序适配 - 遮罩层 */
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
  padding: 30rpx;
  box-sizing: border-box;
}

/* 微信小程序专用模态框渐变背景 */
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
  max-width: 750rpx;
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

/* 毛玻璃卡片 - 小程序兼容 */
.glass-card {
  background: $glass-bg;
  border: 1px solid $glass-border;
  border-radius: 40rpx;
  box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.15);
  padding: 40rpx;
  position: relative;
  box-sizing: border-box;
}

/* 关闭按钮通用样式 */
.close-btn {
  position: absolute;
  top: 30rpx;
  right: 30rpx;
  width: 60rpx;
  height: 60rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:active {
    background: rgba(102, 126, 234, 0.2);
    transform: scale(0.9);
  }
  
  .close-icon {
    font-size: 32rpx;
    color: #667eea;
    font-weight: 500;
  }
}

/* 返回按钮 - 左侧定位 */
.back-btn {
  right: auto;
  left: 30rpx;
}

.form-title {
  font-size: 40rpx;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 40rpx;
  text-align: center;
}

.form-group {
  margin-bottom: 30rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.form-label {
  display: block;
  font-size: 26rpx;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: 15rpx;
}

.form-input {
  width: 100%;
  padding: 20rpx 25rpx;
  border: 2rpx solid $input-border;
  border-radius: 20rpx;
  background: #ffffff;
  font-size: 26rpx;
  color: $text-primary;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 10rpx rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: $text-light;
  }
}

.form-row {
  display: flex;
  gap: 20rpx;
}

.flex-1 {
  flex: 1;
}

.input-with-btn {
  display: flex;
  gap: 20rpx;
  align-items: center;
}

.add-btn {
  width: 80rpx;
  height: 80rpx;
  background: $primary-gradient;
  border: none;
  border-radius: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  box-shadow: 0 10rpx 20rpx rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.95);
  }
  
  .add-icon {
    font-size: 40rpx;
    color: white;
    font-weight: 300;
    line-height: 1;
  }
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15rpx;
  margin-top: 20rpx;
}

.tag-item {
  padding: 12rpx 25rpx;
  background: rgba(102, 126, 234, 0.1);
  border: 1rpx solid rgba(102, 126, 234, 0.2);
  border-radius: 50rpx;
  font-size: 24rpx;
  color: #667eea;
  font-weight: 500;
}

.rating-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10rpx 0;
}

.rating-dot {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.05);
  border: 4rpx solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &.active {
    background: $success-gradient;
    border-color: transparent;
    box-shadow: 0 10rpx 20rpx rgba(17, 153, 142, 0.2);
  }
  
  &:active {
    transform: scale(0.9);
  }
}

.rating-star {
  width: 50rpx;
  height: 50rpx;
  transition: all 0.2s ease;
  
  &:active {
    transform: scale(0.85);
  }
}

.submit-btn {
  width: 100%;
  padding: 25rpx;
  background: $primary-gradient;
  border: none;
  border-radius: 30rpx;
  box-shadow: 0 20rpx 30rpx rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.98);
  }
  
  .submit-text {
    font-size: 30rpx;
    font-weight: 600;
    color: white;
  }
}
</style>