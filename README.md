# CPUI

> 赛博朋克风格的 Vue 3 组件库

Cyberpunk-themed Vue 3 component library with triple-style variants.

## 特性

- **Vue 3 + TypeScript + SCSS**
- **三风格变体** — Cyber / SterileCyber / Sterile，每个组件三种视觉风格
- **5 种主题** — 赛博朋克 / 无菌赛博 / 霓虹黑 / 无菌暗色 / 无菌亮色
- **42 个组件** — 基础、导航、数据展示、反馈、赛博专属、业务、共享组件
- **Tree-shakable** — ESM + CJS 双格式导出
- **全局注册** — 支持 Vue Plugin 一键注册

## 安装

```bash
npm install @yuanfangmao/cp-ui
```

## 快速开始

### 按需引入（推荐）

```vue
<script setup>
import { CpThemeProvider, CyberButton, CyberCard } from '@yuanfangmao/cp-ui'
import '@yuanfangmao/cp-ui/dist/style.css'
</script>

<template>
  <CpThemeProvider theme="cyberpunk">
    <CyberButton variant="primary">START</CyberButton>
    <CyberCard title="SYSTEM">
      <p>Content here</p>
    </CyberCard>
  </CpThemeProvider>
</template>
```

### 全局注册

```ts
import { createApp } from 'vue'
import CPUI from '@yuanfangmao/cp-ui'
import '@yuanfangmao/cp-ui/dist/style.css'

createApp(App).use(CPUI).mount('#app')
```

## 主题

| 主题 | 值 | 说明 |
|------|------|------|
| 赛博朋克 | `cyberpunk` | 深黑 + 霓虹黄/青 + 发光效果 |
| 无菌赛博 | `sterile-cyber` | 深色 + 克制发光 + 直角 |
| 霓虹黑 | `neon-noir` | 纯黑 + 霓虹边缘光 |
| 无菌暗色 | `sterile-dark` | 暗色 + 无发光 + 直角 |
| 无菌亮色 | `sterile-light` | 浅色 + 无发光 + 无衬线 |

用 `<CpThemeProvider theme="cyberpunk">` 包裹即可切换主题。

## 组件总览

### 基础组件（16 个，每种 × 3 风格）

| 组件 | 说明 |
|------|------|
| `CyberButton` / `SterileCyberButton` / `SterileButton` | 按钮 |
| `CyberCard` / `SterileCyberCard` / `SterileCard` | 卡片 |
| `CyberInput` / `SterileCyberInput` / `SterileInput` | 输入框 |
| `CyberTag` / `SterileCyberTag` / `SterileTag` | 标签 |
| `CyberBadge` / `SterileCyberBadge` / `SterileBadge` | 徽章 |
| `CyberBracketLabel` / ... | 括号标签 |
| `CyberPanel` / ... | 面板 |
| `CyberModal` / ... | 弹窗 |
| `CyberPagination` / ... | 分页 |
| `CyberAvatar` / ... | 头像 |
| `CyberProgressBar` / ... | 进度条 |
| `CyberCategoryTabs` / ... | 分类标签 |
| `CyberStatsGrid` / ... | 数据面板 |
| `CyberTerminal` / ... | 终端 |
| `CyberChatBubble` / ... | 聊天气泡 |
| `CyberHeading` / ... | 标题 |

### 赛博专属组件（10 个）

| 组件 | 说明 |
|------|------|
| `CyberGlitchText` | 故障文字 |
| `CyberDecipherText` | 解码文字 |
| `CyberScanLine` | 扫描线 |
| `CyberCornerBrackets` | 角括号装饰 |
| `CyberFrameDecor` | 边框装饰 |
| `CyberLabelBar` | 标签条 |
| `CyberMonitorEye` | 监控之眼 |
| `CyberBootAnimation` | 开机动画 |
| `CyberDisconnect` | 断开连接 |
| `CyberNotFound` | 404 页面 |

### 共享组件（11 个）

| 组件 | 说明 |
|------|------|
| `CpLogo` / `CpLogoTvOff` / `CpLogoNeon` / `CpLogoFlicker` / `CpLogoScanline` / `CpLogoDecipher` | 品牌标识（6 种效果） |
| `CpBackground` | 背景层 |
| `CpGridLayer` | 网格纹理 |
| `CpStatusLed` | 状态灯 |
| `CpDigitalClock` | 数字时钟 |
| `CpTypingIndicator` | 输入指示器 |
| `CpHudStrip` | HUD 状态条 |
| `CpFloatingToolbar` / `CpToolButton` | 浮动工具栏 |
| `CpTocPanel` | 目录面板 |

### 业务组件（10 个）

| 组件 | 说明 |
|------|------|
| `CyberNavMenu` | 导航菜单 |
| `CyberBlogCard` | 博客卡片 |
| `CyberProfileCard` | 个人资料卡片 |
| `CyberSidebar` | 侧边栏 |
| `CyberFilterBar` | 过滤栏 |
| `CyberAboutModal` | 档案弹窗 |
| `CyberArticleReader` / `SterileCyberArticleReader` / `SterileArticleReader` | 文章阅读器 |
| `CyberNotFound` | 404 页面 |

## Shape 形状

部分组件支持 `shape` 属性：

| 值 | 效果 |
|------|------|
| `irregular` | 不规则（默认）— 不对称斜切/多边形 |
| `cut` | 切角 — 统一切角 |
| `regular` | 规则矩形 — 直角边框 |

```vue
<CyberButton variant="primary" shape="regular">RECT</CyberButton>
<CyberButton variant="primary" shape="cut">CUT</CyberButton>
```

## Logo 字体

所有 Logo 组件支持 `font-family` prop 自定义字体：

```vue
<CpLogo text="LOGO" font-family="'Orbitron', sans-serif" />
```

## 开发

```bash
# 安装依赖
npm install

# 启动 Playground
npm run dev

# 构建组件库
npm run build
```

## 技术栈

- Vue 3.4+
- TypeScript 5.7+
- SCSS
- Vite 6

📦 **GitHub 源码仓库**：[https://github.com/laohe10086/CPUI](https://github.com/laohe10086/CPUI)  
如发现安全问题或恶意篡改，请通过 GitHub Issues 举报。

---

⚠️ **安全与使用声明**

本项目为作者个人作品，遵循以下原则：

- **禁止未经授权的商业使用**：如需将本组件库用于商业项目，请先联系作者获得书面授权。
- **禁止恶意篡改与二次分发**：严禁修改源码后植入恶意代码、木马、病毒或用于钓鱼、诈骗等非法用途。
- **源码仅供参考学习**：本仓库公开的代码仅用于技术交流与学习，作者不对任何基于本项目的衍生作品负责。
- **安全提醒**：npm 上的 `@yuanfangmao/cp-ui` 为本项目唯一官方发布渠道，请勿安装来源不明的同名或相似包，以防供应链攻击。

> © 2025 yuanfangmao（laohe10086）。保留所有权利。

---

## 创意工坊（社区贡献）

欢迎基于本组件库进行二次创作与扩展。

### 贡献格式

如果你开发了新的创意组件，请按以下格式展示：

1. **将你的创意组件放入本区域**，不干扰原有组件的正常展示
2. **在组件下方单独一行**说明**基于哪个原有组件**扩展，以及这是什么创意
3. **在说明下方**写上你的 **GitHub 个人主页链接** 和 **名字/昵称**

### 示例

```vue
<!-- 预览区 -->
<CyberGlitchText text="GLITCH" tag="h2" style="font-size: 36px" />

<!-- 代码示例 -->
<CyberGlitchText text="GLITCH" tag="h2" style="font-size: 36px" />
```

下方署名：

```
✨ 基于 CyberGlitchText 的故障文字闪烁效果
────────────────────────────────
github：https://github.com/laohe10086/CPUI by：老何10086
```

### 贡献方式

1. Fork 本仓库
2. 在展示页中新增你的组件（仿照现有格式）
3. 提交 Pull Request

> 注：创意工坊区的组件归各贡献者所有，作者仅提供展示平台。

---

## 许可证

详见 [LICENSE](./LICENSE) 文件。

核心原则：

- 允许个人学习、研究、非盈利项目中免费使用
- **未经书面授权，禁止用于商业盈利项目**
- **严禁修改源码后植入恶意代码、病毒或用于违法用途**
- 作者不对因使用本组件库导致的任何损失承担责任

> © 2025 yuanfangmao（laohe10086）。保留所有权利。
