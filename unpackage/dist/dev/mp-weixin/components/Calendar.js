"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "Calendar",
  props: {
    activeDays: {
      type: Array,
      default: () => [],
      // 验证：确保数组元素是 1-31 的有效日期
      validator: (val) => val.every((item) => typeof item === "number" && item > 0 && item < 32)
    }
  },
  setup(__props) {
    const weekday = ["日", "一", "二", "三", "四", "五", "六"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDate = common_vendor.ref(/* @__PURE__ */ new Date());
    const currentYear = common_vendor.ref(currentDate.value.getFullYear());
    const currentMonth = common_vendor.ref(currentDate.value.getMonth());
    const emptyItems = common_vendor.ref([]);
    const monthDays = common_vendor.ref([]);
    const todayDate = common_vendor.ref(/* @__PURE__ */ new Date());
    const todayYear = common_vendor.computed(() => todayDate.value.getFullYear());
    const todayMonth = common_vendor.computed(() => todayDate.value.getMonth());
    const todayDay = common_vendor.computed(() => todayDate.value.getDate());
    const isCurrentMonthToday = common_vendor.computed(() => {
      return currentYear.value === todayYear.value && currentMonth.value === todayMonth.value;
    });
    const getMonthDaysCount = (year, month) => {
      const dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        dayCount[1] = 29;
      }
      return dayCount[month];
    };
    const initCalendar = () => {
      const year = currentYear.value;
      const month = currentMonth.value;
      const firstDayWeek = new Date(year, month, 1).getDay();
      emptyItems.value = Array.from({ length: firstDayWeek }, (_, i) => i);
      const daysCount = getMonthDaysCount(year, month);
      monthDays.value = Array.from({ length: daysCount }, (_, i) => i + 1);
    };
    const currentMonthName = common_vendor.computed(() => months[currentMonth.value]);
    const handleDateClick = (date) => {
    };
    common_vendor.onMounted(() => {
      initCalendar();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(currentMonthName.value),
        b: common_vendor.t(currentYear.value),
        c: common_vendor.f(weekday, (day, idx, i0) => {
          return {
            a: common_vendor.t(day),
            b: idx
          };
        }),
        d: common_vendor.f(emptyItems.value, (_, idx, i0) => {
          return {
            a: "empty-" + idx
          };
        }),
        e: common_vendor.f(monthDays.value, (date, idx, i0) => {
          return {
            a: common_vendor.t(date),
            b: "date-" + idx,
            c: __props.activeDays.includes(date) ? 1 : "",
            d: isCurrentMonthToday.value && date === todayDay.value && !__props.activeDays.includes(date) ? 1 : "",
            e: common_vendor.o(($event) => handleDateClick(), "date-" + idx)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-449beb93"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/Calendar.js.map
