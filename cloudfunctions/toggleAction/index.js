/* toggleAction 云函数 · 切换行动清单勾选状态
 * 调用：wx.cloud.callFunction({ name: 'toggleAction', data: { id: '...' } })
 * 云 DB 用 _id（文档主键）替代 MySQL 的自增 id
 */
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const id = event.id;
  if (!id) return { ok: false, error: '缺少 id 参数' };

  try {
    const { data: doc } = await db.collection('action_items').doc(id).get();
    if (!doc) return { ok: false, error: '行动项不存在' };

    const newDone = doc.done ? 0 : 1;
    await db.collection('action_items').doc(id).update({
      data: { done: newDone },
    });
    return { ok: true, done: !!newDone };
  } catch (e) {
    return { ok: false, error: e.message };
  }
};
