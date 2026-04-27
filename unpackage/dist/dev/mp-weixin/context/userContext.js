"use strict";
const common_vendor = require("../common/vendor.js");
const UserContextKey = Symbol("userContext");
const globalToken = common_vendor.ref(common_vendor.index.getStorageSync("token") || "");
const globalContinuousDay = common_vendor.ref(0);
const globalProgress = common_vendor.ref(0);
const globalIsVip = common_vendor.ref(false);
const globalCoins = common_vendor.ref(0);
const globalName = common_vendor.ref("");
const useUserContextProvider = () => {
  const updateToken = (tokens) => {
    globalToken.value = tokens;
    common_vendor.index.setStorageSync("token", tokens);
  };
  const updateContinuousDay = (day) => {
    globalContinuousDay.value = day;
  };
  const updateProgress = (val) => {
    globalProgress.value = val;
  };
  const updateVip = (val) => {
    globalIsVip.value = val;
  };
  const updateCoins = (val) => {
    globalCoins.value = val;
  };
  const updateName = (val) => {
    globalName.value = val;
  };
  common_vendor.provide(UserContextKey, {
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
  });
  return {
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
  };
};
const useUserContext = () => {
  const context = common_vendor.inject(UserContextKey);
  if (!context) {
    throw new Error("useUserContext 必须在 UserContextProvider 内使用");
  }
  return context;
};
exports.useUserContext = useUserContext;
exports.useUserContextProvider = useUserContextProvider;
//# sourceMappingURL=../../.sourcemap/mp-weixin/context/userContext.js.map
