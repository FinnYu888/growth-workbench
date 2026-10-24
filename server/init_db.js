/* ============ 数据库初始化：建表 + 预置数据 ============ */
const mysql = require('mysql2/promise');

const DB = {
  host: '10.139.92.107', port: 3306,
  user: 'devuser', password: 'Cds@1234',
  database: 'workbench',
  charset: 'utf8mb4', connectTimeout: 15000,
};

const DDL = `
CREATE TABLE IF NOT EXISTS wb_users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  openid VARCHAR(64) UNIQUE,
  nickname VARCHAR(64) NOT NULL,
  avatar VARCHAR(16) DEFAULT '👧',
  growth_days INT DEFAULT 1,
  total_score INT DEFAULT 0,
  level_tag VARCHAR(32),
  signature VARCHAR(128),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_modules(
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(32) UNIQUE NOT NULL,
  name VARCHAR(32) NOT NULL,
  icon VARCHAR(8), tone VARCHAR(16), sort_order INT, visible TINYINT DEFAULT 1
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_page_meta(
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_code VARCHAR(32) UNIQUE,
  title VARCHAR(64), sub VARCHAR(128),
  summary TEXT, quote VARCHAR(255)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_page_stats(
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_code VARCHAR(32), sort INT,
  stat_key VARCHAR(32), label VARCHAR(32), icon VARCHAR(8), tone VARCHAR(16),
  value VARCHAR(32), unit VARCHAR(16), sub VARCHAR(128)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_tasks(
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_code VARCHAR(32),
  title VARCHAR(128), tag VARCHAR(32), tag_tone VARCHAR(16),
  btn VARCHAR(32), btn_done TINYINT DEFAULT 0,
  descr VARCHAR(255), reward VARCHAR(64), done TINYINT DEFAULT 0
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_banners(
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_code VARCHAR(32) UNIQUE,
  icon VARCHAR(8), title VARCHAR(128), descr VARCHAR(255)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_action_items(
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_code VARCHAR(32), sort INT,
  content VARCHAR(128), scheduled_time VARCHAR(32), done TINYINT DEFAULT 0
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_trends(
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_code VARCHAR(32), trend_key VARCHAR(32),
  title VARCHAR(64), labels VARCHAR(255), vals VARCHAR(255),
  color VARCHAR(16), unit VARCHAR(16), line_name VARCHAR(32)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_journals(
  id INT AUTO_INCREMENT PRIMARY KEY,
  journal_date VARCHAR(16), content TEXT, photo_emojis VARCHAR(64), more_txt VARCHAR(8)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_mastery(
  id INT AUTO_INCREMENT PRIMARY KEY,
  icon VARCHAR(8), name VARCHAR(32), percent INT
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_diet_log(
  id INT AUTO_INCREMENT PRIMARY KEY,
  sort INT, meal_type VARCHAR(16), meal_time VARCHAR(16),
  food VARCHAR(128), kcal VARCHAR(32), tone VARCHAR(16), icon VARCHAR(8)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_water_log(
  id INT AUTO_INCREMENT PRIMARY KEY,
  log_date VARCHAR(16), cups INT, total INT, note VARCHAR(32)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_nutrition(
  id INT AUTO_INCREMENT PRIMARY KEY,
  log_date VARCHAR(16), carb INT, protein INT, fat INT, fiber INT, total_kcal INT
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_recipe(
  id INT AUTO_INCREMENT PRIMARY KEY,
  emoji VARCHAR(8), grad VARCHAR(128), title2 VARCHAR(64), tags VARCHAR(64), kcal VARCHAR(32), descr VARCHAR(255)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_articles(
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_code VARCHAR(32), sort INT,
  icon VARCHAR(8), tone VARCHAR(16), title VARCHAR(128), meta VARCHAR(64), done TINYINT DEFAULT 0
)Engine=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_tarot_cards(
  id INT AUTO_INCREMENT PRIMARY KEY,
  card_num VARCHAR(8), card_name VARCHAR(32), emoji VARCHAR(8), tags VARCHAR(64), meaning TEXT
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_settings(
  id INT AUTO_INCREMENT PRIMARY KEY,
  icon VARCHAR(8), tone VARCHAR(16), title VARCHAR(64), descr VARCHAR(128), status VARCHAR(16)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_schedule(
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_code VARCHAR(32), sort INT,
  time_str VARCHAR(16), icon VARCHAR(8), tone VARCHAR(16), title VARCHAR(64), meta VARCHAR(128), right_txt VARCHAR(32)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_practice_log(
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_code VARCHAR(32), sort INT,
  icon VARCHAR(8), tone VARCHAR(16), title VARCHAR(128), meta VARCHAR(64), right_txt VARCHAR(32)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS wb_login_sessions(
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_token VARCHAR(64) UNIQUE,
  user_id INT, nickname VARCHAR(64),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

/* ---------- 预置数据 ---------- */
const esc = s => String(s).replace(/'/g,"''");
const q = (sql) => sql;

// 用户
const U = `INSERT INTO wb_users(openid,nickname,avatar,growth_days,total_score,level_tag,signature) VALUES
('wx_mock_001','小柚子','👧',128,860,'成长新星','记录美好的生活，每天启幕。');`;

// 模块（删除 妆容穿搭/舞蹈/绘画/烘焙小班）
const M = `INSERT INTO wb_modules(code,name,icon,tone,sort_order,visible) VALUES
('home','首页','🏠','teal',1,1),
('profile','个人面板','👤','teal',2,1),
('plan','每日计划','📅','blue',3,1),
('diet','饮食','🍱','orange',4,1),
('fitness','健身','💪','red',5,1),
('wellness','养生知识','🌿','green',6,1),
('tarot','塔罗星盘','🔮','indigo',7,1),
('french','法语学习','🇫🇷','blue',8,1),
('tcm','中医养生','🍵','green',9,1),
('film','拍摄剪辑练习','📷','purple',10,1),
('settings','设置','⚙️','teal',11,1);`;

// 页面 meta（标题/副标题/小结/一句）
const META = `INSERT INTO wb_page_meta(module_code,title,sub,summary,quote) VALUES
('home','个人成长工作台','Overview · 欢迎你来记录与成长','本周你加强了<strong>学习</strong>和<strong>健身</strong>，整体成长积分较上周上升了 12%，继续保持节奏，慢慢遇见更好的自己！💙','每一个微小的坚持，都在让你长成更喜欢的自己。'),
('profile','个人面板','全维度成长总览','本周你加强了<strong>学习</strong>和<strong>健身</strong>，整体成长积分较上周上升了 12%，继续保持节奏！💙','每一个微小的坚持，都在让你长成更喜欢的自己。'),
('plan','每日计划','今日安排 · 任务清单 · 时间规划','本周计划完成率达到 <strong>78%</strong>，比上周提升了 <strong>9%</strong>。晚间复盘的习惯正在养成，继续加油！','把每一天安排得明明白白，生活就不会辜负你的认真。'),
('diet','饮食','饮食记录 · 营养分析 · 健康习惯','本周整体热量波动平稳，蛋白质摄入平均达标。戒掉了晚餐的奶茶和甜食，继续保持良好的饮食习惯！💛','好好吃饭，是对自己最温柔的照顾。'),
('fitness','健身','强体 · 打卡 · 数据统计','本周你共锻炼 <strong>4</strong> 次，消耗共 <strong>560</strong> kcal，运动时长 48 分钟。持续运动让你精力更充沛！💪','流汗不是为了优秀的外表，而是为了找到更有力量的自己。'),
('wellness','养生知识','健康知识 · 生活方式 · 每日一签','本周学习了 <strong>6</strong> 篇养生文章，早睡打卡 <strong>5</strong> 天。作息正在慢慢变规律，继续保持！','养生不是一天的事，而是每天一点点的坚持。'),
('tarot','塔罗星盘','每日占卜 · 牌意学习','本周完成了 <strong>7</strong> 次占卜记录，学习了 <strong>5</strong> 张新牌意。塔罗学习连续 <strong>18</strong> 天，直觉力正在稳步提升 🔮','牌是镜子，照见的始终是你内心的光。'),
('french','法语学习','每日一句 · 单词积累 · 发音练习','本周累计学习 <strong>4.5</strong> 小时，新掌握 <strong>38</strong> 个单词。听力语感明显提升，继续保持！','每学会一句法语，就多了一扇看世界的窗。'),
('tcm','中医养生','经络知识 · 节气养生 · 食疗茶饮','本周完成 <strong>4</strong> 次节气知识学习，泡脚打卡 <strong>5</strong> 天。身体状态在慢慢变好！','上医治未病，最好的医生是你自己的生活规律。'),
('film','拍摄剪辑练习','生活记录 · 剪辑技巧 · 作品灵感','本周完成 <strong>2</strong> 支练习作品，剪辑手感更稳了。下一次尝试转场和调色进阶！','镜头不会说谎，认真记录的日子都会发光。'),
('settings','设置','个人偏好 · 数据管理 · 关于工作台','工作台已陪伴你 <strong>128</strong> 天，记录了 <strong>860</strong> 分成长积分。继续用你喜欢的方式记录生活吧！','工具的意义，是让坚持变得更容易。');`;

// 统计卡
const STATS = `INSERT INTO wb_page_stats(module_code,sort,stat_key,label,icon,tone,value,unit,sub) VALUES
('home',1,'task','今日任务','✅','teal','6','项','已完成 4 · 67%'),
('home',2,'rate','完成率','🎯','blue','67','%','较昨日 <b class="up">+8%</b>'),
('home',3,'streak','连续打卡','🔥','red','18','天','继续保持！'),
('home',4,'focus','专注时长','⏱️','purple','3.5','小时','较昨日 <b class="up">+15%</b>'),
('home',5,'score','成长积分','⭐','yellow','860','分','较昨日 <b class="up">+120</b>'),
('profile',1,'streak','连续天数','🔥','red','128','天','继续保持！'),
('profile',2,'score','总完成度','⭐','yellow','860','分','稳步提升中'),
('profile',3,'card','积分卡','💳','blue','312','张','可兑换成长好礼'),
('profile',4,'exp','经验值','🎫','purple','48','张','今日 +3'),
('profile',5,'rate','今日完成率','🎯','teal','67','%','今日 6/9'),
('plan',1,'task','今日计划','✅','teal','8','项','已完成 5 · 62%'),
('plan',2,'rate','完成率','🎯','blue','62','%','较昨日 <b class="up">+6%</b>'),
('plan',3,'focus','专注时段','⏰','purple','5','段','共 3.2 小时'),
('plan',4,'score','计划积分','🌟','yellow','+46','分','昨日 +52'),
('diet',1,'task','今日任务','✅','teal','2','项','已完成 1 · 50%'),
('diet',2,'rate','完成率','🎯','blue','50','%','较昨日 <b class="up">+10%</b>'),
('diet',3,'water','喝水量','💧','cyan','1200','ml','较昨日 <b class="up">+200 ml</b>'),
('diet',4,'kcal','今日热量','🔥','red','1480','kcal','较目标 <b class="down">-120 kcal</b>'),
('fitness',1,'task','今日任务','✅','teal','1','项','已完成 1 · 100%'),
('fitness',2,'rate','完成率','🎯','blue','100','%','较昨日 <b class="up">+20%</b>'),
('fitness',3,'badge','获得徽章','🏅','yellow','1','枚','连续打卡 3 天'),
('fitness',4,'step','步数','👟','purple','3,268','步','今日 <b class="up">+1,842</b>'),
('wellness',1,'task','今日学习','✅','teal','2','篇','已完成 1 · 50%'),
('wellness',2,'rate','完成率','🎯','blue','50','%','较昨日 <b class="up">+8%</b>'),
('wellness',3,'streak','连续学习','🌿','green','9','天','继续保持！'),
('wellness',4,'count','知识积累','📚','yellow','36','篇','本周 +6'),
('tarot',1,'task','今日任务','✅','teal','1','项','已完成 1 · 100%'),
('tarot',2,'rate','完成率','🎯','blue','100','%','较昨日 <b class="up">+20%</b>'),
('tarot',3,'badge','获得牌章','🃏','purple','3','张','累计 28 张'),
('tarot',4,'streak','连续挑战','🔥','red','18','天','继续 <b class="up">+1 天</b>'),
('french',1,'task','今日任务','✅','teal','3','项','已完成 2 · 67%'),
('french',2,'rate','完成率','🎯','blue','67','%','较昨日 <b class="up">+10%</b>'),
('french',3,'streak','连续学习','🔥','red','11','天','继续保持！'),
('french',4,'word','单词量','📚','yellow','486','个','本周 +38'),
('tcm',1,'task','今日功课','✅','teal','2','项','已完成 1 · 50%'),
('tcm',2,'rate','完成率','🎯','blue','50','%','较昨日 <b class="up">+8%</b>'),
('tcm',3,'streak','连续打卡','🍵','green','7','天','继续保持！'),
('tcm',4,'note','养生笔记','🌿','yellow','21','篇','本周 +3'),
('film',1,'task','今日任务','✅','teal','2','项','已完成 1 · 50%'),
('film',2,'rate','完成率','🎯','blue','50','%','较昨日 <b class="up">+10%</b>'),
('film',3,'streak','连续练习','📷','purple','8','天','继续保持！'),
('film',4,'work','作品数','🎬','yellow','15','个','本周 +2'),
('settings',1,'remind','提醒设置','🔔','blue','6','项','已开启 4 项'),
('settings',2,'theme','主题风格','🎨','purple','薄荷绿','','当前主题'),
('settings',3,'sync','数据同步','☁️','teal','已开启','','最近同步 今天 08:00'),
('settings',4,'export','数据导出','💾','yellow','3','次','最近导出 5月10日');`;

// 今日任务
const TASKS = `INSERT INTO wb_tasks(module_code,title,tag,tag_tone,btn,btn_done,descr,reward,done) VALUES
('home','整理今日任务清单','','','',0,'按重要紧急程度安排今天 6 项任务','',0),
('plan','整理今日计划清单并完成优先级排序','每日计划','blue','开始执行',0,'按重要紧急程度安排今天 8 项任务','',0),
('diet','记录三餐并补充喝水','饮食打卡','orange','全部完成',1,'早餐 ✓ · 午餐 ✓ · 晚餐 ○ · 喝水 5/8 杯','',1),
('fitness','锻炼：八段锦完整跟练（约 100 kcal）','今日已练','green','奖励领取',1,'深呼吸 · 舒展筋骨 · 放松身心 · 提升心肺','',1),
('wellness','阅读《四季养生要诀》春季篇','养生学习','green','开始阅读',0,'了解春季养肝护脾的日常方法','',0),
('tarot','完成今日占卜 & 学习一张牌意','今日已完成','green','已完成',1,'每天一抽，记录当下并学习牌意','',1),
('french','完成今日法语听力练习（15 分钟）','法语打卡','blue','开始练习',0,'精听一段日常对话，跟读模仿语音语调','',0),
('tcm','学习夏季养心知识并记录笔记','中医学习','green','开始学习',0,'了解夏季养心护脉的饮食与作息要点','',0),
('film','剪辑一支 1 分钟生活 Vlog','剪辑练习','purple','开始创作',0,'整理本周素材，配乐并完成粗剪','',0),
('settings','完善个人资料与成长目标','账号设置','teal','去完善',0,'设置头像、昵称与年度成长目标','',0);`;

// banner
const BANNERS = `INSERT INTO wb_banners(module_code,icon,title,descr) VALUES
('home','💡','本周成长，稳稳向上','继续保持节奏，慢慢遇见更好的自己～'),
('plan','💡','好的计划是成功的一半','建议早上安排高专注任务，午后安排轻量任务，晚间复盘总结。'),
('diet','🥗','均衡饮食，从每一餐开始','今天蛋白质和纤维摄入不错，晚上记得少油少糖，按时补水哦！'),
('fitness','💪','坚持运动，身体体态和情绪都更好！','每天锻炼 12 分钟，可以提升体力、改善睡眠、增强免疫力。'),
('wellness','🌿','顺时而养，身体自有答案','每天 10 分钟养生知识，慢慢调整作息与饮食，让身体回到舒服的节奏。'),
('tarot','🧘','占卜前请静心默念你的问题','找一个安静的环境 · 闭上眼 · 在心里默念想问的事，然后再开始抽牌。'),
('french','🇫🇷','每天 15 分钟，让法语成为习惯','语言学习贵在坚持，听说读写轮着来，进步看得见！'),
('tcm','🍵','夏养心，宜清补','起居有常，饮食有节，情志调畅——中医养生的三把钥匙。'),
('film','🎬','用镜头记录生活的美','多拍多剪多复盘，审美和技术都会在作品里慢慢沉淀。'),
('settings','⚙️','让你的工作台更懂你','调整提醒时间、主题配色与模块开关，打造专属的成长空间。');`;

// 行动清单
const ACT = `INSERT INTO wb_action_items(module_code,sort,content,scheduled_time,done) VALUES
('diet',1,'记录早餐','今天 08:30',1),
('diet',2,'喝够 8 杯水','今天 12:20',1),
('diet',3,'晚间少糖少油','今天 18:30',0),
('diet',4,'睡前补一杯温水','今天 20:00',0),
('diet',5,'复盘今日饮食','今天 21:00',0),
('fitness',1,'八段锦完整跟练','今天 06:30',1),
('fitness',2,'拉伸放松 5 分钟','今天 08:45',1),
('fitness',3,'喝 300ml 盐水','今天 09:00',0),
('fitness',4,'记录体重数据','今天 09:05',0),
('fitness',5,'打开并整理相册','今天 08:08',0),
('wellness',1,'阅读春季养生篇','今天 08:00',1),
('wellness',2,'记录一条养生笔记','今天 12:00',0),
('wellness',3,'晚上 11 点前入睡','今天 23:00',0),
('tarot',1,'记录今天的占卜结果','今天 08:40',1),
('tarot',2,'学习节制牌牌意并写笔记','今天 08:50',1),
('tarot',3,'思考最近失衡的状态','今天 09:10',0),
('tarot',4,'写下 1-3 个行动小目标','今天 09:30',0),
('tarot',5,'完成今晚睡前打卡','今天 21:30',0),
('french',1,'完成听力练习','今天 08:00',1),
('french',2,'背诵 20 个新单词','今天 13:00',1),
('french',3,'跟读并录音复盘','今天 19:30',0),
('tcm',1,'阅读养心知识','今天 09:00',1),
('tcm',2,'记录一条食疗笔记','今天 14:00',0),
('tcm',3,'睡前泡脚 15 分钟','今天 22:00',0),
('film',1,'整理素材到时间线','今天 10:00',1),
('film',2,'确定配乐风格','今天 14:00',0),
('film',3,'导出并复盘一版','今天 20:00',0),
('plan',1,'整理房间 & 明日准备','今天 21:00 - 21:30',0),
('settings',1,'设置年度成长目标','建议本周完成',0),
('settings',2,'整理模块显示顺序','可选',0);`;

// 趋势图
const TRENDS = `INSERT INTO wb_trends(module_code,trend_key,title,labels,vals,color,unit,line_name) VALUES
('home','trend','本周成长趋势','5/6,5/7,5/8,5/9,5/10,5/11,5/12','3,4,6,5,7,6,9','#14b8a6','（任务）','任务数'),
('home','donut','模块投入占比','学习提升,健身塑身,饮食健康,兴趣研发,自我提升,生活管理,其他','20,18,12,16,10,8,16','#14b8a6','',''),
('diet','trend','本周饮食趋势','周一,周二,周三,周四,周五,周六,周日','1620,1580,1710,1490,1520,1450,1480','#14b8a6','（kcal）','热量'),
('fitness','dual','本周趋势','周一,周二,周三,周四,周五,周六,周日','1,2,2,1,2,2,3','#14b8a6','','运动次数'),
('fitness','dual2','本周热量','周一,周二,周三,周四,周五,周六,周日','80,120,150,90,130,160,120','#60a5fa','','消耗热量');`;

// 成长记录
const JOURNAL = `INSERT INTO wb_journals(journal_date,content,photo_emojis,more_txt) VALUES
('5月12日','今天完成了 6 项任务，整体成长很不错！继续保持，也可以记录下饮食和小贴士，让成长看得见。作为一名记录者，今天也要加油哦 💪','🌸,🧋,📷','+2');`;

// 熟练度
const MASTERY = `INSERT INTO wb_mastery(icon,name,percent) VALUES
('👤','个人模板',90),('📅','每日计划',85),('🍱','饮食管理',72),('💪','健身',68),
('🌿','养生知识',76),('🇫🇷','法语学习',66),('🍵','中医养生',58),('🔮','塔罗星盘',63),('📷','拍摄剪辑',69);`;

// 饮食记录
const DIET = `INSERT INTO wb_diet_log(sort,meal_type,meal_time,food,kcal,tone,icon) VALUES
(1,'早餐','07:30','蒸蛋 + 脱脂牛奶杯','约 320 kcal','yellow','🍳'),
(2,'午餐','12:30','鸡胸肉藜麦色拉 · 西兰花 · 胡萝卜','约 520 kcal','green','🥗'),
(3,'晚餐','18:30','清炒时蔬 + 南瓜','约 410 kcal','orange','🍲'),
(4,'加餐','15:30','苹果 + 香蕉','约 230 kcal','red','🍎');`;

// 喝水
const WATER = `INSERT INTO wb_water_log(log_date,cups,total,note) VALUES
('5月12日',5,8,'今日 5 / 8 杯');`;

// 营养
const NUTR = `INSERT INTO wb_nutrition(log_date,carb,protein,fat,fiber,total_kcal) VALUES
('5月12日',45,25,20,10,1480);`;

// 食谱
const RECIPE = `INSERT INTO wb_recipe(emoji,grad,title2,tags,kcal,descr) VALUES
('🥙','linear-gradient(135deg,#d9f99d,#a7f3d0)','板栗鸡肉藜麦沙拉','高蛋白,低脂,减脂友好','约 430 kcal','清蒸鸡胸肉搭配藜麦与当季板栗，饱腹感强又低脂，很适合训练日午餐。');`;

// 文章（养生/中医/法语）
const ART = `INSERT INTO wb_articles(module_code,sort,icon,tone,title,meta,done) VALUES
('wellness',1,'🌅','orange','早睡早起：修复身体的黄金时段','养生 · 8 分钟',1),
('wellness',2,'🫖','green','春季养肝茶饮搭配指南','食疗 · 6 分钟',0),
('wellness',3,'🧘','purple','八段锦背后的呼吸原理','功法 · 10 分钟',0),
('tcm',1,'❤️','red','夏季养心：午休 20 分钟的好处','节气养生 · 8 分钟',1),
('tcm',2,'🫖','green','酸梅汤的配方与体质适配','食疗茶饮 · 6 分钟',0),
('tcm',3,'🦶','orange','睡前泡脚的经络原理','经络知识 · 10 分钟',0),
('french',1,'🎧','blue','听力精练 · 咖啡馆点单场景','听力 · 15 分钟',1),
('french',2,'📖','teal','新单词 20 个 · 第二组动词变位','词汇 · 20 分钟',1),
('french',3,'🗣️','purple','口语跟读 · 自我介绍段落','口语 · 10 分钟',0),
('film',1,'🎞️','purple','整理本周拍摄素材','素材管理 · 20 分钟',1),
('film',2,'🎵','blue','挑选 Vlog 背景音乐','配乐 · 10 分钟',0),
('film',3,'✂️','pink','完成粗剪并导出','剪辑 · 40 分钟',0),
('plan',1,'🌅','orange','晨间复盘 & 计划确认','07:30 - 08:00',1),
('plan',2,'📖','blue','经典阅读 · 第 2 章','09:00 - 10:00',1),
('plan',3,'💻','teal','核心任务 · 深度专注','10:30 - 12:00',0),
('plan',4,'🍱','orange','午餐后散步 20 分钟','13:00 - 13:30',1),
('plan',5,'🧹','green','整理房间 & 明日准备','21:00 - 21:30',0);`;

// 塔罗牌意
const TAROT = `INSERT INTO wb_tarot_cards(card_num,card_name,emoji,tags,meaning) VALUES
('XVII','节制','⚖️','正位,平衡,治愈','节制的象征是流动与调和。它提示你：此刻不必急于求成，把注意力放回内在节奏，让热情与冷静协调运作，温和地推进当下的计划，答案会在过程中自然浮现。'),
('XVIII','月亮','🌙','潜意识,直觉,不安','月亮提示面对未知与情绪的波动。倾听内心的声音，辨别幻象与真实，光明就在迷雾之后。'),
('XIX','太阳','☀️','喜悦,成功,活力','太阳象征光明与生机。放下顾虑，拥抱当下的热情，成功与快乐正在到来。'),
('VIII','力量','🦁','勇气,柔韧,内在力量','以柔克刚。真正的力量来自内心的坚定与温柔，驯服欲望而非压抑它。'),
('I','魔术师','🎩','创造,行动,掌控','你拥有把想法变为现实的全部要素。专注、行动，奇迹由你创造。');`;

// 设置项
const SETTINGS = `INSERT INTO wb_settings(icon,tone,title,descr,status) VALUES
('🔔','blue','每日任务提醒','每天 08:00 提醒','已开启'),
('🌙','purple','夜间模式','22:00 自动切换','已开启'),
('☁️','teal','云端同步','Wi-Fi 下自动备份','已开启'),
('🔒','red','隐私锁','面容 / 密码解锁','未开启');`;

// 时间安排（健身/拍摄）
const SCHED = `INSERT INTO wb_schedule(module_code,sort,time_str,icon,tone,title,meta,right_txt) VALUES
('film',1,'10:00','🎞️','purple','整理素材到时间线','素材管理 · 20 分钟','20 分钟'),
('film',2,'14:00','🎵','blue','挑选背景音乐','配乐 · 10 分钟','10 分钟'),
('film',3,'20:00','✂️','pink','完成粗剪并导出','剪辑 · 40 分钟','40 分钟');`;

// 练习记录（健身/拍摄）
const PRAC = `INSERT INTO wb_practice_log(module_code,sort,icon,tone,title,meta,right_txt) VALUES
('film',1,'🎞️','purple','素材整理与初剪','5月12日 · 20 分钟','✅ 完成'),
('film',2,'✂️','pink','粗剪导出复盘','5月11日 · 35 分钟','⏳ 进行中'),
('film',3,'🎬','indigo','上一支作品回顾','5月10日 · 25 分钟','✅ 完成'),
('fitness',1,'🧘','green','八段锦完整跟练','5月12日 06:30','✅ 完成'),
('fitness',2,'💪','red','居家力量训练','5月11日 18:00','✅ 完成'),
('fitness',3,'🏃','orange','晨跑 3 公里','5月10日 07:00','⏳ 进行中');`;

const TABLES = ['wb_users','wb_modules','wb_page_meta','wb_page_stats','wb_tasks','wb_banners','wb_action_items','wb_trends','wb_journals','wb_mastery','wb_diet_log','wb_water_log','wb_nutrition','wb_recipe','wb_articles','wb_tarot_cards','wb_settings','wb_schedule','wb_practice_log','wb_login_sessions'];

(async () => {
  let conn;
  try {
    conn = await mysql.createConnection({ ...DB, multipleStatements: true });
    console.log('[1/4] 连接 MySQL 成功');
    await conn.query(DDL);
    console.log('[2/4] 建表完成');
    // 清空旧数据（保留表结构）
    for (const t of TABLES) {
      await conn.query(`DELETE FROM ${t}`);
      await conn.query(`ALTER TABLE ${t} AUTO_INCREMENT = 1`);
    }
    console.log('[3/4] 清空旧数据完成');
    const inserts = [['wb_users', U], ['wb_modules', M], ['wb_page_meta', META], ['wb_page_stats', STATS], ['wb_tasks', TASKS], ['wb_banners', BANNERS], ['wb_action_items', ACT], ['wb_trends', TRENDS], ['wb_journals', JOURNAL], ['wb_mastery', MASTERY], ['wb_diet_log', DIET], ['wb_water_log', WATER], ['wb_nutrition', NUTR], ['wb_recipe', RECIPE], ['wb_articles', ART], ['wb_tarot_cards', TAROT], ['wb_settings', SETTINGS], ['wb_schedule', SCHED], ['wb_practice_log', PRAC]];
    for (const [name, sql] of inserts) {
      try {
        const [res] = await conn.query(sql);
        console.log('  ✓', name, res.affectedRows, '行');
      } catch (e) {
        console.error('  ✗', name, '→', e.message);
        throw e;
      }
    }
    // 统计
    const [r] = await conn.query(`SELECT (SELECT COUNT(*) FROM wb_modules) m, (SELECT COUNT(*) FROM wb_page_stats) s, (SELECT COUNT(*) FROM wb_action_items) a, (SELECT COUNT(*) FROM wb_articles) ar`);
    console.log('[4/4] 预置数据完成 ✅', r[0]);
    await conn.end();
    process.exit(0);
  } catch (e) {
    console.error('❌ 初始化失败:', e.message);
    if (conn) try { await conn.end(); } catch (_) {}
    process.exit(1);
  }
})();
