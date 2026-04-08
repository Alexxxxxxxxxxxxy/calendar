"use strict";
const common_vendor = require("../common/vendor.js");
const UserContextKey = Symbol("userContext");
const useUserContextProvider = () => {
  const token = common_vendor.ref("");
  const continuous_day = common_vendor.ref(0);
  const progress = common_vendor.ref(0);
  const updateToken = (tokens) => {
    token.value = tokens;
  };
  const updateContinuousDay = (day) => {
    continuous_day.value = day;
  };
  const updateProgress = (val) => {
    progress.value = val;
  };
  common_vendor.provide(UserContextKey, {
    token,
    updateToken,
    continuous_day,
    updateContinuousDay,
    progress,
    updateProgress
  });
  return { token, updateToken, continuous_day, updateContinuousDay, progress, updateProgress };
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
