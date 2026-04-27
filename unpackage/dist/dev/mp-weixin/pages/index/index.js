"use strict";
const common_vendor = require("../../common/vendor.js");
const context_userContext = require("../../context/userContext.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  Progress();
}
const Progress = () => "../../components/Progress.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const img = common_vendor.ref(common_assets.user);
    const coin = common_vendor.ref(common_assets.coinImg);
    const continuousDay = common_vendor.ref(0);
    const currency = common_vendor.ref(0);
    const progress = common_vendor.ref(0);
    context_userContext.useUserContextProvider();
    const { token, updateContinuousDay, updateProgress } = context_userContext.useUserContext();
    const fetchHomeData = () => {
      if (!token.value) {
        return;
      }
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
      common_vendor.index.request({
        url: "http://106.53.182.241:8000/api/index/home_data",
        method: "GET",
        header: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token.value
        },
        success: (res) => {
          if (res.statusCode !== 200) {
            common_vendor.index.showToast({
              title: `接口异常 ${res.statusCode}`,
              icon: "none",
              duration: 2e3
            });
            return;
          }
          currency.value = res.data.data.coin_balance;
          progress.value = Math.floor(res.data.data.completion_rate * 100);
          continuousDay.value = res.data.data.continuous_days;
          updateContinuousDay(res.data.data.continuous_days);
          updateProgress(Math.floor(res.data.data.completion_rate * 100));
        },
        fail: (err) => {
          common_vendor.index.showToast({
            title: err.errMsg || "网络请求失败",
            icon: "none",
            duration: 2e3
          });
        },
        complete: () => {
          common_vendor.index.hideLoading();
        }
      });
    };
    const handleLoginSuccess = () => {
      setTimeout(() => {
        fetchHomeData();
      }, 300);
    };
    common_vendor.onMounted(() => {
      common_vendor.index.$on("loginSuccess", handleLoginSuccess);
    });
    common_vendor.onUnmounted(() => {
      common_vendor.index.$off("loginSuccess", handleLoginSuccess);
    });
    common_vendor.onLoad(() => {
      if (token.value) {
        fetchHomeData();
      } else {
        return;
      }
    });
    common_vendor.onShow(() => {
      if (token.value) {
        fetchHomeData();
      }
    });
    common_vendor.onHide(() => {
    });
    common_vendor.watch(token, (newVal, oldVal) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:98", "token watch 触发:", newVal ? "有token" : "无token");
      if (newVal && !oldVal) {
        fetchHomeData();
      }
    });
    const achiveJump = () => {
      common_vendor.index.navigateTo({
        url: "/pages/achievement/achievement"
      });
    };
    const taskJump = () => {
      common_vendor.index.navigateTo({
        url: "/pages/task/task"
      });
    };
    const todayJump = () => {
      common_vendor.index.navigateTo({
        url: "/pages/today/today"
      });
    };
    const contractJump = () => {
      common_vendor.index.navigateTo({
        url: "/pages/contract/contract"
      });
    };
    const skillJump = () => {
      common_vendor.index.navigateTo({
        url: "/pages/skill/skill"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: img.value,
        b: common_vendor.t(continuousDay.value),
        c: coin.value,
        d: common_vendor.t(currency.value),
        e: common_vendor.t(progress.value),
        f: common_vendor.p({
          width: progress.value + "%"
        }),
        g: common_vendor.o(contractJump),
        h: common_vendor.t(continuousDay.value),
        i: common_vendor.o(taskJump),
        j: common_vendor.o(todayJump),
        k: common_vendor.o(achiveJump),
        l: common_vendor.o(skillJump)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
