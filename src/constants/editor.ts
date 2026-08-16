export const i18n = {
  en: {
    bgTab: 'Background',
    textTab: 'Text',
    styleTab: 'Style',
    ratio: 'Canvas Ratio',
    landscape: '16:9 (Landscape)',
    portrait: '9:16 (Portrait)',
    square: '1:1 (Square)',
    standard: '4:3 (Standard)',
    uploadTitle: 'Background Image/Video',
    uploadDesc: 'Click to upload image or video',
    extractFrame: 'Extract Video Frame',
    generatingThumbs: 'Generating thumbnails...',
    solidColor: 'Solid Color',
    bgAdjust: 'Background Adjust',
    bgScale: 'Zoom',
    reset: 'Reset',
    bgAdjustHint: 'Drag to choose which part of the image is shown in the frame. Use the slider or scroll wheel to zoom; zooming out reveals the full image.',
    coverText: 'Cover Text',
    textPlaceholder: 'Enter cover text...',
    fontSize: 'Font Size',
    textColor: 'Text Color',
    textBgStyle: 'Text Background Style',
    fontFamily: 'Font Family',
    fontWeight: 'Font Weight',
    fontStyle: 'Font Style',
    textDecoration: 'Decoration',
    textAlign: 'Alignment',
    strokeColor: 'Stroke Color',
    strokeWidth: 'Stroke Width',
    exportBtn: 'Export Cover',
    exportFail: 'Export failed, please try again',
    defaultText: 'Build Parkour\nGame Scene with AI',
    textTemplates: 'Text Templates',
    templateDefault: 'Default',
    templateGoldNewsTitle: 'Gold News Title',
    templateRedEmphasisSubtitle: 'Red Emphasis Subtitle',
    layersTitle: 'Layers',
    noLayers: 'No text layers',
    addLayer: 'Add Text Layer',
    backgroundLayer: 'Background',
    styleNone: 'None',
    styleOrange3d: 'Orange 3D',
    styleBlackQuote: 'Black Quote',
    stylePurpleYellow: 'Purple Yellow',
    styleUnderline: 'Underline',
    styleBlueGlow: 'Blue Glow',
    styleBrackets: 'Brackets',
    styleGoldNewsTitle: 'Gold News',
    styleRedEmphasisSubtitle: 'Red Emphasis',
    stylePreview: 'Preview',
    templateTab: 'Templates',
    platformBilibili: 'Bilibili',
    platformTiktok: 'TikTok',
    platformWechat: 'WeChannels',
    platformXhs: 'RED',
    ratioBilibili: 'Bilibili 1920x1080',
    ratioDouyin: 'Douyin 1080x1920',
    ratioWechat: 'WeChannels 1080x1260',
    ratioXhs: 'Xiaohongshu 1080x1440',
  },
  zh: {
    bgTab: '背景',
    textTab: '文字',
    styleTab: '样式',
    ratio: '画布比例',
    landscape: '16:9 (横版视频)',
    portrait: '9:16 (竖版视频)',
    square: '1:1 (方形)',
    standard: '4:3 (标准)',
    uploadTitle: '背景图/视频',
    uploadDesc: '点击上传图片或视频',
    extractFrame: '提取视频帧',
    generatingThumbs: '正在生成缩略图...',
    solidColor: '纯色背景',
    bgAdjust: '背景调整',
    bgScale: '缩放',
    reset: '重置',
    bgAdjustHint: '拖动图片可选择画布中显示的图像区域，使用滑块或滚轮缩放，缩小可完整显示整张图片。',
    coverText: '封面文案',
    textPlaceholder: '输入封面文字...',
    fontSize: '字体大小',
    textColor: '文字颜色',
    textBgStyle: '文字背景样式',
    fontFamily: '字体',
    fontWeight: '字重',
    fontStyle: '字体样式',
    textDecoration: '装饰线',
    textAlign: '对齐方式',
    strokeColor: '描边颜色',
    strokeWidth: '描边宽度',
    exportBtn: '导出封面',
    exportFail: '导出失败，请重试',
    defaultText: '用 AI 搭建\n跑酷游戏场景',
    textTemplates: '文字模板',
    templateDefault: '默认',
    templateGoldNewsTitle: '金色新闻标题',
    templateRedEmphasisSubtitle: '红色强调副标题',
    layersTitle: '图层',
    noLayers: '暂无文本图层',
    addLayer: '添加文字图层',
    backgroundLayer: '背景',
    styleNone: '无背景',
    styleOrange3d: '橙色立体',
    styleBlackQuote: '黑底黄引',
    stylePurpleYellow: '紫底黄块',
    styleUnderline: '下划线',
    styleBlueGlow: '蓝色发光',
    styleBrackets: '直角括号',
    styleGoldNewsTitle: '金色新闻',
    styleRedEmphasisSubtitle: '红色强调',
    stylePreview: '样式预览',
    templateTab: '模板',
    platformBilibili: 'Bilibili',
    platformTiktok: 'TikTok',
    platformWechat: '视频号',
    platformXhs: '小红书',
    ratioBilibili: 'B站 1920x1080',
    ratioDouyin: '抖音 1080x1920',
    ratioWechat: '视频号 1080x1260',
    ratioXhs: '小红书 1080x1440',
  },
};

export interface FontOption {
  value: string;
  label: string;
}

export interface FontGroup {
  labelEn: string;
  labelZh: string;
  fonts: FontOption[];
}

export const FONT_GROUPS: FontGroup[] = [
  {
    labelEn: 'General',
    labelZh: '通用字体',
    fonts: [
      { value: 'sans-serif', label: 'Sans Serif' },
      { value: 'serif', label: 'Serif' },
      { value: 'monospace', label: 'Monospace' },
      { value: 'Inter', label: 'Inter' },
      { value: 'Arial', label: 'Arial' },
    ],
  },
  {
    labelEn: 'Basic CJK',
    labelZh: '基础中文字体',
    fonts: [
      { value: 'Noto Sans SC', label: '思源黑体 Noto Sans SC' },
      { value: 'Noto Serif SC', label: '思源宋体 Noto Serif SC' },
      { value: 'Alibaba PuHuiTi', label: '阿里巴巴普惠体' },
      { value: 'LXGW WenKai Screen', label: '霞鹜文楷' },
    ],
  },
  {
    labelEn: 'Title / Creative',
    labelZh: '标题/创意字体',
    fonts: [
      { value: 'Smiley Sans', label: '得意黑 Smiley Sans' },
      { value: 'ZCOOL QingKe HuangYou', label: '站酷庆科黄油体' },
      { value: '优设标题黑', label: '优设标题黑' },
      { value: '站酷高端黑', label: '站酷高端黑' },
      { value: '站酷酷黑', label: '站酷酷黑' },
      { value: '庞门正道标题体', label: '庞门正道标题体' },
      { value: '庞门正道粗书体', label: '庞门正道粗书体' },
      { value: '抖音美好体', label: '抖音美好体' },
    ],
  },
  {
    labelEn: 'Handwriting / Kai',
    labelZh: '手写/楷体',
    fonts: [
      { value: 'Ma Shan Zheng', label: '马善政楷书' },
      { value: 'Zhi Mang Xing', label: '志莽行书' },
      { value: 'Long Cang', label: '龙藏体' },
      { value: '江西拙楷', label: '江西拙楷' },
    ],
  },
];

export const aspectRatios = {
  '16:9': { w: 1920, h: 1080, labelKey: 'landscape' },
  '9:16': { w: 1080, h: 1920, labelKey: 'portrait' },
  '1:1': { w: 1080, h: 1080, labelKey: 'square' },
  '4:3': { w: 1440, h: 1080, labelKey: 'standard' },
  'bilibili': { w: 1920, h: 1080, labelKey: 'ratioBilibili' },
  'douyin': { w: 1080, h: 1920, labelKey: 'ratioDouyin' },
  'shipinhao': { w: 1080, h: 1260, labelKey: 'ratioWechat' },
  'xiaohongshu': { w: 1080, h: 1440, labelKey: 'ratioXhs' },
};

export interface TextLayer {
  id: string;
  name: string;
  text: string;
  styleId: string;
  fontSize: number;
  color: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  textAlign: 'left' | 'center' | 'right';
  strokeColor: string;
  strokeWidth: number;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
}

export const TEXT_BG_STYLES = [
  { id: 'none', nameKey: 'styleNone' },
  { id: 'orange-3d', nameKey: 'styleOrange3d' },
  { id: 'black-quote', nameKey: 'styleBlackQuote' },
  { id: 'purple-yellow', nameKey: 'stylePurpleYellow' },
  { id: 'underline', nameKey: 'styleUnderline' },
  { id: 'blue-glow', nameKey: 'styleBlueGlow' },
  { id: 'brackets', nameKey: 'styleBrackets' },
];

export type TemplatePlatform = 'bilibili' | 'tiktok' | 'wechat' | 'xhs';

export interface CoverTemplate {
  id: string;
  nameEn: string;
  nameZh: string;
  platform: TemplatePlatform;
  platformKey: string;
  bgColor: string;
  ratio: keyof typeof aspectRatios;
  layers: Omit<TextLayer, 'id' | 'name'>[];
}

const tplLayer = (over: Partial<Omit<TextLayer, 'id' | 'name'>>): Omit<TextLayer, 'id' | 'name'> => ({
  text: '',
  styleId: 'none',
  fontSize: 120,
  color: '#ffffff',
  fontFamily: 'sans-serif',
  fontWeight: '900',
  fontStyle: 'normal',
  textDecoration: 'none',
  textAlign: 'center',
  strokeColor: 'transparent',
  strokeWidth: 0,
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1,
  ...over,
});

export const COVER_TEMPLATES: CoverTemplate[] = [
  // ---- Bilibili (16:9, 1920x1080) ----
  {
    id: 'bili-tech',
    nameEn: 'Bilibili Tech Blue',
    nameZh: 'B站科技蓝',
    platform: 'bilibili',
    platformKey: 'platformBilibili',
    bgColor: '#0B2E59',
    ratio: 'bilibili',
    layers: [
      tplLayer({ text: '硬核科技评测', styleId: 'blue-glow', fontSize: 200, color: '#ffffff', y: -140 }),
      tplLayer({ text: '全自动跑分实测', styleId: 'underline', fontSize: 90, color: '#FFD700', y: 220 }),
    ],
  },
  {
    id: 'bili-anime',
    nameEn: 'Bilibili Anime Purple',
    nameZh: 'B站番剧粉紫',
    platform: 'bilibili',
    platformKey: 'platformBilibili',
    bgColor: '#7C3AED',
    ratio: 'bilibili',
    layers: [
      tplLayer({ text: '「 本季神番推荐 」', styleId: 'brackets', fontSize: 180, color: '#ffffff', fontFamily: 'ZCOOL QingKe HuangYou', y: -60 }),
      tplLayer({ text: '追番必看清单', styleId: 'black-quote', fontSize: 80, color: '#FFD700', y: 240 }),
    ],
  },

  // ---- TikTok / 抖音 (9:16, 1080x1920) ----
  {
    id: 'tt-neon',
    nameEn: 'TikTok Neon Night',
    nameZh: '抖音霓虹夜',
    platform: 'tiktok',
    platformKey: 'platformTiktok',
    bgColor: '#111111',
    ratio: 'douyin',
    layers: [
      tplLayer({ text: '深夜电台\n情感故事', styleId: 'blue-glow', fontSize: 150, color: '#25F4EE', y: -120 }),
      tplLayer({ text: '每晚八点更新', styleId: 'underline', fontSize: 70, color: '#FE2C55', y: 320 }),
    ],
  },
  {
    id: 'tt-orange',
    nameEn: 'TikTok Energy Orange',
    nameZh: '抖音活力橙',
    platform: 'tiktok',
    platformKey: 'platformTiktok',
    bgColor: '#FDBA74',
    ratio: 'douyin',
    layers: [
      tplLayer({ text: '3分钟学会\n一道硬菜', styleId: 'orange-3d', fontSize: 160, color: '#ffffff', y: -140 }),
      tplLayer({ text: '厨房小白也能搞定', styleId: 'none', fontSize: 64, color: '#7C2D12', y: 340 }),
    ],
  },
  {
    id: 'tt-quote',
    nameEn: 'TikTok Bold Quote',
    nameZh: '抖音金句语录',
    platform: 'tiktok',
    platformKey: 'platformTiktok',
    bgColor: '#1F2937',
    ratio: 'douyin',
    layers: [
      tplLayer({ text: '成年人的世界\n没有容易二字', styleId: 'black-quote', fontSize: 130, color: '#FFD700', fontFamily: 'LXGW WenKai Screen' }),
    ],
  },
  {
    id: 'tt-purple',
    nameEn: 'TikTok Pop Purple',
    nameZh: '抖音潮流紫',
    platform: 'tiktok',
    platformKey: 'platformTiktok',
    bgColor: '#2E1065',
    ratio: 'douyin',
    layers: [
      tplLayer({ text: '热门舞蹈挑战', styleId: 'purple-yellow', fontSize: 150, color: '#ffffff', y: -60 }),
      tplLayer({ text: '#全网都在跳', styleId: 'none', fontSize: 70, color: '#FFD700', y: 300 }),
    ],
  },
  {
    id: 'tt-challenge',
    nameEn: 'TikTok Challenge Red',
    nameZh: '抖音挑战赛',
    platform: 'tiktok',
    platformKey: 'platformTiktok',
    bgColor: '#0A0A0A',
    ratio: 'douyin',
    layers: [
      tplLayer({ text: '全网挑战赛\n正式开启', styleId: 'red-emphasis-subtitle', fontSize: 150, color: '#FF1A1A', strokeWidth: 8, strokeColor: '#000000', y: -140 }),
      tplLayer({ text: '赢万元大奖', styleId: 'underline', fontSize: 80, color: '#ffffff', y: 330 }),
    ],
  },

  // ---- 视频号 (1080x1260) ----
  {
    id: 'sph-news',
    nameEn: 'WeChannels News',
    nameZh: '视频号新闻金标',
    platform: 'wechat',
    platformKey: 'platformWechat',
    bgColor: '#101828',
    ratio: 'shipinhao',
    layers: [
      tplLayer({ text: '今日热点速览', styleId: 'gold-news-title', fontSize: 130, color: '#FFD700', y: -60 }),
      tplLayer({ text: '三分钟看懂大事', styleId: 'none', fontSize: 64, color: '#ffffff', y: 230 }),
    ],
  },
  {
    id: 'sph-life',
    nameEn: 'WeChannels Life',
    nameZh: '视频号生活暖调',
    platform: 'wechat',
    platformKey: 'platformWechat',
    bgColor: '#065F46',
    ratio: 'shipinhao',
    layers: [
      tplLayer({ text: '「 慢生活日记 」', styleId: 'brackets', fontSize: 120, color: '#FEF3C7', fontFamily: 'LXGW WenKai Screen', y: -60 }),
      tplLayer({ text: '每天一个治愈瞬间', styleId: 'underline', fontSize: 60, color: '#A7F3D0', y: 200 }),
    ],
  },

  // ---- 小红书 (1080x1440) ----
  {
    id: 'xhs-fresh',
    nameEn: 'RED Fresh Pink',
    nameZh: '小红书清新粉',
    platform: 'xhs',
    platformKey: 'platformXhs',
    bgColor: '#FCE7F3',
    ratio: 'xiaohongshu',
    layers: [
      tplLayer({ text: '春日穿搭分享', styleId: 'underline', fontSize: 130, color: '#9D174D', fontFamily: 'LXGW WenKai Screen', fontWeight: 'normal', y: -60 }),
      tplLayer({ text: '显瘦又高级', styleId: 'none', fontSize: 64, color: '#BE185D', y: 220, fontWeight: 'normal' }),
    ],
  },
  {
    id: 'xhs-note',
    nameEn: 'RED Note Cream',
    nameZh: '小红书奶油笔记',
    platform: 'xhs',
    platformKey: 'platformXhs',
    bgColor: '#FEF3C7',
    ratio: 'xiaohongshu',
    layers: [
      tplLayer({ text: '保姆级教程\n干货收藏', styleId: 'black-quote', fontSize: 120, color: '#F59E0B', y: -100 }),
      tplLayer({ text: '建议先收藏再看', styleId: 'none', fontSize: 60, color: '#78350F', y: 280, fontWeight: 'normal' }),
    ],
  },
];
