"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "SkillCar",
  props: {
    text: {
      type: String,
      required: true
    },
    num: {
      type: Number,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.text),
        b: common_vendor.t(props.num)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f7edbb69"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/SkillCar.js.map
