"use strict";
const common_vendor = require("../../common/vendor.js");
const context_userContext = require("../../context/userContext.js");
const _sfc_main = {
  __name: "achievement",
  setup(__props) {
    const { token, updateContinuousDay, updateProgress } = context_userContext.useUserContext();
    const rewards = common_vendor.ref([]);
    const honors = common_vendor.ref([]);
    const fetchData = () => {
      if (!token.value) {
        return;
      }
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
      common_vendor.index.request({
        url: "http://106.53.182.241:8000/api/achievement/list",
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
          rewards.value = res.data.data;
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
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
      common_vendor.index.request({
        url: "http://106.53.182.241:8000/api/honor/list",
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
          honors.value = res.data.data;
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
    common_vendor.onShow(() => {
      fetchData();
    });
    const handleItemClick = (item) => {
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(rewards.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index,
            c: common_vendor.o(($event) => handleItemClick(), index)
          };
        }),
        b: rewards.value.length === 0
      }, rewards.value.length === 0 ? {} : {}, {
        c: common_vendor.f(honors.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index,
            c: common_vendor.o(($event) => handleItemClick(), index)
          };
        }),
        d: honors.value.length === 0
      }, honors.value.length === 0 ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-127b3c96"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/achievement/achievement.js.map
