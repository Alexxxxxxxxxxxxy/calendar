"use strict";
const common_vendor = require("../../common/vendor.js");
const context_userContext = require("../../context/userContext.js");
const _sfc_main = {
  __name: "today",
  setup(__props) {
    const { progress, token } = context_userContext.useUserContext();
    const Progress = common_vendor.ref(progress);
    const tasks = common_vendor.ref([]);
    const stats = common_vendor.ref({
      count: 0,
      totalHours: "0h"
    });
    common_vendor.onShow(() => {
      if (!token.value)
        return;
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
      common_vendor.index.request({
        url: "http://106.53.182.241:8000/api/today/list",
        method: "GET",
        header: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token.value
        },
        success: (res) => {
          if (res.statusCode != 200) {
            common_vendor.index.showToast({
              title: `接口异常 ${res.statusCode}`,
              icon: "none",
              duration: 2e3
            });
            return;
          }
          stats.value.totalHours = res.data.data.total_required_minutes / 60 + "h";
          stats.value.count = res.data.data.total_subjects;
          res.data.data.subjects.forEach((content) => {
            tasks.value.push({
              id: tasks.value.length + 1,
              title: content.subject_name,
              items: content.today_tasks
            });
          });
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
        a: Progress.value + "%",
        b: common_vendor.f(tasks.value, (task, k0, i0) => {
          return {
            a: common_vendor.t(task.title),
            b: common_vendor.f(task.items, (item, index, i1) => {
              return {
                a: common_vendor.t(item),
                b: index
              };
            }),
            c: task.id
          };
        }),
        c: common_vendor.t(stats.value.count),
        d: common_vendor.t(stats.value.totalHours)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9c3a1a54"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/today/today.js.map
