export const site = {
  title: '个人主页',
  description: '全栈开发者 & AI 应用创作者。专注于构建优雅、高性能的数字产品。',
  author: '',
  email: '94711123@qq.com',
  github: 'https://github.com/zhengzhouming1984',
}

export const navLinks = [
  { label: '关于', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '博客', href: '#blog' },
]

export const skills = [
  'Vue.js', 'React', 'Python', 'TypeScript',
  'LLM', 'Stable Diffusion', 'TTS',
  'Docker', 'Linux', '全栈工程',
]

export const blogPosts = [
  { title: '从零搭建个人 AI 语音助手', date: '2026-05', url: '#', summary: '基于 Whisper + ChatTTS 打造本地语音交互系统' },
  { title: 'Vue3 + Vite 极简开发实践', date: '2026-04', url: '#', summary: '从项目初始化到部署上线的完整工作流' },
  { title: 'macOS 自动化：效率提升指南', date: '2026-03', url: '#', summary: 'AppleScript、Shortcut 与 CLI 工具的组合拳' },
  { title: '本地 LLM 部署与调优笔记', date: '2026-02', url: '#', summary: 'Ollama + vLLM 本地大模型部署经验总结' },
]

export const workExperience = [
  { company: '某科技公司', role: '前端开发工程师', period: '2023 - 至今', description: '负责AI产品前端架构设计和开发，主导Vue3组件库搭建与性能优化' },
  { company: '某互联网企业', role: '全栈开发工程师', period: '2021 - 2023', description: '参与电商平台前后端开发，负责订单系统模块设计与实现' },
  { company: '某初创工作室', role: 'Python后端开发', period: '2019 - 2021', description: '负责数据处理流水线与API服务开发，参与LLM应用原型验证' },
]

export const education = [
  { school: 'XX大学', degree: '计算机科学 本科', period: '2015 - 2019' },
  { school: '在线自学', degree: '深度学习专项课程', period: '2022 - 2023' },
]

export const featuredProjects = [
  {
    name: '词根词缀学习台',
    description: '基于词根词缀拆解的英语单词学习工具，支持每日学习、复习打卡、生词本，PWA 离线可用。',
    demo: 'https://zhengzhouming1984.github.io/vocab-workbench/',
    source: 'https://github.com/zhengzhouming1984/vocab-workbench',
    tags: ['HTML', 'PWA', '教育'],
    icon: 'book',
    color: '#52 211 153',
  },
  {
    name: '恐龙跑酷',
    description: '像素风跑酷小游戏，支持二段跳、滑铲、难度选择、皮肤切换、道具系统和生命值。',
    demo: 'https://zhengzhouming1984.github.io/games/dino.html',
    source: 'https://github.com/zhengzhouming1984/games',
    tags: ['HTML', 'Canvas', '游戏'],
    icon: 'dino',
    color: '#251 146 60',
  },
  {
    name: '霓虹打砖块',
    description: '霓虹风格打砖块游戏，3 条命机制，含爆炸特效、闪白反馈和 LIFE LOST 提示。',
    demo: 'https://zhengzhouming1984.github.io/games/breakout.html',
    source: 'https://github.com/zhengzhouming1984/games',
    tags: ['HTML', 'Canvas', '游戏'],
    icon: 'blocks',
    color: '#168 85 247',
  },
  {
    name: '霓虹猎手',
    description: '霓虹风格射击游戏，操控战机消灭敌人，炫酷视觉效果。',
    demo: 'https://zhengzhouming1984.github.io/games/shooter.html',
    source: 'https://github.com/zhengzhouming1984/games',
    tags: ['HTML', 'Canvas', '游戏'],
    icon: 'shooter',
    color: '#236 72 153',
  },
]
