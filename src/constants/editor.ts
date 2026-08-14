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
