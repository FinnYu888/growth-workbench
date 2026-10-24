// pages/mine/mine.js · 我的（tabBar）
const { request } = require('../../utils/request');
const app = getApp();

Page({
  data: {
    user: null,
    menuList: [
      { icon: '📅', name: '每日计划', code: 'plan' },
      { icon: '🍱', name: '饮食', code: 'diet' },
      { icon: '💪', name: '健身', code: 'fitness' },
      { icon: '🔮', name: '塔罗星盘', code: 'tarot' },
      { icon: '⚙️', name: '设置', code: 'settings' },
    ],
  },

  onShow() {
    if (!app.isLoggedIn()) {
      wx.reLaunch({ url: '/pages/login/login' });
      return;
    }
    if (this.getTabBar()) this.getTabBar().setData({ selected: 1 });
    this.loadUser();
  },

  async loadUser() {
    try {
      const me = await request('/api/auth/me');
      this.setData({ user: me });
      app.globalData.userInfo = me;
      wx.setStorageSync('wb_user', me);
    } catch (e) {}
  },

  goPage(e) {
    const { code, name } = e.currentTarget.dataset;
    wx.navigateTo({ url: '/pages/page/page?code=' + code + '&name=' + encodeURIComponent(name) });
  },

  logout() {
    wx.showModal({
      title: '退出登录', content: '确认退出当前账号？',
      confirmColor: '#14b8a6',
      success: (r) => {
        if (!r.confirm) return;
        request('/api/auth/logout', 'POST').catch(() => {});
        app.logout();
        wx.reLaunch({ url: '/pages/login/login' });
      },
    });
  },
});
