// pages/detail/detail.js · 通用详情页（卡片/图表点击查看明细）
const { request } = require('../../utils/request');

Page({
  data: {
    code: '', statKey: '', detail: null, loading: true,
  },

  onLoad(options) {
    const { code, statKey } = options;
    this.setData({ code, statKey });
    this.loadDetail();
  },

  async loadDetail() {
    try {
      this.setData({ loading: true });
      const d = await request('/api/detail/' + this.data.code + '/' + this.data.statKey);
      // 预处理趋势柱状图
      if (d.trend) {
        const arr = (d.trend.values || []).map(Number);
        const maxV = Math.max.apply(null, arr.concat([1]));
        d.trend.bars = (d.trend.labels || []).map((lb, i) => ({ lb, v: d.trend.values[i], h: Math.max(4, Math.round(Number(d.trend.values[i] || 0) / maxV * 100)) }));
      }
      this.setData({ detail: d, loading: false });
    } catch (e) {
      this.setData({ loading: false });
    }
  },

  // 塔罗牌意详情
  tapCard(e) {
    const meaning = e.currentTarget.dataset.meaning;
    const name = e.currentTarget.dataset.name;
    wx.showModal({ title: name, content: meaning, showCancel: false, confirmText: '明白' });
  },
});
