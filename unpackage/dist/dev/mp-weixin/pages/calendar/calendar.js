"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (NewClass + Progress)();
}
const Progress = () => "../../components/Progress.js";
const NewClass = () => "../../components/NewClass.js";
const _sfc_main = {
  __name: "calendar",
  setup(__props) {
    const progress = common_vendor.ref(50);
    const show = common_vendor.ref(false);
    common_vendor.onHide(() => {
      show.value = false;
    });
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
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
        c: common_vendor.o(handleClick),
        d: common_vendor.t(common_vendor.unref(year)),
        e: common_vendor.t(month),
        f: common_vendor.t(common_vendor.unref(day)),
        g: common_vendor.p({
          width: progress.value + "%"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6e8913ab"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/calendar/calendar.js.map
