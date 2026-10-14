# 个人网站改版素材清单

> 本文只整理文字资料。内容依据当前仓库中的 README、页面数据、已发布 Markdown 和项目经历素材；外部网址没有联网核验。标为“原站自述”的内容表示源文件这样写，不等于独立验证。建议文案仅重组已有事实，不补写履历。

## 1. 原网站概况与个人身份

- **原项目名称：** Shroud Portfolio。`package.json` 的包名为 `personal-portfolio`。
- **项目根目录：** `E:\Vibe-coding\PersonalWebsite`
- **原站地址：** [https://shroud-personal-portfolio.netlify.app](https://shroud-personal-portfolio.netlify.app)。README 将它列为线上访问地址；本次未确认当前部署状态。
- **站点性质：** 静态个人博客与作品集，展示简介、项目、经历、成就和成长记录。内容从本地 Markdown / TypeScript 读取。
- **展示名：** `Shroud`，用于首页姓名、侧栏和版权行。它是否是昵称、笔名或最终对外署名，待本人确认。
- **中文名 / 法定姓名：** 未找到。
- **英文名：** 未找到独立英文姓名；`Shroud` 是当前展示名，不能据此认定为英文名。
- **身份定位：** 原站自述为关注 AI 智能应用开发的开发者，重点是把想法变成可运行的 MVP、前端交互和项目展示系统。未找到正式雇主、职位或职业年限。
- **个人品牌名称：** 页面使用 `Shroud`；未找到独立于该署名的品牌名称。
- **个人标语：** `I build AI ideas into working systems.`（原站 Hero 标题）。另有装饰文字 `Simplicity is the ultimate sophistication.` 和 `Keep building, keep learning.`，没有证据显示它们是正式品牌标语。
- **主要语言：** 中文为主。`index.html` 标记 `zh-CN`；界面可在中文、英文之间切换，默认中文。项目和经历正文主要为中文，少量标题、技术名和类别为英文；正文没有自动翻译。
- **所在地 / 机构 / 状态：** 原站资料写有 `China/Beijing`、`BUPT在读,欢迎交流合作`。只找到 BUPT 缩写，未找到院系、专业、学位、入学时间或当前职位；这些资料的准确性和公开范围待本人确认。
- **定位边界：** 原站资料没有把本人描述为 3D 创作者，也没有 3D 创作经历；不应加入这一身份。

**主要来源：** `README.md`（项目说明、网站入口）；`package.json`（包名）；`index.html`（语言、站点标题和 SEO 摘要）；`src/data/profile.ts`（姓名、身份、简介、所在地、联系方式和能力）；`src/i18n/messages.ts`、`src/composables/use-locale.ts`（语言切换与默认中文）；`src/components/sections/HeroSection.vue`、`src/components/layout/SidebarNav.vue`（展示位置）。

## 2. 首屏文案

### 原站已有文案

- **展示名：** Shroud
- **标题：** `I build AI ideas into working systems.`
- **中文身份介绍：** “我是一名关注 AI 智能应用开发的开发者，擅长将想法拆解为可运行的 MVP、前端交互页面和项目展示系统，用AI赋能应用开发。”
- **Hero 按钮：** 中文“查看作品” / 英文“View My Work”，跳转首页 `#projects`，不是联系按钮。
- **联系按钮：** Hero 当前没有联系按钮；About 中的“了解更多 / More About Me”跳到 `#experience`。
- **辅助文字：** `Simplicity is the ultimate sophistication.`（Hero）

**来源：** `src/data/profile.ts`（`name`、`headline`、`heroIntro`、`handwritten.hero`）；`src/components/sections/HeroSection.vue`（按钮和跳转）；`src/i18n/messages.ts`（按钮中英文）。

### 建议文案

- **推荐展示名：** Shroud（沿用现有公开署名；确认是否继续使用后再定稿）。
- **简短介绍：** “专注于 AI 应用开发，把想法拆解为可运行、可迭代、可展示的产品原型。”
- **身份关键词（最多 5 个）：** AI 应用开发、Agent 与 LLM 工作流、前端工程、MCP 工具开发、MVP 项目交付。
- **建议联系按钮文字：** “邮件联系”，目标使用已公开的 `mailto:` 邮箱；当前网站没有这个 Hero 联系入口。

以上建议概括了 `profile.ts` 的自我介绍和已发布项目涉及的工作，不表示本人提供商业服务，也没有补入新的工作经历或年限。

## 3. 关于我

### 原站个人简介全文

> 目前专注于AI智能应用开发，擅长用AI赋能各种领域，熟练使用并开发Agent应用，喜欢将抽象的想法落地，转化为可迭代、可展示、可运行的产品
>
> 相比只写功能，我更关注项目的完整表达：用户场景、页面流程、技术架构、核心亮点和最终展示效果。

来源：`src/data/profile.ts` 的 `aboutIntro`；由 `src/components/sections/AboutSection.vue` 展示。

### 教育、工作与研究经历

- 原站状态字段写有 **BUPT 在读**，但没有专业、院系、学位、起止时间或毕业时间；不是可直接补齐的完整教育经历。
- `src/content/experiences/2026-03-competition-review.md` 记载了 2026-03 的“大模型安全论文开发”：角色为 `Project Builder`，分类原文为 `Acdemic`；内容涉及导师指导下的论文调研、创新点打磨、实验设计，以及 PCP（Private Contrastive Prompting）构想和初步 pipeline。源文没有论文发表、录用或正式研究成果记录，不能表述为已发表论文。
- 工作经历 / 雇主：未找到。
- 经验年限：未找到可核实年数；不要写“五年经验”等数字。
- 奖项：未找到奖项名称、获奖时间或证书链接。2026-03 经历正文提及 `500 RMB` 科研补助，它不是奖项；若要公开金额需本人确认。
- 原站 `src/data/achievements.ts` 显示 `10+ Project Iterations`，但没有提供计数口径或逐项佐证。可以作为“原站现有展示”记录，不建议当作已核实成果直接沿用。其他成就描述是概括性标签，不是具体奖项。
- 简历 / CV：资料中没有已启用的简历下载地址；`src/data/profile.ts` 将 Resume 标为“简历待补充”且禁用。

### 关于我建议稿

> 我是一名关注 AI 智能应用开发的开发者，喜欢把抽象想法拆解为清晰的用户流程和可运行原型。已有项目涉及 AI 工作流、本地应用、MCP 工具与前端页面，也关注模型接入后的审核、恢复和异常处理。我重视从需求与使用场景出发，逐步完成实现、验证和展示。更完整的教育、工作经历和研究成果仍待补充。

这段建议根据原站简介、能力描述和已发布项目整理；没有把 BUPT、研究经历或未确认的项目分工写成确定的个人履历。

## 4. 能力、服务或研究方向

原站没有明确的商业服务、报价或客户案例。以下按技术专长和项目能力组织，共 4 项。

| 名称 | 原始描述 | 建议描述 | 项目或经历依据 / 来源 |
|---|---|---|---|
| AI 应用与 Agent 工作流 | “将 LLM、生图 API、视觉识别等能力接入具体产品流程。” | 把模型能力放入明确的用户流程，并处理输入、生成、审核、状态反馈等环节。 | `src/data/profile.ts` 的 `AI Application`；Wardrobe、ContractAI、Talk Kids 项目说明（`src/content/projects/wardrobe.md`、`contract-ai.md`、`talk-kids.md`）。 |
| 前端工程 | “使用 Vue / React 构建清晰、稳定、可维护的前端页面。” | 使用项目中已有的 Vue、React 技术栈构建交互页面，并围绕用户任务组织信息和页面流程。 | `src/data/profile.ts` 的 `Frontend Engineering`；Coolearn、Talk Kids、当前 Vue 作品集项目（`src/content/projects/coolearn.md`、`talk-kids.md`）。 |
| 本地工具与工程自动化 | 原站没有独立同名能力条目；项目经历包括 Python MCP server、Quartus CLI、VHDL/VWF 文件生成与本地 AI 语音服务整合。 | 将本地命令行工具或模型服务封装成可调用流程，并整理输入、状态和结果。 | `src/content/projects/quartus-mcp.md` 的 `Core Features`、`Tech Stack`；`src/content/experiences/2026-04-talk-kids.md`。 |
| 产品拆解与 MVP 交付 | “从需求、用户、场景和展示效果反推项目结构。”；“在有限时间内完成可运行原型、技术文档和答辩材料。” | 从场景和关键路径开始拆分任务，再以原型、验证记录和文档逐步交付。 | `src/data/profile.ts` 的 `Product Thinking`、`Rapid MVP`；`src/content/experiences/2026-04-frontend-refactor.md`、`2026-05-codex-iteration-workflow.md`。 |

来源位置均为上述 TypeScript 数据字段、项目 Markdown 的 `## Core Features` / `## Tech Stack`，或经历 Markdown 的 `## 记录`。这些是原站自我描述和项目记录，不是客户服务承诺。

## 5. 精选项目与作品

以下前三项是原站目前标记为 `featured: true` 的项目。项目类别沿用 Markdown 的 `type` 字段；源文件没有证明它们属于客户委托或正式雇佣项目，因此不额外贴上客户项目、获奖项目等标签。项目角色按原站自述列出，并在存在归属疑问时单独说明。

### 5.1 首页精选

#### A. Wardrobe｜本地优先 AI 衣橱

- **原始名称：** Wardrobe｜本地优先 AI 衣橱；英文名称 `Wardrobe`。
- **项目类别：** 原站 `AI 应用 / 本地优先 Web 应用`；项目状态为本地可运行原型。个人 / 团队归属待确认。
- **时间：** 原站写 `2026-07 — 2026-08`；准确起止时间待确认。
- **项目简介原文：** “将衣物照片识别、生成、审核并整理为可编辑、可组合的本地 AI 衣橱。”
- **原站 Overview：** “Wardrobe 是一个本地优先的 AI 衣橱应用：从照片中识别衣物，经过裁剪、衣物净图和上身效果图审核后保存到本地衣橱，并支持编辑元数据和组合穿搭。项目已形成可本地运行的原型，正式线上部署仍需独立后端、持久化和密钥管理。”
- **卡片建议文案：** 把衣物识别、图像生成审核和本地衣橱管理串成可恢复的穿搭工作流；目前为本地原型。
- **原站自述角色：** “AI 图像工作流与本地应用开发”，覆盖导入审核、图片处理、图像 provider、穿搭服务、任务恢复和测试。
- **技术 / 方法：** React 19、Vite 6、Node.js + Sharp、OpenAI Responses / Images API、DashScope Images API；本地 JSON / PNG 存储、分阶段人工审核和可恢复任务。
- **原站记录的结果：** 文档和测试记录提到衣橱画廊、三阶段导入审核、上身效果图、自由搭配、PWA 缓存与本地文件流程；原站写 `npm test` 通过 16 项测试。正式部署、全浏览器回归和真实样本质量评估仍待完成。
- **链接：** [GitHub 仓库](https://github.com/tandpfun/wardrobe)（源文件中配置；是否仍可访问及本人贡献范围待确认）；未配置 Demo。根据原站路由可组合出详情地址 `https://shroud-personal-portfolio.netlify.app/project/wardrobe`，该在线路由未核验。
- **建议按钮：** 归属和链接确认后用“查看源码”；详情页可用“查看项目说明”。
- **来源：** `src/content/projects/wardrobe.md`（frontmatter、`## Overview`、`## My Role`、`## Result`）；`src/content/experiences/2026-07-wardrobe.md`；`素材/experience-materials-2.md`（基本信息、角色待确认说明）。

#### B. 数学建模竞赛求解与论文生成模板

- **原始名称：** 数学建模竞赛求解与论文生成模板；未找到正式英文名。
- **项目类别：** 原站 `AI 工作流模板`。这是模板开发与示例输入，不是已完成的建模竞赛成果。
- **时间：** 原站写 `2026-06`；项目素材指出这是时间线索，实际项目时间待确认。
- **项目简介原文：** “面向数学建模竞赛的赛题读取、分题求解、论文生成与编译流程模板。”
- **原站 Overview：** “这是一个面向数学建模竞赛的 AI 工作流模板，将赛题与数据读取、求解计划、分题分析、Python 数据处理、LaTeX 论文撰写和 PDF 编译组织成可复用流程。当前目录已接入一个零售销售预测题目和数据，但具体模型、指标和论文结论尚未完成。”
- **卡片建议文案：** 为数学建模任务搭建从赛题拆分、数据处理到论文编译的 AI 工作流骨架；当前仍在模板与示例数据阶段。
- **原站自述角色：** “AI 工作流与交付模板设计”，涉及目录结构、求解规范、论文章节拆分和编译检查流程。
- **技术 / 方法：** Markdown、Python 数据分析流程、LaTeX / XeLaTeX、Claude Code Skill；按问题拆分求解计划、脚本与论文章节，并规定数据检查和编译检查步骤。
- **实际结果与边界：** 已有模板目录、工作流规范、题目输入、CSV 数据和论文骨架。源文件说明生成的 PDF 仍有占位内容；没有可引用的模型精度、预测结果、竞赛论文结论或获奖结果。
- **链接：** 没有 GitHub 或 Demo 链接。根据原站路由可组合出详情地址 `https://shroud-personal-portfolio.netlify.app/project/mathematical-modeling-ai-template`，该在线路由未核验。
- **建议按钮：** “查看项目说明”。
- **来源：** `src/content/projects/mathematical-modeling-ai-template.md`（frontmatter、`## Overview`、`## My Role`、`## Result`）；`src/content/experiences/2026-06-mathematical-modeling-template.md`；`素材/experience-materials-4.md`（时间与个人角色待确认说明）。

#### C. Quartus MCP

- **原始名称：** Quartus MCP；未找到其他英文名称。
- **项目类别：** 原站 `MCP 工具服务 / FPGA 工程自动化`；当前阶段为 Alpha。
- **时间：** 原站写 `2026-05`；准确起止日待确认。
- **项目简介原文：** “让 Codex 和 Claude Code 通过 MCP 调用 Quartus，完成示例工程生成、编译、VWF 仿真和报告汇总。”
- **原站 Overview：** “Quartus MCP 是一个面向 Windows、Quartus II 9.1 和 MAX II 实验板场景的本地 MCP server。它把 Quartus 工程创建、VHDL/VWF 文件生成、项目编译、VWF 仿真和结果汇总封装为 AI 工具可调用的接口，减少数电实验中的重复配置。项目当前处于 Alpha 阶段。”
- **卡片建议文案：** 用本地 MCP 工具封装 Quartus 工程生成、编译、VWF 仿真和报告汇总；项目目前处于 Alpha 阶段。
- **原站自述角色：** “Python / MCP 工具开发”，覆盖 stdio JSON-RPC server、Quartus CLI 封装、工程模板、仿真结果处理和接入文档。
- **技术 / 方法：** Python 3.10+、MCP JSON-RPC over stdio、Quartus II 9.1 CLI、VHDL、QPF/QSF/VWF/CVWF；含 16 位计数器示例工程生成和仿真结果汇总。
- **实际结果与边界：** 仓库说明已形成可安装 Python 包、5 个 MCP 工具、工程与波形模板、宿主配置样例和使用文档。没有自动化测试、真实编译日志、线上 Demo 或性能指标，不能宣称真实环境验证或量化收益。
- **链接：** [GitHub 仓库](https://github.com/shroudpro/Quartus-MCP.git)（原站配置；未联网确认当前可访问状态）；未配置 Demo。详情路由：`https://shroud-personal-portfolio.netlify.app/project/quartus-mcp`（按路由组合，线上未核验）。
- **建议按钮：** “查看源码”。
- **来源：** `src/content/projects/quartus-mcp.md`（frontmatter、`## Overview`、`## My Role`、`## Result`）；`src/content/experiences/2026-05-quartus-mcp.md`；`素材/experience-materials-3.md`（个人角色、独立开发与真实 Quartus 验证待确认）。

### 5.2 备选项目

#### D. Talk Kids

- **原始名称：** Talk Kids；未找到更长的英文名。
- **项目类别：** 原站 `Windows 本地儿童英语口语陪练桌面应用`；状态为本地 MVP。
- **时间：** 原站写 `2026-04 — 2026-05`；实际起止时间待确认。
- **项目简介原文：** “一个面向儿童的 Windows 本地英语口语陪练应用，串联录音、语音识别、AI 对话和语音回复。”
- **卡片建议文案：** 将录音、英文语音识别、AI 对话和语音合成整合进 Windows 桌面应用；完整语音链路仍需目标设备验收。
- **原站自述角色：** 桌面应用与本地语音链路开发，包括 Electron 主进程服务编排、渲染交互、Windows 音频适配、配置和打包验证；素材文档仍要求确认准确个人分工。
- **技术：** Electron、React 19 + TypeScript、FastAPI + faster-whisper、Ollama、KittenTTS、ONNX Runtime、Vitest、electron-builder。
- **结果与边界：** 项目进度记录有 39 项测试、应用构建和 Windows 安装包构建通过的记载；真实麦克风、扬声器和完整语音链路仍需设备级验收，没有用户量或线上指标。
- **链接：** [GitHub 仓库](https://github.com/xiaochong/talk-kids)（源文件配置；补充材料称当前公开地址和归属待确认）；无 Demo。详情路由：`https://shroud-personal-portfolio.netlify.app/project/talk-kids`（按路由组合，线上未核验）。
- **建议按钮：** 确认仓库归属后用“查看源码”；否则用“查看项目说明”。
- **来源：** `src/content/projects/talk-kids.md`；`src/content/experiences/2026-04-talk-kids.md`；`素材/experience-materials-1.md`（基本信息、职责与公开地址待确认）。

#### E. ContractAI（合同智审）

- **原始名称：** ContractAI（合同智审）。
- **项目类别：** 原站 `AI 辅助合同审核 Web 应用`；可演示 MVP，尚未达到生产可用或完整验收状态。
- **时间：** 原站写 `2026-06`；素材记录的 Git 提交集中在 2026-06-01 至 2026-06-02，完整开发周期待确认。
- **项目简介原文：** “面向企业法务的合同上传、AI 风险分级、人工复核与报告生成工作台。”
- **卡片建议文案：** 将合同解析、AI 风险分级、人工复核与报告生成串成可追踪的审核 MVP；生产级队列、数据库和认证仍未完成。
- **原站自述角色：** 全栈开发与 AI 工作流集成，覆盖前端工作台、后端 API、数据库模型、LangGraph、LLM 治理、任务队列和测试。补充材料指出署名与个人分工仍需本人确认。
- **技术：** React 18 + TypeScript、FastAPI + SQLAlchemy、LangGraph、DeepSeek Chat、SQLite、SSE；另有 Pydantic、PyPDF2、python-docx、pytest。
- **结果与边界：** 项目记录称上传到报告的主要链路已跑通，含风险证据、高亮和报告流程；2026-06 项目材料记录后端 24 项测试通过、前端构建成功。扫描件 OCR、生产级队列与数据库、企业级认证、多租户和正式 PDF 排版仍未完成。
- **链接：** 原站没有填写 GitHub 或 Demo。详情路由：`https://shroud-personal-portfolio.netlify.app/project/contract-ai`（按路由组合，线上未核验）。
- **建议按钮：** “查看项目说明”；补齐公开仓库或演示后再放外链按钮。
- **来源：** `src/content/projects/contract-ai.md`；`src/content/experiences/2026-06-contract-ai.md`；`素材/experience-materials-5.md`（Git 时间和 `shroudpro` 署名归属待确认）。

#### F. Coolearn 智能学习平台

- **原始名称：** Coolearn 智能学习平台；英文项目名为 `Coolearn`。
- **项目类别：** 原站 `AI 应用开发学习平台`；补充材料称为浏览器端 React 单页应用。线上状态待确认。
- **时间：** 原站 frontmatter 写 `2026-10`；补充材料只确认仓库有一条 2026-07-10 的 `upload` 提交，实际开发起止时间待补充。不得把仓库提交日等同于项目周期。
- **项目简介原文：** “面向中文 AI 应用开发学习的 React 平台，覆盖知识图谱、课程、刷题、薄弱点诊断与复习。”
- **卡片建议文案：** 在浏览器端连接 AI 应用开发知识图谱、课程、练习、薄弱点分析和复习流程；目前没有可验证的线上用户效果。
- **原站自述角色：** React 前端开发，围绕学习页面、课程与题库交互、学习进度和复习模块构建浏览器端体验；补充材料指出单次整体上传不足以确认具体个人贡献。
- **技术：** React 19、React Router 7、Vite 8、Tailwind CSS 3、React Flow、Recharts、浏览器 `localStorage`。
- **结果与边界：** 源码记录 8 个知识领域、464 道静态题目和 169 个有序课程主题。这些是仓库内容数量，不是用户或学习成效数据。面试公司数据链路不完整；线上部署和实际用户效果没有可验证记录。
- **链接：** [GitHub 仓库](https://github.com/shroudpro/Coolearn)（原站配置；补充材料称线上可访问性待确认）；无 Demo。详情路由：`https://shroud-personal-portfolio.netlify.app/project/coolearn`（按路由组合，线上未核验）。
- **建议按钮：** “查看项目说明”或确认仓库可访问后用“查看源码”。
- **来源：** `src/content/projects/coolearn.md`；`src/content/experiences/2026-10-coolearn.md`；`素材/experience-materials-6.md`（提交时间、个人职责和上线状态说明）。

### 5.3 其他已发布项目

这些项目在 `src/content/projects/` 中标为已发布，但不是当前首页精选；这里只列原站已有名称和定位，避免扩写未确认的个人贡献。

- **AI PPT Generator**（2026-05）：原站类别 `AI Web Application`；原简介为面向论文和文档的 AI 演示文稿生成系统，涉及内容解析、页面规划和可编辑 PPTX 输出。未配置 GitHub / Demo。来源：`src/content/projects/ai-ppt-generator.md`。
- **Study Monitor**（2026-04）：原站类别 `Computer Vision System`；原简介为基于摄像头、YOLO 检测和本地 LLM 解释的学习状态分析原型。未配置 GitHub / Demo。来源：`src/content/projects/study-monitor.md`。
- **纹生万象-传统文化设计平台**（2026-04）：原站类别 `AI Creative Product`；原简介为结合汉字文化解析与文生图能力、生成海报和文创视觉方案的平台。未配置 GitHub / Demo。来源：`src/content/projects/cultural-ai-creation-platform.md`。

## 6. 联系方式与其他链接

- **邮箱：** [shroudmail233@Gmail.com](mailto:shroudmail233@Gmail.com)，`src/data/profile.ts` 标为启用。
- **GitHub：** [https://github.com/shroudpro](https://github.com/shroudpro)，`src/data/profile.ts` 标为启用，也是原站侧栏唯一显示的社交账号。
- **LinkedIn、学术主页、其他社交账号：** 未找到。
- **预约 / 联系表单：** 未找到真实表单或预约链接。`profile.ts` 有 `contactNotice` 文本称当前为静态展示表单并建议邮件联系，但 About 页面实际展示的是邮箱、GitHub、状态和所在地；README 也说明没有真实 Contact 表单。
- **简历：** Resume 链接禁用，显示“简历待补充”，没有可用下载 URL。
- **当前原站按钮：** Hero 的“查看作品”跳 `#projects`；About 的“了解更多”跳 `#experience`。均不是联系入口。新首页如需联系按钮，可指向已公开邮箱 `mailto:shroudmail233@Gmail.com`。
- **外链状态：** 页面和 README 中出现的 GitHub / Netlify 地址为仓库内明确配置的字符串；本次没有联网检查可访问性、权限或归属。项目详情页路径根据已存在的 `/project/:id` 路由和项目 ID 组合，不能当作已在线验证的页面链接。

## 7. 待补充与待确认

### 身份与简介

- `Shroud` 是否是希望继续使用的公开笔名 / 昵称；中文名和英文名是否展示。
- BUPT 的具体学校名称、院系、专业、学位和在读状态是否准确、是否公开；`China/Beijing` 是否仍准确。
- 是否有正式职位、雇主、教育时间线或研究方向；当前源文件未提供。
- 大模型安全研究是否有可公开的论文、实验结果或正式产出；现有经历只支持“调研、构思和初步 pipeline”表述。

### 项目时间、贡献与链接

- **Wardrobe：** 原站列出具体的 `My Role`，但 `素材/experience-materials-2.md` 说明提交作者为 `Thijs`，且无法确认当前用户的身份、个人贡献或与提交作者的关系。原站链接账号 `tandpfun` 也不同于个人资料中的 `shroudpro`；发布为个人作品前必须确认本人负责范围和链接归属。
- **数学建模模板：** 原站写 `2026-06` 并列出角色；项目素材指出没有 Git 历史或个人分工记录，时间只是线索，职责待确认。当前实例仍没有实际模型结果。
- **Quartus MCP：** 原站写开发角色；项目素材认为可从代码和提交推断参与实现，但独立开发、团队分工、真实 Quartus 编译和开发板验证尚未确认。
- **Talk Kids：** 项目素材要求确认实际起止时间、个人职责及 `xiaochong/talk-kids` 是否为当前公开仓库。
- **ContractAI：** 源文件写全栈角色；素材中的提交署名为 `shroudpro`，但 `shroudpro` 是否为本人、是否独立完成及具体分工仍待确认。完整开发周期也待补充。
- **Coolearn：** 原站时间 `2026-10` 与补充材料记录的唯一提交日期 `2026-07-10` 不同；实际开发时间未知。原站写 React 前端角色，但补充材料指出单次上传提交无法确认个人贡献。线上状态也待确认。
- **项目类别：** 当前 Markdown 多为技术 / 产品类型；客户委托、个人项目、团队项目或正式研究项目归属并未逐项确认。
- **外链：** 项目 GitHub 链接和 Netlify 地址尚未联网核验；没有填写 Demo 的项目不要补造演示地址。

### 成果和公开资料

- `10+ Project Iterations` 没有计数口径或可核验清单；确定依据前建议从新站的量化成就中移除。
- 未找到正式奖项名称、获奖时间、奖状链接或用户 / 业务成效数据。
- 简历下载地址、LinkedIn、学术主页和其他社交账号缺失。
- 未发布的项目 / 笔记内容在原站由 `isPublished: false` 控制，不应把测试占位内容当作公开履历。

### 可直接复用与需确认

- **可直接复用为原站文字：** `Shroud` 展示名、原站 Hero 标题和自我介绍、About 两段简介、已发布项目的原始标题 / 类型 / summary / 技术栈、邮箱和 GitHub 字符串。
- **建议确认后再作为个人事实：** BUPT / 地点、所有项目的本人角色和贡献范围、项目起止时间、Wardrobe 仓库归属、Talk Kids 仓库地址、Coolearn 时间、科研补助金额、`10+` 统计。
- **当前不应宣称：** 3D 创作者、具体工作年限、未记录的奖项、模型精度或比赛名次、真实用户规模、正式商业部署、未经确认的团队 / 客户成果。

## 首页推荐组合

- **展示名与身份：** Shroud；“专注于 AI 应用开发，把想法拆解为可运行、可迭代、可展示的产品原型。”
- **About 简介：** 使用第 3 节建议稿；院校、专业、工作年限和研究成果等信息确认后再补入。
- **能力列表：** AI 应用与 Agent 工作流、前端工程、本地工具与工程自动化、产品拆解与 MVP 交付。
- **精选项目：** 按原站精选标记选择 Wardrobe、数学建模竞赛求解与论文生成模板、Quartus MCP；其中 Wardrobe 与数学建模模板的个人贡献 / 时间均需确认，Quartus MCP 的 Alpha 状态和验证限制应保留。
- **联系入口：** 使用已公开邮箱 [shroudmail233@Gmail.com](mailto:shroudmail233@Gmail.com)；GitHub 为 [shroudpro](https://github.com/shroudpro)。
