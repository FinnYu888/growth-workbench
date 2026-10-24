/* getModules 云函数 · 返回可见模块列表（用于首页网格入口） */
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  try {
    const { data } = await db.collection('modules')
      .where({ visible: 1 })
      .orderBy('sort_order', 'asc')
      .get();
    return data.map((m) => ({
      code: m.code,
      name: m.name,
      icon: m.icon,
      tone: m.tone,
    }));
  } catch (e) {
    return { error: e.message };
  }
};
