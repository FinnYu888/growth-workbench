/* initData 云函数 · 初始化云数据库集合并预置演示数据
 * 调用方式：在小程序里 wx.cloud.callFunction({ name: 'initData' })
 * 或在开发者工具云函数面板直接「云端测试」运行
 * 幂等：每次运行先建集合→清空→插入，可重复执行
 *
 * 关键：微信云数据库的 add 不会自动创建集合，
 * 必须先用 db.createCollection(name) 显式创建，否则 -502005。
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

// 显式创建集合（已存在 -502001 则忽略，其他错误抛出）
async function ensureCollection(name) {
  try {
    await db.createCollection({ collectionName: name });
    return 'created';
  } catch (e) {
    const code = e.errCode;
    const msg = String(e.errMsg || e.message || '');
    // -502001 collection already exists 是正常的，忽略
    if (code === -502001 || /-502001|already exist|collection exist/i.test(msg)) {
      return 'exists';
    }
    throw new Error('createCollection(' + name + ') 失败: ' + (msg || JSON.stringify(e)));
  }
}

// 清空一个集合（集合已存在；云 DB where({}).remove 单次最多删 20 条，分页循环）
async function clearCollection(name) {
  for (let i = 0; i < 100; i++) {
    const { total } = await db.collection(name).count();
    if (total === 0) return;
    const { data } = await db.collection(name).limit(20).get();
    if (!data.length) return;
    const ids = data.map((d) => d._id);
    await Promise.all(ids.map((_id) => db.collection(name).doc(_id).remove()));
  }
}

// 批量插入（并发 add，每批 20 条）
async function bulkInsert(name, docs) {
  if (!docs || !docs.length) return 0;
  const batch = 20;
  let n = 0;
  for (let i = 0; i < docs.length; i += batch) {
    const slice = docs.slice(i, i + batch);
    const res = await Promise.all(slice.map((doc) => db.collection(name).add({ data: doc })));
    n += res.length;
  }
  return n;
}

exports.main = async (event, context) => {
  const log = [];
  const t0 = Date.now();

  try {
    // 1. 显式创建所有集合（关键修复：add 不会自动建集合）
    log.push('=== [1/4] 创建集合 ===');
    for (const name of COLLECTIONS) {
      const r = await ensureCollection(name);
      log.push(`  ${r === 'created' ? '✓ 新建' : '✓ 已存在'} ${name}`);
    }

    // 2. 清空所有集合（此时集合一定存在）
    log.push('=== [2/4] 清空旧数据 ===');
    for (const name of COLLECTIONS) {
      await clearCollection(name);
      log.push(`  ✓ 清空 ${name}`);
    }

    // 3. 批量插入预置数据
    log.push('=== [3/4] 插入预置数据 ===');
    const dataMap = {
      users: D.users, modules: D.modules, page_meta: D.page_meta,
      page_stats: D.page_stats, tasks: D.tasks, banners: D.banners,
      action_items: D.action_items, trends: D.trends, journals: D.journals,
      mastery: D.mastery, diet_log: D.diet_log, water_log: D.water_log,
      nutrition: D.nutrition, recipe: D.recipe, articles: D.articles,
      tarot_cards: D.tarot_cards, settings: D.settings, schedule: D.schedule,
      practice_log: D.practice_log,
    };
    const counts = {};
    for (const name of COLLECTIONS) {
      const docs = dataMap[name] || [];
      const n = await bulkInsert(name, docs);
      counts[name] = n;
      log.push(`  ✓ ${name} · ${n} 条`);
    }

    // 4. 统计校验
    log.push('=== [4/4] 集合校验 ===');
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
