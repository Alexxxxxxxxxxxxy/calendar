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
    },
    color: {
      type: String,
      default: "#667eea"
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return {
        a: props.color,
        b: common_vendor.t(props.text),
        c: common_vendor.t(props.num)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f7edbb69"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/SkillCar.js.map
