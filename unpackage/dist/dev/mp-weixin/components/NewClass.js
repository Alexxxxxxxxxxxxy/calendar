"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const context_userContext = require("../context/userContext.js");
const _sfc_main = {
  __name: "NewClass",
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const { token, coins } = context_userContext.useUserContext();
    const n = common_vendor.ref(0);
    const points = Array.from({ length: 5 }, (_, i) => ({ id: i }));
    const handlePointClick = (index) => {
      n.value = index + 1;
    };
    const t = common_vendor.ref(0);
    const starts = Array.from({ length: 5 }, (_, i) => ({ id: i }));
    const handleStartClick = (index) => {
      t.value = index + 1;
    };
    const project = common_vendor.ref("");
    const knowledge = common_vendor.ref("");
    const knowledges = common_vendor.ref([]);
    const testTime = common_vendor.ref("");
    const targetScore = common_vendor.ref(null);
    common_vendor.ref(0);
    const credit = common_vendor.ref(null);
    const handleSubmit = () => {
      if (!project.value) {
        common_vendor.index.showModal({
          title: "错误请求",
          content: "请输入学习科目！",
          showCancel: false
        });
        return;
      }
      if (knowledges.value.length === 0) {
        common_vendor.index.showModal({
          title: "错误请求",
          content: "请输入知识点！",
          showCancel: false
        });
        return;
      }
      if (!testTime.value) {
        common_vendor.index.showModal({
          title: "错误请求",
          content: "请输入考试时间！",
          showCancel: false
        });
        return;
      } else {
        let result = testTime.value;
        if (result.length !== 10 || result[4] !== "-" || result[7] !== "-") {
          common_vendor.index.showModal({
            title: "错误请求",
            content: "考试时间格式不正确！(YYYY-MM-DD)",
            showCancel: false
          });
          return;
        }
      }
      if (!targetScore.value) {
        common_vendor.index.showModal({
          title: "错误请求",
          content: "请输入目标分数！",
          showCancel: false
        });
        return;
      }
      if (!credit.value) {
        common_vendor.index.showModal({
          title: "错误请求",
          content: "请输入学分！",
          showCancel: false
        });
        return;
      }
      if (!token.value) {
        common_vendor.index.showToast({
          title: "请先登录！",
          icon: "none",
          duration: 1500
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
      common_vendor.index.request({
        url: "http://106.53.182.241:8000/api/plan/generate",
        method: "POST",
        header: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token.value
        },
        data: {
          subject_name: project.value,
          knowledge_scope: knowledges.value,
          exam_date: testTime.value,
          target_score: targetScore.value,
          daily_available_minutes: 0,
          credits: credit.value,
          mastery_level: n.value,
          difficulty_rating: t.value,
          contract_days: 30,
          deposit_coins: coins.value,
          plan_type: "string",
          first_day_minutes: 0
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
          common_vendor.index.showToast({
            title: "计划生成成功！",
            icon: "success"
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
      project.value = "";
      knowledge.value = "";
      knowledges.value = [];
      testTime.value = "";
      targetScore.value = null;
      credit.value = null;
      n.value = 0;
      t.value = 0;
    };
    const handleAdd = () => {
      if (knowledge.value.trim() === "" || !knowledge.value) {
        common_vendor.index.showModal({
          title: "错误请求",
          content: "知识点输入不能为空！",
          showCancel: false
        });
        return;
      }
      knowledges.value.push(knowledge.value);
      knowledge.value = "";
    };
    const emit = __emit;
    const handleX = () => {
      common_vendor.index.navigateTo({
        url: "/pages/contract_select/contract_select"
      });
    };
    const handleless = () => {
      emit("close", true);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleless),
        b: common_vendor.o(handleX),
        c: project.value,
        d: common_vendor.o(($event) => project.value = $event.detail.value),
        e: knowledge.value,
        f: common_vendor.o(($event) => knowledge.value = $event.detail.value),
        g: common_vendor.o(handleAdd),
        h: knowledges.value.length > 0
      }, knowledges.value.length > 0 ? {
        i: common_vendor.f(knowledges.value, (kn, index, i0) => {
          return {
            a: common_vendor.t(kn),
            b: index
          };
        })
      } : {}, {
        j: testTime.value,
        k: common_vendor.o(($event) => testTime.value = $event.detail.value),
        l: targetScore.value,
        m: common_vendor.o(($event) => targetScore.value = $event.detail.value),
        n: credit.value,
        o: common_vendor.o(($event) => credit.value = $event.detail.value),
        p: common_vendor.f(common_vendor.unref(points), (point, index, i0) => {
          return {
            a: common_vendor.o(($event) => handlePointClick(index), index),
            b: index,
            c: index < n.value ? 1 : ""
          };
        }),
        q: common_vendor.f(common_vendor.unref(starts), (start, index, i0) => {
          return {
            a: common_vendor.o(($event) => handleStartClick(index), index),
            b: index,
            c: index >= t.value ? common_vendor.unref(common_assets.start_gray) : common_vendor.unref(common_assets.start_yellow)
          };
        }),
        r: common_vendor.o(handleSubmit)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fb8db99d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/NewClass.js.map
