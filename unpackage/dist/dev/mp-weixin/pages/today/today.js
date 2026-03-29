"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "today",
  setup(__props) {
    const progress = common_vendor.ref(33);
    const tasks = common_vendor.ref([
      {
        id: 1,
        title: "高等数学",
        items: ["知识点1", "知识点2", "知识点3"]
      },
      {
        id: 2,
        title: "程序设计",
        items: ["任务A", "任务B", "任务C", "任务D"]
      }
    ]);
    const stats = common_vendor.ref({
      count: 2,
      totalHours: "4h"
    });
    return (_ctx, _cache) => {
      return {
        a: progress.value + "%",
        b: common_vendor.f(tasks.value, (task, k0, i0) => {
          return {
            a: common_vendor.t(task.title),
            b: common_vendor.f(task.items, (item, index, i1) => {
              return {
                a: index
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
