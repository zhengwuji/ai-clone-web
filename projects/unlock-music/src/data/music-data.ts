export interface SupportedPlatform {
  name: string;
  badge: string;
  color: string;
  iconName: string;
  formats: string[];
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface DecryptedFileItem {
  id: string;
  name: string;
  sourceFormat: string;
  targetFormat: "MP3" | "FLAC" | "OGG" | "WAV";
  size: string;
  title: string;
  artist: string;
  album: string;
  status: "ready" | "processing" | "completed" | "error";
  progress: number;
}

export const SITE_CONFIG = {
  name: "音乐解锁",
  englishName: "Unlock Music",
  tagline: "在浏览器中解锁加密音乐文件",
  subTagline: "所有解密计算均在本地浏览器中完成，不会上传任何数据至云端服务器，安全极速。",
  announcement: "📢 提示：本工具支持主流音乐平台离线缓存文件的本地格式转换与 ID3 标签修复。",
  githubUrl: "https://github.com/ix64/unlock-music",
  version: "v1.12.0",
};

export const SUPPORTED_PLATFORMS: SupportedPlatform[] = [
  {
    name: "QQ 音乐",
    badge: "Tencent",
    color: "#16b267",
    iconName: "music",
    formats: [".qmc0", ".qmc2", ".qmc3", ".qmcflac", ".qmcogg", ".tkm", ".bkcmp3", ".bkcflac", ".mflac", ".mgg", ".tm0", ".tm2", ".tm3", ".tm6"],
    description: "全面支持 QMC 系列、MFLAC/MGG 新版算法及手机端临时缓存格式",
  },
  {
    name: "网易云音乐",
    badge: "NetEase",
    color: "#e60026",
    iconName: "disc",
    formats: [".ncm"],
    description: "支持 NCM 加密容器解密，自动还原原始 MP3/FLAC 音质并修复 ID3 元数据与内嵌专辑封面",
  },
  {
    name: "酷狗音乐",
    badge: "KuGou",
    color: "#00a1d6",
    iconName: "radio",
    formats: [".kgm", ".vpr"],
    description: "支持桌面端 KGM 格式解密及手机端 VPR 缓存文件转换",
  },
  {
    name: "酷我音乐",
    badge: "KuWo",
    color: "#ff8c00",
    iconName: "headphones",
    formats: [".kwm"],
    description: "支持 KWM 专属格式解密为无损 FLAC 或标准 MP3",
  },
  {
    name: "虾米音乐",
    badge: "Xiami",
    color: "#fa6400",
    iconName: "volume-2",
    formats: [".xm"],
    description: "支持已下线平台的历史加密文件解密",
  },
  {
    name: "咪咕音乐",
    badge: "Migu",
    color: "#ff007f",
    iconName: "mic",
    formats: [".mg3d"],
    description: "支持咪咕音乐特有格式本地解析转换",
  },
  {
    name: "喜马拉雅",
    badge: "Ximalaya",
    color: "#f04142",
    iconName: "book-open",
    formats: [".ximalaya", ".xm"],
    description: "支持音频节目、有声书及 VIP 专栏格式转换",
  },
  {
    name: "通用音质补全",
    badge: "Universal",
    color: "#6b7280",
    iconName: "sliders",
    formats: [".ogg", ".aac", ".m4a", ".wav", ".mp3"],
    description: "自动修复缺失 ID3 歌名/歌手、重构标准音频头与封面数据",
  },
];

export const FAQ_LIST: FAQItem[] = [
  {
    question: "解密过程是否会消耗网络流量或泄露我的音频文件？",
    answer: "绝对不会。整个解密过程 100% 在你的浏览器本地前端（利用 Web Workers 和本地 JavaScript 算法）运行，没有任何音频字节会被上传到任何服务器，断网状态下也能正常使用。",
  },
  {
    question: "为什么有些 FLAC 解密后格式显示为 MP3？",
    answer: "部分音乐平台在客户端缓存高品质或标准音质时，即使扩展名为 .mflac 或 .qmcflac，其音频内核编码本质上仍是 MP3 音频流。解密程序会自动探测文件真实的音频容器流并还原为最真实的编码，绝不虚假转码。",
  },
  {
    question: "移动端（手机/平板）浏览器是否支持？",
    answer: "完全支持。iOS Safari、Android Chrome、Edge、微信内置浏览器等均可使用。在手机端点击文件框可直接调起系统的“文件”管理器选取缓存文件。",
  },
  {
    question: "批量解密时会不会卡顿？",
    answer: "程序默认采用多线程分片并发处理，能最大化利用现代多核 CPU 的算力，即使同时拖入数十首歌曲也能极速完成。",
  },
];

export const DEMO_PRESET_FILES: DecryptedFileItem[] = [
  {
    id: "demo-1",
    name: "周杰伦 - 晴天.qmcflac",
    sourceFormat: "QMCFLAC",
    targetFormat: "FLAC",
    size: "32.4 MB",
    title: "晴天",
    artist: "周杰伦",
    album: "叶惠美",
    status: "completed",
    progress: 100,
  },
  {
    id: "demo-2",
    name: "陈奕迅 - 富士山下.ncm",
    sourceFormat: "NCM",
    targetFormat: "FLAC",
    size: "28.1 MB",
    title: "富士山下",
    artist: "陈奕迅",
    album: "What's Going On...?",
    status: "completed",
    progress: 100,
  },
  {
    id: "demo-3",
    name: "林俊杰 - 江南.kgm",
    sourceFormat: "KGM",
    targetFormat: "MP3",
    size: "10.2 MB",
    title: "江南",
    artist: "林俊杰",
    album: "第二天堂",
    status: "completed",
    progress: 100,
  },
];
