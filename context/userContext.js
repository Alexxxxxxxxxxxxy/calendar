// context/user.js
import { ref, provide, inject } from 'vue'

// 定义注入key，保证唯一性，对标React的Context实例
export const UserContextKey = Symbol('userContext')

// 封装Provider逻辑，复用更方便，对标Context.Provider
export const useUserContextProvider = () => {
  // 必须用ref/reactive包裹，才能实现响应式更新
  const token = ref("")
  const continuous_day = ref(0)
  const progress = ref(0)
  const updateToken = (tokens) => {
    token.value = tokens
  }
  const updateContinuousDay = (day)=>{
	  continuous_day.value = day
  }
  const updateProgress = (val)=>{
	  progress.value = val
  }

  // 向后代组件提供上下文
  provide(UserContextKey, {
    token,
    updateToken,
	continuous_day,
	updateContinuousDay,
	progress,
	updateProgress
  })
  return { token, updateToken, continuous_day, updateContinuousDay, progress, updateProgress }
}

// 封装消费hook，对标React的useContext
export const useUserContext = () => {
  const context = inject(UserContextKey)
  // 兜底校验，避免在Provider外使用
  if (!context) {
    throw new Error('useUserContext 必须在 UserContextProvider 内使用')
  }
  return context
}