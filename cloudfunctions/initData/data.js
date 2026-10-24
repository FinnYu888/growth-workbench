/* initData/data.js · 云数据库预置数据（文档型结构，数组原生存储）
 * 18 个集合（移除了 login_sessions —— 云开发 openid 内置鉴权）
 * labels/vals/tags/photo_emojis 全部用原生数组，不再用逗号分隔字符串
 */

// users：openid 字段保留，云函数 login 会按 openid 自动建用户；
// 这里预置一个演示用户，openid 用占位值（真实登录会按用户 openid 新建/更新）
const users = [
  { openid: '__seed_user__', nickname: '小柚子', avatar: '👧', growth_days: 128, total_score: 860, level_tag: '成长新星', signature: '记录美好的生活，每天启幕。' },
];

// modules：删除 妆容穿搭/舞蹈/绘画/烘焙小班
const modules = [
  { code: 'home', name: '首页', icon: '🏠', tone: 'teal', sort_order: 1, visible: 1 },
  { code: 'profile', name: '个人面板', icon: '👤', tone: 'teal', sort_order: 2, visible: 1 },
  { code: 'plan', name: '每日计划', icon: '📅', tone: 'blue', sort_order: 3, visible: 1 },
  { code: 'diet', name: '饮食', icon: '🍱', tone: 'orange', sort_order: 4, visible: 1 },
  { code: 'fitness', name: '健身', icon: '💪', tone: 'red', sort_order: 5, visible: 1 },
  { code: 'wellness', name: '养生知识', icon: '🌿', tone: 'green', sort_order: 6, visible: 1 },
  { code: 'tarot', name: '塔罗星盘', icon: '🔮', tone: 'indigo', sort_order: 7, visible: 1 },
  { code: 'french', name: '法语学习', icon: '🇫🇷', tone: 'blue', sort_order: 8, visible: 1 },
  { code: 'tcm', name: '中医养生', icon: '🍵', tone: 'green', sort_order: 9, visible: 1 },
  { code: 'film', name: '拍摄剪辑练习', icon: '📷', tone: 'purple', sort_order: 10, visible: 1 },
  { code: 'settings', name: '设置', icon: '⚙️', tone: 'teal', sort_order: 11, visible: 1 },
];

const page_meta = [
  { module_code: 'home', title: '个人成长工作台', sub: 'Overview · 欢迎你来记录与成长', summary: '本周你加强了<strong>学习</strong>和<strong>健身</strong>，整体成长积分较上周上升了 12%，继续保持节奏，慢慢遇见更好的自己！💙', quote: '每一个微小的坚持，都在让你长成更喜欢的自己。' },
  { module_code: 'profile', title: '个人面板', sub: '全维度成长总览', summary: '本周你加强了<strong>学习</strong>和<strong>健身</strong>，整体成长积分较上周上升了 12%，继续保持节奏！💙', quote: '每一个微小的坚持，都在让你长成更喜欢的自己。' },
  { module_code: 'plan', title: '每日计划', sub: '今日安排 · 任务清单 · 时间规划', summary: '本周计划完成率达到 <strong>78%</strong>，比上周提升了 <strong>9%</strong>。晚间复盘的习惯正在养成，继续加油！', quote: '把每一天安排得明明白白，生活就不会辜负你的认真。' },
  { module_code: 'diet', title: '饮食', sub: '饮食记录 · 营养分析 · 健康习惯', summary: '本周整体热量波动平稳，蛋白质摄入平均达标。戒掉了晚餐的奶茶和甜食，继续保持良好的饮食习惯！💛', quote: '好好吃饭，是对自己最温柔的照顾。' },
  { module_code: 'fitness', title: '健身', sub: '强体 · 打卡 · 数据统计', summary: '本周你共锻炼 <strong>4</strong> 次，消耗共 <strong>560</strong> kcal，运动时长 48 分钟。持续运动让你精力更充沛！💪', quote: '流汗不是为了优秀的外表，而是为了找到更有力量的自己。' },
  { module_code: 'wellness', title: '养生知识', sub: '健康知识 · 生活方式 · 每日一签', summary: '本周学习了 <strong>6</strong> 篇养生文章，早睡打卡 <strong>5</strong> 天。作息正在慢慢变规律，继续保持！', quote: '养生不是一天的事，而是每天一点点的坚持。' },
  { module_code: 'tarot', title: '塔罗星盘', sub: '每日占卜 · 牌意学习', summary: '本周完成了 <strong>7</strong> 次占卜记录，学习了 <strong>5</strong> 张新牌意。塔罗学习连续 <strong>18</strong> 天，直觉力正在稳步提升 🔮', quote: '牌是镜子，照见的始终是你内心的光。' },
  { module_code: 'french', title: '法语学习', sub: '每日一句 · 单词积累 · 发音练习', summary: '本周累计学习 <strong>4.5</strong> 小时，新掌握 <strong>38</strong> 个单词。听力语感明显提升，继续保持！', quote: '每学会一句法语，就多了一扇看世界的窗。' },
  { module_code: 'tcm', title: '中医养生', sub: '经络知识 · 节气养生 · 食疗茶饮', summary: '本周完成 <strong>4</strong> 次节气知识学习，泡脚打卡 <strong>5</strong> 天。身体状态在慢慢变好！', quote: '上医治未病，最好的医生是你自己的生活规律。' },
  { module_code: 'film', title: '拍摄剪辑练习', sub: '生活记录 · 剪辑技巧 · 作品灵感', summary: '本周完成 <strong>2</strong> 支练习作品，剪辑手感更稳了。下一次尝试转场和调色进阶！', quote: '镜头不会说谎，认真记录的日子都会发光。' },
  { module_code: 'settings', title: '设置', sub: '个人偏好 · 数据管理 · 关于工作台', summary: '工作台已陪伴你 <strong>128</strong> 天，记录了 <strong>860</strong> 分成长积分。继续用你喜欢的方式记录生活吧！', quote: '工具的意义，是让坚持变得更容易。' },
];

const page_stats = [
  { module_code: 'home', sort: 1, stat_key: 'task', label: '今日任务', icon: '✅', tone: 'teal', value: '6', unit: '项', sub: '已完成 4 · 67%' },
  { module_code: 'home', sort: 2, stat_key: 'rate', label: '完成率', icon: '🎯', tone: 'blue', value: '67', unit: '%', sub: '较昨日 <b class="up">+8%</b>' },
  { module_code: 'home', sort: 3, stat_key: 'streak', label: '连续打卡', icon: '🔥', tone: 'red', value: '18', unit: '天', sub: '继续保持！' },
  { module_code: 'home', sort: 4, stat_key: 'focus', label: '专注时长', icon: '⏱️', tone: 'purple', value: '3.5', unit: '小时', sub: '较昨日 <b class="up">+15%</b>' },
  { module_code: 'home', sort: 5, stat_key: 'score', label: '成长积分', icon: '⭐', tone: 'yellow', value: '860', unit: '分', sub: '较昨日 <b class="up">+120</b>' },
  { module_code: 'profile', sort: 1, stat_key: 'streak', label: '连续天数', icon: '🔥', tone: 'red', value: '128', unit: '天', sub: '继续保持！' },
  { module_code: 'profile', sort: 2, stat_key: 'score', label: '总完成度', icon: '⭐', tone: 'yellow', value: '860', unit: '分', sub: '稳步提升中' },
  { module_code: 'profile', sort: 3, stat_key: 'card', label: '积分卡', icon: '💳', tone: 'blue', value: '312', unit: '张', sub: '可兑换成长好礼' },
  { module_code: 'profile', sort: 4, stat_key: 'exp', label: '经验值', icon: '🎫', tone: 'purple', value: '48', unit: '张', sub: '今日 +3' },
  { module_code: 'profile', sort: 5, stat_key: 'rate', label: '今日完成率', icon: '🎯', tone: 'teal', value: '67', unit: '%', sub: '今日 6/9' },
  { module_code: 'plan', sort: 1, stat_key: 'task', label: '今日计划', icon: '✅', tone: 'teal', value: '8', unit: '项', sub: '已完成 5 · 62%' },
  { module_code: 'plan', sort: 2, stat_key: 'rate', label: '完成率', icon: '🎯', tone: 'blue', value: '62', unit: '%', sub: '较昨日 <b class="up">+6%</b>' },
  { module_code: 'plan', sort: 3, stat_key: 'focus', label: '专注时段', icon: '⏰', tone: 'purple', value: '5', unit: '段', sub: '共 3.2 小时' },
  { module_code: 'plan', sort: 4, stat_key: 'score', label: '计划积分', icon: '🌟', tone: 'yellow', value: '+46', unit: '分', sub: '昨日 +52' },
  { module_code: 'diet', sort: 1, stat_key: 'task', label: '今日任务', icon: '✅', tone: 'teal', value: '2', unit: '项', sub: '已完成 1 · 50%' },
  { module_code: 'diet', sort: 2, stat_key: 'rate', label: '完成率', icon: '🎯', tone: 'blue', value: '50', unit: '%', sub: '较昨日 <b class="up">+10%</b>' },
  { module_code: 'diet', sort: 3, stat_key: 'water', label: '喝水量', icon: '💧', tone: 'cyan', value: '1200', unit: 'ml', sub: '较昨日 <b class="up">+200 ml</b>' },
  { module_code: 'diet', sort: 4, stat_key: 'kcal', label: '今日热量', icon: '🔥', tone: 'red', value: '1480', unit: 'kcal', sub: '较目标 <b class="down">-120 kcal</b>' },
  { module_code: 'fitness', sort: 1, stat_key: 'task', label: '今日任务', icon: '✅', tone: 'teal', value: '1', unit: '项', sub: '已完成 1 · 100%' },
  { module_code: 'fitness', sort: 2, stat_key: 'rate', label: '完成率', icon: '🎯', tone: 'blue', value: '100', unit: '%', sub: '较昨日 <b class="up">+20%</b>' },
  { module_code: 'fitness', sort: 3, stat_key: 'badge', label: '获得徽章', icon: '🏅', tone: 'yellow', value: '1', unit: '枚', sub: '连续打卡 3 天' },
  { module_code: 'fitness', sort: 4, stat_key: 'step', label: '步数', icon: '👟', tone: 'purple', value: '3,268', unit: '步', sub: '今日 <b class="up">+1,842</b>' },
  { module_code: 'wellness', sort: 1, stat_key: 'task', label: '今日学习', icon: '✅', tone: 'teal', value: '2', unit: '篇', sub: '已完成 1 · 50%' },
  { module_code: 'wellness', sort: 2, stat_key: 'rate', label: '完成率', icon: '🎯', tone: 'blue', value: '50', unit: '%', sub: '较昨日 <b class="up">+8%</b>' },
  { module_code: 'wellness', sort: 3, stat_key: 'streak', label: '连续学习', icon: '🌿', tone: 'green', value: '9', unit: '天', sub: '继续保持！' },
  { module_code: 'wellness', sort: 4, stat_key: 'count', label: '知识积累', icon: '📚', tone: 'yellow', value: '36', unit: '篇', sub: '本周 +6' },
  { module_code: 'tarot', sort: 1, stat_key: 'task', label: '今日任务', icon: '✅', tone: 'teal', value: '1', unit: '项', sub: '已完成 1 · 100%' },
  { module_code: 'tarot', sort: 2, stat_key: 'rate', label: '完成率', icon: '🎯', tone: 'blue', value: '100', unit: '%', sub: '较昨日 <b class="up">+20%</b>' },
  { module_code: 'tarot', sort: 3, stat_key: 'badge', label: '获得牌章', icon: '🃏', tone: 'purple', value: '3', unit: '张', sub: '累计 28 张' },
  { module_code: 'tarot', sort: 4, stat_key: 'streak', label: '连续挑战', icon: '🔥', tone: 'red', value: '18', unit: '天', sub: '继续 <b class="up">+1 天</b>' },
  { module_code: 'french', sort: 1, stat_key: 'task', label: '今日任务', icon: '✅', tone: 'teal', value: '3', unit: '项', sub: '已完成 2 · 67%' },
  { module_code: 'french', sort: 2, stat_key: 'rate', label: '完成率', icon: '🎯', tone: 'blue', value: '67', unit: '%', sub: '较昨日 <b class="up">+10%</b>' },
  { module_code: 'french', sort: 3, stat_key: 'streak', label: '连续学习', icon: '🔥', tone: 'red', value: '11', unit: '天', sub: '继续保持！' },
  { module_code: 'french', sort: 4, stat_key: 'word', label: '单词量', icon: '📚', tone: 'yellow', value: '486', unit: '个', sub: '本周 +38' },
  { module_code: 'tcm', sort: 1, stat_key: 'task', label: '今日功课', icon: '✅', tone: 'teal', value: '2', unit: '项', sub: '已完成 1 · 50%' },
  { module_code: 'tcm', sort: 2, stat_key: 'rate', label: '完成率', icon: '🎯', tone: 'blue', value: '50', unit: '%', sub: '较昨日 <b class="up">+8%</b>' },
  { module_code: 'tcm', sort: 3, stat_key: 'streak', label: '连续打卡', icon: '🍵', tone: 'green', value: '7', unit: '天', sub: '继续保持！' },
  { module_code: 'tcm', sort: 4, stat_key: 'note', label: '养生笔记', icon: '🌿', tone: 'yellow', value: '21', unit: '篇', sub: '本周 +3' },
  { module_code: 'film', sort: 1, stat_key: 'task', label: '今日任务', icon: '✅', tone: 'teal', value: '2', unit: '项', sub: '已完成 1 · 50%' },
  { module_code: 'film', sort: 2, stat_key: 'rate', label: '完成率', icon: '🎯', tone: 'blue', value: '50', unit: '%', sub: '较昨日 <b class="up">+10%</b>' },
  { module_code: 'film', sort: 3, stat_key: 'streak', label: '连续练习', icon: '📷', tone: 'purple', value: '8', unit: '天', sub: '继续保持！' },
  { module_code: 'film', sort: 4, stat_key: 'work', label: '作品数', icon: '🎬', tone: 'yellow', value: '15', unit: '个', sub: '本周 +2' },
  { module_code: 'settings', sort: 1, stat_key: 'remind', label: '提醒设置', icon: '🔔', tone: 'blue', value: '6', unit: '项', sub: '已开启 4 项' },
  { module_code: 'settings', sort: 2, stat_key: 'theme', label: '主题风格', icon: '🎨', tone: 'purple', value: '薄荷绿', unit: '', sub: '当前主题' },
  { module_code: 'settings', sort: 3, stat_key: 'sync', label: '数据同步', icon: '☁️', tone: 'teal', value: '已开启', unit: '', sub: '最近同步 今天 08:00' },
  { module_code: 'settings', sort: 4, stat_key: 'export', label: '数据导出', icon: '💾', tone: 'yellow', value: '3', unit: '次', sub: '最近导出 5月10日' },
];

const tasks = [
  { module_code: 'home', title: '整理今日任务清单', tag: '', tag_tone: '', btn: '', btn_done: 0, descr: '按重要紧急程度安排今天 6 项任务', reward: '', done: 0 },
  { module_code: 'plan', title: '整理今日计划清单并完成优先级排序', tag: '每日计划', tag_tone: 'blue', btn: '开始执行', btn_done: 0, descr: '按重要紧急程度安排今天 8 项任务', reward: '', done: 0 },
  { module_code: 'diet', title: '记录三餐并补充喝水', tag: '饮食打卡', tag_tone: 'orange', btn: '全部完成', btn_done: 1, descr: '早餐 ✓ · 午餐 ✓ · 晚餐 ○ · 喝水 5/8 杯', reward: '', done: 1 },
  { module_code: 'fitness', title: '锻炼：八段锦完整跟练（约 100 kcal）', tag: '今日已练', tag_tone: 'green', btn: '奖励领取', btn_done: 1, descr: '深呼吸 · 舒展筋骨 · 放松身心 · 提升心肺', reward: '', done: 1 },
  { module_code: 'wellness', title: '阅读《四季养生要诀》春季篇', tag: '养生学习', tag_tone: 'green', btn: '开始阅读', btn_done: 0, descr: '了解春季养肝护脾的日常方法', reward: '', done: 0 },
  { module_code: 'tarot', title: '完成今日占卜 & 学习一张牌意', tag: '今日已完成', tag_tone: 'green', btn: '已完成', btn_done: 1, descr: '每天一抽，记录当下并学习牌意', reward: '', done: 1 },
  { module_code: 'french', title: '完成今日法语听力练习（15 分钟）', tag: '法语打卡', tag_tone: 'blue', btn: '开始练习', btn_done: 0, descr: '精听一段日常对话，跟读模仿语音语调', reward: '', done: 0 },
  { module_code: 'tcm', title: '学习夏季养心知识并记录笔记', tag: '中医学习', tag_tone: 'green', btn: '开始学习', btn_done: 0, descr: '了解夏季养心护脉的饮食与作息要点', reward: '', done: 0 },
  { module_code: 'film', title: '剪辑一支 1 分钟生活 Vlog', tag: '剪辑练习', tag_tone: 'purple', btn: '开始创作', btn_done: 0, descr: '整理本周素材，配乐并完成粗剪', reward: '', done: 0 },
  { module_code: 'settings', title: '完善个人资料与成长目标', tag: '账号设置', tag_tone: 'teal', btn: '去完善', btn_done: 0, descr: '设置头像、昵称与年度成长目标', reward: '', done: 0 },
];

const banners = [
  { module_code: 'home', icon: '💡', title: '本周成长，稳稳向上', descr: '继续保持节奏，慢慢遇见更好的自己～' },
  { module_code: 'plan', icon: '💡', title: '好的计划是成功的一半', descr: '建议早上安排高专注任务，午后安排轻量任务，晚间复盘总结。' },
  { module_code: 'diet', icon: '🥗', title: '均衡饮食，从每一餐开始', descr: '今天蛋白质和纤维摄入不错，晚上记得少油少糖，按时补水哦！' },
  { module_code: 'fitness', icon: '💪', title: '坚持运动，身体体态和情绪都更好！', descr: '每天锻炼 12 分钟，可以提升体力、改善睡眠、增强免疫力。' },
  { module_code: 'wellness', icon: '🌿', title: '顺时而养，身体自有答案', descr: '每天 10 分钟养生知识，慢慢调整作息与饮食，让身体回到舒服的节奏。' },
  { module_code: 'tarot', icon: '🧘', title: '占卜前请静心默念你的问题', descr: '找一个安静的环境 · 闭上眼 · 在心里默念想问的事，然后再开始抽牌。' },
  { module_code: 'french', icon: '🇫🇷', title: '每天 15 分钟，让法语成为习惯', descr: '语言学习贵在坚持，听说读写轮着来，进步看得见！' },
  { module_code: 'tcm', icon: '🍵', title: '夏养心，宜清补', descr: '起居有常，饮食有节，情志调畅——中医养生的三把钥匙。' },
  { module_code: 'film', icon: '🎬', title: '用镜头记录生活的美', descr: '多拍多剪多复盘，审美和技术都会在作品里慢慢沉淀。' },
  { module_code: 'settings', icon: '⚙️', title: '让你的工作台更懂你', descr: '调整提醒时间、主题配色与模块开关，打造专属的成长空间。' },
];

const action_items = [
  { module_code: 'diet', sort: 1, content: '记录早餐', scheduled_time: '今天 08:30', done: 1 },
  { module_code: 'diet', sort: 2, content: '喝够 8 杯水', scheduled_time: '今天 12:20', done: 1 },
  { module_code: 'diet', sort: 3, content: '晚间少糖少油', scheduled_time: '今天 18:30', done: 0 },
  { module_code: 'diet', sort: 4, content: '睡前补一杯温水', scheduled_time: '今天 20:00', done: 0 },
  { module_code: 'diet', sort: 5, content: '复盘今日饮食', scheduled_time: '今天 21:00', done: 0 },
  { module_code: 'fitness', sort: 1, content: '八段锦完整跟练', scheduled_time: '今天 06:30', done: 1 },
  { module_code: 'fitness', sort: 2, content: '拉伸放松 5 分钟', scheduled_time: '今天 08:45', done: 1 },
  { module_code: 'fitness', sort: 3, content: '喝 300ml 盐水', scheduled_time: '今天 09:00', done: 0 },
  { module_code: 'fitness', sort: 4, content: '记录体重数据', scheduled_time: '今天 09:05', done: 0 },
  { module_code: 'fitness', sort: 5, content: '打开并整理相册', scheduled_time: '今天 08:08', done: 0 },
  { module_code: 'wellness', sort: 1, content: '阅读春季养生篇', scheduled_time: '今天 08:00', done: 1 },
  { module_code: 'wellness', sort: 2, content: '记录一条养生笔记', scheduled_time: '今天 12:00', done: 0 },
  { module_code: 'wellness', sort: 3, content: '晚上 11 点前入睡', scheduled_time: '今天 23:00', done: 0 },
  { module_code: 'tarot', sort: 1, content: '记录今天的占卜结果', scheduled_time: '今天 08:40', done: 1 },
  { module_code: 'tarot', sort: 2, content: '学习节制牌牌意并写笔记', scheduled_time: '今天 08:50', done: 1 },
  { module_code: 'tarot', sort: 3, content: '思考最近失衡的状态', scheduled_time: '今天 09:10', done: 0 },
  { module_code: 'tarot', sort: 4, content: '写下 1-3 个行动小目标', scheduled_time: '今天 09:30', done: 0 },
  { module_code: 'tarot', sort: 5, content: '完成今晚睡前打卡', scheduled_time: '今天 21:30', done: 0 },
  { module_code: 'french', sort: 1, content: '完成听力练习', scheduled_time: '今天 08:00', done: 1 },
  { module_code: 'french', sort: 2, content: '背诵 20 个新单词', scheduled_time: '今天 13:00', done: 1 },
  { module_code: 'french', sort: 3, content: '跟读并录音复盘', scheduled_time: '今天 19:30', done: 0 },
  { module_code: 'tcm', sort: 1, content: '阅读养心知识', scheduled_time: '今天 09:00', done: 1 },
  { module_code: 'tcm', sort: 2, content: '记录一条食疗笔记', scheduled_time: '今天 14:00', done: 0 },
  { module_code: 'tcm', sort: 3, content: '睡前泡脚 15 分钟', scheduled_time: '今天 22:00', done: 0 },
  { module_code: 'film', sort: 1, content: '整理素材到时间线', scheduled_time: '今天 10:00', done: 1 },
  { module_code: 'film', sort: 2, content: '确定配乐风格', scheduled_time: '今天 14:00', done: 0 },
  { module_code: 'film', sort: 3, content: '导出并复盘一版', scheduled_time: '今天 20:00', done: 0 },
  { module_code: 'plan', sort: 1, content: '整理房间 & 明日准备', scheduled_time: '今天 21:00 - 21:30', done: 0 },
  { module_code: 'settings', sort: 1, content: '设置年度成长目标', scheduled_time: '建议本周完成', done: 0 },
  { module_code: 'settings', sort: 2, content: '整理模块显示顺序', scheduled_time: '可选', done: 0 },
];

// trends：labels/vals 用原生数组（不再逗号分隔）
const trends = [
  { module_code: 'home', trend_key: 'trend', title: '本周成长趋势', labels: ['5/6', '5/7', '5/8', '5/9', '5/10', '5/11', '5/12'], vals: [3, 4, 6, 5, 7, 6, 9], color: '#14b8a6', unit: '（任务）', line_name: '任务数' },
  { module_code: 'home', trend_key: 'donut', title: '模块投入占比', labels: ['学习提升', '健身塑身', '饮食健康', '兴趣研发', '自我提升', '生活管理', '其他'], vals: [20, 18, 12, 16, 10, 8, 16], color: '#14b8a6', unit: '', line_name: '' },
  { module_code: 'diet', trend_key: 'trend', title: '本周饮食趋势', labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], vals: [1620, 1580, 1710, 1490, 1520, 1450, 1480], color: '#14b8a6', unit: '（kcal）', line_name: '热量' },
  { module_code: 'fitness', trend_key: 'dual', title: '本周趋势', labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], vals: [1, 2, 2, 1, 2, 2, 3], color: '#14b8a6', unit: '', line_name: '运动次数' },
  { module_code: 'fitness', trend_key: 'dual2', title: '本周热量', labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], vals: [80, 120, 150, 90, 130, 160, 120], color: '#60a5fa', unit: '', line_name: '消耗热量' },
];

const journals = [
  { journal_date: '5月12日', content: '今天完成了 6 项任务，整体成长很不错！继续保持，也可以记录下饮食和小贴士，让成长看得见。作为一名记录者，今天也要加油哦 💪', photo_emojis: ['🌸', '🧋', '📷'], more_txt: '+2' },
];

const mastery = [
  { icon: '👤', name: '个人模板', percent: 90 },
  { icon: '📅', name: '每日计划', percent: 85 },
  { icon: '🍱', name: '饮食管理', percent: 72 },
  { icon: '💪', name: '健身', percent: 68 },
  { icon: '🌿', name: '养生知识', percent: 76 },
  { icon: '🇫🇷', name: '法语学习', percent: 66 },
  { icon: '🍵', name: '中医养生', percent: 58 },
  { icon: '🔮', name: '塔罗星盘', percent: 63 },
  { icon: '📷', name: '拍摄剪辑', percent: 69 },
];

const diet_log = [
  { sort: 1, meal_type: '早餐', meal_time: '07:30', food: '蒸蛋 + 脱脂牛奶杯', kcal: '约 320 kcal', tone: 'yellow', icon: '🍳' },
  { sort: 2, meal_type: '午餐', meal_time: '12:30', food: '鸡胸肉藜麦色拉 · 西兰花 · 胡萝卜', kcal: '约 520 kcal', tone: 'green', icon: '🥗' },
  { sort: 3, meal_type: '晚餐', meal_time: '18:30', food: '清炒时蔬 + 南瓜', kcal: '约 410 kcal', tone: 'orange', icon: '🍲' },
  { sort: 4, meal_type: '加餐', meal_time: '15:30', food: '苹果 + 香蕉', kcal: '约 230 kcal', tone: 'red', icon: '🍎' },
];

const water_log = [
  { log_date: '5月12日', cups: 5, total: 8, note: '今日 5 / 8 杯' },
];

const nutrition = [
  { log_date: '5月12日', carb: 45, protein: 25, fat: 20, fiber: 10, total_kcal: 1480 },
];

const recipe = [
  { emoji: '🥙', grad: 'linear-gradient(135deg,#d9f99d,#a7f3d0)', title2: '板栗鸡肉藜麦沙拉', tags: ['高蛋白', '低脂', '减脂友好'], kcal: '约 430 kcal', descr: '清蒸鸡胸肉搭配藜麦与当季板栗，饱腹感强又低脂，很适合训练日午餐。' },
];

const articles = [
  { module_code: 'wellness', sort: 1, icon: '🌅', tone: 'orange', title: '早睡早起：修复身体的黄金时段', meta: '养生 · 8 分钟', done: 1 },
  { module_code: 'wellness', sort: 2, icon: '🫖', tone: 'green', title: '春季养肝茶饮搭配指南', meta: '食疗 · 6 分钟', done: 0 },
  { module_code: 'wellness', sort: 3, icon: '🧘', tone: 'purple', title: '八段锦背后的呼吸原理', meta: '功法 · 10 分钟', done: 0 },
  { module_code: 'tcm', sort: 1, icon: '❤️', tone: 'red', title: '夏季养心：午休 20 分钟的好处', meta: '节气养生 · 8 分钟', done: 1 },
  { module_code: 'tcm', sort: 2, icon: '🫖', tone: 'green', title: '酸梅汤的配方与体质适配', meta: '食疗茶饮 · 6 分钟', done: 0 },
  { module_code: 'tcm', sort: 3, icon: '🦶', tone: 'orange', title: '睡前泡脚的经络原理', meta: '经络知识 · 10 分钟', done: 0 },
  { module_code: 'french', sort: 1, icon: '🎧', tone: 'blue', title: '听力精练 · 咖啡馆点单场景', meta: '听力 · 15 分钟', done: 1 },
  { module_code: 'french', sort: 2, icon: '📖', tone: 'teal', title: '新单词 20 个 · 第二组动词变位', meta: '词汇 · 20 分钟', done: 1 },
  { module_code: 'french', sort: 3, icon: '🗣️', tone: 'purple', title: '口语跟读 · 自我介绍段落', meta: '口语 · 10 分钟', done: 0 },
  { module_code: 'film', sort: 1, icon: '🎞️', tone: 'purple', title: '整理本周拍摄素材', meta: '素材管理 · 20 分钟', done: 1 },
  { module_code: 'film', sort: 2, icon: '🎵', tone: 'blue', title: '挑选 Vlog 背景音乐', meta: '配乐 · 10 分钟', done: 0 },
  { module_code: 'film', sort: 3, icon: '✂️', tone: 'pink', title: '完成粗剪并导出', meta: '剪辑 · 40 分钟', done: 0 },
  { module_code: 'plan', sort: 1, icon: '🌅', tone: 'orange', title: '晨间复盘 & 计划确认', meta: '07:30 - 08:00', done: 1 },
  { module_code: 'plan', sort: 2, icon: '📖', tone: 'blue', title: '经典阅读 · 第 2 章', meta: '09:00 - 10:00', done: 1 },
  { module_code: 'plan', sort: 3, icon: '💻', tone: 'teal', title: '核心任务 · 深度专注', meta: '10:30 - 12:00', done: 0 },
  { module_code: 'plan', sort: 4, icon: '🍱', tone: 'orange', title: '午餐后散步 20 分钟', meta: '13:00 - 13:30', done: 1 },
  { module_code: 'plan', sort: 5, icon: '🧹', tone: 'green', title: '整理房间 & 明日准备', meta: '21:00 - 21:30', done: 0 },
];

const tarot_cards = [
  { card_num: 'XVII', card_name: '节制', emoji: '⚖️', tags: ['正位', '平衡', '治愈'], meaning: '节制的象征是流动与调和。它提示你：此刻不必急于求成，把注意力放回内在节奏，让热情与冷静协调运作，温和地推进当下的计划，答案会在过程中自然浮现。' },
  { card_num: 'XVIII', card_name: '月亮', emoji: '🌙', tags: ['潜意识', '直觉', '不安'], meaning: '月亮提示面对未知与情绪的波动。倾听内心的声音，辨别幻象与真实，光明就在迷雾之后。' },
  { card_num: 'XIX', card_name: '太阳', emoji: '☀️', tags: ['喜悦', '成功', '活力'], meaning: '太阳象征光明与生机。放下顾虑，拥抱当下的热情，成功与快乐正在到来。' },
  { card_num: 'VIII', card_name: '力量', emoji: '🦁', tags: ['勇气', '柔韧', '内在力量'], meaning: '以柔克刚。真正的力量来自内心的坚定与温柔，驯服欲望而非压抑它。' },
  { card_num: 'I', card_name: '魔术师', emoji: '🎩', tags: ['创造', '行动', '掌控'], meaning: '你拥有把想法变为现实的全部要素。专注、行动，奇迹由你创造。' },
];

const settings = [
  { icon: '🔔', tone: 'blue', title: '每日任务提醒', descr: '每天 08:00 提醒', status: '已开启' },
  { icon: '🌙', tone: 'purple', title: '夜间模式', descr: '22:00 自动切换', status: '已开启' },
  { icon: '☁️', tone: 'teal', title: '云端同步', descr: 'Wi-Fi 下自动备份', status: '已开启' },
  { icon: '🔒', tone: 'red', title: '隐私锁', descr: '面容 / 密码解锁', status: '未开启' },
];

const schedule = [
  { module_code: 'film', sort: 1, time_str: '10:00', icon: '🎞️', tone: 'purple', title: '整理素材到时间线', meta: '素材管理 · 20 分钟', right_txt: '20 分钟' },
  { module_code: 'film', sort: 2, time_str: '14:00', icon: '🎵', tone: 'blue', title: '挑选背景音乐', meta: '配乐 · 10 分钟', right_txt: '10 分钟' },
  { module_code: 'film', sort: 3, time_str: '20:00', icon: '✂️', tone: 'pink', title: '完成粗剪并导出', meta: '剪辑 · 40 分钟', right_txt: '40 分钟' },
];

const practice_log = [
  { module_code: 'film', sort: 1, icon: '🎞️', tone: 'purple', title: '素材整理与初剪', meta: '5月12日 · 20 分钟', right_txt: '✅ 完成' },
  { module_code: 'film', sort: 2, icon: '✂️', tone: 'pink', title: '粗剪导出复盘', meta: '5月11日 · 35 分钟', right_txt: '⏳ 进行中' },
  { module_code: 'film', sort: 3, icon: '🎬', tone: 'indigo', title: '上一支作品回顾', meta: '5月10日 · 25 分钟', right_txt: '✅ 完成' },
  { module_code: 'fitness', sort: 1, icon: '🧘', tone: 'green', title: '八段锦完整跟练', meta: '5月12日 06:30', right_txt: '✅ 完成' },
  { module_code: 'fitness', sort: 2, icon: '💪', tone: 'red', title: '居家力量训练', meta: '5月11日 18:00', right_txt: '✅ 完成' },
  { module_code: 'fitness', sort: 3, icon: '🏃', tone: 'orange', title: '晨跑 3 公里', meta: '5月10日 07:00', right_txt: '⏳ 进行中' },
];

module.exports = {
  users, modules, page_meta, page_stats, tasks, banners, action_items,
  trends, journals, mastery, diet_log, water_log, nutrition, recipe,
  articles, tarot_cards, settings, schedule, practice_log,
};
