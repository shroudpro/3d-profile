# Jack — 3D Creator

根据用户提供的页面规格和 6.367 秒参考视频实现的作品集。技术栈为 React 18、TypeScript、Vite、Tailwind CSS 3、Framer Motion 和 Lucide React。

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
- Marquee：两排图片随页面滚动反向位移，每排重复三次。
- About：四个原始 3D 装饰物、滚动逐字显现的介绍文字。
- Services：白色圆角面板和五项编号服务。
- Projects：三张带 40/60 图片布局的卡片，滚动时缩放并堆叠。

所有图片和 Kanit 300–900 字体均已保存至 `public/`，运行时不依赖原图片 CDN 或 Google Fonts。减少动态效果的系统偏好会停用磁吸、滚动位移、渐显与缩放，并把 GIF 换成对应静态预览。

## 按钮与内容

附件没有提供实际联系方式和项目网站地址。Contact Me 打开咨询草稿表单，校验填写内容并复制消息；Live Project 默认打开对应项目图片。填写 `src/data.ts` 中项目的 `liveUrl` 后，该项目按钮会打开真实地址。

可编辑的文案、服务和项目资料位于 `src/data.ts`；布局和视觉样式位于 `src/styles.css`。

## 素材维护

```powershell
npm run assets:sync
npm run assets:optimize
```

下载命令读取 `docs/brief.txt` 中原始 URL。优化命令需要 FFmpeg，保留原文件备份，生成 420×270 动画和静态预览。FFmpeg 不在 PATH 时可设置 `FFMPEG_PATH`。

Celestia 的原始 GIF 链接返回 404，第二排的最后一个槽使用同一附件中的 Luminex，仍保留 21 个槽及无缝循环。其他图片使用附件提供的原始素材。动画素材总量由约 168 MB 降至 67.1 MB。

## 验证

启动预览后运行浏览器检查。需要 Python 3.10+、Python Playwright 和已安装的 Microsoft Edge：

```powershell
python scripts/verify-browser.py
```

也可以通过 `--browser chrome` 指定已安装的 Chrome，或通过 `--url` 指定测试地址。检查覆盖五种屏幕宽度、图片加载、双向位移、逐字显现、卡片堆叠、磁吸、表单校验、剪贴板、键盘弹窗操作及减少动态效果。截图和结果写入 `artifacts/`。

视频复刻的依据和差异记录位于 `.clone-ui/`。参考仅包含桌面录像，手机布局依据附件的响应式要求实现。无法从视频取得源页面 DOM 与计算样式，因此不宣称逐像素一致。
