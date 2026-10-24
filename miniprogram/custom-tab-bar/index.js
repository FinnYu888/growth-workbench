// custom-tab-bar/index.js · 自定义文本式 tabBar
Component({
  data: {
    selected: 0,
    list: [
      { pagePath: '/pages/index/index', text: '工作台' },
      { pagePath: '/pages/mine/mine', text: '我的' },
    ],
  },
  methods: {
    switchTab(e) {
      const idx = e.currentTarget.dataset.index;
      const item = this.data.list[idx];
      wx.switchTab({ url: item.pagePath });
    },
  },
});
