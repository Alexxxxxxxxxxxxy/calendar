"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "reorder",
  setup(__props) {
    const taskList = common_vendor.ref([
      {
        id: 1,
        name: "高等数学",
        totalHours: 3.5,
        subTasks: [1.5, 1.5, 0.5]
      },
      {
        id: 2,
        name: "程序设计",
        totalHours: 3,
        subTasks: [1, 1, 1]
      }
    ]);
    const handleSwap = (currentIndex) => {
      if (currentIndex === 0) {
        common_vendor.index.showToast({ title: "已经在最顶部了", icon: "none" });
        return;
      }
      const prevIndex = currentIndex - 1;
      [taskList.value[prevIndex], taskList.value[currentIndex]] = [
        taskList.value[currentIndex],
        taskList.value[prevIndex]
      ];
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(taskList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.totalHours),
            c: common_vendor.f(item.subTasks, (sub, subIndex, i1) => {
              return {
                a: common_vendor.t(sub),
                b: subIndex
              };
            }),
            d: item.id,
            e: common_vendor.o(($event) => handleSwap(index), item.id)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b32b1d96"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/reorder/reorder.js.map
