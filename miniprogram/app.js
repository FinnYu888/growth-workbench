// app.js · 个人成长工作台小程序（云开发版）
const { request } = require('./utils/request');

App({
  globalData: {
    userInfo: null,        // { nickname, avatar, growth_days, total_score, level_tag, signature }
    ready: false,
    // 云开发：openid 由云函数自动注入，无需 token / baseUrl
  },

  onLaunch() {
    // 初始化云开发（env 请填你的云环境 ID，见下方说明）
    // 未填写 env 时使用「首个环境」，生产建议显式指定。
    if (wx.cloud) {
      wx.cloud.init({
        // env: 'your-cloud-env-id',   // ← 在微信开发者工具「云开发」控制台获取环境 ID 后填这里
        traceUser: true,
      });
    }
    this.restoreLogin();
  },

  restoreLogin() {
    const user = wx.getStorageSync('wb_user');
    if (user) {
      this.globalData.userInfo = user;
      this.globalData.ready = true;
    } else {
      this.globalData.ready = true;
    }
  },

  // 微信授权登录：chooseAvatar 选头像 + nickname 输入 → 调 login 云函数
  // openid 由云开发自动注入，无需 wx.login 取 code
  wxLogin(nickname, avatar) {
    return request('/api/auth/wx-login', 'POST', { nickname, avatar }).then((data) => {
      this.globalData.userInfo = {
        nickname: data.nickname,
        avatar: data.avatar,
        growth_days: data.growth_days,
        total_score: data.total_score,
        level_tag: data.level_tag,
        signature: data.signature,
      };
      wx.setStorageSync('wb_user', this.globalData.userInfo);
      return this.globalData.userInfo;
    });
  },

  logout() {
    this.globalData.userInfo = null;
    wx.removeStorageSync('wb_user');
  },

  isLoggedIn() {
    return !!this.globalData.userInfo;
  },
});
