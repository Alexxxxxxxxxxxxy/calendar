"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  SkillCar();
}
const SkillCar = () => "../../components/SkillCar.js";
const _sfc_main = {
  __name: "skill",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          text: "减负卡",
          num: "12"
        }),
        b: common_vendor.p({
          text: "重排卡",
          num: "11"
        }),
        c: common_vendor.p({
          text: "免罚卡",
          num: "12"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b5115654"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/skill/skill.js.map
