<template>
  <CpThemeProvider :theme="currentTheme">
    <div style="padding: 20px; min-height: 100vh;">
      <h1 style="color: white;">CpUI Playground - 逐步测试</h1>
      
      <div style="margin: 20px 0;">
        <select v-model="currentTheme" style="padding: 8px;">
          <option value="cyberpunk">赛博朋克</option>
          <option value="sterile-cyber">无菌赛博</option>
          <option value="modern">现代科技</option>
        </select>
      </div>

      <div style="padding: 20px; background: var(--cp-surface-1); border-radius: 8px;">
        <h2 style="color: var(--cp-text-primary);">测试基础组件</h2>
        <div style="display: flex; gap: 8px; margin-top: 10px;">
          <CyberButton>Cyber Button</CyberButton>
          <ModernButton>Modern Button</ModernButton>
        </div>
      </div>
    </div>
  </CpThemeProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  CpThemeProvider,
  CyberButton,
  ModernButton,
} from '@cp-ui/index'

const currentTheme = ref('sterile-cyber')
</script>
