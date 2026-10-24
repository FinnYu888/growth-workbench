// utils/request.js · 封装小程序网络请求，自动带 token、统一错误处理
const app = getApp();

function request(path, method = 'GET', data = {}) {
  const baseUrl = app.globalData.baseUrl;
  const token = app.globalData.token;
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + path,
      method,
      data,
      header: {
        'content-type': 'application/json',
        ...(token ? { 'X-WB-Token': token } : {}),
      },
      success: (res) => {
        if (res.statusCode === 401) {
          // 未登录，清理并跳登录页
          app.logout();
          wx.reLaunch({ url: '/pages/login/login' });
          return reject(new Error('未登录'));
        }
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          const msg = (res.data && res.data.error) || ('请求失败 ' + res.statusCode);
          wx.showToast({ title: msg, icon: 'none' });
          reject(new Error(msg));
        }
      },
      fail: (err) => {
        wx.showToast({ title: '网络异常', icon: 'none' });
        reject(err);
      },
    });
  });
}

module.exports = { request };
