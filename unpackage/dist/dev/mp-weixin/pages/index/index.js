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
    const progress = common_vendor.ref(50);
    const { continuous_day, updateContinuousDay, updateProgress } = context_userContext.useUserContext();
    common_vendor.onLoad(() => {
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
      common_vendor.index.request({
        url: "http://106.53.182.241:8000/api/index/home_data",
        method: "GET",
        header: {
          "Content-Type": "application/json"
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
        b: coin.value,
        c: common_vendor.t(currency.value),
        d: common_vendor.p({
          width: progress.value + "%"
        }),
        e: common_vendor.t(progress.value),
        f: common_vendor.o(contractJump),
        g: common_vendor.t(continuousDay.value),
        h: common_vendor.o(taskJump),
        i: common_vendor.o(todayJump),
        j: common_vendor.o(achiveJump),
        k: common_vendor.o(skillJump)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
