export const profile = {
  name: 'Shroud',
  title: 'Shroud — AI 应用开发者',
  headline: "Hi, I'm Shroud",
  tagline: '专注于 AI 应用开发，把想法变成可运行、可迭代、可展示的产品原型。',
  email: 'shroudmail233@Gmail.com',
  github: 'https://github.com/shroudpro',
} as const;

export const aboutText = '我是一名关注 AI 智能应用开发的开发者，喜欢把抽象想法拆解为清晰的用户流程和可运行原型。从 Agent 工作流、前端交互到本地工具，我重视需求、实现、验证与展示的完整过程，让每一个想法都能逐步落地。';

export const services = [
  { name: 'AI 应用与 Agent 工作流', description: '把 LLM、图像生成与视觉识别接入具体的产品流程，组织输入、生成、审核与状态反馈。' },
  { name: '前端工程与交互', description: '使用 Vue、React 构建清晰、稳定的交互页面，围绕用户任务组织信息、页面流程与反馈。' },
  { name: '本地工具与工程自动化', description: '将命令行工具和模型服务封装为可调用流程，连接 MCP、工程文件、任务状态与结果。' },
  { name: '产品拆解与 MVP 交付', description: '从场景与关键路径拆分需求，以可运行原型、验证记录和技术文档完成项目表达。' },
] as const;

export interface Project {
  id: string;
  featured: boolean;
  number: string;
  name: string;
  category: string;
  status?: string;
  summary: string;
  technologies: string[];
  features: string[];
  images: [string, string, string];
  imageDescriptions: [string, string, string];
  repository?: string;
}

export const projects: Project[] = [
  {
    id: 'wardrobe', featured: true,
    number: '01', name: 'Wardrobe · AI 衣橱', category: '自主开发 / AI 应用', status: '本地原型',
    summary: '将衣物照片识别、裁剪、图像生成与分阶段审核串成完整流程，保存为可编辑、可组合的本地 AI 衣橱。',
    technologies: ['React', 'Vite', 'Node.js', 'Sharp', 'OpenAI', 'DashScope'],
    features: ['三阶段导入审核：识别、衣物净图与上身效果图。', '编辑衣物信息，组合穿搭并生成搭配效果。', '本地保存图片与数据，支持任务恢复和 PWA 缓存。'],
    images: ['/visuals/wardrobe-flow.svg', '/visuals/wardrobe-library.svg', '/visuals/wardrobe-cover.svg'],
    imageDescriptions: ['Wardrobe 的照片导入与审核流程示意', 'Wardrobe 衣橱整理与自由搭配功能示意', '为 Wardrobe 绘制的衣物与 AI 工作流主题视觉'],
  },
  {
    id: 'mathematical-modeling-ai-template', featured: true,
    number: '02', name: '数学建模 AI 工作流', category: '工作流与交付模板', status: '模板与示例阶段',
    summary: '把赛题读取、求解计划、分题分析、Python 数据处理与 LaTeX 论文编译组织成可复用流程，让求解与表达有清晰的交付路径。',
    technologies: ['Python', 'Markdown', 'LaTeX', 'XeLaTeX', 'AI Skills'],
    features: ['按问题组织求解计划、分析脚本和论文章节。', '串联赛题、CSV 数据与论文骨架。', '规范数据检查和编译步骤；当前示例尚未完成模型与结论。'],
    images: ['/visuals/modeling-flow.svg', '/visuals/modeling-data.svg', '/visuals/modeling-cover.svg'],
    imageDescriptions: ['数学建模的赛题、数据与求解计划示意', '为数据分析工作流绘制的概念视觉，非模型结果', '从数据处理到论文交付的工作流主题视觉'],
  },
  {
    id: 'quartus-mcp', featured: true,
    number: '03', name: 'Quartus MCP', category: 'MCP / 工程自动化', status: 'Alpha',
    summary: '把 Quartus 工程创建、VHDL 文件生成、VWF 仿真和报告汇总封装为 AI 可调用的本地工具，连接自然语言任务与 FPGA 实验流程。',
    technologies: ['Python', 'MCP', 'Quartus II', 'VHDL', 'Windows'],
    features: ['通过 stdio JSON-RPC 接入 Codex 与 Claude Code。', '生成示例工程、VHDL 文件与波形模板。', '调用 Quartus CLI 并汇总结果；开发板与真实编译验证仍待补充。'],
    images: ['/visuals/quartus-flow.svg', '/visuals/quartus-wave.svg', '/visuals/quartus-cover.svg'],
    imageDescriptions: ['Quartus MCP 的 AI 工具调用与工程文件流程示意', '为 VWF 仿真流程绘制的数字波形示意，非实际验证结果', '为 Quartus MCP 绘制的芯片与工程自动化主题视觉'],
    repository: 'https://github.com/shroudpro/Quartus-MCP',
  },
  {
    id: 'talk-kids', featured: false,
    number: '04', name: 'Talk Kids', category: 'AI 语音 / 桌面应用', status: '本地 MVP',
    summary: '面向儿童的 Windows 本地英语口语陪练应用，把录音、英文语音识别、AI 对话与语音回复串成一条清晰的练习流程。',
    technologies: ['Electron', 'React', 'TypeScript', 'FastAPI', 'faster-whisper', 'Ollama', 'KittenTTS', 'ONNX Runtime'],
    features: ['连接录音、语音识别、AI 对话与语音合成。', '在 Electron 桌面应用中编排本地语音服务，处理 Windows 音频与配置。', '已有应用与安装包构建记录；真实麦克风、扬声器及完整语音链路仍需设备级验收。'],
    images: ['/visuals/talk-kids-flow.svg', '/visuals/talk-kids-dialogue.svg', '/visuals/talk-kids-cover.svg'],
    imageDescriptions: ['Talk Kids 的录音、识别、对话与语音回复流程示意', '儿童英语口语练习的对话与声音主题示意', '为 Talk Kids 绘制的麦克风与本地语音主题视觉'],
  },
  {
    id: 'contract-ai', featured: false,
    number: '05', name: 'ContractAI · 合同智审', category: 'AI 合同审核', status: '可演示 MVP',
    summary: '面向合同审核场景，将合同上传、AI 风险分级、证据高亮、人工复核与报告生成组织成可追踪的工作台流程。',
    technologies: ['React', 'TypeScript', 'FastAPI', 'SQLAlchemy', 'LangGraph', 'DeepSeek Chat', 'SQLite', 'SSE'],
    features: ['从合同上传与解析开始，输出风险分级及对应证据。', '通过人工复核、高亮与报告流程整理审核结果。', '扫描件 OCR、生产级队列与数据库、企业认证及正式 PDF 排版仍待完成。'],
    images: ['/visuals/contract-ai-flow.svg', '/visuals/contract-ai-review.svg', '/visuals/contract-ai-cover.svg'],
    imageDescriptions: ['ContractAI 的合同解析、风险分级与复核流程示意', '合同风险证据与人工审核的概念视觉，非真实合同内容', '为 ContractAI 绘制的文档与审核主题视觉'],
  },
  {
    id: 'coolearn', featured: false,
    number: '06', name: 'Coolearn 智能学习平台', category: 'AI 学习 / 前端应用',
    summary: '面向中文 AI 应用开发学习，将知识图谱、课程、练习、薄弱点诊断与复习连接为浏览器端的学习体验。',
    technologies: ['React', 'React Router', 'Vite', 'Tailwind CSS', 'React Flow', 'Recharts', 'localStorage'],
    features: ['通过知识图谱和课程组织 AI 应用开发的学习路径。', '串联题库练习、学习进度、薄弱点分析与复习。', '使用浏览器本地存储；线上部署与实际学习效果尚无可验证记录。'],
    images: ['/visuals/coolearn-flow.svg', '/visuals/coolearn-map.svg', '/visuals/coolearn-cover.svg'],
    imageDescriptions: ['Coolearn 的课程、练习与复习路径示意', '为 AI 应用开发学习绘制的知识图谱概念视觉', '为 Coolearn 绘制的知识节点与学习主题视觉'],
    repository: 'https://github.com/shroudpro/Coolearn',
  },
  {
    id: 'ai-ppt-generator', featured: false,
    number: '07', name: 'AI PPT Generator', category: 'AI 演示文稿生成',
    summary: '面向论文和文档的 AI 演示文稿生成系统，连接内容解析、页面规划与可编辑 PPTX 输出。',
    technologies: [],
    features: ['解析论文与文档内容。', '规划演示文稿页面。', '输出可编辑的 PPTX 文件。'],
    images: ['/visuals/ai-ppt-flow.svg', '/visuals/ai-ppt-slides.svg', '/visuals/ai-ppt-cover.svg'],
    imageDescriptions: ['AI PPT Generator 的文档解析、页面规划与输出流程示意', '可编辑演示文稿页面的概念视觉', '为 AI PPT Generator 绘制的文档与幻灯片主题视觉'],
  },
  {
    id: 'study-monitor', featured: false,
    number: '08', name: 'Study Monitor', category: '视觉检测 / 本地 AI', status: '原型',
    summary: '基于摄像头、YOLO 检测与本地 LLM 解释的学习状态分析原型，将视觉观察与状态说明连接起来。',
    technologies: ['YOLO', '本地 LLM'],
    features: ['从摄像头输入中进行 YOLO 检测。', '结合本地 LLM 解释学习状态。'],
    images: ['/visuals/study-monitor-flow.svg', '/visuals/study-monitor-view.svg', '/visuals/study-monitor-cover.svg'],
    imageDescriptions: ['Study Monitor 的摄像头、视觉检测与解释流程示意', '学习状态观察的概念画面，非真实检测结果', '为 Study Monitor 绘制的摄像头与视觉分析主题视觉'],
  },
  {
    id: 'cultural-ai-creation-platform', featured: false,
    number: '09', name: '纹生万象—传统文化设计平台', category: 'AI 创作 / 文化设计',
    summary: '结合汉字文化解析与文生图能力，生成海报和文创视觉方案，让文化概念成为设计表达的起点。',
    technologies: [],
    features: ['解析汉字中的文化意涵。', '结合文生图能力生成海报与文创视觉方案。'],
    images: ['/visuals/cultural-flow.svg', '/visuals/cultural-poster.svg', '/visuals/cultural-cover.svg'],
    imageDescriptions: ['纹生万象的汉字解析、文生图与设计输出流程示意', '传统文化与海报排版主题示意，非项目实际生成结果', '为纹生万象绘制的汉字与文创设计主题视觉'],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
const projectPreviews = featuredProjects.flatMap((project) => project.images.map((src, index) => ({ name: project.name, src, description: project.imageDescriptions[index] })));
// Keep the original gallery rhythm with this portfolio's project visuals.
export const previews = Array.from({ length: 21 }, (_, index) => projectPreviews[index % projectPreviews.length]);
