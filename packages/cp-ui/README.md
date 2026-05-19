# CpUI 组件库文档

> Sterile Cyber Design System — 无菌赛博 · 工业控制台 · Web TUI
>
> Vue 3 + TypeScript + SCSS + Vite

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

## 安装

```bash
npm install @yuanfangmao/cp-ui
```

## 快速上手

```ts
// main.ts
import '@yuanfangmao/cp-ui/dist/style.css'
import { CpUI } from '@yuanfangmao/cp-ui'

app.use(CpUI, { theme: 'sterile-cyber' })
```

或按需引入（推荐，支持 tree-shaking）：

```ts
import { CyberButton, SterileCyberButton, SterileButton, CpThemeProvider } from '@yuanfangmao/cp-ui'
```

在 App.vue 中包裹主题提供者：

```vue
<CpThemeProvider theme="sterile-cyber">
  <RouterView />
</CpThemeProvider>
```

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

---

## 三风格体系

每个核心组件都有三种风格变体：

| 风格 | 前缀 | 特点 |
|------|------|------|
| **Cyber** | `Cyber*` | 全赛博朋克 — 不规则 clip-path、多层霓虹发光、故障动画、锯齿装饰 |
| **SterileCyber** | `SterileCyber*` | 约束赛博 — 直角边框、单层发光、无 clip-path、克制装饰 |
| **Sterile** | `Sterile*` | 极简 — 零发光、零动画、直角、纯功能 |

例如 Button 组件对应：`CyberButton`、`SterileCyberButton`、`SterileButton`。

---

## 主题系统

### CpThemeProvider

主题提供者组件，包裹整个应用，通过 `data-theme` 属性切换主题。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `theme` | `string` | `'sterile-cyber'` | 主题名称 |

**Events**

| 名称 | 参数 | 说明 |
|------|------|------|
| `theme-change` | `(theme: string)` | 主题切换时触发 |

**Slots**

| 名称 | 说明 |
|------|------|
| default | 应用内容 |

**使用示例**

```vue
<template>
  <CpThemeProvider :theme="currentTheme" @theme-change="onThemeChange">
    <RouterView />
  </CpThemeProvider>
</template>

<script setup>
import { ref } from 'vue'
import { CpThemeProvider } from '@yuanfangmao/cp-ui'

const currentTheme = ref('sterile-cyber')
function onThemeChange(theme) {
  console.log('主题已切换为', theme)
}
</script>
```

### 内置主题

| 主题名 | 说明 |
|--------|------|
| `sterile-cyber` | **推荐默认** — 黄/青霓虹 + 深底，细边框、低对比网格、克制 glow |
| `cyberpunk` | 经典霓虹 — 更强装饰与切角，兼容旧观感 |
| `neon-noir` | 冷色调 — 青/品红/紫 + 深灰 |
| `sterile-dark` | 无菌暗色 — 无发光，深色工业风 |
| `sterile-light` | 无菌亮色 — 浅底深字，有限强调色 |

### useTheme()

主题切换 composable。

```ts
import { useTheme } from '@yuanfangmao/cp-ui'

const { currentTheme, setTheme } = useTheme('sterile-cyber')
setTheme('cyberpunk') // 切换主题
```

---

## 背景与布局组件

### CpBackground

氛围背景组件，提供多种视觉风格。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'mesh' \| 'glow' \| 'minimal' \| 'horizon' \| 'neon'` | `'mesh'` | 背景风格 |

| Variant | 效果 |
|---------|------|
| `mesh` | 多层暗色径向渐变叠加，微微透出主题色 |
| `glow` | 更明显的霓虹色光斑 |
| `minimal` | 纯暗角，最干净 |
| `horizon` | 底部一线微光 |
| `neon` | 深靛蓝 + 暖橙红光球 + blur 光晕 |

```vue
<CpBackground variant="neon" />
<CpGridLayer pattern="line" :opacity="0.6" />
```

### CpGridLayer

背景网格层，可选点阵/细线/十字交叉。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `pattern` | `'dot' \| 'line' \| 'cross'` | `'dot'` | 网格图案 |
| `opacity` | `number` | `1` | 整体透明度 |

```vue
<CpGridLayer pattern="line" :opacity="0.5" />
```

---

## 核心 UI 组件

### Button 按钮

支持多风格、尺寸、切角形状、加载状态。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | 风格变体 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| `shape` | `'default' \| 'cut'` | `'default'` | 形状，`cut` 为切角 |
| `disabled` | `boolean` | `false` | 禁用状态 |
| `loading` | `boolean` | `false` | 加载状态 |
| `block` | `boolean` | `false` | 撑满父容器宽度 |

**Slots**

| 名称 | 说明 |
|------|------|
| default | 按钮文字内容 |

```vue
<CyberButton variant="primary" size="lg">GET STARTED</CyberButton>
<SterileCyberButton variant="secondary" shape="cut">SECONDARY</SterileCyberButton>
<SterileButton variant="danger" :disabled="true">UNAVAILABLE</SterileButton>
```

---

### Input 输入框

文本输入框，支持 label、尺寸、状态、字数统计、前缀/后缀插槽。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `modelValue` | `string` | `''` | 绑定值（v-model） |
| `placeholder` | `string` | `''` | 占位文本 |
| `disabled` | `boolean` | `false` | 禁用状态 |
| `clearable` | `boolean` | `false` | 显示清除按钮 |
| `type` | `string` | `'text'` | input type |
| `shape` | `'default' \| 'cut' \| 'irregular'` | `'irregular'`（Cyber）/ `'default'` | 形状（仅 Cyber） |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| `maxlength` | `number` | `0` | 最大输入长度，>0 时显示字数统计 |
| `readonly` | `boolean` | `false` | 只读状态 |
| `status` | `'default' \| 'error' \| 'success'` | `'default'` | 校验状态 |
| `label` | `string` | `''` | 标签文字 |

**Events**

| 名称 | 参数 | 说明 |
|------|------|------|
| `update:modelValue` | `(value: string)` | v-model 更新 |

**Slots**

| 名称 | 说明 |
|------|------|
| `prefix` | 输入框前缀（如图标） |
| `suffix` | 输入框后缀 |

```vue
<CyberInput v-model="name" placeholder="> 用户名..." label="USERNAME" />
<CyberInput v-model="bio" :clearable="true" :maxlength="50" />
<CyberInput v-model="email" status="error" placeholder="格式错误" />
<SterileInput v-model="query" placeholder="搜索..." size="lg" />
```

---

### Card 卡片

卡片容器，支持标题、变体、形状、悬停效果。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'default' \| 'outlined' \| 'elevated'` | `'default'` | 风格变体 |
| `shape` | `'default' \| 'cut' \| 'irregular'` | `'default'` | 形状 |
| `hoverable` | `boolean` | `false` | 启用悬停发光效果 |
| `bordered` | `boolean` | `true` | 显示边框 |
| `title` | `string` | `''` | 标题文字 |

**Slots**

| 名称 | 说明 |
|------|------|
| default | 卡片主体内容 |
| `header` | 自定义头部区域（覆盖 title prop） |
| `footer` | 底部区域 |

```vue
<CyberCard title="SYSTEM.SYS" shape="irregular" :hoverable="true">
  <p>卡片内容</p>
</CyberCard>

<SterileCard title="LOG.DAT" shape="cut">
  <p>切角卡片</p>
</SterileCard>
```

---

### Tag 标签

标签组件，支持多种颜色变体、可关闭、可点击。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'danger' \| 'success'` | `'default'` | 颜色变体 |
| `size` | `'sm' \| 'md'` | `'md'` | 尺寸 |
| `closable` | `boolean` | `false` | 显示关闭按钮 |
| `clickable` | `boolean` | `false` | 可点击样式 |

**Events**

| 名称 | 参数 | 说明 |
|------|------|------|
| `click` | `(e: MouseEvent)` | 点击事件 |
| `close` | — | 关闭按钮点击 |

```vue
<CyberTag variant="primary">PRIMARY</CyberTag>
<SterileCyberTag variant="danger" :closable="true">CLOSABLE</SterileTag>
<SterileTag variant="secondary">SIMPLE</SterileTag>
```

---

### Badge 徽章

徽章组件，用于状态标记、计数显示。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'danger' \| 'success'` | `'default'` | 颜色变体 |
| `text` | `string` | `''` | 文字内容（也可用插槽） |

```vue
<CyberBadge variant="success">ONLINE</CyberBadge>
<SterileBadge variant="danger" text="ERROR" />
```

---

### BracketLabel 括号标签

统一 `[ 文本 ]` 视觉语法，等宽字体。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | `string` | — | **必填**，标签文字 |
| `variant` | `'default' \| 'accent' \| 'muted' \| 'danger'` | `'default'` | 颜色变体 |

```vue
<CyberBracketLabel text="SYSTEM" />
<SterileCyberBracketLabel text="REC" variant="danger" />
<SterileBracketLabel text="LOG" variant="muted" />
```

---

### Panel 面板

带标签和标题的信息展示面板。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `''` | 面板标题 |
| `label` | `string` | `''` | 左上角小标签 |
| `shape` | `'default' \| 'cut' \| 'irregular'` | `'default'` | 形状 |

**Slots**

| 名称 | 说明 |
|------|------|
| default | 面板主体内容 |
| `header` | 自定义头部 |

```vue
<CyberPanel title="SYSTEM STATUS" label="monitor" shape="irregular">
  <p>内容</p>
</CyberPanel>
<SterilePanel title="CONFIG" label="sys">
  <p>内容</p>
</SterilePanel>
```

---

### Modal 弹窗

模态弹窗组件。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `visible` | `boolean` | `false` | 是否显示 |
| `title` | `string` | `''` | 标题 |
| `closable` | `boolean` | `true` | 显示关闭按钮 |

**Events**

| 名称 | 参数 | 说明 |
|------|------|------|
| `update:visible` | `(value: boolean)` | v-model:visible 更新 |
| `close` | — | 关闭事件 |

**Slots**

| 名称 | 说明 |
|------|------|
| default | 弹窗主体内容 |
| `footer` | 底部区域 |

```vue
<CyberModal v-model:visible="show" title="CONFIRM">
  <p>确认操作？</p>
</CyberModal>
```

---

### Pagination 分页

分页导航组件。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `total` | `number` | `0` | 总条数 |
| `pageSize` | `number` | `10` | 每页条数 |
| `current` | `number` | `1` | 当前页码 |

**Events**

| 名称 | 参数 | 说明 |
|------|------|------|
| `update:current` | `(page: number)` | 页码变更 |

```vue
<CyberPagination :total="100" :page-size="10" v-model:current="page" />
```

---

### Avatar 头像

头像组件，支持图片、文字 fallback、多种形状。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `src` | `string` | `''` | 图片地址 |
| `name` | `string` | `''` | 名字（无图时显示首字母） |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

```vue
<CyberAvatar src="/avatar.jpg" name="V" />
<SterileAvatar name="Admin" size="lg" />
```

---

### ProgressBar 进度条

进度条组件，支持条纹动画和多种颜色。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `number` | — | **必填**，进度值 0-100 |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'danger'` | `'default'` | 颜色变体 |
| `height` | `number` | `4` | 高度（px） |
| `animated` | `boolean` | `false` | 启用条纹滚动动画 |

```vue
<CyberProgressBar :value="72" :height="4" />
<CyberProgressBar :value="45" variant="secondary" :animated="true" :height="6" />
```

---

### CategoryTabs 分类标签页

分类选项卡组件。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `tabs` | `CategoryTab[]` | `[]` | 标签页数据 |
| `active` | `string` | `''` | 当前激活项 |

**Events**

| 名称 | 参数 | 说明 |
|------|------|------|
| `update:active` | `(value: string)` | 激活项变更 |

```vue
<CyberCategoryTabs :tabs="tabs" v-model:active="activeTab" />
```

---

### StatsGrid 统计面板

统计数据网格展示。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `StatItem[]` | `[]` | 统计项数据 |

```vue
<CyberStatsGrid :items="[
  { label: 'USERS', value: 1284 },
  { label: 'LOAD', value: '67%' },
]" />
```

---

### Terminal 终端

模拟终端输出组件。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `entries` | `TerminalEntry[]` | `[]` | 终端行数据 |
| `autoScroll` | `boolean` | `true` | 自动滚动到底部 |

```vue
<CyberTerminal :entries="[
  { type: 'system', text: '> System initialized' },
  { type: 'output', text: 'Loading modules...' },
  { type: 'error', text: 'Connection timeout' },
]" />
```

---

### ChatBubble 聊天气泡

聊天气泡组件。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `sender` | `string` | `''` | 发送者名称 |
| `content` | `string` | `''` | 消息内容 |
| `time` | `string` | `''` | 时间戳 |
| `isSelf` | `boolean` | `false` | 是否为自己发送 |

```vue
<CyberChatBubble sender="V" content="Hey there" time="12:30" />
```

---

### Heading 标题

标题组件，文字 + 可选 CP2077 风格下划线 + 多种视觉效果。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `underline` | `boolean` | `true`（Cyber/SC）/ `false`（Sterile） | 显示底部横线 |
| `lineColor` | `string` | `''` | 横线颜色，空值使用主题默认 |
| `textColor` | `string` | `''` | 文字颜色，空值使用主题默认 |
| `neon` | `boolean` | `false` | 文字霓虹发光效果 |
| `rgbSplit` | `boolean` | `false` | 文字 RGB 色差效果（仅 Cyber） |
| `glitched` | `boolean` | `false` | 文字 + 横线故障抖动效果（仅 Cyber） |
| `linePulse` | `boolean` | `false` | 横线脉冲呼吸动画 |
| `lineGlow` | `boolean` | `false` | 横线发光效果（仅 Cyber） |

```vue
<!-- 默认 -->
<CyberHeading>标题文字</CyberHeading>

<!-- 自定义颜色 -->
<CyberHeading line-color="var(--cp-color-danger)" text-color="var(--cp-color-danger)">
  红色标题
</CyberHeading>

<!-- 霓虹发光 -->
<CyberHeading :neon="true">霓虹效果</CyberHeading>

<!-- RGB 色差 -->
<CyberHeading :rgb-split="true">色差效果</CyberHeading>

<!-- Glitch 抖动 -->
<CyberHeading :glitched="true">故障抖动</CyberHeading>

<!-- 横线脉冲 -->
<CyberHeading :line-pulse="true">横线脉冲</CyberHeading>

<!-- 横线发光 -->
<CyberHeading :line-glow="true">横线发光</CyberHeading>

<!-- 无下划线 -->
<CyberHeading :underline="false">纯文字</CyberHeading>

<!-- SterileCyber 也支持 neon 和 linePulse -->
<SterileCyberHeading :neon="true">发光标题</SterileCyberHeading>
```

---

## Cyber 独占组件

以下组件仅在 Cyber 风格下提供：

### CyberGlitchText 故障文字

随机字符滚动解码效果。

### CyberDecipherText 解密文字

文字从乱码逐渐解密为正常文本。

### CyberScanLine 扫描线

CRT 显示器扫描线覆盖效果。

### CyberCornerBrackets 角标框

四角装饰括号容器。

### CyberFrameDecor 边框装饰

赛博朋克风格边框装饰。

### CyberLabelBar 标签栏

带霓虹脉冲的标签栏。

### CyberMonitorEye 监控之眼

动态监控指示器。

### CyberBootScreen 启动画面

模拟系统启动序列。

---

## 共享组件

### CpLogo

品牌 Logo 组件。

### CpStatusLed

状态指示灯，模拟硬件 LED。

**Props**

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `status` | `'online' \| 'offline' \| 'warning' \| 'error'` | `'online'` | 状态 |
| `pulse` | `boolean` | `false` | 脉冲呼吸动画 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

### CpDigitalClock

数字时钟组件。

### CpTypingIndicator

打字指示器，显示"正在输入"动画。

### CpHudStrip

HUD 信息条。

### CpFloatingToolbar / CpToolButton

浮动工具栏及工具按钮。

### CpTocPanel

目录导航面板。

---

## 设计 Token

所有组件通过 CSS 自定义属性实现主题化，可在组件内或全局覆盖。

### 核心 Token 列表

| Token | 说明 |
|-------|------|
| `--cp-color-primary` | 主色（品牌霓虹） |
| `--cp-color-secondary` | 副色 |
| `--cp-color-danger` | 危险色 |
| `--cp-color-success` | 成功色 |
| `--cp-color-warning` | 警告色 |
| `--cp-bg-void` | 最深背景 |
| `--cp-bg-base` | 基础背景 |
| `--cp-bg-panel` | 面板背景 |
| `--cp-bg-elevated` | 浮起元素背景 |
| `--cp-bg-hover` | 悬停态背景 |
| `--cp-text-primary` | 主要文字 |
| `--cp-text-secondary` | 次要文字 |
| `--cp-text-muted` | 弱化文字 |
| `--cp-text-dim` | 最淡文字 |
| `--cp-border-dim` | 弱边框 |
| `--cp-border-base` | 基础边框 |
| `--cp-border-bright` | 高亮边框 |
| `--cp-border-active` | 激活态边框 |
| `--cp-glow-primary` | 主色光晕 |
| `--cp-glow-secondary` | 副色光晕 |
| `--cp-glow-danger` | 危险色光晕 |
| `--cp-font-sans` | 界面字体栈 |
| `--cp-font-mono` | 等宽字体栈 |
| `--cp-cut-corner-sm` | 小切角 clip-path |
| `--cp-cut-corner-md` | 中切角 clip-path |
| `--cp-cut-corner-lg` | 大切角 clip-path |
| `--cp-shadow-sm / md / lg` | 阴影层级 |
| `--cp-duration-fast` | 快速过渡 200ms |
| `--cp-duration-base` | 基础过渡 300ms |
| `--cp-easing` | 默认缓动曲线 |

### 覆盖方式

```scss
[data-theme="sterile-cyber"] {
  --cp-color-primary: #ff5500;
}
```

---

## 全量组件导出列表（67个）

### 三风格组件（48个）

| 分类 | Cyber | SterileCyber | Sterile |
|------|-------|--------------|---------|
| Button | `CyberButton` | `SterileCyberButton` | `SterileButton` |
| Card | `CyberCard` | `SterileCyberCard` | `SterileCard` |
| Input | `CyberInput` | `SterileCyberInput` | `SterileInput` |
| Tag | `CyberTag` | `SterileCyberTag` | `SterileTag` |
| Badge | `CyberBadge` | `SterileCyberBadge` | `SterileBadge` |
| BracketLabel | `CyberBracketLabel` | `SterileCyberBracketLabel` | `SterileBracketLabel` |
| Panel | `CyberPanel` | `SterileCyberPanel` | `SterilePanel` |
| Modal | `CyberModal` | `SterileCyberModal` | `SterileModal` |
| Pagination | `CyberPagination` | `SterileCyberPagination` | `SterilePagination` |
| Avatar | `CyberAvatar` | `SterileCyberAvatar` | `SterileAvatar` |
| ProgressBar | `CyberProgressBar` | `SterileCyberProgressBar` | `SterileProgressBar` |
| CategoryTabs | `CyberCategoryTabs` | `SterileCyberCategoryTabs` | `SterileCategoryTabs` |
| StatsGrid | `CyberStatsGrid` | `SterileCyberStatsGrid` | `SterileStatsGrid` |
| Terminal | `CyberTerminal` | `SterileCyberTerminal` | `SterileTerminal` |
| ChatBubble | `CyberChatBubble` | `SterileCyberChatBubble` | `SterileChatBubble` |
| Heading | `CyberHeading` | `SterileCyberHeading` | `SterileHeading` |

### Cyber 独占组件（8个）

`CyberGlitchText` · `CyberDecipherText` · `CyberScanLine` · `CyberCornerBrackets` · `CyberFrameDecor` · `CyberLabelBar` · `CyberMonitorEye` · `CyberBootScreen`

### 共享组件（10个）

`CpLogo` · `CpBackground` · `CpGridLayer` · `CpStatusLed` · `CpDigitalClock` · `CpTypingIndicator` · `CpHudStrip` · `CpFloatingToolbar` · `CpToolButton` · `CpTocPanel`

### 其他

`CpThemeProvider` — 主题提供者

---

## 全局注册

```ts
import CpUI from '@yuanfangmao/cp-ui'
app.use(CpUI)
```

注册后可直接在模板中使用所有组件，无需单独 import。
