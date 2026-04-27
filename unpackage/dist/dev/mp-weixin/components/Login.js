"use strict";
const common_vendor = require("../common/vendor.js");
const context_userContext = require("../context/userContext.js");
const _sfc_main = {
  __name: "Login",
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { updateToken, updateVip, updateCoins, updateContinuousDay, token, updateName } = context_userContext.useUserContext();
    const toggle = common_vendor.ref(true);
    const handleClick = () => {
      toggle.value = !toggle.value;
    };
    const name = common_vendor.ref("");
    const password = common_vendor.ref("");
    const closeLogin = () => {
      emit("close");
    };
    const handleSubmit = () => {
      if (!name.value.trim() || !password.value.trim()) {
        common_vendor.index.showToast({
          title: "请输入用户名和密码",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
      if (toggle.value) {
        common_vendor.index.request({
          url: "http://106.53.182.241:8000/api/login",
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            username: name.value,
            password: password.value,
            scope: "",
            client_id: "",
            client_secret: "",
            grant_type: "password"
          },
          success: (res) => {
            var _a;
            if (res.statusCode !== 200 || res.data.code !== 200) {
              common_vendor.index.showToast({
                title: `接口异常 ${res.statusCode}`,
                icon: "none"
              });
              return;
            }
            const responseData = ((_a = res.data) == null ? void 0 : _a.data) || res.data;
            const tokenValue = responseData.token || "";
            updateToken(responseData.token);
            updateVip(responseData.is_vip !== void 0 ? responseData.is_vip : false);
            updateCoins(responseData.coins || 0);
            updateContinuousDay(responseData.continuous_days || 0);
            updateName(name.value);
            common_vendor.index.setStorageSync("token", tokenValue);
            common_vendor.index.showToast({
              title: "登录成功！",
              icon: "success",
              duration: 1e3
            });
            setTimeout(() => {
              common_vendor.index.__f__("log", "at components/Login.vue:84", "准备发送 successLogin 事件");
              name.value = "";
              password.value = "";
              emit("close");
            }, 1e3);
          },
          fail: (err) => {
            common_vendor.index.showToast({
              title: err.errMsg || "网络请求失败",
              icon: "none"
            });
          },
          complete: () => {
            common_vendor.index.hideLoading();
          }
        });
      } else {
        common_vendor.index.request({
          url: "http://106.53.182.241:8000/api/register",
          method: "POST",
          header: {
            "Content-Type": "application/json"
          },
          data: {
            username: name.value,
            password: password.value
          },
          success: (res) => {
            common_vendor.index.__f__("log", "at components/Login.vue:113", "注册返回：", res);
            if (res.statusCode !== 200) {
              common_vendor.index.showToast({
                title: `接口异常 ${res.statusCode}`,
                icon: "none"
              });
              return;
            }
            name.value = "";
            password.value = "";
            toggle.value = true;
            common_vendor.index.showToast({
              title: "注册成功！",
              icon: "success",
              mask: true,
              duration: 1e3
            });
          },
          fail: (err) => {
            common_vendor.index.showToast({
              title: err.errMsg || "网络请求失败",
              icon: "none"
            });
          },
          complete: () => {
            common_vendor.index.hideLoading();
          }
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(closeLogin),
        b: common_vendor.t(toggle.value ? "登录" : "注册"),
        c: name.value,
        d: common_vendor.o(($event) => name.value = $event.detail.value),
        e: password.value,
        f: common_vendor.o(($event) => password.value = $event.detail.value),
        g: common_vendor.t(toggle.value ? "登录" : "注册"),
        h: common_vendor.o(handleSubmit),
        i: common_vendor.t(toggle.value ? "没有账号？" : "已有账号?"),
        j: common_vendor.t(toggle.value ? "注册" : "登录"),
        k: common_vendor.o(handleClick)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2498b669"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/Login.js.map
