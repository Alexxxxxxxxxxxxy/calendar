"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const context_userContext = require("./context/userContext.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/calendar/calendar.js";
  "./pages/client/client.js";
  "./pages/achievement/achievement.js";
  "./pages/task/task.js";
  "./pages/plan/plan.js";
  "./pages/focus/focus.js";
  "./pages/today/today.js";
  "./pages/contract/contract.js";
  "./pages/skill/skill.js";
  "./pages/emotion/emotion.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    context_userContext.useUserContextProvider();
    return () => {
    };
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
