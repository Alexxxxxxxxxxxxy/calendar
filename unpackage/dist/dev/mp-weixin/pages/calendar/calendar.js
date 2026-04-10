"use strict";
const common_vendor = require("../../common/vendor.js");
const context_userContext = require("../../context/userContext.js");
if (!Math) {
  (NewClass + Calendar)();
}
const NewClass = () => "../../components/NewClass.js";
const Calendar = () => "../../components/Calendar.js";
const _sfc_main = {
  __name: "calendar",
  setup(__props) {
    const { continuous_day, progress } = context_userContext.useUserContext();
    const continuous = common_vendor.ref(continuous_day);
    common_vendor.ref(progress);
    const show = common_vendor.ref(false);
    const study = common_vendor.ref(0);
    const completeTask = common_vendor.ref(0);
    const rate = common_vendor.ref(0);
    common_vendor.onHide(() => {
      show.value = false;
    });
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    common_vendor.onLoad(() => {
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
      common_vendor.index.request({
        url: "http://106.53.182.241:8000/api/calendar/daily",
        method: "GET",
        header: {
          "Content-Type": "application/json"
        },
        data: {
          date: `${year}/${month}/${day}`
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
          study.value = res.data.data.study_duration / 60;
          completeTask.value = res.data.data.completed_tasks;
          rate.value = res.data.data.completion_rate * 100;
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
    const handleClick = () => {
      show.value = !show.value;
    };
    const handleClose = () => {
      show.value = false;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: show.value
      }, show.value ? {
        b: common_vendor.o(handleClose)
      } : {}, {
        c: common_vendor.t(continuous.value),
        d: common_vendor.o(handleClick),
        e: common_vendor.t(common_vendor.unref(year)),
        f: common_vendor.t(month),
        g: common_vendor.t(common_vendor.unref(day)),
        h: common_vendor.t(study.value),
        i: common_vendor.t(rate.value)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6e8913ab"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/calendar/calendar.js.map
