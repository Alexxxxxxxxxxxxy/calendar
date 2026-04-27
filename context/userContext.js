// context/user.js
import { ref, provide, inject } from 'vue'

export const UserContextKey = Symbol('userContext')

// 全局单例状态，确保所有组件共享同一个 ref
const globalToken = ref(uni.getStorageSync('token') || "")
const globalContinuousDay = ref(0)
const globalProgress = ref(0)
const globalIsVip = ref(false)
const globalCoins = ref(0)
const globalName = ref(uni.getStorageSync('NameUser') || "")

export const useUserContextProvider = () => {
  const updateToken = (tokens) => {
    globalToken.value = tokens
    uni.setStorageSync('token', tokens)
  }

  const updateContinuousDay = (day) => {
    globalContinuousDay.value = day
  }
  const updateProgress = (val) => {
    globalProgress.value = val
  }
  const updateVip = (val) => {
    globalIsVip.value = val
  }
  const updateCoins = (val) => {
    globalCoins.value = val
  }
  const updateName = (val) => {
    globalName.value = val
    uni.setStorageSync('NameUser', val)
  }

  const contextValue = {
    token: globalToken,
    updateToken,
    continuous_day: globalContinuousDay,
    updateContinuousDay,
    progress: globalProgress,
    updateProgress,
    is_vip: globalIsVip,
    updateVip,
    coins: globalCoins,
    updateCoins,
    UserName: globalName,
    updateName
  }

  provide(UserContextKey, contextValue)
  return contextValue
}

export const useUserContext = () => {
  const context = inject(UserContextKey)
  if (!context) {
    throw new Error('useUserContext 必须在 UserContextProvider 内使用')
  }
  return context
}