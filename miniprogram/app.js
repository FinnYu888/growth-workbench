// app.js · 个人成长工作台小程序
const { request } = require('./utils/request');

App({
  globalData: {
    userInfo: null,        // { nickname, avatar, growth_days, total_score, level_tag, signature }
    baseUrl: 'http://localhost:8080',   // 后端地址（开发态本地；正式部署改为公网 https 域名）
    token: null,
    ready: false,
  },

  onLaunch() {
    // 尝试恢复登录态
    this.restoreLogin();
  },

  restoreLogin() {
    const token = wx.getStorageSync('wb_token');
    const user = wx.getStorageSync('wb_user');
    if (token && user) {
      this.globalData.token = token;
      this.globalData.userInfo = user;
      this.globalData.ready = true;
    } else {
      this.globalData.ready = true;
    }
  },

  // 真实微信登录：wx.login 取 code → 后端 code2session 换 openid
  wxLogin(nickname, avatar) {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          const code = res.code;
          request('/api/auth/wx-login', 'POST', {
            code,
            nickname,
            avatar,
          }).then((data) => {
            this.globalData.token = data.token;
            this.globalData.userInfo = {
              nickname: data.nickname,
              avatar: data.avatar,
              growth_days: data.growth_days,
              total_score: data.total_score,
              level_tag: data.level_tag,
              signature: data.signature,
            };
            wx.setStorageSync('wb_token', data.token);
            wx.setStorageSync('wb_user', this.globalData.userInfo);
            resolve(this.globalData.userInfo);
          }).catch(reject);
        },
        fail: reject,
      });
    });
  },

  logout() {
    this.globalData.token = null;
    this.globalData.userInfo = null;
    wx.removeStorageSync('wb_token');
    wx.removeStorageSync('wb_user');
  },

  isLoggedIn() {
    return !!(this.globalData.token && this.globalData.userInfo);
  },
});
