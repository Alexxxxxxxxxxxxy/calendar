"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "contract_select",
  setup(__props) {
    const days = [
      { label: "7天", value: 7 },
      { label: "14天", value: 14 },
      { label: "30天", value: 30 }
    ];
    const selectedDays = common_vendor.ref(14);
    const firstDayHours = common_vendor.ref("");
    const vipPlans = [
      { name: "基础夯实计划" },
      { name: "模考强化计划" },
      { name: "考前冲刺计划" }
    ];
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const selectDay = (val) => {
      selectedDays.value = val;
    };
    const contractInfo = common_vendor.computed(() => {
      if (selectedDays.value === 7) {
        return { total: 15, range: "1.5 - 3 小时" };
      } else if (selectedDays.value === 14) {
        return { total: 35, range: "2.0 - 4 小时" };
      } else {
        return { total: 80, range: "2.5 - 5 小时" };
      }
    });
    const recommendDays = common_vendor.computed(() => {
      return selectedDays.value + 5;
    });
    const createContract = () => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goBack),
        b: common_vendor.f(days, (day, k0, i0) => {
          return {
            a: common_vendor.t(day.label),
            b: day.value,
            c: selectedDays.value === day.value ? 1 : "",
            d: common_vendor.o(($event) => selectDay(day.value), day.value)
          };
        }),
        c: common_vendor.t(contractInfo.value.total),
        d: common_vendor.t(contractInfo.value.range),
        e: common_vendor.t(recommendDays.value),
        f: common_vendor.f(vipPlans, (plan, index, i0) => {
          return {
            a: common_vendor.t(plan.name),
            b: index
          };
        }),
        g: firstDayHours.value,
        h: common_vendor.o(($event) => firstDayHours.value = $event.detail.value),
        i: common_vendor.o(createContract)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-87e990da"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/contract_select/contract_select.js.map
