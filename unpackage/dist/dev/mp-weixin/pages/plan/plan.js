"use strict";
const common_vendor = require("../../common/vendor.js");
const context_userContext = require("../../context/userContext.js");
const _sfc_main = {
  __name: "plan",
  setup(__props) {
    context_userContext.useUserContextProvider();
    const { continuous_day, token } = context_userContext.useUserContext();
    const continuous = common_vendor.ref(continuous_day || 0);
    const tasks = common_vendor.ref([
      {
        id: 1,
        title: "高等数学",
        status: "正在进行",
        points: ["知识点1", "知识点2", "知识点3"]
      }
    ]);
    const fetchData = () => {
      if (!token.value) {
        return;
      }
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
      common_vendor.index.request({
        url: "http://106.53.182.241:8000/api/subjects/list",
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
          tasks.value = res.data.data.subjects;
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
    const focusJump = () => {
      common_vendor.index.navigateTo({
        url: "/pages/focus/focus"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(continuous.value),
        b: common_vendor.o(focusJump),
        c: common_vendor.f(tasks.value, (task, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(task.title),
            b: task.status
          }, task.status ? {
            c: common_vendor.t(task.status)
          } : {}, {
            d: common_vendor.f(task.points, (point, index, i1) => {
              return {
                a: common_vendor.t(point),
                b: index
              };
            }),
            e: task.id
          });
        }),
        d: common_vendor.o(() => {
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bee4c29d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/plan/plan.js.map
