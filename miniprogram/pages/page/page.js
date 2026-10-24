// pages/page/page.js · 通用功能页（按 code 加载并渲染所有 section）
const { request } = require('../../utils/request');

Page({
  data: {
    code: '',
    name: '',
    pg: null,
    loading: true,
    tarotFlipped: {},   // 塔罗翻牌状态 {idx: true}
  },

  onLoad(options) {
    const code = options.code || 'home';
    const name = options.name ? decodeURIComponent(options.name) : '';
    wx.setNavigationBarTitle({ title: name || '详情' });
    this.setData({ code, name });
    this.loadPage();
  },

  async loadPage() {
    try {
      this.setData({ loading: true });
      const pg = await request('/api/page/' + this.data.code);
      this.preprocess(pg);
      this.setData({ pg, loading: false });
    } catch (e) {
      this.setData({ loading: false });
    }
  },

  // 预处理：为 CSS 图表计算高度/比例/渐变
  preprocess(pg) {
    if (!pg || !pg.sections) return;
    pg.sections.forEach((s) => {
      if (s.type === 'trend') {
        const arr = (s.values || []).map(Number);
        s.maxV = Math.max.apply(null, arr.concat([1]));
        s.bars = (s.labels || []).map((lb, i) => ({ lb, v: s.values[i], h: Math.max(4, Math.round(Number(s.values[i] || 0) / s.maxV * 100)) }));
      } else if (s.type === 'dual') {
        const all = (s.a || []).concat(s.b || []).map(Number);
        s.maxV = Math.max.apply(null, all.concat([1]));
        s.bars = (s.labels || []).map((lb, i) => ({
          lb, a: s.a[i], b: s.b[i],
          ah: Math.max(4, Math.round(Number(s.a[i] || 0) / s.maxV * 100)),
          bh: Math.max(4, Math.round(Number(s.b[i] || 0) / s.maxV * 100)),
        }));
      } else if (s.type === 'donut') {
        const total = (s.items || []).reduce((t, it) => t + Number(it[1]), 0) || 1;
        let acc = 0;
        s.items = (s.items || []).map((it) => {
          const pct = Math.round(Number(it[1]) / total * 100);
          const start = acc; acc += pct;
          return { name: it[0], val: it[1], color: it[2], pct, start, end: acc };
        });
        s.total = total;
        s.grad = s.items.map((it) => it.color + ' ' + it.start + '% ' + it.end + '%').join(', ');
      } else if (s.type === 'bigring') {
        const pct = Number(s.pct) || 0;
        s.ringGrad = 'conic-gradient(#14b8a6 ' + pct + '%, #e6f7f1 ' + pct + '% 100%)';
      }
    });
  },

  onPullDownRefresh() {
    this.loadPage().then(() => wx.stopPullDownRefresh());
  },

  // 统计卡 → 详情
  tapStat(e) {
    const key = e.currentTarget.dataset.key;
    wx.navigateTo({ url: '/pages/detail/detail?code=' + this.data.code + '&statKey=' + key });
  },

  // 列表项 → 详情（用第一个统计卡 key 兜底）
  tapListItem(e) {
    const key = e.currentTarget.dataset.key || (this.data.pg && this.data.pg.stats && this.data.pg.stats[0] && this.data.pg.stats[0].statKey) || '';
    wx.navigateTo({ url: '/pages/detail/detail?code=' + this.data.code + '&statKey=' + key });
  },

  // section 整块（图表/卡片）点击 → 详情
  tapSection(e) {
    const key = e.currentTarget.dataset.key || (this.data.pg && this.data.pg.stats && this.data.pg.stats[0] && this.data.pg.stats[0].statKey) || '';
    wx.navigateTo({ url: '/pages/detail/detail?code=' + this.data.code + '&statKey=' + key });
  },

  // 行动清单勾选 → 同步后端
  async toggleAction(e) {
    const { id, idx } = e.currentTarget.dataset;
    const pg = this.data.pg;
    // 找到 action section
    pg.sections.forEach((s) => {
      if (s.type === 'action') {
        const it = s.items[idx];
        if (it) it.done = !it.done;
      }
    });
    this.setData({ pg });
    try {
      await request('/api/action/toggle', 'POST', { id });
      wx.showToast({ title: '已更新', icon: 'none' });
    } catch (e) {
      // 回滚
      pg.sections.forEach((s) => { if (s.type === 'action') { const it = s.items[idx]; if (it) it.done = !it.done; } });
      this.setData({ pg });
    }
  },

  // 今日任务按钮
  tapTask() {
    const t = this.data.pg && this.data.pg.task;
    if (!t) return;
    if (t.btnDone) {
      wx.showToast({ title: '奖励已领取 🎁', icon: 'none' });
    } else {
      wx.showModal({ title: t.title, content: t.desc, showCancel: false, confirmText: '好的' });
    }
  },

  // 视频跟练按钮
  tapVcard() {
    wx.showToast({ title: '开始跟练 💪', icon: 'none' });
  },

  // 塔罗翻牌
  flipTarot(e) {
    const idx = e.currentTarget.dataset.idx;
    const flipped = Object.assign({}, this.data.tarotFlipped);
    flipped[idx] = !flipped[idx];
    this.setData({ tarotFlipped: flipped });
  },

  // 塔罗牌意项 → 详情
  tapTarotCard(e) {
    const idx = e.currentTarget.dataset.idx;
    const sec = this.data.pg.sections.find((s) => s.type === 'tarot');
    if (sec && sec.cards[idx]) {
      wx.showModal({
        title: sec.cards[idx].num + ' ' + sec.cards[idx].name,
        content: sec.cards[idx].meaning || '暂无牌意',
        showCancel: false,
        confirmText: '明白',
      });
    }
  },
});
