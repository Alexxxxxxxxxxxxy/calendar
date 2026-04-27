"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "focus",
  setup(__props) {
    const subjectInfo = common_vendor.ref({
      title: "高等数学—极限计算",
      duration: "总时长: 2h"
    });
    const TOTAL_SECONDS = common_vendor.ref(1 * 60 * 60);
    const left_time = common_vendor.ref(TOTAL_SECONDS.value);
    const paused = common_vendor.ref(true);
    let timer = null;
    const timerDisplay = common_vendor.computed(() => {
      let left = left_time.value;
      if (isNaN(left) || left < 0)
        left = 0;
      const h = Math.floor(left / 3600);
      const m = Math.floor(left % 3600 / 60);
      const s = Math.floor(left % 60);
      return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    });
    const start = () => {
      if (timer)
        return;
      paused.value = false;
      timer = setInterval(() => {
        if (left_time.value <= 0) {
          clearInterval(timer);
          timer = null;
          paused.value = true;
          return;
        }
        left_time.value -= 1;
      }, 1e3);
    };
    const pause = () => {
      if (!timer)
        return;
      clearInterval(timer);
      timer = null;
      paused.value = true;
    };
    const handleClick = () => {
      if (paused.value) {
        start();
      } else {
        pause();
      }
    };
    const statusText = common_vendor.ref("状态");
    const skillJump = () => {
      common_vendor.index.navigateTo({
        url: "/pages/skill/skill"
      });
    };
    const emotionJump = () => {
      common_vendor.index.navigateTo({
        url: "/pages/emotion/emotion"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(subjectInfo.value.title),
        b: common_vendor.t(subjectInfo.value.duration),
        c: common_vendor.t(timerDisplay.value),
        d: common_vendor.t(paused.value ? "点击开始" : "点击暂停"),
        e: common_vendor.o(handleClick),
        f: common_vendor.t(statusText.value),
        g: common_vendor.o(emotionJump),
        h: common_vendor.o(skillJump)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e6ed2a79"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/focus/focus.js.map
