/* ============ 个人成长工作台 · 后端服务 ============ */
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
const path = require('path');
const crypto = require('crypto');

const DB = {
  host: '10.139.92.107', port: 3306,
  user: 'devuser', password: 'Cds@1234',
  database: 'workbench', charset: 'utf8mb4',
  waitForConnections: true, connectionLimit: 8,
  connectTimeout: 15000,
};
const pool = mysql.createPool(DB);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'growth-workbench-2026-secret',
  resave: false, saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 3600 * 1000, httpOnly: true },
}));
app.use(express.static(path.join(__dirname, '..')));

/* ---------- 微信小程序配置 ---------- */
const WX_APPID = 'wxd99710c857878a41';
// 真实授权登录需配置 AppSecret（微信公众平台→开发→开发设置）。
// 未配置时降级为开发态：用 code 作伪 openid，保证登录流程可跑通。
const WX_APP_SECRET = process.env.WX_APP_SECRET || '';

/* 用 wx.login 的 code 调用微信 code2session 换取 openid */
async function code2session(code) {
  if (!WX_APP_SECRET) {
    return { openid: 'dev_' + String(code).slice(0, 16), session_key: '', dev: true };
  }
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${WX_APPID}&secret=${WX_APP_SECRET}&js_code=${encodeURIComponent(code)}&grant_type=authorization_code`;
  const r = await fetch(url);
  const j = await r.json();
  if (j.errcode) throw new Error('code2session 失败(' + j.errcode + '): ' + j.errmsg);
  return { openid: j.openid, session_key: j.session_key, dev: false };
}

/* ---------- 鉴权：兼容 token（小程序）与 session（web） ---------- */
async function auth(req, res, next) {
  try {
    const token = req.headers['x-wb-token'];
    if (token) {
      const [s] = await pool.query('SELECT user_id, nickname FROM wb_login_sessions WHERE session_token=?', [token]);
      if (s.length) {
        req.session = req.session || {};
        req.session.userId = s[0].user_id;
        req.session.nickname = s[0].nickname;
        req.session.token = token;
        return next();
      }
      return res.status(401).json({ error: 'token 已失效', code: 'NO_AUTH' });
    }
    if (req.session && req.session.userId) return next();
    return res.status(401).json({ error: '未登录', code: 'NO_AUTH' });
  } catch (e) { return res.status(500).json({ error: '鉴权异常: ' + e.message }); }
}

/* 微信小程序登录：接收 wx.login 的 code（换取 openid）+ 用户授权的 nickname/avatar */
app.post('/api/auth/wx-login', async (req, res) => {
  const { code, nickname, avatar } = req.body;
  try {
    let userId;
    if (code) {
      // 真实流程：code → code2session → openid
      const wx = await code2session(code);
      const openid = wx.openid;
      const [u] = await pool.query('SELECT id FROM wb_users WHERE openid=?', [openid]);
      const nick = (nickname || '微信用户').toString().trim().slice(0, 32) || '微信用户';
      const av = (avatar || '🧑').toString().slice(0, 8);
      if (u.length) {
        userId = u[0].id;
        await pool.query('UPDATE wb_users SET nickname=?, avatar=? WHERE id=?', [nick, av, userId]);
      } else {
        // 新用户：注册
        const [ins] = await pool.query(
          'INSERT INTO wb_users(openid,nickname,avatar,growth_days,total_score,level_tag,signature) VALUES(?,?,?,1,0,?,?)',
          [openid, nick, av, '成长新星', '记录美好的生活，每天启幕。']
        );
        userId = ins.insertId;
      }
    } else {
      // 兼容旧模拟登录（无 code 时复用预置用户）
      userId = 1;
      const nick = (nickname || '微信用户').toString().trim().slice(0, 32) || '微信用户';
      const av = (avatar || '🧑').toString().slice(0, 8);
      await pool.query('UPDATE wb_users SET nickname=?, avatar=? WHERE id=1', [nick, av]);
    }
    const [u] = await pool.query('SELECT * FROM wb_users WHERE id=?', [userId]);
    const user = u[0];
    const token = crypto.randomBytes(16).toString('hex');
    await pool.query('INSERT INTO wb_login_sessions(session_token,user_id,nickname) VALUES(?,?,?)', [token, userId, user.nickname]);
    req.session = req.session || {};
    req.session.userId = userId;
    req.session.nickname = user.nickname;
    req.session.token = token;
    res.json({
      ok: true, token, dev: !WX_APP_SECRET,
      nickname: user.nickname, avatar: user.avatar,
      growth_days: user.growth_days, total_score: user.total_score,
      level_tag: user.level_tag, signature: user.signature,
    });
  } catch (e) {
    res.status(500).json({ error: '登录失败: ' + e.message });
  }
});

app.get('/api/auth/me', auth, async (req, res) => {
  try {
    const [u] = await pool.query('SELECT * FROM wb_users WHERE id=?', [req.session.userId]);
    if (!u.length) return res.status(401).json({ error: '用户不存在' });
    const user = u[0];
    res.json({
      nickname: req.session.nickname || user.nickname,
      avatar: user.avatar, growth_days: user.growth_days,
      total_score: user.total_score, level_tag: user.level_tag, signature: user.signature,
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/auth/logout', auth, (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

/* ---------- 模块列表 ---------- */
app.get('/api/modules', auth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT code,name,icon,tone FROM wb_modules WHERE visible=1 ORDER BY sort_order');
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

/* ---------- 行动清单勾选 ---------- */
app.post('/api/action/toggle', auth, async (req, res) => {
  const { id } = req.body;
  try {
    const [r] = await pool.query('SELECT done FROM wb_action_items WHERE id=?', [id]);
    if (!r.length) return res.status(404).json({ error: '不存在' });
    const nd = r[0].done ? 0 : 1;
    await pool.query('UPDATE wb_action_items SET done=? WHERE id=?', [nd, id]);
    res.json({ ok: true, done: !!nd });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

/* ---------- 页面数据组装 ---------- */
const DONUT_COLORS = ['#14b8a6', '#60a5fa', '#fbbf24', '#f472b6', '#a78bfa', '#4ade80', '#94a3b8'];
const DIET_TONES = ['yellow', 'green', 'orange', 'red'];

async function getPageData(code, userId) {
  const conn = await pool.getConnection();
  try {
    const [[meta]] = await conn.query('SELECT * FROM wb_page_meta WHERE module_code=?', [code]);
    if (!meta) return null;
    const [stats] = await conn.query('SELECT * FROM wb_page_stats WHERE module_code=? ORDER BY sort', [code]);
    const [tasks] = await conn.query('SELECT * FROM wb_tasks WHERE module_code=?', [code]);
    const [[banner]] = await conn.query('SELECT * FROM wb_banners WHERE module_code=?', [code]);
    const [actions] = await conn.query('SELECT * FROM wb_action_items WHERE module_code=? ORDER BY sort', [code]);

    const pg = {
      id: code,
      title: code === 'home' ? (meta.title) : meta.title,
      sub: meta.sub,
      date: '2024年5月12日 · 周日',
      stats: stats.map(s => ({ icon: s.icon, tone: s.tone, label: s.label, value: s.value, unit: s.unit || '', sub: s.sub || '' })),
      task: tasks.length ? { title: tasks[0].title, tag: tasks[0].tag, tagTone: tasks[0].tag_tone, btn: tasks[0].btn, btnDone: !!tasks[0].btn_done, desc: tasks[0].descr, reward: tasks[0].reward, done: !!tasks[0].done } : null,
      banner: banner ? { icon: banner.icon, title: banner.title, desc: banner.descr } : null,
      sections: [],
      summary: meta.summary, quote: meta.quote,
    };

    // 通用：行动清单
    const actionSec = () => actions.length ? { type: 'action', span: 1, title: '行动清单', items: actions.map(a => ({ t: a.content, done: !!a.done, meta: a.scheduled_time || '', id: a.id })) } : null;

    switch (code) {
      case 'home': {
        const [tr] = await conn.query("SELECT * FROM wb_trends WHERE module_code='home' AND trend_key='trend'");
        const [dn] = await conn.query("SELECT * FROM wb_trends WHERE module_code='home' AND trend_key='donut'");
        const [todo] = await conn.query("SELECT t.* FROM wb_tasks t WHERE t.done=0 AND t.title<>'' ORDER BY id LIMIT 6");
        if (tr.length) pg.sections.push({ type: 'trend', span: 1, title: tr[0].title, unit: tr[0].unit, labels: tr[0].labels.split(','), values: tr[0].vals.split(',').map(Number), color: tr[0].color, lineName: tr[0].line_name });
        if (dn.length) pg.sections.push({ type: 'donut', span: 1, title: dn[0].title, center: '15.2h', centerLabel: '本周总投入', items: dn[0].labels.split(',').map((n, i) => [n, Number(dn[0].vals.split(',')[i]), DONUT_COLORS[i % DONUT_COLORS.length]]) });
        pg.sections.push({ type: 'list', span: 1, title: '最近任务', more: '查看全部', items: todo.map((t, i) => ({ ic: ['💪', '🍱', '📖', '🎬', '🎨', '🧹'][i % 6], tone: ['red', 'orange', 'blue', 'purple', 'indigo', 'green'][i % 6], tag: t.tag, tagTone: t.tag_tone, title: t.title, meta: '今日', done: !!t.done })) });
        pg.sections.push({ type: 'calendar', span: 1 });
        pg.sections.push({ type: 'grid', span: 2 });
        break;
      }
      case 'profile': {
        const rate = stats.find(s => s.stat_key === 'rate');
        pg.profile = { name: '小柚子', tags: ['成长新星', '自我成长者'], desc: '记录美好的生活，每天启幕。', avatar: '👧' };
        const quickItems = ['task', 'focus', 'streak'].map((k, i) => {
          const s = stats.find(x => x.stat_key === k);
          return { ic: ['📋', '⏱️', '💗'][i], tone: ['teal', 'purple', 'pink'][i], label: s ? s.label : '', v: s ? s.value : '', d: s ? s.sub : '', pct: [67, 80, 90][i] };
        });
        pg.sections.push({ type: 'quick', span: 1, title: '今日速览', items: quickItems });
        pg.sections.push({ type: 'bigring', span: 1, title: '今日完成率', note: '今日 6/9', pct: rate ? Number(rate.value) : 67 });
        const [ms] = await conn.query('SELECT * FROM wb_mastery ORDER BY id');
        pg.sections.push({ type: 'mastery', span: 1, title: '各模块熟练度（百分比）', more: '培养模块30天熟练度', rows: ms.map(m => [m.icon, m.name, m.percent]) });
        const [utd] = await conn.query("SELECT * FROM wb_tasks WHERE done=0 AND title<>'' ORDER BY id LIMIT 3");
        pg.sections.push({ type: 'todo', span: 1, title: '待完成任务', cta: '去完成任务', items: utd.map(t => ({ ic: '📋', tone: 'teal', tag: t.tag, tagTone: t.tag_tone, title: t.title, meta: '今天' })) });
        const [jl] = await conn.query('SELECT * FROM wb_journals ORDER BY id LIMIT 1');
        if (jl.length) pg.sections.push({ type: 'journal', span: 1, title: '成长记录', more: '查看全部', date: jl[0].journal_date, text: jl[0].content, photos: jl[0].photo_emojis.split(','), more2: jl[0].more_txt });
        break;
      }
      case 'diet': {
        const [w] = await conn.query('SELECT * FROM wb_water_log ORDER BY id LIMIT 1');
        if (w.length) pg.sections.push({ type: 'water', span: 1, title: '喝水进度', pct: Math.round(w[0].cups / w[0].total * 100), cups: w[0].cups, total: w[0].total, note: w[0].note });
        const [n] = await conn.query('SELECT * FROM wb_nutrition ORDER BY id LIMIT 1');
        if (n.length) pg.sections.push({ type: 'donut', span: 1, title: '营养摄入占比', center: String(n[0].total_kcal), centerLabel: 'kcal 今日总热量', items: [['碳水合物', n[0].carb, '#60a5fa'], ['蛋白质', n[0].protein, '#4ade80'], ['脂肪', n[0].fat, '#fbbf24'], ['膳食纤维', n[0].fiber, '#a78bfa']] });
        const [dl] = await conn.query('SELECT * FROM wb_diet_log ORDER BY sort');
        pg.sections.push({ type: 'food', span: 1, title: '今日饮食总览', more: '查看全部', items: dl.map(d => ({ ic: d.icon, tone: d.tone, title: d.meal_type + ' · ' + d.meal_time, meta: d.food, right: d.kcal })) });
        const [rp] = await conn.query('SELECT * FROM wb_recipe ORDER BY id LIMIT 1');
        if (rp.length) pg.sections.push({ type: 'recipe', span: 1, title: '今日推荐食谱', emoji: rp[0].emoji, grad: rp[0].grad, title2: rp[0].title2, tags: rp[0].tags.split(','), kcal: rp[0].kcal, desc: rp[0].descr });
        const [tr] = await conn.query("SELECT * FROM wb_trends WHERE module_code='diet'");
        if (tr.length) pg.sections.push({ type: 'trend', span: 1, title: tr[0].title, unit: tr[0].unit, labels: tr[0].labels.split(','), values: tr[0].vals.split(',').map(Number), color: tr[0].color, lineName: '热量' });
        const a = actionSec(); if (a) pg.sections.push(a);
        break;
      }
      case 'fitness': {
        pg.sections.push({ type: 'vcard', span: 1, title: '今日跟练推荐', more: '查看更多', emoji: '🧘', grad: 'linear-gradient(135deg,#bae6fd,#c7d2fe)', vtitle: '八段锦完整跟练', vdesc: '经典养生功法 · 调气息 · 全身舒展', tags: ['初学', '养生', '约 100 kcal'], meta: ['⏱ 12 分钟', '🎞 全 5 节', '🔥 约 100 kcal'], btn: '开始跟练' });
        const fitStats = stats.slice(0, 4);
        pg.sections.push({ type: 'stat4', span: 1, title: '运动数据', more: '今日', items: fitStats.map(s => ({ ic: s.icon, tone: s.tone, label: s.label, v: s.value, unit: s.unit, d: s.sub })) });
        const [da] = await conn.query("SELECT * FROM wb_trends WHERE module_code='fitness' AND trend_key='dual'");
        const [db2] = await conn.query("SELECT * FROM wb_trends WHERE module_code='fitness' AND trend_key='dual2'");
        if (da.length && db2.length) pg.sections.push({ type: 'dual', span: 1, title: '本周趋势', labels: da[0].labels.split(','), a: da[0].vals.split(',').map(Number), aname: da[0].line_name, b: db2[0].vals.split(',').map(Number), bname: '消耗热量 (kcal)' });
        const [pl] = await conn.query("SELECT * FROM wb_practice_log WHERE module_code='fitness' ORDER BY sort");
        if (pl.length) pg.sections.push({ type: 'list', span: 1, title: '练习记录', more: '查看全部', items: pl.map(p => ({ ic: p.icon, tone: p.tone, title: p.title, meta: p.meta, right: p.right_txt })) });
        const a = actionSec(); if (a) pg.sections.push(a);
        break;
      }
      case 'tarot': {
        const [cards] = await conn.query('SELECT * FROM wb_tarot_cards ORDER BY id');
        pg.sections.push({ type: 'tarot', span: 2, title: '每日占卜', more: '从混乱到成长 · 抽取今日的指引', tabs: ['每日一抽', '时间之流', '关系三角', '二择一'], placeholder: '此刻你想问什么？写下你的问题（可选）', cards: cards.map(c => ({ num: c.card_num, name: c.card_name, emoji: c.emoji })) });
        const today = cards[0] || cards[0];
        if (today) pg.sections.push({ type: 'cardMeaning', span: 1, title: '今日牌意', more: '牌意卡片', num: today.card_num, name: today.card_name, tags: today.tags.split(','), text: today.meaning });
        pg.sections.push({ type: 'list', span: 1, title: '学习要点', more: '更多', items: [
          { ic: '🔑', tone: 'purple', title: '关键词', meta: '平衡 · 调和 · 耐心 · 整合' },
          { ic: '💡', tone: 'blue', title: '核心精义', meta: '不偏不倚，在两极之间找到流动的中间点' },
          { ic: '🌙', tone: 'indigo', title: '逆境提示', meta: '失衡与急躁，提醒你放慢节奏' },
          { ic: '🌱', tone: 'green', title: '生活应用', meta: '在计划与休息之间找到自己的韵律' },
        ] });
        const a = actionSec(); if (a) pg.sections.push(a);
        break;
      }
      case 'film': {
        const [ar] = await conn.query("SELECT * FROM wb_articles WHERE module_code='film' ORDER BY sort");
        pg.sections.push({ type: 'list', span: 1, title: '今日安排', more: '查看全部', items: ar.map(a => ({ ic: a.icon, tone: a.tone, title: a.title, meta: a.meta, right: a.done ? '✅ 完成' : '' })) });
        const [sc] = await conn.query("SELECT * FROM wb_schedule WHERE module_code='film' ORDER BY sort");
        if (sc.length) pg.sections.push({ type: 'schedule', span: 1, title: '练习安排', more: '课程计划', items: sc.map(s => ({ time: s.time_str, ic: s.icon, tone: s.tone, title: s.title, meta: s.meta, right: s.right_txt })) });
        const [pl] = await conn.query("SELECT * FROM wb_practice_log WHERE module_code='film' ORDER BY sort");
        if (pl.length) pg.sections.push({ type: 'list', span: 1, title: '作品记录', more: '查看全部', items: pl.map(p => ({ ic: p.icon, tone: p.tone, title: p.title, meta: p.meta, right: p.right_txt })) });
        const a = actionSec(); if (a) pg.sections.push(a);
        break;
      }
      case 'plan': {
        const [ar] = await conn.query("SELECT * FROM wb_articles WHERE module_code='plan' ORDER BY sort");
        const half = Math.ceil(ar.length / 2);
        pg.sections.push({ type: 'list', span: 1, title: '上午安排', more: '查看全部', items: ar.slice(0, half).map(a => ({ ic: a.icon, tone: a.tone, title: a.title, meta: a.meta, done: !!a.done })) });
        pg.sections.push({ type: 'list', span: 1, title: '下午 & 晚间', more: '查看全部', items: ar.slice(half).map(a => ({ ic: a.icon, tone: a.tone, title: a.title, meta: a.meta, done: !!a.done })) });
        break;
      }
      case 'wellness':
      case 'tcm':
      case 'french': {
        const [ar] = await conn.query('SELECT * FROM wb_articles WHERE module_code=? ORDER BY sort', [code]);
        const titleMap = { wellness: '今日推荐阅读', tcm: '今日学习', french: '今日学习内容' };
        pg.sections.push({ type: 'list', span: 1, title: titleMap[code] || '今日学习', more: '查看更多', items: ar.map(a => ({ ic: a.icon, tone: a.tone, title: a.title, meta: a.meta, done: !!a.done })) });
        const a = actionSec(); if (a) pg.sections.push(a);
        break;
      }
      case 'settings': {
        const [st] = await conn.query('SELECT * FROM wb_settings ORDER BY id');
        pg.sections.push({ type: 'list', span: 1, title: '常用设置', items: st.map(s => ({ ic: s.icon, tone: s.tone, title: s.title, meta: s.descr, right: s.status })) });
        pg.sections.push({ type: 'action', span: 1, title: '待办设置', items: actions.map(a => ({ t: a.content, done: !!a.done, meta: a.scheduled_time || '', id: a.id })) });
        break;
      }
    }
    return pg;
  } finally { conn.release(); }
}

app.get('/api/page/:code', auth, async (req, res) => {
  try {
    const pg = await getPageData(req.params.code, req.session.userId);
    if (!pg) return res.status(404).json({ error: '页面不存在' });
    res.json(pg);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

/* ---------- 卡片/图表详情：点击统计卡查看明细 ---------- */
app.get('/api/detail/:code/:statKey', auth, async (req, res) => {
  const { code, statKey } = req.params;
  try {
    const [[stat]] = await pool.query('SELECT * FROM wb_page_stats WHERE module_code=? AND stat_key=?', [code, statKey]);
    if (!stat) return res.status(404).json({ error: '不存在' });
    const result = {
      code, statKey,
      icon: stat.icon, tone: stat.tone,
      title: stat.label, value: stat.value, unit: stat.unit || '', sub: stat.sub || '',
      subtitle: '明细数据', rows: [], trend: null, note: stat.sub || '',
    };
    const [tr] = await pool.query("SELECT * FROM wb_trends WHERE module_code=? ORDER BY id", [code]);
    if (tr.length) result.trend = { title: tr[0].title, labels: tr[0].labels.split(','), values: tr[0].vals.split(',').map(Number), unit: tr[0].unit, color: tr[0].color, lineName: tr[0].line_name };

    switch (code) {
      case 'diet': {
        const [dl] = await pool.query('SELECT * FROM wb_diet_log ORDER BY sort');
        const [n] = await pool.query('SELECT * FROM wb_nutrition ORDER BY id LIMIT 1');
        result.subtitle = '今日饮食明细';
        result.rows = dl.map(d => ({ label: d.icon + ' ' + d.meal_type + ' · ' + d.meal_time, value: d.food + ' · ' + d.kcal }));
        if (n.length) result.extra = { title: '营养构成', items: [['碳水', n[0].carb + 'g', '#60a5fa'], ['蛋白质', n[0].protein + 'g', '#4ade80'], ['脂肪', n[0].fat + 'g', '#fbbf24'], ['纤维', n[0].fiber + 'g', '#a78bfa'], ['总热量', n[0].total_kcal + 'kcal', '#14b8a6']] };
        break;
      }
      case 'fitness': {
        const [pl] = await pool.query("SELECT * FROM wb_practice_log WHERE module_code='fitness' ORDER BY sort");
        result.subtitle = '运动练习记录';
        result.rows = pl.map(p => ({ label: p.icon + ' ' + p.title, value: p.meta + ' · ' + p.right_txt }));
        break;
      }
      case 'film': {
        const [pl] = await pool.query("SELECT * FROM wb_practice_log WHERE module_code='film' ORDER BY sort");
        result.subtitle = '拍摄剪辑记录';
        result.rows = pl.map(p => ({ label: p.icon + ' ' + p.title, value: p.meta + ' · ' + p.right_txt }));
        break;
      }
      case 'tarot': {
        const [tc] = await pool.query('SELECT * FROM wb_tarot_cards ORDER BY id');
        result.subtitle = '塔罗牌意详情';
        result.rows = tc.map(c => ({ label: c.card_num + ' ' + c.emoji + ' ' + c.card_name, value: c.tags }));
        result.cards = tc.map(c => ({ num: c.card_num, name: c.card_name, emoji: c.emoji, tags: c.tags, meaning: c.meaning }));
        break;
      }
      case 'plan':
      case 'wellness':
      case 'tcm':
      case 'french': {
        const [ar] = await pool.query('SELECT * FROM wb_articles WHERE module_code=? ORDER BY sort', [code]);
        result.subtitle = '学习内容明细';
        result.rows = ar.map(a => ({ label: a.icon + ' ' + a.title, value: a.meta + (a.done ? ' · ✅' : ' · ○') }));
        break;
      }
      case 'profile': {
        const [ms] = await pool.query('SELECT * FROM wb_mastery ORDER BY id');
        result.subtitle = '各模块熟练度';
        result.rows = ms.map(m => ({ label: m.icon + ' ' + m.name, value: m.percent + '%' }));
        break;
      }
      case 'home': {
        const [m] = await pool.query('SELECT * FROM wb_modules WHERE visible=1 ORDER BY sort_order');
        result.subtitle = '工作台模块总览';
        result.rows = m.map(x => ({ label: x.icon + ' ' + x.name, value: x.code }));
        break;
      }
      default: {
        const [s] = await pool.query('SELECT label,value,unit,sub FROM wb_page_stats WHERE module_code=? ORDER BY sort', [code]);
        result.subtitle = '本页统计概览';
        result.rows = s.map(x => ({ label: x.label, value: x.value + (x.unit || '') }));
      }
    }
    res.json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 工作台服务已启动: http://localhost:${PORT}`));
