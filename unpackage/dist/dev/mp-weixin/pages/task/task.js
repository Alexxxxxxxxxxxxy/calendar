"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const context_userContext = require("../../context/userContext.js");
const _sfc_main = {
  __name: "task",
  setup(__props) {
    const { token } = context_userContext.useUserContext();
    const t = common_vendor.ref(0);
    const starts = Array.from({ length: 5 }, (_, i) => ({ id: i }));
    const handleStartClick = (index) => {
      t.value = index + 1;
    };
    const n = common_vendor.ref(0);
    const points = Array.from({ length: 4 }, (_, i) => ({ id: i }));
    const handlePointClick = (index) => {
      n.value = index + 1;
    };
    const h = common_vendor.ref(0);
    const m = common_vendor.ref(0);
    const s = common_vendor.ref(0);
    let timer = null;
    const status = common_vendor.ref(false);
    const text = common_vendor.ref("开始");
    const startTime = () => {
      timer = setInterval(() => {
        if (s.value + 1 < 60) {
          s.value = s.value + 1;
        } else {
          s.value = 0;
          if (m.value + 1 < 60) {
            m.value = m.value + 1;
          } else {
            m.value = 0;
            h.value = h.value + 1;
          }
        }
      }, 1e3);
    };
    const pauseTime = () => {
      clearInterval(timer);
    };
    const handleClick = () => {
      status.value = !status.value;
      if (status.value) {
        startTime();
        text.value = "暂停";
      } else {
        pauseTime();
        text.value = "开始";
      }
    };
    const timeStr = common_vendor.computed(() => {
      let hh = h.value < 10 ? "0" + h.value : h.value;
      let mm = m.value < 10 ? "0" + m.value : m.value;
      let ss = s.value < 10 ? "0" + s.value : s.value;
      return `${hh}:${mm}:${ss}`;
    });
    const subject = common_vendor.ref("科目");
    const task = common_vendor.ref("任务");
    const taskid = common_vendor.ref("0");
    common_vendor.onShow(() => {
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
      common_vendor.index.request({
        url: "http://106.53.182.241:8000/api/task/trial",
        method: "GET",
        header: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token.value
        },
        success: (res) => {
          if (res.statusCode !== 200) {
            common_vendor.index.showToast({
              title: `接口异常 ${res.statusCode}`,
              icon: "none",
              duration: 2e3
            });
            return;
          }
        },
        fail: (err) => {
          common_vendor.index.showToast({
            title: err.errMsg || "网络请求失败",
            icon: "none",
            duration: 2e3
          });
        },
        complete: () => {
          common_vendor.index.hideLoading();
        }
      });
    });
    const handleSubmit = () => {
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
      common_vendor.index.request({
        url: "http://106.53.182.241:8000/api/task/trial_feedback",
        method: "POST",
        header: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token.value
        },
        data: {
          task_id: taskid.value,
          elapsed_seconds: s.value + m.value * 60 + h.value * 60 * 60,
          completion_stars: t.value,
          status_assessment: "" + n.value
        },
        success: (res) => {
          if (res.statusCode !== 200) {
            common_vendor.index.showToast({
              title: `接口异常 ${res.statusCode}`,
              icon: "none",
              duration: 2e3
            });
            return;
          }
          common_vendor.index.navigateTo({
            url: "/pages/plan/plan"
          });
        },
        fail: (err) => {
          common_vendor.index.showToast({
            title: err.errMsg || "网络请求失败",
            icon: "none",
            duration: 2e3
          });
        },
        complete: () => {
          common_vendor.index.hideLoading();
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(subject.value),
        b: common_vendor.t(timeStr.value),
        c: common_vendor.t(task.value),
        d: common_vendor.t(text.value),
        e: common_vendor.o(handleClick),
        f: common_vendor.f(common_vendor.unref(starts), (start, index, i0) => {
          return {
            a: common_vendor.o(($event) => handleStartClick(index), index),
            b: index,
            c: index >= t.value ? common_vendor.unref(common_assets.start_gray) : common_vendor.unref(common_assets.start_yellow)
          };
        }),
        g: common_vendor.f(common_vendor.unref(points), (point, index, i0) => {
          return {
            a: common_vendor.o(($event) => handlePointClick(index), index),
            b: index,
            c: index < n.value ? 1 : ""
          };
        }),
        h: common_vendor.o(($event) => handleSubmit()),
        i: common_vendor.o(handleSubmit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-62407536"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/task/task.js.map
