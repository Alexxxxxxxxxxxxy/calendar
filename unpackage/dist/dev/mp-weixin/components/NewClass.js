"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  __name: "NewClass",
  emits: ["close"],
  setup(__props, { emit: __emit }) {
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
    };
    const emit = __emit;
    const handleX = () => {
      emit("close", true);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleX),
        b: project.value,
        c: common_vendor.o(($event) => project.value = $event.detail.value),
        d: knowledge.value,
        e: common_vendor.o(($event) => knowledge.value = $event.detail.value),
        f: common_vendor.o(handleAdd),
        g: common_vendor.f(knowledges.value, (kn, index, i0) => {
          return {
            a: common_vendor.t(kn),
            b: index
          };
        }),
        h: testTime.value,
        i: common_vendor.o(($event) => testTime.value = $event.detail.value),
        j: targetScore.value,
        k: common_vendor.o(($event) => targetScore.value = $event.detail.value),
        l: credit.value,
        m: common_vendor.o(($event) => credit.value = $event.detail.value),
        n: common_vendor.f(common_vendor.unref(points), (point, index, i0) => {
          return {
            a: common_vendor.o(($event) => handlePointClick(index), index),
            b: index,
            c: index < n.value ? 1 : ""
          };
        }),
        o: common_vendor.f(common_vendor.unref(starts), (start, index, i0) => {
          return {
            a: common_vendor.o(($event) => handleStartClick(index), index),
            b: index,
            c: index >= t.value ? common_vendor.unref(common_assets.start_gray) : common_vendor.unref(common_assets.start_yellow)
          };
        }),
        p: common_vendor.o(handleSubmit)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fb8db99d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/NewClass.js.map
