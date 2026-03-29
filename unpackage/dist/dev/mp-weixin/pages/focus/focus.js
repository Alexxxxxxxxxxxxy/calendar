"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "focus",
  setup(__props) {
    const subjectInfo = common_vendor.ref({
      title: "高等数学—极限计算",
      duration: "总时长: 2h"
    });
    const timerDisplay = common_vendor.ref("00:50:47");
    const statusText = common_vendor.ref("状态");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(subjectInfo.value.title),
        b: common_vendor.t(subjectInfo.value.duration),
        c: common_vendor.t(timerDisplay.value),
        d: common_vendor.t(statusText.value)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e6ed2a79"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/focus/focus.js.map
