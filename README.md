<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">📝 Code2Doc</h1>

  <p align="center">
    一个极简的 HTML 编辑器，支持实时预览和导出为 PDF/PNG
    <br />
    <a href="#使用说明"><strong>探索文档 »</strong></a>
    <br />
    <br />
    <a href="#快速开始">快速开始</a>
    ·
    <a href="https://github.com/YOUR_USERNAME/code2doc/issues">报告 Bug</a>
    ·
    <a href="https://github.com/YOUR_USERNAME/code2doc/issues">请求功能</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" alt="License">
    <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg?style=for-the-badge" alt="Node">
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React">
  </p>
</div>

---

<!-- TABLE OF CONTENTS -->
<details>
  <summary>目录</summary>
  <ol>
    <li><a href="#关于项目">关于项目</a></li>
    <li><a href="#技术栈">技术栈</a></li>
    <li><a href="#快速开始">快速开始</a></li>
    <li><a href="#使用说明">使用说明</a></li>
    <li><a href="#打包部署">打包部署</a></li>
    <li><a href="#路线图">路线图</a></li>
    <li><a href="#贡献指南">贡献指南</a></li>
    <li><a href="#许可证">许可证</a></li>
    <li><a href="#致谢">致谢</a></li>
  </ol>
</details>

---

<!-- ABOUT THE PROJECT -->
## 关于项目

Code2Doc 是一个专为快速创建和导出文档设计的 HTML 编辑器。它提供了专业的代码编辑体验，并能够将你的内容导出为高质量的 PDF 或 PNG 格式。

### 核心特性

- 📝 **Monaco 编辑器** - 来自 VS Code 的专业代码编辑器，支持语法高亮和智能提示
- 👁️ **实时预览** - 所见即所得的即时渲染，边写边看效果
- 📄 **PDF 导出** - 完美保留样式的 PDF 生成，适合打印和分享
- 🖼️ **PNG 导出** - 高质量图片导出，支持 A4 尺寸
- 🎨 **Tailwind CSS 集成** - 通过 CDN 快速使用 Tailwind 构建精美样式
- ⚡ **一键打包** - 打包成独立程序，无需 Node.js 环境即可运行
- 🎯 **极简设计** - 专注于核心功能，没有多余干扰

### 适用场景

- 快速制作简历、报告、海报
- 创建带样式的文档并导出 PDF
- 编写 HTML 邮件模板
- 生成图片分享到社交媒体
- 学习 HTML/CSS

---

<!-- BUILT WITH -->
## 技术栈

### 前端

- ![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white) - UI 框架
- ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white) - 类型安全
- ![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite&logoColor=white) - 构建工具
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?logo=tailwindcss&logoColor=white) - 样式框架
- **Monaco Editor** - VS Code 同款编辑器
- **shadcn/ui** - 精美的 UI 组件库

### 后端

- ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white) - 运行时
- **Express** - Web 服务器框架
- **Puppeteer** - 浏览器自动化（PDF/PNG 生成）
- **Chromium** - 无头浏览器引擎

### 开发工具

- **pnpm** - 快速的包管理器
- **Prettier** - 代码格式化
- **ESBuild** - 超快的打包工具

---

<!-- GETTING STARTED -->
## 快速开始

### 前置条件

确保你的系统已安装以下工具：

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0（推荐）或 npm >= 9.0.0

```bash
# 检查版本
node --version
pnpm --version
```

### 安装

1. **克隆仓库**

```bash
git clone https://github.com/YOUR_USERNAME/code2doc.git
cd code2doc
```

2. **安装依赖**

```bash
pnpm install
```

### 运行

**开发模式**

```bash
pnpm dev
```

访问 http://localhost:3001 即可使用。

**类型检查**

```bash
pnpm check
```

**代码格式化**

```bash
pnpm format
```

---

<!-- USAGE -->
## 使用说明

### 基本用法

#### 1. 编写 HTML

在左侧编辑器中输入 HTML 代码：

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
  <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
    <h1 class="text-4xl font-bold text-gray-800 mb-4">我的简历</h1>
    <div class="border-l-4 border-blue-500 pl-4 mb-6">
      <h2 class="text-2xl font-semibold text-gray-700">个人信息</h2>
      <p class="text-gray-600 mt-2">前端工程师 | 3年经验</p>
    </div>
  </div>
</body>
</html>
```

#### 2. 实时预览

右侧预览区域会实时显示渲染结果，支持：
- HTML 标签渲染
- CSS 样式应用
- Tailwind CSS 类名
- 响应式布局

#### 3. 导出文档

- **导出 PDF**：点击顶部 "导出 PDF" 按钮，生成 A4 尺寸的 PDF 文件
- **导出 PNG**：点击 "导出 PNG" 按钮，生成图片格式
- **进度提示**：导出过程中会显示进度条和状态信息

### 高级技巧

#### 使用 Tailwind CSS

项目默认支持 Tailwind CSS CDN，直接在 `<head>` 中引入即可使用所有 Tailwind 类：

```html
<script src="https://cdn.tailwindcss.com"></script>
```

#### 自定义 CSS

可以在 `<style>` 标签中编写自定义样式：

```html
<style>
  @page {
    size: A4;
    margin: 2cm;
  }
  
  .custom-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
</style>
```

#### 打印样式优化

使用 `@media print` 为打印/PDF 导出定制样式：

```html
<style>
  @media print {
    .no-print {
      display: none;
    }
    
    body {
      background: white;
    }
  }
</style>
```

---

<!-- DEPLOYMENT -->
## 打包部署

### Web 版本构建

生成可独立运行的 Web 版本：

```bash
pnpm build:web
```

生成的文件在 `dist/` 目录：

```
dist/
├── Code2Doc.bat        # Windows 启动脚本
├── Code2Doc.lnk        # Windows 快捷方式
├── start.cjs           # Node 启动脚本
├── server.js           # 后端服务器（已打包）
├── index.html          # 前端入口
└── assets/             # 前端资源
    ├── index-xxx.css
    └── index-xxx.js
```

### 使用打包后的程序

#### 方式 1：双击启动（推荐）

1. 将整个 `dist/` 文件夹复制到任意位置
2. 双击 `Code2Doc.bat` 或 `Code2Doc.lnk`
3. 浏览器自动打开，开始使用
4. 关闭终端窗口即可退出

#### 方式 2：命令行启动

```bash
cd dist
node start.cjs
```

### 依赖说明

打包后的程序需要：
- **Node.js** >= 18（运行环境）
- **网络连接**（首次使用时下载 Chromium，约 150MB）

---

<!-- ROADMAP -->
## 路线图

当前版本：**v1.0.0**

### 已完成 ✅

- [x] Monaco 编辑器集成
- [x] 实时预览
- [x] PDF 导出
- [x] PNG 导出
- [x] Tailwind CSS 支持
- [x] 导出进度显示
- [x] 一键打包

### 计划中 📋

- [ ] **v1.1** - 模板库（简历、报告、海报预设）
- [ ] **v1.2** - 多页面支持
- [ ] **v1.3** - 云端保存和分享
- [ ] **v1.4** - 协作编辑
- [ ] **v2.0** - Markdown 编辑器模式
- [ ] **v2.1** - 自定义字体上传
- [ ] **v2.2** - 批量导出

查看 [Issues](https://github.com/YOUR_USERNAME/code2doc/issues) 了解更多计划。

---

<!-- CONTRIBUTING -->
## 贡献指南

欢迎贡献！感谢你考虑为项目做贡献。

### 开发流程

1. **Fork** 本仓库
2. **创建**功能分支
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **提交**更改
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **推送**到分支
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **创建** Pull Request

### 代码规范

- 使用 **Prettier** 格式化代码（运行 `pnpm format`）
- 提交前运行 `pnpm check` 确保类型检查通过
- 遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范
- 为新功能添加文档说明

### 提交类型

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建工具、依赖更新

### 提交前检查清单

- [ ] 代码已格式化（`pnpm format`）
- [ ] 类型检查通过（`pnpm check`）
- [ ] 文档已更新
- [ ] 无 `console.log` 调试代码
- [ ] 提交信息清晰明确

---

<!-- LICENSE -->
## 许可证

本项目采用 **MIT** 许可证。详见 [LICENSE](LICENSE) 文件。

这意味着你可以自由地：
- ✅ 商业使用
- ✅ 修改代码
- ✅ 分发
- ✅ 私人使用

唯一要求是保留版权声明和许可证声明。

---

<!-- CONTACT -->
## 联系方式

- **项目链接**: [Code2Doc](https://github.com/YOUR_USERNAME/code2doc)
- **问题反馈**: [Issues](https://github.com/YOUR_USERNAME/code2doc/issues)
- **功能建议**: [Discussions](https://github.com/YOUR_USERNAME/code2doc/discussions)

---

<!-- ACKNOWLEDGMENTS -->
## 致谢

感谢以下开源项目和资源：

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - 强大的代码编辑器
- [shadcn/ui](https://ui.shadcn.com/) - 精美的 UI 组件库
- [Puppeteer](https://pptr.dev/) - 浏览器自动化工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [React](https://react.dev/) - 用于构建用户界面的库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template) - README 模板
- [Shields.io](https://shields.io/) - 徽章生成
- [Choose an Open Source License](https://choosealicense.com/) - 开源许可证选择

---

<div align="center">
  <p>Made with ❤️ by Code2Doc Team</p>
  <p>如果这个项目对你有帮助，请给一个 ⭐️</p>
</div>
