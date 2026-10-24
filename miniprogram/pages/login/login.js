// pages/login/login.js · 真实微信授权登录
const app = getApp();

Page({
  data: {
    avatarUrl: '',       // 微信头像临时路径（本地展示）
    avatarEmoji: '🧑',    // 发给后端的头像占位
    nickname: '',        // 微信昵称
    loading: false,
    agreed: false,
  },

  // 用户选择微信头像（button open-type="chooseAvatar"）
  onChooseAvatar(e) {
    const url = e.detail.avatarUrl;
    if (url) {
      this.setData({ avatarUrl: url });
    }
  },

  // 输入微信昵称（input type="nickname"）
  onInputNickname(e) {
    this.setData({ nickname: (e.detail.value || '').trim() });
  },

  // 同意协议
  toggleAgree() {
    this.setData({ agreed: !this.data.agreed });
  },

  // 授权登录
  async doLogin() {
    if (!this.data.agreed) {
      wx.showToast({ title: '请先阅读并同意用户协议', icon: 'none' });
      return;
    }
    if (!this.data.nickname) {
      wx.showToast({ title: '请填写微信昵称', icon: 'none' });
      return;
    }
    this.setData({ loading: true });
    try {
      // 真实授权：wx.login 取 code → 后端 code2session 换 openid
      await app.wxLogin(this.data.nickname, this.data.avatarEmoji);
      wx.showToast({ title: '登录成功', icon: 'success' });
      setTimeout(() => {
        wx.switchTab({ url: '/pages/index/index' });
      }, 500);
    } catch (e) {
      wx.showToast({ title: '登录失败：' + (e.message || '未知错误'), icon: 'none' });
    } finally {
      this.setData({ loading: false });
    }
  },

  // 跳过（游客浏览，仍需登录才能用数据）
  skip() {
    wx.switchTab({ url: '/pages/index/index' });
  },
});
