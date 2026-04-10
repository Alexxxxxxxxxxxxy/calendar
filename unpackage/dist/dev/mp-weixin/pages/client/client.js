"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "client",
  setup(__props) {
    const img = common_vendor.ref(null);
    const show = common_vendor.ref(true);
    const status = common_vendor.ref(false);
    const chooseAvatar = () => {
      common_vendor.wx$1.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          img.value = res.tempFilePaths[0];
          show.value = false;
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/client/client.vue:19", "选择图片失败:", err);
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: img.value ? img.value : common_vendor.unref(common_assets.user),
        b: common_vendor.o(chooseAvatar),
        c: !status.value
      }, !status.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-394faf7f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/client/client.js.map
