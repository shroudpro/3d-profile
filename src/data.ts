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
  number: string;
  name: string;
  category: string;
  status: string;
  summary: string;
  technologies: string[];
  features: string[];
  images: [string, string, string];
  imageDescriptions: [string, string, string];
  repository?: string;
}

export const projects: Project[] = [
  {
    number: '01', name: 'Wardrobe · AI 衣橱', category: '自主开发 / AI 应用', status: '本地原型',
    summary: '将衣物照片识别、裁剪、图像生成与分阶段审核串成完整流程，保存为可编辑、可组合的本地 AI 衣橱。',
    technologies: ['React', 'Vite', 'Node.js', 'Sharp', 'OpenAI', 'DashScope'],
    features: ['三阶段导入审核：识别、衣物净图与上身效果图。', '编辑衣物信息，组合穿搭并生成搭配效果。', '本地保存图片与数据，支持任务恢复和 PWA 缓存。'],
    images: ['/visuals/wardrobe-flow.svg', '/visuals/wardrobe-library.svg', '/visuals/wardrobe-cover.svg'],
    imageDescriptions: ['Wardrobe 的照片导入与审核流程示意', 'Wardrobe 衣橱整理与自由搭配功能示意', '为 Wardrobe 绘制的衣物与 AI 工作流主题视觉'],
  },
  {
    number: '02', name: '数学建模 AI 工作流', category: '工作流与交付模板', status: '模板与示例阶段',
    summary: '把赛题读取、求解计划、分题分析、Python 数据处理与 LaTeX 论文编译组织成可复用流程，让求解与表达有清晰的交付路径。',
    technologies: ['Python', 'Markdown', 'LaTeX', 'XeLaTeX', 'AI Skills'],
    features: ['按问题组织求解计划、分析脚本和论文章节。', '串联赛题、CSV 数据与论文骨架。', '规范数据检查和编译步骤；当前示例尚未完成模型与结论。'],
    images: ['/visuals/modeling-flow.svg', '/visuals/modeling-data.svg', '/visuals/modeling-cover.svg'],
    imageDescriptions: ['数学建模的赛题、数据与求解计划示意', '为数据分析工作流绘制的概念视觉，非模型结果', '从数据处理到论文交付的工作流主题视觉'],
  },
  {
    number: '03', name: 'Quartus MCP', category: 'MCP / 工程自动化', status: 'Alpha',
    summary: '把 Quartus 工程创建、VHDL 文件生成、VWF 仿真和报告汇总封装为 AI 可调用的本地工具，连接自然语言任务与 FPGA 实验流程。',
    technologies: ['Python', 'MCP', 'Quartus II', 'VHDL', 'Windows'],
    features: ['通过 stdio JSON-RPC 接入 Codex 与 Claude Code。', '生成示例工程、VHDL 文件与波形模板。', '调用 Quartus CLI 并汇总结果；开发板与真实编译验证仍待补充。'],
    images: ['/visuals/quartus-flow.svg', '/visuals/quartus-wave.svg', '/visuals/quartus-cover.svg'],
    imageDescriptions: ['Quartus MCP 的 AI 工具调用与工程文件流程示意', '为 VWF 仿真流程绘制的数字波形示意，非实际验证结果', '为 Quartus MCP 绘制的芯片与工程自动化主题视觉'],
    repository: 'https://github.com/shroudpro/Quartus-MCP',
  },
];

const projectPreviews = projects.flatMap((project) => project.images.map((src, index) => ({ name: project.name, src, description: project.imageDescriptions[index] })));
// Keep the original gallery rhythm with this portfolio's project visuals.
export const previews = Array.from({ length: 21 }, (_, index) => projectPreviews[index % projectPreviews.length]);
