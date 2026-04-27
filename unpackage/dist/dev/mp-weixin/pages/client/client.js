"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const context_userContext = require("../../context/userContext.js");
if (!Math) {
  Login();
}
const Login = () => "../../components/Login.js";
const _sfc_main = {
  __name: "client",
  setup(__props) {
    context_userContext.useUserContextProvider();
    const { token, UserName } = context_userContext.useUserContext();
    const img = common_vendor.ref(null);
    const show = common_vendor.ref(true);
    const status = common_vendor.ref(false);
    const loginshow = common_vendor.ref(false);
    const userinfo = common_vendor.ref("未登录");
    const loadUserInfo = () => {
      if (token.value) {
        status.value = true;
        if (UserName.value) {
          userinfo.value = UserName.value;
        } else {
          try {
            const savedName = common_vendor.index.getStorageSync("NameUser");
            if (savedName) {
              userinfo.value = savedName;
            }
          } catch (e) {
            common_vendor.index.__f__("error", "at pages/client/client.vue:30", "读取用户名失败:", e);
          }
        }
      } else {
        status.value = false;
        userinfo.value = "未登录";
      }
    };
    common_vendor.watch(UserName, (newVal) => {
      if (newVal) {
        userinfo.value = newVal;
        status.value = true;
      }
    });
    common_vendor.watch(token, () => {
      loadUserInfo();
    });
    common_vendor.onShow(() => {
      loadUserInfo();
    });
    common_vendor.onHide(() => {
      loginshow.value = false;
    });
    const chooseAvatar = () => {
      common_vendor.wx$1.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const avatarPath = res.tempFilePaths[0];
          img.value = avatarPath;
          show.value = false;
          common_vendor.index.setStorageSync("avatar", avatarPath);
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/client/client.vue:70", "选择图片失败:", err);
        }
      });
    };
    const handleClick = () => {
      loginshow.value = true;
    };
    const handleClose = () => {
      loginshow.value = false;
    };
    const handleSuccess = (val) => {
      userinfo.value = val;
      status.value = true;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loginshow.value
      }, loginshow.value ? {
        b: common_vendor.o(handleClose),
        c: common_vendor.o(handleSuccess)
      } : {}, {
        d: img.value ? img.value : common_vendor.unref(common_assets.user),
        e: common_vendor.o(chooseAvatar),
        f: common_vendor.t(userinfo.value),
        g: !status.value
      }, !status.value ? {
        h: common_vendor.o(handleClick)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-394faf7f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/client/client.js.map
