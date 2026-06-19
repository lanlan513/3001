export interface ExhibitionShoe {
  id: string;
  name: string;
  era: string;
  year: number;
  designer: string;
  brand: string;
  imageUrl: string;
  color: string;
  shortStory: string;
  fullStory?: string;
  rarity: 'legendary' | 'iconic' | 'classic';
  angle: number;
}

export const exhibitionShoes: ExhibitionShoe[] = [
  {
    id: '1920s-french-pump',
    name: '法式浅口鞋',
    era: '1920s',
    year: 1925,
    designer: 'André Perugia',
    brand: 'Maison Perugia',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%201920s%20French%20pump%20heel%20shoe%2C%20silk%20satin%2C%20vintage%20luxury%20fashion%2C%20soft%20lighting%2C%20museum%20display%20side%20view%20full%20body&image_size=square_hd',
    color: '米白色',
    shortStory: '咆哮的二十年代，女性解放与爵士时代的标志性鞋款。',
    fullStory: '1920年代是女性解放的黄金时期。第一次世界大战结束后，女性开始摆脱紧身胸衣的束缚，追求更加自由的生活方式。这款法式浅口鞋正是那个时代的完美缩影，象征着Flapper女孩们的独立与自由。',
    rarity: 'legendary',
    angle: 0,
  },
  {
    id: '1950s-stiletto',
    name: '细高跟传奇',
    era: '1950s',
    year: 1954,
    designer: 'Roger Vivier',
    brand: 'Christian Dior',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=1950s%20Roger%20Vivier%20stiletto%20high%20heel%2C%20black%20satin%2C%20elegant%20pointed%20toe%2C%20luxury%20fashion%20museum%20display%20side%20view%20full%20body&image_size=square_hd',
    color: '黑色',
    shortStory: 'Roger Vivier为Dior设计的首款金属细高跟，重新定义了女性优雅。',
    fullStory: '1954年，Roger Vivier为Christian Dior的New Look系列设计了这款革命性的细高跟鞋。首创钢芯嵌入鞋跟技术，让纤细的鞋跟能够承受人体的重量。',
    rarity: 'legendary',
    angle: 45,
  },
  {
    id: '1950s-red-soled-pump',
    name: '红底鞋经典',
    era: '1950s',
    year: 1959,
    designer: 'Christian Louboutin',
    brand: 'Christian Louboutin',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=1950s%20red%20soled%20pump%20high%20heel%2C%20glossy%20red%20leather%2C%20pointed%20toe%2C%20luxurious%20french%20design%20side%20view%20full%20body&image_size=square_hd',
    color: '红色',
    shortStory: '标志性的红底设计，法式性感的代名词。',
    fullStory: '红底鞋的设计灵感来源于设计师偶然涂在鞋底的红色指甲油，没想到成为了品牌最经典的标志。每一步都充满风情，是法式性感的代名词。',
    rarity: 'iconic',
    angle: 90,
  },
  {
    id: '1960s-mod-go-go',
    name: '太空时代GOGO靴',
    era: '1960s',
    year: 1965,
    designer: 'André Courrèges',
    brand: 'Courrèges',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=1960s%20white%20go%20go%20boots%2C%20space%20age%20design%2C%20mod%20fashion%2C%20vinyl%20material%2C%20futuristic%20style%20side%20view%20full%20body&image_size=square_hd',
    color: '白色',
    shortStory: '太空时代的时尚宣言，代表着60年代对未来的无限憧憬。',
    fullStory: '1965年，André Courrèges推出了他标志性的"太空时代"系列，这款GOGO靴正是其中最具代表性的单品。白色乙烯基材质搭配粗方跟，充满未来主义色彩。',
    rarity: 'iconic',
    angle: 135,
  },
  {
    id: '1970s-platform',
    name: '迪斯科厚底鞋',
    era: '1970s',
    year: 1973,
    designer: 'Salvatore Ferragamo',
    brand: 'Ferragamo',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=1970s%20disco%20platform%20high%20heel%20shoe%2C%20gold%20lam%C3%A9%2C%20thick%20platform%20sole%2C%20glamorous%2070s%20fashion%20side%20view%20full%20body&image_size=square_hd',
    color: '金色',
    shortStory: '迪斯科时代的狂欢符号，金色金属丝面料搭配夸张厚底。',
    fullStory: '1970年代中期，迪斯科文化席卷全球，这款厚底鞋正是那个狂欢年代的终极时尚宣言。在舞池的闪烁灯光下，金色金属丝面料熠熠生辉。',
    rarity: 'classic',
    angle: 180,
  },
  {
    id: '1980s-power-suit',
    name: '权力套装高跟鞋',
    era: '1980s',
    year: 1982,
    designer: 'Manolo Blahnik',
    brand: 'Manolo Blahnik',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=1980s%20power%20suit%20high%20heel%20pump%2C%20black%20leather%2C%20pointed%20toe%2C%20professional%20elegant%2C%2080s%20corporate%20fashion%20side%20view%20full%20body&image_size=square_hd',
    color: '黑色',
    shortStory: '女性闯入华尔街的战靴，散发着不可忽视的力量。',
    fullStory: '1980年代，女性开始大规模进入金融和法律等传统男性主导的领域。这款尖头细高跟完美回应了职业女性的需求，既专业又不失优雅。',
    rarity: 'classic',
    angle: 225,
  },
  {
    id: '1990s-grunge-platform',
    name: '摇滚厚底玛丽珍',
    era: '1990s',
    year: 1994,
    designer: 'Stephen Webster',
    brand: 'Underground',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=1990s%20grunge%20platform%20mary%20jane%20shoe%2C%20black%20leather%2C%20thick%20rubber%20sole%2C%20silver%20buckle%2C%20punk%20fashion%20side%20view%20full%20body&image_size=square_hd',
    color: '黑色',
    shortStory: '垃圾摇滚时代的反时尚宣言，黑色皮革搭配夸张橡胶厚底。',
    fullStory: '英国品牌Underground的经典厚底玛丽珍鞋，迅速成为90年代反主流文化的标志。故意做旧的处理和夸张的厚底，完美诠释了垃圾摇滚精神。',
    rarity: 'iconic',
    angle: 270,
  },
  {
    id: '2010s-sock-boot',
    name: '袜靴革命',
    era: '2010s',
    year: 2016,
    designer: 'Nicolas Ghesquière',
    brand: 'Balenciaga',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=2010s%20Balenciaga%20sock%20boot%2C%20black%20stretch%20knit%2C%20pointed%20toe%2C%20thin%20heel%2C%20modern%20minimalist%20fashion%20side%20view%20full%20body&image_size=square_hd',
    color: '黑色',
    shortStory: '高级时尚与街头文化的碰撞，弹力针织面料贴合脚踝。',
    fullStory: '2016年，Nicolas Ghesquière为Balenciaga设计的这款袜靴彻底颠覆了鞋履设计的边界。高性能弹力针织面料，3D立体编织一次成型。',
    rarity: 'legendary',
    angle: 315,
  },
];
