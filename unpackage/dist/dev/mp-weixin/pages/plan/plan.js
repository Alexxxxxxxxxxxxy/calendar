"use strict";
const common_vendor = require("../../common/vendor.js");
const context_userContext = require("../../context/userContext.js");
const _sfc_main = {
  __name: "plan",
  setup(__props) {
    const { continuous_day } = context_userContext.useUserContext();
    const continuous = common_vendor.ref(continuous_day || 0);
    const tasks = common_vendor.ref([
      {
        id: 1,
        title: "高等数学",
        status: "正在进行",
        points: ["知识点1", "知识点2", "知识点3"]
      },
      {
        id: 2,
        title: "程序设计",
        status: "",
        points: ["知识点A", "知识点B", "知识点C"]
      },
      {
        id: 3,
        title: "线性代数",
        status: "",
        points: ["知识点A", "知识点B", "知识点C"]
      }
    ]);
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
            d: common_vendor.t(task.points[0]),
            e: common_vendor.t(task.points[1]),
            f: common_vendor.t(task.points[2]),
            g: task.id
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bee4c29d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/plan/plan.js.map
