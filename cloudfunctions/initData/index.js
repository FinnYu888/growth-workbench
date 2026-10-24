/* initData 云函数 · 初始化云数据库集合并预置演示数据
 * 调用方式：在小程序里 wx.cloud.callFunction({ name: 'initData' })
 * 或在开发者工具云函数面板直接「云端测试」运行
 * 幂等：每次运行先清空再插入，可重复执行
 */
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

const D = require('./data');

// 集合清单（与 data.js 导出的 key 一一对应）
const COLLECTIONS = [
  'users', 'modules', 'page_meta', 'page_stats', 'tasks', 'banners',
  'action_items', 'trends', 'journals', 'mastery', 'diet_log',
  'water_log', 'nutrition', 'recipe', 'articles', 'tarot_cards',
  'settings', 'schedule', 'practice_log',
];

// 清空一个集合（云 DB 限制 where({}).remove 单次最多删 20 条，需分页循环）
async function clearCollection(name) {
  const MAX_RETRY = 50;
  for (let i = 0; i < MAX_RETRY; i++) {
    const { total } = await db.collection(name).count();
    if (total === 0) return;
    const { data } = await db.collection(name).limit(20).get();
    if (!data.length) return;
    const ids = data.map((d) => d._id);
    const tasks = ids.map((_id) => db.collection(name).doc(_id).remove());
    await Promise.all(tasks);
  }
}

// 批量插入（并发 add，每批 20 条）
async function bulkInsert(name, docs) {
  if (!docs || !docs.length) return 0;
  const batch = 20;
  let n = 0;
  for (let i = 0; i < docs.length; i += batch) {
    const slice = docs.slice(i, i + batch);
    const tasks = slice.map((doc) => db.collection(name).add({ data: doc }));
    const res = await Promise.all(tasks);
    n += res.length;
  }
  return n;
}

exports.main = async (event, context) => {
  const log = [];
  const t0 = Date.now();

  try {
    // 1. 清空所有集合（云 DB 集合不存在时会在首次 add 时自动创建）
    log.push('=== [1/3] 清空旧数据 ===');
    for (const name of COLLECTIONS) {
      try {
        await clearCollection(name);
        log.push(`  ✓ 清空 ${name}`);
      } catch (e) {
        // 集合可能不存在（首次初始化），忽略错误
        log.push(`  - 跳过 ${name}（${e.errMsg || '未创建，将在插入时自动创建'}）`);
      }
    }

    // 2. 批量插入预置数据
    log.push('=== [2/3] 插入预置数据 ===');
    const dataMap = {
      users: D.users,
      modules: D.modules,
      page_meta: D.page_meta,
      page_stats: D.page_stats,
      tasks: D.tasks,
      banners: D.banners,
      action_items: D.action_items,
      trends: D.trends,
      journals: D.journals,
      mastery: D.mastery,
      diet_log: D.diet_log,
      water_log: D.water_log,
      nutrition: D.nutrition,
      recipe: D.recipe,
      articles: D.articles,
      tarot_cards: D.tarot_cards,
      settings: D.settings,
      schedule: D.schedule,
      practice_log: D.practice_log,
    };
    const counts = {};
    for (const name of COLLECTIONS) {
      const docs = dataMap[name] || [];
      const n = await bulkInsert(name, docs);
      counts[name] = n;
      log.push(`  ✓ ${name} · ${n} 条`);
    }

    // 3. 统计校验
    log.push('=== [3/3] 集合校验 ===');
    const verifyKeys = ['modules', 'page_stats', 'action_items', 'articles', 'tarot_cards'];
    const verify = {};
    for (const k of verifyKeys) {
      const { total } = await db.collection(k).count();
      verify[k] = total;
    }
    log.push(`  校验: ${JSON.stringify(verify)}`);

    return {
      ok: true,
      elapsed: Date.now() - t0 + 'ms',
      counts,
      verify,
      log,
    };
  } catch (e) {
    return { ok: false, error: e.message, log };
  }
};
