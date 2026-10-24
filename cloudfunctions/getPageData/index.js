/* getPageData 云函数 · 组装页面数据（与原 server.js 的 getPageData 输出结构一致）
 * 调用：wx.cloud.callFunction({ name: 'getPageData', data: { code: 'home' } })
 * 输出：{ id, title, sub, date, stats[], task, banner, sections[], summary, quote, profile? }
 */
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command;

const DONUT_COLORS = ['#14b8a6', '#60a5fa', '#fbbf24', '#f472b6', '#a78bfa', '#4ade80', '#94a3b8'];

// 通用查询封装
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
  const code = event.code;
  if (!code) return { error: '缺少 code 参数' };

  try {
    const meta = await getOne('page_meta', { module_code: code });
    if (!meta) return { error: '页面不存在' };

    const stats = await getAll('page_stats', { module_code: code }, { field: 'sort', order: 'asc' });
    const tasks = await getAll('tasks', { module_code: code });
    const banner = await getOne('banners', { module_code: code });
    const actions = await getAll('action_items', { module_code: code }, { field: 'sort', order: 'asc' });

    const pg = {
      id: code,
      title: meta.title,
      sub: meta.sub,
      date: '2024年5月12日 · 周日',
      stats: stats.map((s) => ({
        statKey: s.stat_key, icon: s.icon, tone: s.tone, label: s.label,
        value: s.value, unit: s.unit || '', sub: s.sub || '',
      })),
      task: tasks.length ? {
        title: tasks[0].title, tag: tasks[0].tag, tagTone: tasks[0].tag_tone,
        btn: tasks[0].btn, btnDone: !!tasks[0].btn_done,
        desc: tasks[0].descr, reward: tasks[0].reward, done: !!tasks[0].done,
      } : null,
      banner: banner ? { icon: banner.icon, title: banner.title, desc: banner.descr } : null,
      sections: [],
      summary: meta.summary, quote: meta.quote,
    };

    const actionSec = () => actions.length ? {
      type: 'action', span: 1, title: '行动清单',
      items: actions.map((a) => ({
        t: a.content, done: !!a.done, meta: a.scheduled_time || '', id: a._id,
      })),
    } : null;

    switch (code) {
      case 'home': {
        const tr = await getOne('trends', { module_code: 'home', trend_key: 'trend' });
        const dn = await getOne('trends', { module_code: 'home', trend_key: 'donut' });
        // 最近任务：未完成且有标题
        const allTasks = await getAll('tasks', { done: 0 });
        const todo = allTasks.filter((t) => t.title).slice(0, 6);
        if (tr) pg.sections.push({
          type: 'trend', span: 1, title: tr.title, unit: tr.unit,
          labels: tr.labels, values: tr.vals, color: tr.color, lineName: tr.line_name,
        });
        if (dn) pg.sections.push({
          type: 'donut', span: 1, title: dn.title, center: '15.2h', centerLabel: '本周总投入',
          items: dn.labels.map((n, i) => [n, dn.vals[i], DONUT_COLORS[i % DONUT_COLORS.length]]),
        });
        pg.sections.push({
          type: 'list', span: 1, title: '最近任务', more: '查看全部',
          items: todo.map((t, i) => ({
            ic: ['💪', '🍱', '📖', '🎬', '🎨', '🧹'][i % 6],
            tone: ['red', 'orange', 'blue', 'purple', 'indigo', 'green'][i % 6],
            tag: t.tag, tagTone: t.tag_tone, title: t.title, meta: '今日', done: !!t.done,
          })),
        });
        pg.sections.push({ type: 'calendar', span: 1 });
        pg.sections.push({ type: 'grid', span: 2 });
        break;
      }
      case 'profile': {
        const rate = stats.find((s) => s.stat_key === 'rate');
        pg.profile = { name: '小柚子', tags: ['成长新星', '自我成长者'], desc: '记录美好的生活，每天启幕。', avatar: '👧' };
        const quickItems = ['task', 'focus', 'streak'].map((k, i) => {
          const s = stats.find((x) => x.stat_key === k);
          return {
            ic: ['📋', '⏱️', '💗'][i], tone: ['teal', 'purple', 'pink'][i],
            label: s ? s.label : '', v: s ? s.value : '', d: s ? s.sub : '',
            pct: [67, 80, 90][i],
          };
        });
        pg.sections.push({ type: 'quick', span: 1, title: '今日速览', items: quickItems });
        pg.sections.push({ type: 'bigring', span: 1, title: '今日完成率', note: '今日 6/9', pct: rate ? Number(rate.value) : 67 });
        const ms = await getAll('mastery');
        pg.sections.push({
          type: 'mastery', span: 1, title: '各模块熟练度（百分比）', more: '培养模块30天熟练度',
          rows: ms.map((m) => [m.icon, m.name, m.percent]),
        });
        const utd = (await getAll('tasks', { done: 0 })).filter((t) => t.title).slice(0, 3);
        pg.sections.push({
          type: 'todo', span: 1, title: '待完成任务', cta: '去完成任务',
          items: utd.map((t) => ({ ic: '📋', tone: 'teal', tag: t.tag, tagTone: t.tag_tone, title: t.title, meta: '今天' })),
        });
        const jl = await getOne('journals');
        if (jl) pg.sections.push({
          type: 'journal', span: 1, title: '成长记录', more: '查看全部',
          date: jl.journal_date, text: jl.content, photos: jl.photo_emojis, more2: jl.more_txt,
        });
        break;
      }
      case 'diet': {
        const w = await getOne('water_log');
        if (w) pg.sections.push({
          type: 'water', span: 1, title: '喝水进度',
          pct: Math.round(w.cups / w.total * 100), cups: w.cups, total: w.total, note: w.note,
        });
        const n = await getOne('nutrition');
        if (n) pg.sections.push({
          type: 'donut', span: 1, title: '营养摄入占比', center: String(n.total_kcal), centerLabel: 'kcal 今日总热量',
          items: [['碳水合物', n.carb, '#60a5fa'], ['蛋白质', n.protein, '#4ade80'], ['脂肪', n.fat, '#fbbf24'], ['膳食纤维', n.fiber, '#a78bfa']],
        });
        const dl = await getAll('diet_log', {}, { field: 'sort', order: 'asc' });
        pg.sections.push({
          type: 'food', span: 1, title: '今日饮食总览', more: '查看全部',
          items: dl.map((d) => ({ ic: d.icon, tone: d.tone, title: d.meal_type + ' · ' + d.meal_time, meta: d.food, right: d.kcal })),
        });
        const rp = await getOne('recipe');
        if (rp) pg.sections.push({
          type: 'recipe', span: 1, title: '今日推荐食谱',
          emoji: rp.emoji, grad: rp.grad, title2: rp.title2, tags: rp.tags, kcal: rp.kcal, desc: rp.descr,
        });
        const tr = await getOne('trends', { module_code: 'diet' });
        if (tr) pg.sections.push({
          type: 'trend', span: 1, title: tr.title, unit: tr.unit,
          labels: tr.labels, values: tr.vals, color: tr.color, lineName: '热量',
        });
        const a = actionSec(); if (a) pg.sections.push(a);
        break;
      }
      case 'fitness': {
        pg.sections.push({
          type: 'vcard', span: 1, title: '今日跟练推荐', more: '查看更多',
          emoji: '🧘', grad: 'linear-gradient(135deg,#bae6fd,#c7d2fe)',
          vtitle: '八段锦完整跟练', vdesc: '经典养生功法 · 调气息 · 全身舒展',
          tags: ['初学', '养生', '约 100 kcal'],
          meta: ['⏱ 12 分钟', '🎞 全 5 节', '🔥 约 100 kcal'], btn: '开始跟练',
        });
        const fitStats = stats.slice(0, 4);
        pg.sections.push({
          type: 'stat4', span: 1, title: '运动数据', more: '今日',
          items: fitStats.map((s) => ({ ic: s.icon, tone: s.tone, label: s.label, v: s.value, unit: s.unit, d: s.sub })),
        });
        const da = await getOne('trends', { module_code: 'fitness', trend_key: 'dual' });
        const db2 = await getOne('trends', { module_code: 'fitness', trend_key: 'dual2' });
        if (da && db2) pg.sections.push({
          type: 'dual', span: 1, title: '本周趋势', labels: da.labels,
          a: da.vals, aname: da.line_name, b: db2.vals, bname: '消耗热量 (kcal)',
        });
        const pl = await getAll('practice_log', { module_code: 'fitness' }, { field: 'sort', order: 'asc' });
        if (pl.length) pg.sections.push({
          type: 'list', span: 1, title: '练习记录', more: '查看全部',
          items: pl.map((p) => ({ ic: p.icon, tone: p.tone, title: p.title, meta: p.meta, right: p.right_txt })),
        });
        const a = actionSec(); if (a) pg.sections.push(a);
        break;
      }
      case 'tarot': {
        const cards = await getAll('tarot_cards');
        pg.sections.push({
          type: 'tarot', span: 2, title: '每日占卜', more: '从混乱到成长 · 抽取今日的指引',
          tabs: ['每日一抽', '时间之流', '关系三角', '二择一'],
          placeholder: '此刻你想问什么？写下你的问题（可选）',
          cards: cards.map((c) => ({ num: c.card_num, name: c.card_name, emoji: c.emoji })),
        });
        const today = cards[0];
        if (today) pg.sections.push({
          type: 'cardMeaning', span: 1, title: '今日牌意', more: '牌意卡片',
          num: today.card_num, name: today.card_name, tags: today.tags, text: today.meaning,
        });
        pg.sections.push({
          type: 'list', span: 1, title: '学习要点', more: '更多',
          items: [
            { ic: '🔑', tone: 'purple', title: '关键词', meta: '平衡 · 调和 · 耐心 · 整合' },
            { ic: '💡', tone: 'blue', title: '核心精义', meta: '不偏不倚，在两极之间找到流动的中间点' },
            { ic: '🌙', tone: 'indigo', title: '逆境提示', meta: '失衡与急躁，提醒你放慢节奏' },
            { ic: '🌱', tone: 'green', title: '生活应用', meta: '在计划与休息之间找到自己的韵律' },
          ],
        });
        const a = actionSec(); if (a) pg.sections.push(a);
        break;
      }
      case 'film': {
        const ar = await getAll('articles', { module_code: 'film' }, { field: 'sort', order: 'asc' });
        pg.sections.push({
          type: 'list', span: 1, title: '今日安排', more: '查看全部',
          items: ar.map((a) => ({ ic: a.icon, tone: a.tone, title: a.title, meta: a.meta, right: a.done ? '✅ 完成' : '' })),
        });
        const sc = await getAll('schedule', { module_code: 'film' }, { field: 'sort', order: 'asc' });
        if (sc.length) pg.sections.push({
          type: 'schedule', span: 1, title: '练习安排', more: '课程计划',
          items: sc.map((s) => ({ time: s.time_str, ic: s.icon, tone: s.tone, title: s.title, meta: s.meta, right: s.right_txt })),
        });
        const pl = await getAll('practice_log', { module_code: 'film' }, { field: 'sort', order: 'asc' });
        if (pl.length) pg.sections.push({
          type: 'list', span: 1, title: '作品记录', more: '查看全部',
          items: pl.map((p) => ({ ic: p.icon, tone: p.tone, title: p.title, meta: p.meta, right: p.right_txt })),
        });
        const a = actionSec(); if (a) pg.sections.push(a);
        break;
      }
      case 'plan': {
        const ar = await getAll('articles', { module_code: 'plan' }, { field: 'sort', order: 'asc' });
        const half = Math.ceil(ar.length / 2);
        pg.sections.push({
          type: 'list', span: 1, title: '上午安排', more: '查看全部',
          items: ar.slice(0, half).map((a) => ({ ic: a.icon, tone: a.tone, title: a.title, meta: a.meta, done: !!a.done })),
        });
        pg.sections.push({
          type: 'list', span: 1, title: '下午 & 晚间', more: '查看全部',
          items: ar.slice(half).map((a) => ({ ic: a.icon, tone: a.tone, title: a.title, meta: a.meta, done: !!a.done })),
        });
        break;
      }
      case 'wellness':
      case 'tcm':
      case 'french': {
        const ar = await getAll('articles', { module_code: code }, { field: 'sort', order: 'asc' });
        const titleMap = { wellness: '今日推荐阅读', tcm: '今日学习', french: '今日学习内容' };
        pg.sections.push({
          type: 'list', span: 1, title: titleMap[code] || '今日学习', more: '查看更多',
          items: ar.map((a) => ({ ic: a.icon, tone: a.tone, title: a.title, meta: a.meta, done: !!a.done })),
        });
        const a = actionSec(); if (a) pg.sections.push(a);
        break;
      }
      case 'settings': {
        const st = await getAll('settings');
        pg.sections.push({
          type: 'list', span: 1, title: '常用设置',
          items: st.map((s) => ({ ic: s.icon, tone: s.tone, title: s.title, meta: s.descr, right: s.status })),
        });
        pg.sections.push({
          type: 'action', span: 1, title: '待办设置',
          items: actions.map((a) => ({ t: a.content, done: !!a.done, meta: a.scheduled_time || '', id: a._id })),
        });
        break;
      }
    }
    return pg;
  } catch (e) {
    return { error: e.message };
  }
};
