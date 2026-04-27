"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "reduce",
  setup(__props) {
    const categories = common_vendor.ref([
      {
        name: "高等数学",
        total: 3.5,
        checked: false,
        tasks: [
          { id: 1, time: 1.5, checked: false },
          { id: 2, time: 1.5, checked: false },
          { id: 3, time: 0.5, checked: false }
        ]
      },
      {
        name: "程序设计",
        total: 3,
        checked: false,
        tasks: [
          { id: 4, time: 1, checked: false },
          { id: 5, time: 1, checked: false },
          { id: 6, time: 1, checked: false }
        ]
      }
    ]);
    const selectedTasks = common_vendor.computed(() => {
      let tasks = [];
      categories.value.forEach((cat) => {
        cat.tasks.forEach((task) => {
          if (task.checked) {
            tasks.push({ name: cat.name, time: task.time });
          }
        });
      });
      return tasks;
    });
    const totalSelectedTime = common_vendor.computed(() => {
      return selectedTasks.value.reduce((sum, item) => sum + item.time, 0);
    });
    const toggleCategory = (category) => {
      const newVal = !category.checked;
      category.checked = newVal;
      category.tasks.forEach((task) => {
        task.checked = newVal;
      });
    };
    const toggleTask = (category, task) => {
      task.checked = !task.checked;
      const allChecked = category.tasks.every((t) => t.checked);
      category.checked = allChecked;
    };
    const onConfirm = () => {
      common_vendor.index.showToast({
        title: `已确认减负 ${totalSelectedTime.value} 小时`,
        icon: "none"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(categories.value, (category, index, i0) => {
          return {
            a: category.checked,
            b: common_vendor.t(category.name),
            c: common_vendor.t(category.total),
            d: common_vendor.o(($event) => toggleCategory(category), index),
            e: common_vendor.f(category.tasks, (task, tIndex, i1) => {
              return {
                a: common_vendor.t(task.time),
                b: tIndex,
                c: task.checked ? 1 : "",
                d: common_vendor.o(($event) => toggleTask(category, task), tIndex)
              };
            }),
            f: index
          };
        }),
        b: common_vendor.f(selectedTasks.value, (item, i, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.time),
            c: i
          };
        }),
        c: selectedTasks.value.length === 0
      }, selectedTasks.value.length === 0 ? {} : {}, {
        d: common_vendor.t(totalSelectedTime.value),
        e: common_vendor.o(onConfirm)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ef914764"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/reduce/reduce.js.map
