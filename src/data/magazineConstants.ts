import type { ShoeStyle, MagazineNewsCategory } from '@/types';

export const newsCategoryConfig: Record<MagazineNewsCategory, { label: string; icon: string; color: string }> = {
  trend: { label: '潮流趋势', icon: '🔥', color: 'text-orange-400' },
  industry: { label: '行业动态', icon: '📊', color: 'text-blue-400' },
  culture: { label: '时尚文化', icon: '🎨', color: 'text-purple-400' },
  scandal: { label: '时尚争议', icon: '💥', color: 'text-red-400' },
  innovation: { label: '创新前沿', icon: '💡', color: 'text-cyan-400' },
};

interface NewsTemplate {
  titleTemplates: string[];
  summaryTemplates: string[];
  category: MagazineNewsCategory;
  relatedStyle?: ShoeStyle;
  impact: 'positive' | 'negative' | 'neutral';
}

export const newsTemplates: NewsTemplate[] = [
  {
    titleTemplates: [
      '复古风潮强势回归，经典设计再度翻红',
      'Vintage复兴！90年代风高跟鞋成为新宠',
      '怀旧风尚席卷T台，复古高跟鞋引领潮流',
    ],
    summaryTemplates: [
      '时尚界迎来一股强劲的复古风潮，经典高跟鞋设计正以前所未有的势头重回大众视野。',
      '从巴黎到米兰，复古风格高跟鞋成为本季最热门单品，多个品牌纷纷推出复刻系列。',
      '时尚编辑们一致认为，复古元素将成为今年最受欢迎的设计方向。',
    ],
    category: 'trend',
    relatedStyle: 'vintage',
    impact: 'positive',
  },
  {
    titleTemplates: [
      '未来主义设计异军突起，科技感高跟鞋引爆话题',
      'Futurism浪潮来袭！前卫高跟鞋定义新美学',
      '科技与时尚的碰撞：未来风高跟鞋成年度黑马',
    ],
    summaryTemplates: [
      '未来主义风格高跟鞋正在重新定义时尚边界，大胆的几何线条和金属质感令人耳目一新。',
      '从3D打印到智能材料，未来主义高跟鞋正在用科技改变时尚。',
      '本季最令人瞩目的趋势——未来主义设计正在高跟鞋领域掀起革命。',
    ],
    category: 'trend',
    relatedStyle: 'avant-garde',
    impact: 'positive',
  },
  {
    titleTemplates: [
      '极简主义持续盛行，Less is More哲学深入人心',
      '极简风高跟鞋：用最少的元素表达最极致的优雅',
      '简约不简单——极简主义高跟鞋的高端市场密码',
    ],
    summaryTemplates: [
      '极简主义风格继续统治高端市场，简约设计的高跟鞋以纯粹线条赢得消费者青睐。',
      '在过度装饰的潮流中，极简主义高跟鞋以克制的优雅脱颖而出。',
      '业界分析指出，极简风高跟鞋的复购率高于其他风格，显示出强大的市场生命力。',
    ],
    category: 'trend',
    relatedStyle: 'minimalist',
    impact: 'positive',
  },
  {
    titleTemplates: [
      '华丽风回归！红毯上的璀璨高跟鞋',
      'Glamour风潮再起，珠宝镶嵌高跟鞋成社交货币',
      '极致华丽：装饰艺术风格高跟鞋的复兴之路',
    ],
    summaryTemplates: [
      '华丽装饰风格高跟鞋正在重返时尚舞台中心，水钻、羽毛和金属扣成为设计师的新宠。',
      '从Met Gala到奥斯卡红毯，华丽风格高跟鞋成为明星造型的点睛之笔。',
      '高端品牌纷纷推出华丽限定款，市场反应热烈。',
    ],
    category: 'trend',
    relatedStyle: 'glamorous',
    impact: 'positive',
  },
  {
    titleTemplates: [
      '经典永不过时：优雅高跟鞋的永恒魅力',
      'Classic Revival——经典设计为何总能打动人心？',
      '经典风高跟鞋销量逆势增长，证明优雅永不过时',
    ],
    summaryTemplates: [
      '在瞬息万变的时尚界，经典风格高跟鞋始终保持稳定增长，证明真正的好设计经得起时间考验。',
      '时尚分析师指出，经典款高跟鞋是每个品牌不可或缺的基石产品。',
      '消费者调查显示，经典风格高跟鞋仍是职场女性的首选。',
    ],
    category: 'trend',
    relatedStyle: 'classic',
    impact: 'neutral',
  },
  {
    titleTemplates: [
      '浪漫主义风潮回归，蝴蝶结与蕾丝成设计新焦点',
      '春天的心情：浪漫风高跟鞋的温柔力量',
      '从宫廷到街头：浪漫主义高跟鞋的现代演绎',
    ],
    summaryTemplates: [
      '浪漫风格高跟鞋正在迎来新一轮热潮，蝴蝶结、蕾丝和花朵元素成为本季设计亮点。',
      '设计师们从古典浪漫主义中汲取灵感，创造出兼具优雅与浪漫的高跟鞋系列。',
      '社交媒体上浪漫风高跟鞋的话题热度持续攀升。',
    ],
    category: 'trend',
    relatedStyle: 'romantic',
    impact: 'positive',
  },
  {
    titleTemplates: [
      '个性风暴！前卫高跟鞋挑战传统审美',
      'Edgy风格出圈：叛逆美学高跟鞋俘获Z世代',
      '打破常规——个性风高跟鞋如何重新定义时尚？',
    ],
    summaryTemplates: [
      '个性风格高跟鞋正在突破传统时尚边界，铆钉、链条等叛逆元素成为年轻消费者的最爱。',
      'Z世代消费者对个性风高跟鞋的需求激增，推动品牌大胆创新。',
      '时尚评论家认为，个性风高跟鞋代表了一种全新的自我表达方式。',
    ],
    category: 'trend',
    relatedStyle: 'edgy',
    impact: 'positive',
  },
  {
    titleTemplates: [
      '现代都市女性新选择：现代风高跟鞋走俏',
      'Modern Chic——都市感高跟鞋的崛起',
      '功能与美学并重，现代风高跟鞋重塑通勤新标准',
    ],
    summaryTemplates: [
      '现代风格高跟鞋以其实用性和设计感的完美平衡，成为都市白领的热门选择。',
      '设计师们正在重新定义"现代感"，将舒适性与时尚性融合到一双高跟鞋中。',
      '市场数据显示，现代风高跟鞋在工作日销量占比超过60%。',
    ],
    category: 'trend',
    relatedStyle: 'modern',
    impact: 'neutral',
  },
  {
    titleTemplates: [
      '全球高跟鞋市场规模突破新高，达到500亿美元',
      '亚太市场成高跟鞋增长引擎，中国消费者贡献突出',
      '奢侈品高跟鞋市场逆势增长，高端消费持续强劲',
    ],
    summaryTemplates: [
      '最新行业报告显示，全球高跟鞋市场规模再创新高，其中亚太地区增速最为显著。',
      '分析师预测，高端高跟鞋市场将在未来三年保持两位数增长。',
      '多个知名品牌宣布扩张计划，看好高跟鞋市场长期发展前景。',
    ],
    category: 'industry',
    impact: 'positive',
  },
  {
    titleTemplates: [
      '知名设计师突然离职，品牌股价震荡',
      '奢侈品集团收购独立鞋履品牌，行业格局生变',
      '供应链危机持续，高跟鞋原材料价格飙升',
    ],
    summaryTemplates: [
      '时尚界人事变动引发市场关注，多家品牌面临领导层更替带来的不确定性。',
      '行业整合加速，大型奢侈品集团通过收购独立品牌扩大市场份额。',
      '原材料成本上涨迫使部分品牌提价，消费者反应不一。',
    ],
    category: 'industry',
    impact: 'negative',
  },
  {
    titleTemplates: [
      '高跟鞋与女性赋权：一段复杂的文化史',
      '从束缚到自由：高跟鞋在女性主义运动中的角色转变',
      '穿还是不穿？当代女性对高跟鞋的态度正在改变',
    ],
    summaryTemplates: [
      '一场关于高跟鞋与女性身体自主权的深度讨论正在学界和社交媒体上展开。',
      '高跟鞋正从"必须穿"变为"选择穿"，这种转变反映了社会观念的进步。',
      '文化评论家指出，当代女性对高跟鞋的态度更加多元和包容。',
    ],
    category: 'culture',
    impact: 'neutral',
  },
  {
    titleTemplates: [
      '某品牌高跟鞋被指抄袭独立设计师作品',
      '高跟鞋舒适度争议再起，消费者投诉增多',
      '快时尚高跟鞋质量堪忧，引发行业反思',
    ],
    summaryTemplates: [
      '抄袭争议再次引爆时尚圈，独立设计师维权之路依然漫长。',
      '消费者对高跟鞋舒适度的要求日益提高，品牌面临新的挑战。',
      '业内人士呼吁建立更严格的质量标准，保护消费者权益。',
    ],
    category: 'scandal',
    impact: 'negative',
  },
  {
    titleTemplates: [
      '3D打印高跟鞋技术突破，个性化定制成为可能',
      '智能高跟鞋面世：内置传感器实时监测足部健康',
      '可持续材料革命：蘑菇菌丝体制成的高跟鞋',
    ],
    summaryTemplates: [
      '最新3D打印技术让高跟鞋的个性化定制从梦想变为现实，消费者可以设计独一无二的鞋款。',
      '智能高跟鞋内置的健康监测系统引发科技圈和时尚圈的双重关注。',
      '环保材料的创新应用正在改变高跟鞋产业的可持续发展路径。',
    ],
    category: 'innovation',
    impact: 'positive',
  },
  {
    titleTemplates: [
      'AR虚拟试鞋技术普及，线上购鞋体验升级',
      '纳米防水涂层技术让高跟鞋不再怕雨天',
      '可调节鞋跟高度技术获专利，一双鞋多种穿法',
    ],
    summaryTemplates: [
      'AR试鞋技术正在改变消费者的购买方式，线上高跟鞋退货率显著下降。',
      '纳米技术的应用让高跟鞋的耐用性大幅提升，消费者好评如潮。',
      '可调节鞋跟技术的出现让一双高跟鞋可以适应不同场合的需求。',
    ],
    category: 'innovation',
    impact: 'positive',
  },
];

interface TrendEventTemplate {
  name: string;
  description: string;
  icon: string;
  affectedStyles: ShoeStyle[];
  demandMultiplier: number;
  duration: number;
  intensity: 'minor' | 'moderate' | 'major';
}

export const trendEventTemplates: TrendEventTemplate[] = [
  {
    name: '复古风回归',
    description: '90年代经典设计重新成为时尚焦点，复古风格高跟鞋需求激增！',
    icon: '🌹',
    affectedStyles: ['vintage', 'classic'],
    demandMultiplier: 1.8,
    duration: 5,
    intensity: 'major',
  },
  {
    name: '未来主义流行',
    description: '科技感与前卫美学融合，未来主义风格引领潮流新方向！',
    icon: '🚀',
    affectedStyles: ['avant-garde', 'modern'],
    demandMultiplier: 1.7,
    duration: 4,
    intensity: 'major',
  },
  {
    name: '极简风暴',
    description: '极简主义风潮席卷时尚圈，简约设计成为新的高端代名词。',
    icon: '◻️',
    affectedStyles: ['minimalist', 'modern'],
    demandMultiplier: 1.5,
    duration: 4,
    intensity: 'moderate',
  },
  {
    name: '华丽复兴',
    description: '装饰艺术风格重回舞台，华丽与奢华成为本季关键词！',
    icon: '💎',
    affectedStyles: ['glamorous', 'romantic'],
    demandMultiplier: 1.6,
    duration: 4,
    intensity: 'moderate',
  },
  {
    name: '个性叛逆潮',
    description: 'Z世代推动个性美学崛起，叛逆风格高跟鞋销量暴增！',
    icon: '⚡',
    affectedStyles: ['edgy', 'avant-garde'],
    demandMultiplier: 1.5,
    duration: 3,
    intensity: 'moderate',
  },
  {
    name: '浪漫季节',
    description: '春暖花开，浪漫风格高跟鞋成为约会首选！',
    icon: '🌸',
    affectedStyles: ['romantic', 'classic'],
    demandMultiplier: 1.4,
    duration: 3,
    intensity: 'minor',
  },
  {
    name: '经典永恒',
    description: '时尚轮回，经典风格永远是最稳妥的投资！',
    icon: '👠',
    affectedStyles: ['classic', 'vintage'],
    demandMultiplier: 1.3,
    duration: 3,
    intensity: 'minor',
  },
  {
    name: '现代都市风',
    description: '都市职场女性推动现代风格高跟鞋成为通勤标配！',
    icon: '🏙️',
    affectedStyles: ['modern', 'minimalist'],
    demandMultiplier: 1.3,
    duration: 3,
    intensity: 'minor',
  },
  {
    name: '红毯季来临',
    description: '颁奖典礼季到来，华丽风格高跟鞋需求井喷！',
    icon: '🌟',
    affectedStyles: ['glamorous', 'classic'],
    demandMultiplier: 2.0,
    duration: 3,
    intensity: 'major',
  },
  {
    name: '时尚周效应',
    description: '四大时装周同时举行，所有风格关注度提升！',
    icon: '👗',
    affectedStyles: ['classic', 'modern', 'vintage', 'avant-garde'],
    demandMultiplier: 1.4,
    duration: 5,
    intensity: 'major',
  },
];

export const coverTitles = [
  '年度风尚之选',
  '潮流先锋',
  '设计之星',
  '风格宣言',
  '足尖艺术',
  '时尚新势力',
  '优雅革命',
  '步履不停',
  '魅力足迹',
  '极致之美',
];

export const coverSubtitles = [
  '本季最受瞩目的高跟鞋设计',
  '重新定义优雅的设计力量',
  '从灵感缪斯到经典之作',
  '当创意遇见匠心',
  '一双鞋，一段故事',
  '时尚界的新宠儿',
  '超越想象的鞋履美学',
  '经典与创新的完美融合',
  '为你解读潮流密码',
  '每一步都是艺术',
];
