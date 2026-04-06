"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  Progress();
}
const Progress = () => "../../components/Progress.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const img = common_vendor.ref(common_assets.user);
    const coin = common_vendor.ref(common_assets.coinImg);
    const currency = common_vendor.ref(0);
    const progress = common_vendor.ref(50);
    const achiveJump = () => {
      common_vendor.index.navigateTo({
        url: "/pages/achievement/achievement"
      });
    };
    const taskJump = () => {
      common_vendor.index.navigateTo({
        url: "/pages/task/task"
      });
    };
    const todayJump = () => {
      common_vendor.index.navigateTo({
        url: "/pages/today/today"
      });
    };
    const contractJump = () => {
      common_vendor.index.navigateTo({
        url: "/pages/contract/contract"
      });
    };
    const skillJump = () => {
      common_vendor.index.navigateTo({
        url: "/pages/skill/skill"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: img.value,
        b: coin.value,
        c: common_vendor.t(currency.value),
        d: common_vendor.p({
          width: progress.value + "%"
        }),
        e: common_vendor.o(contractJump),
        f: common_vendor.o(taskJump),
        g: common_vendor.o(todayJump),
        h: common_vendor.o(achiveJump),
        i: common_vendor.o(skillJump)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
