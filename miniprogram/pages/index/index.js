// pages/index/index.js · 工作台首页（tabBar）
const { request } = require('../../utils/request');
const app = getApp();

Page({
  data: {
    nickname: '',
    pageData: null,
    modules: [],
    loading: true,
  },

  onShow() {
    // 登录态校验
    if (!app.isLoggedIn()) {
      wx.reLaunch({ url: '/pages/login/login' });
      return;
    }
    // tabBar 选中态
    if (this.getTabBar()) this.getTabBar().setData({ selected: 0 });
    const u = app.globalData.userInfo;
    this.setData({ nickname: (u && u.nickname) || '微信用户' });
    this.loadData();
  },

  async loadData() {
    try {
      this.setData({ loading: true });
      const [home, modules] = await Promise.all([
        request('/api/page/home'),
        request('/api/modules'),
      ]);
      this.setData({ pageData: home, modules, loading: false });
    } catch (e) {
      this.setData({ loading: false });
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadData().then(() => wx.stopPullDownRefresh());
  },

  // 点击统计卡 → 详情
  tapStat(e) {
    const key = e.currentTarget.dataset.key;
    wx.navigateTo({ url: '/pages/detail/detail?code=home&statKey=' + key });
  },

  // 点击模块入口 → 通用页
  goModule(e) {
    const { code, name } = e.currentTarget.dataset;
    wx.navigateTo({ url: '/pages/page/page?code=' + code + '&name=' + encodeURIComponent(name) });
  },
});
