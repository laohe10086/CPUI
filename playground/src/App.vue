<template>
  <CpThemeProvider :theme="currentTheme">
    <div class="app">
      <!-- 顶部栏 -->
      <header class="topbar">
        <div class="topbar-left">
          <CpLogo text="CpUI" size="sm" />
          <span style="margin: 0 12px; color: #666;">/</span>
          <span style="color: white;">{{ activePageTitle }}</span>
        </div>
        <div class="topbar-right">
          <select v-model="currentTheme" class="theme-select">
            <option value="cyberpunk">赛博朋克</option>
            <option value="sterile-cyber">无菌赛博</option>
            <option value="modern">现代科技</option>
            <option value="neon-noir">霓虹黑</option>
            <option value="blueprint">蓝图</option>
            <option value="brutal">终端粗野</option>
            <option value="cyber-modern">赛博现代</option>
          </select>
        </div>
      </header>

      <div class="layout">
        <!-- 侧边栏 -->
        <aside class="sidebar">
          <nav>
            <div class="nav-group">快速开始</div>
            <a 
              class="nav-item" 
              :class="{ active: activePage === 'quickstart' }"
              @click="activePage = 'quickstart'"
            >
              快速开始 QUICKSTART
            </a>

            <div class="nav-group">组件 COMPONENTS</div>
            <a 
              class="nav-item" 
              :class="{ active: activePage === 'button' }"
              @click="activePage = 'button'"
            >
              Button 按钮
            </a>
            <a 
              class="nav-item" 
              :class="{ active: activePage === 'input' }"
              @click="activePage = 'input'"
            >
              Input 输入框
            </a>
          </nav>
        </aside>

        <!-- 主内容区 -->
        <main class="main-content">
          <!-- 快速开始页 -->
          <div v-if="activePage === 'quickstart'" class="page">
            <h1>快速开始</h1>
            <p>@yuanfangmao/cp-ui 是一个 Vue 3 赛博朋克风格组件库，内置 7 种主题。</p>
            
            <h2>1. 安装</h2>
            <pre><code>npm install @yuanfangmao/cp-ui</code></pre>

            <h2>2. 全局引入</h2>
            <pre><code>import { createApp } from 'vue'
import CpUI from '@yuanfangmao/cp-ui'
import '@yuanfangmao/cp-ui/dist/style.css'

app.use(CpUI)</code></pre>
          </div>

          <!-- Button 页面 -->
          <div v-if="activePage === 'button'" class="page">
            <h1>Button 按钮</h1>
            <p>按钮组件，支持多种风格和状态。</p>

            <div class="demo-section">
              <h3>赛博朋克风格</h3>
              <div class="demo-buttons">
                <CyberButton>默认按钮</CyberButton>
                <CyberButton variant="primary">主要按钮</CyberButton>
                <CyberButton variant="secondary">次要按钮</CyberButton>
              </div>
            </div>

            <div class="demo-section">
              <h3>现代科技风格</h3>
              <div class="demo-buttons">
                <ModernButton>默认按钮</ModernButton>
                <ModernButton variant="primary">主要按钮</ModernButton>
                <ModernButton variant="secondary">次要按钮</ModernButton>
              </div>
            </div>
          </div>

          <!-- Input 页面 -->
          <div v-if="activePage === 'input'" class="page">
            <h1>Input 输入框</h1>
            <p>输入框组件，支持多种风格。</p>

            <div class="demo-section">
              <h3>赛博朋克风格</h3>
              <CyberInput v-model="inputVal" placeholder="请输入内容" />
              <p style="margin-top: 10px; color: var(--cp-text-secondary);">
                当前输入值: {{ inputVal }}
              </p>
            </div>

            <div class="demo-section">
              <h3>现代科技风格</h3>
              <ModernInput v-model="inputVal2" placeholder="请输入内容" />
              <p style="margin-top: 10px; color: var(--cp-text-secondary);">
                当前输入值: {{ inputVal2 }}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  </CpThemeProvider>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  CpThemeProvider,
  CpLogo,
  CyberButton,
  ModernButton,
  CyberInput,
  ModernInput,
} from '@cp-ui/index'

const currentTheme = ref('sterile-cyber')
const activePage = ref('quickstart')
const inputVal = ref('')
const inputVal2 = ref('')

const activePageTitle = computed(() => {
  const titles: Record<string, string> = {
    quickstart: '快速开始',
    button: 'Button 按钮',
    input: 'Input 输入框',
  }
  return titles[activePage.value] || '未知页面'
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: var(--cp-bg);
  color: var(--cp-text-primary);
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: var(--cp-surface-0);
  border-bottom: 1px solid var(--cp-border);
}

.topbar-left {
  display: flex;
  align-items: center;
}

.topbar-right {
  display: flex;
  gap: 12px;
}

.theme-select {
  padding: 8px 12px;
  background: var(--cp-surface-1);
  color: var(--cp-text-primary);
  border: 1px solid var(--cp-border);
  border-radius: 6px;
  font-size: 14px;
}

.layout {
  display: flex;
}

.sidebar {
  width: 250px;
  height: calc(100vh - 65px);
  background: var(--cp-surface-0);
  border-right: 1px solid var(--cp-border);
  overflow-y: auto;
  padding: 20px 0;
}

.nav-group {
  padding: 12px 20px;
  font-size: 12px;
  font-weight: 600;
  color: var(--cp-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-item {
  display: block;
  padding: 10px 20px;
  color: var(--cp-text-secondary);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-item:hover {
  color: var(--cp-text-primary);
  background: var(--cp-surface-1);
}

.nav-item.active {
  color: var(--cp-primary);
  background: var(--cp-primary-subtle);
  border-left: 3px solid var(--cp-primary);
}

.main-content {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
  height: calc(100vh - 65px);
}

.page h1 {
  font-size: 36px;
  margin-bottom: 16px;
  color: var(--cp-text-primary);
}

.page h2 {
  font-size: 24px;
  margin: 32px 0 16px;
  color: var(--cp-text-primary);
}

.page h3 {
  font-size: 18px;
  margin: 20px 0 12px;
  color: var(--cp-text-primary);
}

.page p {
  font-size: 16px;
  line-height: 1.6;
  color: var(--cp-text-secondary);
  margin-bottom: 16px;
}

.page pre {
  background: var(--cp-surface-1);
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 16px 0;
}

.page code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: var(--cp-primary);
}

.demo-section {
  margin: 24px 0;
  padding: 20px;
  background: var(--cp-surface-1);
  border-radius: 8px;
  border: 1px solid var(--cp-border);
}

.demo-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
