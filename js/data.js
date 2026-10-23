/* ============ 个人成长工作台 · 页面数据 ============ */
/* 依据桌面微信设计稿整理 · 数据为演示用模拟数据 */

const TONE = {
  teal:  ['#ccfbf1','#0d9488'], red:   ['#fee2e2','#ef4444'],
  orange:['#fef3c7','#f59e0b'], blue:  ['#dbeafe','#3b82f6'],
  purple:['#ede9fe','#8b5cf6'], pink:  ['#fce7f3','#ec4899'],
  green: ['#dcfce7','#22c55e'], yellow:['#fef9c3','#ca8a04'],
  indigo:['#e0e7ff','#6366f1'], cyan:  ['#cffafe','#0891b2'],
};

const NAV = [
  {id:'home',    icon:'🏠', name:'首页'},
  {id:'profile', icon:'👤', name:'个人面板'},
  {id:'plan',    icon:'📅', name:'每日计划'},
  {id:'beauty',  icon:'💄', name:'妆容穿搭灵感'},
  {id:'diet',    icon:'🍱', name:'饮食'},
  {id:'fitness', icon:'💪', name:'健身'},
  {id:'dance',   icon:'💃', name:'舞蹈'},
  {id:'paint',   icon:'🎨', name:'绘画'},
  {id:'wellness',icon:'🌿', name:'养生知识'},
  {id:'tarot',   icon:'🔮', name:'塔罗星盘'},
  {id:'french',  icon:'🇫🇷', name:'法语学习'},
  {id:'tcm',     icon:'🍵', name:'中医养生'},
  {id:'bakery',  icon:'🧁', name:'烘焙小班'},
  {id:'film',    icon:'📷', name:'拍摄剪辑练习'},
  {id:'settings',icon:'⚙️', name:'设置'},
];

const DATE = '2024年5月12日 · 周日';

const MODULES = [
  {icon:'👤',name:'个人面板',desc:'全维度成长总览',to:'profile',tone:'teal'},
  {icon:'📅',name:'每日计划',desc:'安排每日任务',to:'plan',tone:'blue'},
  {icon:'💄',name:'妆容穿搭灵感',desc:'记录变美灵感',to:'beauty',tone:'pink'},
  {icon:'🍱',name:'饮食',desc:'记录饮食生活',to:'diet',tone:'orange'},
  {icon:'💪',name:'健身',desc:'塑形自律打卡',to:'fitness',tone:'red'},
  {icon:'💃',name:'舞蹈',desc:'舞出自信节奏',to:'dance',tone:'purple'},
  {icon:'🎨',name:'绘画',desc:'画笔记录灵感',to:'paint',tone:'indigo'},
  {icon:'🌿',name:'养生知识',desc:'学习养生知识',to:'wellness',tone:'green'},
  {icon:'🔮',name:'塔罗星盘',desc:'每日占卜指引',to:'tarot',tone:'indigo'},
  {icon:'🇫🇷',name:'法语学习',desc:'每日法语练习',to:'french',tone:'blue'},
  {icon:'🍵',name:'中医养生',desc:'传统养生智慧',to:'tcm',tone:'green'},
  {icon:'🧁',name:'烘焙小班',desc:'烘焙美味时光',to:'bakery',tone:'orange'},
  {icon:'📷',name:'拍摄剪辑练习',desc:'记录生活之美',to:'film',tone:'purple'},
];

const SUMMARY_HOME = '本周你加强了<strong>学习</strong>和<strong>健身</strong>，整体成长积分较上周上升了 12%，继续保持节奏，慢慢遇见更好的自己！💙';
const SUMMARY_DANCE = '本周共练习 <strong>4</strong> 次，累计 <strong>85</strong> 分钟。在旋律中你开始找到身体的表达，继续坚持，下周状态一定会更精彩！';
const SUMMARY_DIET = '本周整体热量波动平稳，蛋白质摄入平均达标。戒掉了晚餐的奶茶和甜食，继续保持良好的饮食习惯，身体会给你积极的反馈！💛';
const SUMMARY_FIT = '本周你共锻炼 <strong>4</strong> 次，消耗共 <strong>560</strong> kcal，运动时长 48 分钟。持续运动让你精力更充沛，心情也更稳定，继续加油！💪';
const SUMMARY_PAINT = '本周共练习 <strong>6.5</strong> 小时，完成 <strong>8</strong> 张练习作品。在动态速写和装饰描线上进步明显，继续保持手感，创造力也在悄悄生长 🎨💙';
const SUMMARY_BEAUTY = '本周你变美尝试上很有专心，共完成 <strong>32</strong> 个灵感，通过 <strong>7.8</strong> 次搭配，整体完成度 <strong>78%</strong>，敢于尝试就是最美的开始！变美就在生活的细节里 💄💙';
const SUMMARY_BAKERY = '本周共出品 <strong>26</strong> 份，完成 <strong>8</strong> 个订单，最喜欢这款草莓纸杯蛋糕。慢慢记录你的烘焙小日记，甜香和快乐会一起出炉！🧁';

const QUOTE_HOME = '每一个微小的坚持，都在让你长成更喜欢的自己。';
const QUOTE_DANCE = '舞蹈是身体的旋律，也让平凡的日子变得闪光。';
const QUOTE_DIET = '好好吃饭，是对自己最温柔的照顾。';
const QUOTE_FIT = '流汗不是为了优秀的外表，而是为了找到更有力量的自己。';
const QUOTE_PAINT = '每一次练习，都让你更接近心中有画、笔下有光的自己。';
const QUOTE_BEAUTY = '审美出众的功底，来自日复一日的记录，变美是一种能力。';
const QUOTE_BAKERY = '怀着爱心，也在生活的小确幸里，烘焙甜蜜和温暖。';

const PAGES = [

/* ================= 首页 ================= */
{
  id:'home', title:'个人成长工作台', sub:'Overview · 欢迎你来记录与成长',
  stats:[
    {icon:'✅',tone:'teal', label:'今日任务', value:'6',unit:'项', sub:'已完成 4 · 67%'},
    {icon:'🎯',tone:'blue', label:'完成率', value:'67',unit:'%', sub:'较昨日 <b class="up">+8%</b>'},
    {icon:'🔥',tone:'red', label:'连续打卡', value:'18',unit:'天', sub:'继续保持！'},
    {icon:'⏱️',tone:'purple',label:'专注时长', value:'3.5',unit:'小时', sub:'较昨日 <b class="up">+15%</b>'},
    {icon:'⭐',tone:'yellow',label:'成长积分', value:'860',unit:'分', sub:'较昨日 <b class="up">+120</b>'},
  ],
  sections:[
    {type:'trend', span:1, title:'本周成长趋势', unit:'（任务）', labels:['5/6','5/7','5/8','5/9','5/10','5/11','5/12'], values:[3,4,6,5,7,6,9], peak:9},
    {type:'donut', span:1, title:'模块投入占比', center:'15.2h', centerLabel:'本周总投入',
      items:[['学习提升',20,'#14b8a6'],['健身塑身',18,'#60a5fa'],['饮食健康',12,'#fbbf24'],['兴趣研发',16,'#f472b6'],['自我提升',10,'#a78bfa'],['生活管理',8,'#4ade80'],['其他',16,'#94a3b8']]},
    {type:'list', span:1, title:'最近任务', more:'查看全部',
      items:[
        {ic:'💪',tone:'red', tag:'健身',tagTone:'red', title:'跳绳力量训练 30 分钟', meta:'今日 · 08:30', done:true},
        {ic:'🍱',tone:'orange', tag:'饮食',tagTone:'orange', title:'记录今日饮食', meta:'今日 · 10:30', done:true},
        {ic:'📖',tone:'blue', tag:'学习',tagTone:'blue', title:'继续经典阅读 · 第 2 章', meta:'今日 · 14:00'},
        {ic:'🎬',tone:'purple', tag:'创作',tagTone:'purple', title:'制航母梦 Log v2 素材', meta:'今日 · 16:00'},
        {ic:'🎨',tone:'indigo', tag:'绘画',tagTone:'indigo', title:'画一稿插画', meta:'今日 · 19:00'},
        {ic:'🧹',tone:'green', tag:'生活',tagTone:'green', title:'整理每日计划清单', meta:'今日 · 21:00'},
      ]},
    {type:'calendar', span:1, title:'本月成长日历', more:'2024年5月'},
    {type:'grid', span:2, title:'核心模块', more:'进入你的模块'},
  ],
  summary:SUMMARY_HOME, quote:QUOTE_HOME,
},

/* ================= 个人面板 ================= */
{
  id:'profile', title:'个人面板', sub:'全维度成长总览', profile:true,
  profile:{name:'小柚子', tags:['成长新星','自我成长者'], desc:'记录美好的生活，每天启幕。', avatar:'👧'},
  stats:[
    {icon:'🔥',tone:'red', label:'连续天数', value:'128',unit:'天', sub:'继续保持！'},
    {icon:'⭐',tone:'yellow',label:'总完成度', value:'860',unit:'分', sub:'稳步提升中'},
    {icon:'💳',tone:'blue', label:'积分卡', value:'312',unit:'张', sub:'可兑换成长好礼'},
    {icon:'🎫',tone:'purple',label:'经验值', value:'48',unit:'张', sub:'今日 +3'},
    {icon:'🎯',tone:'teal', label:'今日完成率', value:'67',unit:'%', sub:'今日 6/9'},
  ],
  sections:[
    {type:'quick', span:1, title:'今日速览', items:[
      {ic:'📋',tone:'teal', label:'今日任务', v:'9 项', d:'已完成 6 项', pct:67},
      {ic:'⏱️',tone:'purple',label:'专注时长', v:'4.2 小时', d:'较昨日 +1.1h', pct:80},
      {ic:'💗',tone:'pink', label:'心情状态', v:'良好', d:'保持心情 ♥', pct:90},
    ]},
    {type:'bigring', span:1, title:'今日完成率', pct:67, note:'今日 6/9'},
    {type:'mastery', span:1, title:'各模块熟练度（百分比）', more:'培养模块30天熟练度',
      rows:[
        ['👤','个人模板',90],['📅','每日计划',85],['🍱','饮食管理感受',72],['💪','健身',68],
        ['💃','舞蹈',64],['🎨','绘画',74],['🌿','养生知识',76],['🇫🇷','法语学习',66],
        ['🍵','中医养生',58],['🧁','烘焙小班',71],['🔮','塔罗星盘',63],['📷','拍摄剪辑练习',69],
      ]},
    {type:'todo', span:1, title:'待完成任务', cta:'去完成任务',
      items:[
        {ic:'💪',tone:'red', tag:'运动',tagTone:'red', title:'居家力量训练 30 分钟', meta:'今天 · 16:00'},
        {ic:'🍱',tone:'orange', tag:'饮食',tagTone:'orange', title:'记录今日饮食', meta:'今天 · 12:20', done:true},
        {ic:'📖',tone:'blue', tag:'学习',tagTone:'blue', title:'继续经典阅读 · 第 2 章', meta:'今天 · 14:00'},
      ]},
    {type:'journal', span:1, title:'成长记录', more:'查看全部',
      date:'5月12日', text:'今天完成了 6 项任务，整体成长很不错！继续保持，也可以记录下饮食和小贴士，让成长看得见。作为一名记录者，今天也要加油哦 💪',
      photos:['🌸','🧋','📷'], more:'+2'},
  ],
  summary:SUMMARY_HOME, quote:QUOTE_HOME,
},

/* ================= 每日计划（通用模板） ================= */
{
  id:'plan', title:'每日计划', sub:'今日安排 · 任务清单 · 时间规划',
  stats:[
    {icon:'✅',tone:'teal', label:'今日计划', value:'8',unit:'项', sub:'已完成 5 · 62%'},
    {icon:'🎯',tone:'blue', label:'完成率', value:'62',unit:'%', sub:'较昨日 <b class="up">+6%</b>'},
    {icon:'⏰',tone:'purple',label:'专注时段', value:'5',unit:'段', sub:'共 3.2 小时'},
    {icon:'🌟',tone:'yellow',label:'计划积分', value:'+46',unit:'分', sub:'昨日 +52'},
  ],
  task:{title:'整理今日计划清单并完成优先级排序', tag:'每日计划', tagTone:'blue', btn:'开始执行', desc:'按重要紧急程度安排今天 8 项任务'},
  banner:{icon:'💡', title:'好的计划是成功的一半', desc:'建议早上安排高专注任务，午后安排轻量任务，晚间复盘总结。'},
  sections:[
    {type:'list', span:1, title:'上午安排', more:'查看全部', items:[
      {ic:'🌅',tone:'orange', tag:'晨间',tagTone:'orange', title:'晨间复盘 & 计划确认', meta:'07:30 - 08:00', done:true},
      {ic:'📖',tone:'blue', tag:'学习',tagTone:'blue', title:'经典阅读 · 第 2 章', meta:'09:00 - 10:00', done:true},
      {ic:'💻',tone:'teal', tag:'工作',tagTone:'teal', title:'核心任务 · 深度专注', meta:'10:30 - 12:00'},
    ]},
    {type:'list', span:1, title:'下午 & 晚间', more:'查看全部', items:[
      {ic:'🍱',tone:'orange', tag:'午间',tagTone:'orange', title:'午餐后散步 20 分钟', meta:'13:00 - 13:30', done:true},
      {ic:'🎨',tone:'indigo', tag:'兴趣',tagTone:'indigo', title:'绘画练习一稿', meta:'15:00 - 16:30'},
      {ic:'🧹',tone:'green', tag:'生活',tagTone:'green', title:'整理房间 & 明日准备', meta:'21:00 - 21:30'},
    ]},
  ],
  summary:'本周计划完成率达到 <strong>78%</strong>，比上周提升了 <strong>9%</strong>。晚间复盘的习惯正在养成，继续加油！',
  quote:'把每一天安排得明明白白，生活就不会辜负你的认真。',
},

/* ================= 妆容穿搭灵感 ================= */
{
  id:'beauty', title:'妆容穿搭灵感', sub:'变美学习 · 穿搭灵感 · 变美计划',
  stats:[
    {icon:'✨',tone:'pink', label:'今日灵感', value:'5',unit:'条', sub:'较昨日 <b class="up">+2</b>'},
    {icon:'💄',tone:'red', label:'收纳整理', value:'32',unit:'个', sub:'本周 <b class="up">+8</b>'},
    {icon:'👗',tone:'blue', label:'本周搭配次数', value:'6',unit:'次', sub:'较上周 <b class="up">+50%</b>'},
    {icon:'⭐',tone:'purple',label:'灵感完成度', value:'78',unit:'%', sub:'上周 +12%'},
  ],
  task:{title:'记录一套通勤穿搭', tag:'变美打卡', tagTone:'pink', btn:'去完成记录', btnDone:true,
    desc:'拍下今日穿搭，记录喜欢的风格标签', reward:'已完成 7 天 · 奖励 +650 成长分'},
  banner:{icon:'🧴', title:'通勤风 · 每周打卡', desc:'今天干净清爽的通勤风格就完成啦！温柔又有气质，继续记录你的灵感碎片～'},
  sections:[
    {type:'rings4', span:1, title:'本周变美进度', items:[
      {pct:78,name:'穿搭尝试',v:'4 / 5'},{pct:80,name:'穿搭记录',v:'4 / 5'},
      {pct:78,name:'灵感收集',v:'4 / 5'},{pct:78,name:'变美提升',v:'4 / 5'},
    ]},
    {type:'cards', span:1, title:'今日推荐', more:'查看更多', cols:2,
      items:[
        {emoji:'👗',grad:'linear-gradient(135deg,#dbeafe,#e0e7ff)',tag:'通勤',tone:'blue', title:'清爽通勤穿搭', desc:'白色上衣 + 高腰长裤'},
        {emoji:'🌸',grad:'linear-gradient(135deg,#fce7f3,#ffe4e6)',tag:'日常',tone:'pink', title:'清透伪素颜妆', desc:'轻薄底妆 + 水润唇釉'},
        {emoji:'🧥',grad:'linear-gradient(135deg,#fef3c7,#ffe4e6)',tag:'温柔',tone:'orange', title:'温柔奶系穿搭', desc:'奶油色开衫 + 半身裙'},
        {emoji:'💄',grad:'linear-gradient(135deg,#ede9fe,#fce7f3)',tag:'约会',tone:'purple', title:'粉嫩的约会妆容', desc:'蜜桃眼影 + 玻璃唇'},
      ]},
    {type:'steps5', span:1, title:'妆容步骤 / 穿搭清单', more:'查看步骤', items:[
      ['🧴','底妆护肤','清洁 → 爽肤 → 精华 → 面霜'],['🥚','底妆','妆前乳 → 粉底 → 遮瑕 → 定妆'],
      ['✏️','眉眼','眉笔 → 眼影 → 眼线 → 睫毛'],['🍑','樱桃脸颊','腮红 → 高光 → 修容'],
      ['💄','唇妆','润唇 → 唇线 → 口红'],
    ]},
    {type:'trend', span:1, title:'本周风格趋势', unit:'', labels:['周一','周二','周三','周四','周五','周六','周日'], values:[3,4,5,4,6,5,7], color:'#f472b6', lineName:'搭配灵感'},
    {type:'action', span:1, title:'行动清单',
      items:[
        {t:'完成 2 个妆容穿搭灵感', done:true, meta:'今天 14:20'},
        {t:'记录一套通勤穿搭', done:true, meta:'今天 16:20'},
        {t:'整理穿着单品清单', done:false, meta:'今天 18:00'},
        {t:'制定本周变美计划', done:false, meta:'今天 19:00'},
        {t:'浏览收藏的 3 个穿搭', done:false, meta:'今天 21:00'},
      ]},
  ],
  summary:SUMMARY_BEAUTY, quote:QUOTE_BEAUTY,
},

/* ================= 饮食 ================= */
{
  id:'diet', title:'饮食', sub:'饮食记录 · 营养分析 · 健康习惯',
  stats:[
    {icon:'✅',tone:'teal', label:'今日任务', value:'2',unit:'项', sub:'已完成 1 · 50%'},
    {icon:'🎯',tone:'blue', label:'完成率', value:'50',unit:'%', sub:'较昨日 <b class="up">+10%</b>'},
    {icon:'💧',tone:'cyan', label:'喝水量', value:'1200',unit:'ml', sub:'较昨日 <b class="up">+200 ml</b>'},
    {icon:'🔥',tone:'red', label:'今日热量', value:'1480',unit:'kcal', sub:'较目标 <b class="down">-120 kcal</b>'},
  ],
  task:{title:'记录三餐并补充喝水', tag:'饮食打卡', tagTone:'orange', btn:'全部完成', btnDone:true, desc:'早餐 ✓ · 午餐 ✓ · 晚餐 ○ · 喝水 5/8 杯'},
  banner:{icon:'🥗', title:'均衡饮食，从每一餐开始', desc:'今天蛋白质和纤维摄入不错，晚上记得少油少糖，按时补水哦！'},
  sections:[
    {type:'water', span:1, title:'喝水进度', pct:62, cups:5, total:8, note:'今日 5 / 8 杯'},
    {type:'donut', span:1, title:'营养摄入占比', center:'1480', centerLabel:'kcal 今日总热量',
      items:[['碳水合物',45,'#60a5fa'],['蛋白质',25,'#4ade80'],['脂肪',20,'#fbbf24'],['膳食纤维',10,'#a78bfa']]},
    {type:'food', span:1, title:'今日饮食总览', more:'查看全部', items:[
      {ic:'🍳',tone:'yellow', title:'早餐 · 07:30', meta:'蒸蛋 + 脱脂牛奶杯', right:'约 320 kcal'},
      {ic:'🥗',tone:'green', title:'午餐 · 12:30', meta:'鸡胸肉藜麦色拉 · 西兰花 · 胡萝卜', right:'约 520 kcal'},
      {ic:'🍲',tone:'orange', title:'晚餐 · 18:30', meta:'清炒时蔬 + 南瓜', right:'约 410 kcal'},
      {ic:'🍎',tone:'red', title:'加餐 · 15:30', meta:'苹果 + 香蕉', right:'约 230 kcal'},
    ]},
    {type:'recipe', span:1, title:'今日推荐食谱',
      emoji:'🥙', grad:'linear-gradient(135deg,#d9f99d,#a7f3d0)',
      title:'板栗鸡肉藜麦沙拉', tags:['高蛋白','低脂','减脂友好'], kcal:'约 430 kcal',
      desc:'清蒸鸡胸肉搭配藜麦与当季板栗，饱腹感强又低脂，很适合训练日午餐。'},
    {type:'trend', span:1, title:'本周饮食趋势', unit:'（kcal）', labels:['周一','周二','周三','周四','周五','周六','周日'], values:[1620,1580,1710,1490,1520,1450,1480], color:'#14b8a6'},
    {type:'action', span:1, title:'行动清单',
      items:[
        {t:'记录早餐', done:true, meta:'今天 08:30'},
        {t:'喝够 8 杯水', done:true, meta:'今天 12:20'},
        {t:'晚间少糖少油', done:false, meta:'今天 18:30'},
        {t:'睡前补一杯温水', done:false, meta:'今天 20:00'},
        {t:'复盘今日饮食', done:false, meta:'今天 21:00'},
      ]},
  ],
  summary:SUMMARY_DIET, quote:QUOTE_DIET,
},

/* ================= 健身 ================= */
{
  id:'fitness', title:'健身', sub:'强体 · 打卡 · 数据统计',
  stats:[
    {icon:'✅',tone:'teal', label:'今日任务', value:'1',unit:'项', sub:'已完成 1 · 100%'},
    {icon:'🎯',tone:'blue', label:'完成率', value:'100',unit:'%', sub:'较昨日 <b class="up">+20%</b>'},
    {icon:'🏅',tone:'yellow',label:'获得徽章', value:'1',unit:'枚', sub:'连续打卡 3 天'},
    {icon:'👟',tone:'purple',label:'步数', value:'3,268',unit:'步', sub:'今日 <b class="up">+1,842</b>'},
  ],
  task:{title:'锻炼：八段锦完整跟练（约 100 kcal）', tag:'今日已练', tagTone:'green', btn:'奖励领取', btnDone:true,
    desc:'深呼吸 · 舒展筋骨 · 放松身心 · 提升心肺'},
  banner:{icon:'💪', title:'坚持运动，身体体态和情绪都更好！', desc:'每天锻炼 12 分钟，可以提升体力、改善睡眠、增强免疫力。'},
  sections:[
    {type:'vcard', span:1, title:'今日跟练推荐', more:'查看更多',
      emoji:'🧘', grad:'linear-gradient(135deg,#bae6fd,#c7d2fe)',
      vtitle:'八段锦完整跟练', vdesc:'经典养生功法 · 调气息 · 全身舒展',
      tags:['初学','养生','约 100 kcal'], meta:['⏱ 12 分钟','🎞 全 5 节','🔥 约 100 kcal'], btn:'开始跟练'},
    {type:'stat4', span:1, title:'运动数据', more:'今日', items:[
      {ic:'🔥',tone:'red', label:'燃烧热量', v:'120',unit:'kcal', d:'较昨日 +15'},
      {ic:'⏱',tone:'blue', label:'运动时长', v:'12',unit:'分钟', d:'较昨日 +4'},
      {ic:'❤️',tone:'pink', label:'平均心率', v:'98',unit:'次/分', d:'正常区间'},
      {ic:'👟',tone:'purple',label:'步数', v:'3,268',unit:'步', d:'今日 +1,842'},
    ]},
    {type:'dual', span:1, title:'本周趋势', labels:['周一','周二','周三','周四','周五','周六','周日'],
      a:[1,2,2,1,2,2,3], aname:'运动次数', b:[80,120,150,90,130,160,120], bname:'消耗热量 (kcal)'},
    {type:'action', span:1, title:'行动清单',
      items:[
        {t:'八段锦完整跟练', done:true, meta:'今天 06:30'},
        {t:'拉伸放松 5 分钟', done:true, meta:'今天 08:45'},
        {t:'喝 300ml 盐水', done:false, meta:'今天 09:00'},
        {t:'记录体重数据', done:false, meta:'今天 09:05'},
        {t:'打开并整理相册', done:false, meta:'今天 08:08'},
      ]},
  ],
  summary:SUMMARY_FIT, quote:QUOTE_FIT,
},

/* ================= 舞蹈 ================= */
{
  id:'dance', title:'舞蹈', sub:'跟练打卡 · 动作练习 · 舞感提升',
  stats:[
    {icon:'✅',tone:'teal', label:'今日任务', value:'1',unit:'项', sub:'已完成 0 · 0%'},
    {icon:'🎯',tone:'blue', label:'完成率', value:'0',unit:'%', sub:'较昨日 +0%'},
    {icon:'🔥',tone:'red', label:'连续练习', value:'6',unit:'天', sub:'继续保持！'},
    {icon:'⏱️',tone:'purple',label:'专注时长', value:'35',unit:'分钟', sub:'较昨日 <b class="up">+10%</b>'},
  ],
  task:{title:'跟练一支基础律动组合（15 分钟）', tag:'舞蹈打卡', tagTone:'purple', btn:'开始练习', desc:'跟着节奏完成今天的律动组合'},
  banner:{icon:'💃', title:'坚持练习，身体会越来越有表现力哦～', desc:'今天先从热身开始，循序渐进，感受音乐与身体的连接。'},
  sections:[
    {type:'vcard', span:1, title:'今日跟练推荐', more:'换一换',
      emoji:'💃', grad:'linear-gradient(135deg,#ddd6fe,#bfdbfe)',
      vtitle:'基础律动入门练习', vdesc:'适合零基础每日热身组合',
      tags:['零基础','律动'], meta:['⏱ 12 分钟','🔥 135 千卡'], btn:'开始跟随'},
    {type:'action2', span:1, title:'动作拆解', more:'查看全部', items:[
      ['01','热身','活动关节 唤醒身体'],['02','重心转移','左右切换 找到平衡'],
      ['03','律动组合','跟随节拍 律动全身'],['04','完整串跳','连贯完成 组合展示'],
    ]},
    {type:'schedule', span:1, title:'练习安排', more:'课程计划',
      items:[
        {time:'10:00', ic:'🤸',tone:'teal', title:'热身', meta:'活动关节 · 唤醒身体', right:'5 分钟'},
        {time:'10:10', ic:'🎵',tone:'blue', title:'基础律动', meta:'跟随节拍 · 律动练习', right:'15 分钟'},
        {time:'10:30', ic:'🏆',tone:'orange', title:'跟练挑战', meta:'挑战完整 · 巩固组合', right:'5 分钟'},
      ]},
    {type:'trend', span:1, title:'本周练习趋势', unit:'（分钟）', labels:['周一','周二','周三','周四','周五','周六','周日'], values:[20,30,25,35,30,40,35], color:'#a78bfa', lineName:'练习时长'},
    {type:'list', span:1, title:'练习记录', more:'查看全部', items:[
      {ic:'💃',tone:'purple', title:'基础律动入门练习', meta:'5月12日 10:00', right:'✅ 已完成'},
      {ic:'🕺',tone:'pink', title:'K-POP 手臂线条教学', meta:'5月11日 15:40', right:'✅ 已完成'},
      {ic:'🩰',tone:'indigo', title:'身体的线感练习', meta:'5月10日 20:10', right:'⏳ 进行中'},
    ]},
    {type:'action', span:1, title:'行动清单',
      items:[
        {t:'完成今日打卡', done:false, meta:'今天'},
        {t:'录一小段基础视频', done:false, meta:'今天'},
        {t:'拉伸放松', done:false, meta:'今天'},
        {t:'记录精彩动作', done:false, meta:'明天'},
        {t:'明天创作打卡', done:false, meta:'明天'},
      ]},
  ],
  summary:SUMMARY_DANCE, quote:QUOTE_DANCE,
},

/* ================= 绘画 ================= */
{
  id:'paint', title:'绘画', sub:'画技积累 · 素材灵感 · 表达练习',
  stats:[
    {icon:'✅',tone:'teal', label:'今日任务', value:'4',unit:'项', sub:'已完成 2 · 50%'},
    {icon:'🎯',tone:'blue', label:'完成率', value:'50',unit:'%', sub:'较昨日 <b class="up">+20%</b>'},
    {icon:'🏅',tone:'yellow',label:'获得成就', value:'3',unit:'枚', sub:'累计打卡 5 天'},
    {icon:'🔥',tone:'red', label:'连续', value:'12',unit:'天', sub:'距离下个徽章 18 天'},
  ],
  task:{title:'人物动态速写（6 分钟）', tag:'绘画打卡', tagTone:'indigo', btn:'去完成', desc:'观察线条和动态，提升对人体结构的把握'},
  banner:{icon:'🖌️', title:'素材与美学知识更新', desc:'保持观察，让每一笔都更接近你想象中的画面。每天进步一点点～'},
  sections:[
    {type:'timer', span:1, title:'专注番茄钟', more:'番茄钟设置', mode:'专注绘画', work:25, rest:45},
    {type:'cards', span:1, title:'今日素材', more:'换一批', cols:3,
      items:[
        {emoji:'🧍',grad:'linear-gradient(135deg,#e0e7ff,#cffafe)',tag:'人物',tone:'blue', title:'人物动态参考', desc:'多种动态姿态速写参考'},
        {emoji:'✍️',grad:'linear-gradient(135deg,#fef3c7,#ffe4e6)',tag:'描线',tone:'orange', title:'手部速写练习', desc:'不同角度的手部结构'},
        {emoji:'🖼️',grad:'linear-gradient(135deg,#fce7f3,#ede9fe)',tag:'色彩',tone:'purple', title:'line 装饰素材', desc:'适合插画的装饰元素'},
      ]},
    {type:'list', span:1, title:'练习记录', more:'查看全部', items:[
      {ic:'🧍',tone:'blue', title:'人物动态速写', meta:'5月12日 · 25 分钟', right:'✅ 完成'},
      {ic:'✍️',tone:'orange', title:'线稿握笔练习', meta:'5月11日 · 25 分钟', right:'⏳ 进行中'},
      {ic:'🖼️',tone:'purple', title:'装饰描线练习', meta:'5月10日 · 25 分钟', right:'✅ 完成'},
      {ic:'👁️',tone:'pink', title:'五官细节练习', meta:'5月8日 · 40 分钟', right:'✅ 完成'},
    ]},
    {type:'action', span:1, title:'行动清单',
      items:[
        {t:'人物动态速写', done:true, meta:'今天 20:30'},
        {t:'手部结构练习', done:true, meta:'今天 10:30'},
        {t:'画第一张插画', done:false, meta:'今天 14:00'},
        {t:'整理一格色板', done:false, meta:'今天 16:00'},
        {t:'整理参考素材到收藏', done:false, meta:'今天 18:30'},
        {t:'看一节名师小画', done:false, meta:'今天 21:00'},
      ]},
  ],
  summary:SUMMARY_PAINT, quote:QUOTE_PAINT,
},

/* ================= 养生知识（通用模板） ================= */
{
  id:'wellness', title:'养生知识', sub:'健康知识 · 生活方式 · 每日一签',
  stats:[
    {icon:'✅',tone:'teal', label:'今日学习', value:'2',unit:'篇', sub:'已完成 1 · 50%'},
    {icon:'🎯',tone:'blue', label:'完成率', value:'50',unit:'%', sub:'较昨日 <b class="up">+8%</b>'},
    {icon:'🌿',tone:'green', label:'连续学习', value:'9',unit:'天', sub:'继续保持！'},
    {icon:'📚',tone:'yellow',label:'知识积累', value:'36',unit:'篇', sub:'本周 +6'},
  ],
  task:{title:'阅读《四季养生要诀》春季篇', tag:'养生学习', tagTone:'green', btn:'开始阅读', desc:'了解春季养肝护脾的日常方法'},
  banner:{icon:'🌿', title:'顺时而养，身体自有答案', desc:'每天 10 分钟养生知识，慢慢调整作息与饮食，让身体回到舒服的节奏。'},
  sections:[
    {type:'list', span:1, title:'今日推荐阅读', more:'查看更多', items:[
      {ic:'🌅',tone:'orange', title:'早睡早起：修复身体的黄金时段', meta:'养生 · 8 分钟读完', done:true},
      {ic:'🫖',tone:'green', title:'春季养肝茶饮搭配指南', meta:'食疗 · 6 分钟读完'},
      {ic:'🧘',tone:'purple', title:'八段锦背后的呼吸原理', meta:'功法 · 10 分钟读完'},
    ]},
    {type:'action', span:1, title:'行动清单', items:[
      {t:'阅读春季养生篇', done:true, meta:'今天 08:00'},
      {t:'记录一条养生笔记', done:false, meta:'今天 12:00'},
      {t:'晚上 11 点前入睡', done:false, meta:'今天 23:00'},
    ]},
  ],
  summary:'本周学习了 <strong>6</strong> 篇养生文章，早睡打卡 <strong>5</strong> 天。作息正在慢慢变规律，继续保持！',
  quote:'养生不是一天的事，而是每天一点点的坚持。',
},

/* ================= 塔罗星盘 ================= */
{
  id:'tarot', title:'塔罗星盘', sub:'每日占卜 · 牌意学习',
  stats:[
    {icon:'✅',tone:'teal', label:'今日任务', value:'1',unit:'项', sub:'已完成 1 · 100%'},
    {icon:'🎯',tone:'blue', label:'完成率', value:'100',unit:'%', sub:'较昨日 <b class="up">+20%</b>'},
    {icon:'🃏',tone:'purple',label:'获得牌章', value:'3',unit:'张', sub:'累计 28 张'},
    {icon:'🔥',tone:'red', label:'连续挑战', value:'18',unit:'天', sub:'继续 <b class="up">+1 天</b>'},
  ],
  task:{title:'完成今日占卜 & 学习一张牌意', tag:'今日已完成', tagTone:'green', btn:'已完成', btnDone:true, desc:'每天一抽，记录当下并学习牌意'},
  banner:{icon:'🧘', title:'占卜前请静心默念你的问题', desc:'找一个安静的环境 · 闭上眼 · 在心里默念想问的事，然后再开始抽牌。'},
  sections:[
    {type:'tarot', span:2, title:'每日占卜', more:'从混乱到成长 · 抽取今日的指引', tabs:['每日一抽','时间之流','关系三角','二择一'], placeholder:'此刻你想问什么？写下你的问题（可选）'},
    {type:'cardMeaning', span:1, title:'今日牌意', more:'牌意卡片',
      num:'XVII', name:'节制', tags:['正位','平衡','治愈'],
      text:'节制的象征是流动与调和。它提示你：此刻不必急于求成，把注意力放回内在节奏，让热情与冷静协调运作，温和地推进当下的计划，答案会在过程中自然浮现。'},
    {type:'list', span:1, title:'学习要点', more:'更多',
      items:[
        {ic:'🔑',tone:'purple', title:'关键词', meta:'平衡 · 调和 · 耐心 · 整合'},
        {ic:'💡',tone:'blue', title:'核心精义', meta:'不偏不倚，在两极之间找到流动的中间点'},
        {ic:'🌙',tone:'indigo', title:'逆境提示', meta:'失衡与急躁，提醒你放慢节奏'},
        {ic:'🌱',tone:'green', title:'生活应用', meta:'在计划与休息之间找到自己的韵律'},
      ]},
    {type:'action', span:1, title:'行动清单',
      items:[
        {t:'记录今天的占卜结果', done:true, meta:'今天 08:40'},
        {t:'学习节制牌牌意并写笔记', done:true, meta:'今天 08:50'},
        {t:'思考最近失衡的状态', done:false, meta:'今天 09:10'},
        {t:'写下 1-3 个行动小目标', done:false, meta:'今天 09:30'},
        {t:'完成今晚睡前打卡', done:false, meta:'今天 21:30'},
      ]},
  ],
  summary:'本周完成了 <strong>7</strong> 次占卜记录，学习了 <strong>5</strong> 张新牌意。塔罗学习连续 <strong>18</strong> 天，直觉力正在稳步提升 🔮',
  quote:'牌是镜子，照见的始终是你内心的光。',
},

/* ================= 法语学习（通用模板） ================= */
{
  id:'french', title:'法语学习', sub:'每日一句 · 单词积累 · 发音练习',
  stats:[
    {icon:'✅',tone:'teal', label:'今日任务', value:'3',unit:'项', sub:'已完成 2 · 67%'},
    {icon:'🎯',tone:'blue', label:'完成率', value:'67',unit:'%', sub:'较昨日 <b class="up">+10%</b>'},
    {icon:'🔥',tone:'red', label:'连续学习', value:'11',unit:'天', sub:'继续保持！'},
    {icon:'📚',tone:'yellow',label:'单词量', value:'486',unit:'个', sub:'本周 +38'},
  ],
  task:{title:'完成今日法语听力练习（15 分钟）', tag:'法语打卡', tagTone:'blue', btn:'开始练习', desc:'精听一段日常对话，跟读模仿语音语调'},
  banner:{icon:'🇫🇷', title:'每天 15 分钟，让法语成为习惯', desc:'语言学习贵在坚持，听说读写轮着来，进步看得见！'},
  sections:[
    {type:'list', span:1, title:'今日学习内容', more:'课程表', items:[
      {ic:'🎧',tone:'blue', title:'听力精练 · 咖啡馆点单场景', meta:'听力 · 15 分钟', done:true},
      {ic:'📖',tone:'teal', title:'新单词 20 个 · 第二组动词变位', meta:'词汇 · 20 分钟', done:true},
      {ic:'🗣️',tone:'purple', title:'口语跟读 · 自我介绍段落', meta:'口语 · 10 分钟'},
    ]},
    {type:'action', span:1, title:'行动清单', items:[
      {t:'完成听力练习', done:true, meta:'今天 08:00'},
      {t:'背诵 20 个新单词', done:true, meta:'今天 13:00'},
      {t:'跟读并录音复盘', done:false, meta:'今天 19:30'},
    ]},
  ],
  summary:'本周累计学习 <strong>4.5</strong> 小时，新掌握 <strong>38</strong> 个单词。听力语感明显提升，继续保持！',
  quote:'每学会一句法语，就多了一扇看世界的窗。',
},

/* ================= 中医养生（通用模板） ================= */
{
  id:'tcm', title:'中医养生', sub:'经络知识 · 节气养生 · 食疗茶饮',
  stats:[
    {icon:'✅',tone:'teal', label:'今日功课', value:'2',unit:'项', sub:'已完成 1 · 50%'},
    {icon:'🎯',tone:'blue', label:'完成率', value:'50',unit:'%', sub:'较昨日 <b class="up">+8%</b>'},
    {icon:'🍵',tone:'green', label:'连续打卡', value:'7',unit:'天', sub:'继续保持！'},
    {icon:'🌿',tone:'yellow',label:'养生笔记', value:'21',unit:'篇', sub:'本周 +3'},
  ],
  task:{title:'学习夏季养心知识并记录笔记', tag:'中医学习', tagTone:'green', btn:'开始学习', desc:'了解夏季养心护脉的饮食与作息要点'},
  banner:{icon:'🍵', title:'夏养心，宜清补', desc:'起居有常，饮食有节，情志调畅——中医养生的三把钥匙。'},
  sections:[
    {type:'list', span:1, title:'今日学习', more:'知识库', items:[
      {ic:'❤️',tone:'red', title:'夏季养心：午休 20 分钟的好处', meta:'节气养生 · 8 分钟', done:true},
      {ic:'🫖',tone:'green', title:'酸梅汤的配方与体质适配', meta:'食疗茶饮 · 6 分钟'},
      {ic:'🦶',tone:'orange', title:'睡前泡脚的经络原理', meta:'经络知识 · 10 分钟'},
    ]},
    {type:'action', span:1, title:'行动清单', items:[
      {t:'阅读养心知识', done:true, meta:'今天 09:00'},
      {t:'记录一条食疗笔记', done:false, meta:'今天 14:00'},
      {t:'睡前泡脚 15 分钟', done:false, meta:'今天 22:00'},
    ]},
  ],
  summary:'本周完成 <strong>4</strong> 次节气知识学习，泡脚打卡 <strong>5</strong> 天。身体状态在慢慢变好，继续保持！',
  quote:'上医治未病，最好的医生是你自己的生活规律。',
},

/* ================= 烘焙小店 ================= */
{
  id:'bakery', title:'烘焙小店', sub:'配方手账 · 出品记录 · 美味灵感',
  stats:[
    {icon:'✅',tone:'teal', label:'今日任务', value:'3',unit:'项', sub:'已完成 2 · 67%'},
    {icon:'🎯',tone:'blue', label:'完成率', value:'67',unit:'%', sub:'较昨日 <b class="up">+12%</b>'},
    {icon:'📦',tone:'orange', label:'今日订单', value:'8',unit:'单', sub:'较昨日 <b class="up">+23%</b>'},
    {icon:'🧁',tone:'pink', label:'本周出品', value:'26',unit:'份', sub:'上周 <b class="up">+18%</b>'},
  ],
  task:{title:'完成草莓纸杯蛋糕出品记录', tag:'小习惯置顶', tagTone:'pink', btn:'查看完成', desc:'记录今天的烘焙出品与感受'},
  sections:[
    {type:'list', span:1, title:'今日任务', more:'查看全部', items:[
      {ic:'📋',tone:'pink', title:'确认今日订单（8 单）', meta:'今天 · 08:00', done:true},
      {ic:'🥛',tone:'orange', title:'准备奶油，更换草莓原料', meta:'今天 · 10:30', done:true},
      {ic:'📸',tone:'purple', title:'整理成品照片', meta:'今天 · 15:00'},
    ]},
    {type:'vcard', span:1, title:'今日推荐产品', more:'换一换',
      emoji:'🧁', grad:'linear-gradient(135deg,#fecdd3,#fde68a)',
      vtitle:'草莓纸杯蛋糕', vdesc:'松软奶油 + 新鲜草莓的甜香搭配',
      tags:['新品','甜品','受欢迎'], meta:['⏱ 35 分钟','🔥 6.5 寸','⭐ 18 分'], btn:'查看配方'},
    {type:'steps5', span:1, title:'配方步骤', more:'查看完整配方', items:[
      ['🥣','准备材料','称量面粉 黄油 鸡蛋'],['🧈','打发黄油','打发至蓬松发白'],
      ['🥛','混合面糊','分次加入 翻拌均匀'],['🔥','烘烤','上下火 170°C 25 分钟'],
      ['🍓','装饰出品','挤奶油摆草莓装饰'],
    ]},
    {type:'stock', span:1, title:'原料库存', more:'查看全部', items:[
      {ic:'🌾',tone:'yellow', name:'低筋面粉', v:'1 kg', pct:80, st:'充足'},
      {ic:'🧈',tone:'orange', name:'黄油', v:'200 g', pct:65, st:'充足'},
      {ic:'🥚',tone:'blue', name:'鸡蛋', v:'6 个', pct:40, st:'一般'},
      {ic:'🥛',tone:'purple', name:'淡奶油', v:'500 ml', pct:25, st:'偏低 · 补货'},
      {ic:'🍓',tone:'red', name:'草莓', v:'300 g', pct:15, st:'需补货'},
    ]},
    {type:'list', span:1, title:'出品记录', more:'查看全部', items:[
      {ic:'🍰',tone:'orange', title:'原味戚风', meta:'5月12日 14:30 · 6 份', right:'✅ 已完成'},
      {ic:'🥮',tone:'yellow', title:'蛋黄酥', meta:'5月12日 10:00 · 8 份', right:'✅ 已完成'},
      {ic:'🧁',tone:'pink', title:'草莓纸杯蛋糕', meta:'5月12日 09:30 · 12 份', right:'✅ 已完成'},
    ]},
    {type:'bars', span:1, title:'本周趋势', more:'本周', labels:['5/6','5/7','5/8','5/9','5/10','5/11','5/12'], values:[12,18,20,16,24,28,26]},
  ],
  summary:SUMMARY_BAKERY, quote:QUOTE_BAKERY,
},

/* ================= 拍摄剪辑练习（通用模板） ================= */
{
  id:'film', title:'拍摄剪辑练习', sub:'生活记录 · 剪辑技巧 · 作品灵感',
  stats:[
    {icon:'✅',tone:'teal', label:'今日任务', value:'2',unit:'项', sub:'已完成 1 · 50%'},
    {icon:'🎯',tone:'blue', label:'完成率', value:'50',unit:'%', sub:'较昨日 <b class="up">+10%</b>'},
    {icon:'📷',tone:'purple',label:'连续练习', value:'8',unit:'天', sub:'继续保持！'},
    {icon:'🎬',tone:'yellow',label:'作品数', value:'15',unit:'个', sub:'本周 +2'},
  ],
  task:{title:'剪辑一支 1 分钟生活 Vlog', tag:'剪辑练习', tagTone:'purple', btn:'开始创作', desc:'整理本周素材，配乐并完成粗剪'},
  banner:{icon:'🎬', title:'用镜头记录生活的美', desc:'多拍多剪多复盘，审美和技术都会在作品里慢慢沉淀。'},
  sections:[
    {type:'list', span:1, title:'今日安排', more:'查看全部', items:[
      {ic:'🎞️',tone:'purple', title:'整理本周拍摄素材', meta:'素材管理 · 20 分钟', done:true},
      {ic:'🎵',tone:'blue', title:'挑选 Vlog 背景音乐', meta:'配乐 · 10 分钟'},
      {ic:'✂️',tone:'pink', title:'完成粗剪并导出', meta:'剪辑 · 40 分钟'},
    ]},
    {type:'action', span:1, title:'行动清单', items:[
      {t:'整理素材到时间线', done:true, meta:'今天 10:00'},
      {t:'确定配乐风格', done:false, meta:'今天 14:00'},
      {t:'导出并复盘一版', done:false, meta:'今天 20:00'},
    ]},
  ],
  summary:'本周完成 <strong>2</strong> 支练习作品，剪辑手感更稳了。下一次尝试转场和调色进阶！',
  quote:'镜头不会说谎，认真记录的日子都会发光。',
},

/* ================= 设置（通用模板） ================= */
{
  id:'settings', title:'设置', sub:'个人偏好 · 数据管理 · 关于工作台',
  stats:[
    {icon:'🔔',tone:'blue', label:'提醒设置', value:'6',unit:'项', sub:'已开启 4 项'},
    {icon:'🎨',tone:'purple',label:'主题风格', value:'薄荷绿',unit:'', sub:'当前主题'},
    {icon:'☁️',tone:'teal', label:'数据同步', value:'已开启',unit:'', sub:'最近同步 今天 08:00'},
    {icon:'💾',tone:'yellow',label:'数据导出', value:'3',unit:'次', sub:'最近导出 5月10日'},
  ],
  task:{title:'完善个人资料与成长目标', tag:'账号设置', tagTone:'teal', btn:'去完善', desc:'设置头像、昵称与年度成长目标'},
  banner:{icon:'⚙️', title:'让你的工作台更懂你', desc:'调整提醒时间、主题配色与模块开关，打造专属的成长空间。'},
  sections:[
    {type:'list', span:1, title:'常用设置', more:'', items:[
      {ic:'🔔',tone:'blue', title:'每日任务提醒', meta:'每天 08:00 提醒', right:'已开启'},
      {ic:'🌙',tone:'purple', title:'夜间模式', meta:'22:00 自动切换', right:'已开启'},
      {ic:'☁️',tone:'teal', title:'云端同步', meta:'Wi-Fi 下自动备份', right:'已开启'},
      {ic:'🔒',tone:'red', title:'隐私锁', meta:'面容 / 密码解锁', right:'未开启'},
    ]},
    {type:'action', span:1, title:'待办设置', items:[
      {t:'设置年度成长目标', done:false, meta:'建议本周完成'},
      {t:'整理模块显示顺序', done:false, meta:'可选'},
    ]},
  ],
  summary:'工作台已陪伴你 <strong>128</strong> 天，记录了 <strong>860</strong> 分成长积分。继续用你喜欢的方式记录生活吧！',
  quote:'工具的意义，是让坚持变得更容易。',
},
];
