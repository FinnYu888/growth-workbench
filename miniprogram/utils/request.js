// utils/request.js · 云开发版：路由映射旧 API 路径到云函数调用
// 保留原 request(path, method, data) 签名，所有页面代码无需修改
const app = getApp();

// 把旧的 /api/xxx 路径映射到云函数名和参数
function routeToCloud(path, method, data) {
  // /api/auth/wx-login → login 云函数
  if (path === '/api/auth/wx-login') return { name: 'login', data: { nickname: data.nickname, avatar: data.avatar } };
  // /api/auth/me → 不再调云函数，直接返回 globalData（openid 鉴权无需查 session）
  if (path === '/api/auth/me') return { name: '__local__', data: null };
  // /api/auth/logout → 本地清理即可
  if (path === '/api/auth/logout') return { name: '__local_logout__', data: null };
  // /api/modules → getModules 云函数
  if (path === '/api/modules') return { name: 'getModules', data: {} };
  // /api/page/:code → getPageData 云函数
  const pageMatch = path.match(/^\/api\/page\/(.+)$/);
  if (pageMatch) return { name: 'getPageData', data: { code: pageMatch[1] } };
  // /api/action/toggle → toggleAction 云函数
  if (path === '/api/action/toggle') return { name: 'toggleAction', data: { id: data.id } };
  // /api/detail/:code/:statKey → getDetail 云函数
  const detailMatch = path.match(/^\/api\/detail\/(.+)\/(.+)$/);
  if (detailMatch) return { name: 'getDetail', data: { code: detailMatch[1], statKey: detailMatch[2] } };
  return null;
}

function request(path, method = 'GET', data = {}) {
  const route = routeToCloud(path, method, data);
  if (!route) {
    return Promise.reject(new Error('未知接口: ' + path));
  }

  // 本地接口（无需调云函数）
  if (route.name === '__local__') {
    // /api/auth/me → 返回 globalData 中的 userInfo
    const u = app.globalData.userInfo;
    if (!u) {
      app.logout();
      wx.reLaunch({ url: '/pages/login/login' });
      return Promise.reject(new Error('未登录'));
    }
    return Promise.resolve({
      nickname: u.nickname, avatar: u.avatar,
      growth_days: u.growth_days, total_score: u.total_score,
      level_tag: u.level_tag, signature: u.signature,
    });
  }
  if (route.name === '__local_logout__') {
    return Promise.resolve({ ok: true });
  }

  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: route.name,
      data: route.data,
      success: (res) => {
        const r = res.result;
        if (r && r.error) {
          wx.showToast({ title: r.error, icon: 'none' });
          return reject(new Error(r.error));
        }
        resolve(r);
      },
      fail: (err) => {
        wx.showToast({ title: '云函数调用失败', icon: 'none' });
        reject(err);
      },
    });
  });
}

module.exports = { request };
