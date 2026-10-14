# Shroud — AI 应用开发者

根据 `portfolio-materials.md` 填入 Shroud 的身份、简介、技术专长和项目，并保留原视频模板的黑银配色、3D 主视觉、磁吸与滚动动画。技术栈为 React 18、TypeScript、Vite、Tailwind CSS 3、Framer Motion 和 Lucide React。

## 运行

需要 Node.js 22.12+（当前环境使用 Node.js 24）。

```powershell
cd E:\Vibe-coding\UI-CLONE-skills\jack-3d-portfolio
npm install
npm run dev
```

浏览器打开 `http://127.0.0.1:5174`。端口固定为 5174，避免与现有项目预览冲突。

```powershell
npm run build
npm run preview
```

生产构建位于 `dist/`。静态托管配置位于 `.openai/hosting.json`。

## 页面与动效

- Hero：银灰渐变标题、3D 人物、鼠标磁吸、依次入场。
- Marquee：两排个人项目视觉随页面滚动反向位移，每排重复三次。
- About：四个原始 3D 装饰物、滚动逐字显现的介绍文字。
- Expertise：白色圆角面板和四项技术专长。
- Projects：三张带 40/60 图片布局的卡片，滚动时缩放并堆叠。

主视觉、3D 装饰和 Kanit 300–900 字体均已保存至 `public/`，运行时不依赖图片 CDN 或 Google Fonts。项目配图为按真实功能绘制的 SVG 工作流与主题视觉，存放于 `public/visuals/`。减少动态效果的系统偏好会停用磁吸、滚动位移、渐显与缩放。

## 按钮与内容

“联系我”打开邮件、GitHub 和咨询草稿入口；邮件为素材中公开的 `shroudmail233@Gmail.com`，GitHub 为 `shroudpro`。草稿支持字段校验和复制。“查看项目”打开项目介绍、技术栈、功能、状态和配图，Quartus MCP 还提供公开仓库入口。

三个精选项目为 Wardrobe、数学建模 AI 工作流、Quartus MCP。Wardrobe 按用户明确确认的“自主开发”展示。素材中待确认的院校、工作年限、项目周期和量化成果均未写入页面。3D 人物作为网站视觉角色保留。

可编辑的文案、服务和项目资料位于 `src/data.ts`；布局和视觉样式位于 `src/styles.css`。

## 素材维护

```powershell
npm run assets:sync
npm run assets:optimize
npm run visuals:build
```

下载命令读取 `docs/brief.txt` 中原始 URL。优化命令需要 FFmpeg，保留原文件备份，生成 420×270 动画和静态预览。FFmpeg 不在 PATH 时可设置 `FFMPEG_PATH`。

当前页面的 21 个展示槽复用九张对应项目的 SVG 视觉；项目图在构建时自动生成。原模板素材保留在工作区，发布包只包含当前页面使用的素材。

## 验证

启动预览后运行浏览器检查。需要 Python 3.10+、Python Playwright 和已安装的 Microsoft Edge：

```powershell
python scripts/verify-browser.py
```

也可以通过 `--browser chrome` 指定已安装的 Chrome，或通过 `--url` 指定测试地址。检查覆盖五种屏幕宽度、图片加载、双向位移、逐字显现、卡片堆叠、磁吸、表单校验、剪贴板、键盘弹窗操作及减少动态效果。截图和结果写入 `artifacts/`。

视频复刻的依据和差异记录位于 `.clone-ui/`。参考仅包含桌面录像，手机布局依据附件的响应式要求实现。无法从视频取得源页面 DOM 与计算样式，因此不宣称逐像素一致。
