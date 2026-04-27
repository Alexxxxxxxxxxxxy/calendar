"use strict";
const common_vendor = require("../../common/vendor.js");
const context_userContext = require("../../context/userContext.js");
if (!Math) {
  SkillCar();
}
const SkillCar = () => "../../components/SkillCar.js";
const _sfc_main = {
  __name: "skill",
  setup(__props) {
    context_userContext.useUserContextProvider();
    const { token, updateContinuousDay, updateProgress } = context_userContext.useUserContext();
    const incre = common_vendor.ref(0);
    const replace = common_vendor.ref(0);
    const remit = common_vendor.ref(0);
    common_vendor.onShow(() => {
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
      common_vendor.index.request({
        url: "http://106.53.182.241:8000/api/client/bag",
        method: "GET",
        header: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token.value
        },
        success: (res) => {
          if (res.statusCode != 200) {
            common_vendor.index.showToast({
              icon: "none",
              title: "请求失败" + res.statusCode,
              duration: 2e3
            });
            return;
          }
          incre.value = res.data.data.cards[0].count;
          replace.value = res.data.data.cards[1].count;
          remit.value = res.data.data.cards[2].count;
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
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          text: "减负卡",
          num: incre.value,
          color: "#667eea"
        }),
        b: common_vendor.p({
          text: "重排卡",
          num: replace.value,
          color: "#f093fb"
        }),
        c: common_vendor.p({
          text: "免罚卡",
          num: remit.value,
          color: "#f6d365"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b5115654"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/skill/skill.js.map
