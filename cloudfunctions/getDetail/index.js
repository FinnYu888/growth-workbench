/* getDetail 云函数 · 卡片/图表点击查看明细
 * 调用：wx.cloud.callFunction({ name: 'getDetail', data: { code: 'home', statKey: 'task' } })
 * 输出与原 server.js /api/detail/:code/:statKey 结构一致
 */
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command;

async function getOne(collection, where = {}) {
  const { data } = await db.collection(collection).where(where).limit(1).get();
  return data[0] || null;
}
async function getAll(collection, where = {}, orderBy = null) {
  let q = db.collection(collection).where(where);
  if (orderBy) q = q.orderBy(orderBy.field, orderBy.order);
  const { data } = await q.get();
  return data;
}

exports.main = async (event, context) => {
  const { code, statKey } = event;
  if (!code || !statKey) return { error: '缺少 code 或 statKey 参数' };

  try {
    const stat = await getOne('page_stats', { module_code: code, stat_key: statKey });
    if (!stat) return { error: '不存在' };

    const result = {
      code, statKey,
      icon: stat.icon, tone: stat.tone,
      title: stat.label, value: stat.value, unit: stat.unit || '', sub: stat.sub || '',
      subtitle: '明细数据', rows: [], trend: null, note: stat.sub || '',
    };

    const trs = await getAll('trends', { module_code: code });
    if (trs.length) {
      const tr = trs[0];
      result.trend = { title: tr.title, labels: tr.labels, values: tr.vals, unit: tr.unit, color: tr.color, lineName: tr.line_name };
    }

    switch (code) {
      case 'diet': {
        const dl = await getAll('diet_log', {}, { field: 'sort', order: 'asc' });
        const n = await getOne('nutrition');
        result.subtitle = '今日饮食明细';
        result.rows = dl.map((d) => ({ label: d.icon + ' ' + d.meal_type + ' · ' + d.meal_time, value: d.food + ' · ' + d.kcal }));
        if (n) result.extra = {
          title: '营养构成',
          items: [['碳水', n.carb + 'g', '#60a5fa'], ['蛋白质', n.protein + 'g', '#4ade80'], ['脂肪', n.fat + 'g', '#fbbf24'], ['纤维', n.fiber + 'g', '#a78bfa'], ['总热量', n.total_kcal + 'kcal', '#14b8a6']],
        };
        break;
      }
      case 'fitness': {
        const pl = await getAll('practice_log', { module_code: 'fitness' }, { field: 'sort', order: 'asc' });
        result.subtitle = '运动练习记录';
        result.rows = pl.map((p) => ({ label: p.icon + ' ' + p.title, value: p.meta + ' · ' + p.right_txt }));
        break;
      }
      case 'film': {
        const pl = await getAll('practice_log', { module_code: 'film' }, { field: 'sort', order: 'asc' });
        result.subtitle = '拍摄剪辑记录';
        result.rows = pl.map((p) => ({ label: p.icon + ' ' + p.title, value: p.meta + ' · ' + p.right_txt }));
        break;
      }
      case 'tarot': {
        const tc = await getAll('tarot_cards');
        result.subtitle = '塔罗牌意详情';
        result.rows = tc.map((c) => ({ label: c.card_num + ' ' + c.emoji + ' ' + c.card_name, value: c.tags.join('、') }));
        result.cards = tc.map((c) => ({ num: c.card_num, name: c.card_name, emoji: c.emoji, tags: c.tags, meaning: c.meaning }));
        break;
      }
      case 'plan':
      case 'wellness':
      case 'tcm':
      case 'french': {
        const ar = await getAll('articles', { module_code: code }, { field: 'sort', order: 'asc' });
        result.subtitle = '学习内容明细';
        result.rows = ar.map((a) => ({ label: a.icon + ' ' + a.title, value: a.meta + (a.done ? ' · ✅' : ' · ○') }));
        break;
      }
      case 'profile': {
        const ms = await getAll('mastery');
        result.subtitle = '各模块熟练度';
        result.rows = ms.map((m) => ({ label: m.icon + ' ' + m.name, value: m.percent + '%' }));
        break;
      }
      case 'home': {
        const m = await getAll('modules', { visible: 1 }, { field: 'sort_order', order: 'asc' });
        result.subtitle = '工作台模块总览';
        result.rows = m.map((x) => ({ label: x.icon + ' ' + x.name, value: x.code }));
        break;
      }
      default: {
        const s = await getAll('page_stats', { module_code: code }, { field: 'sort', order: 'asc' });
        result.subtitle = '本页统计概览';
        result.rows = s.map((x) => ({ label: x.label, value: x.value + (x.unit || '') }));
      }
    }
    return result;
  } catch (e) {
    return { error: e.message };
  }
};
