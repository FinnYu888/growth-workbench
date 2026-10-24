/* login 云函数 · 真实微信授权登录（云开发 openid 内置鉴权）
 * 小程序调用：wx.cloud.callFunction({ name: 'login', data: { nickname, avatar } })
 * openid 由云开发自动从 context 注入（无需 wx.login 取 code）
 * 首次登录自动建用户；老用户更新昵称头像
 */
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  // 云开发自动注入 openid（真实微信用户唯一标识）
  const openid = cloud.getWXContext().OPENID;
  if (!openid) {
    return { ok: false, error: '无法获取 openid（请确认云开发环境已开通）' };
  }

  const nickname = (event.nickname || '微信用户').toString().trim().slice(0, 32) || '微信用户';
  const avatar = (event.avatar || '🧑').toString().slice(0, 8);

  try {
    // 显式确保 users 集合存在（add 不会自动建集合，必须先 createCollection）
    try {
      await db.createCollection({ collectionName: 'users' });
    } catch (e) {
      // -502001 集合已存在，忽略；其他错误才抛
      if (e.errCode !== -502001 && !/-502001|already exist/i.test(e.errMsg || e.message || '')) throw e;
    }

    // 查询用户是否已存在
    let user = null;
    try {
      const { data: existing } = await db.collection('users').where({ openid }).get();
      if (existing.length) user = existing[0];
    } catch (e) {
      // 兜底：查询异常时视为新用户
      if (!/-502005|not exist/i.test(e.errMsg || e.message || '')) throw e;
    }

    if (user) {
      // 老用户：更新昵称头像（不重置 growth_days/score）
      await db.collection('users').doc(user._id).update({
        data: { nickname, avatar },
      });
      user.nickname = nickname;
      user.avatar = avatar;
    } else {
      // 新用户：自动注册
      const newUser = {
        openid,
        nickname,
        avatar,
        growth_days: 1,
        total_score: 0,
        level_tag: '成长新星',
        signature: '记录美好的生活，每天启幕。',
      };
      const { _id } = await db.collection('users').add({ data: newUser });
      user = { _id, ...newUser };
    }

    return {
      ok: true,
      nickname: user.nickname,
      avatar: user.avatar,
      growth_days: user.growth_days,
      total_score: user.total_score,
      level_tag: user.level_tag,
      signature: user.signature,
    };
  } catch (e) {
    return { ok: false, error: '登录失败: ' + e.message };
  }
};
