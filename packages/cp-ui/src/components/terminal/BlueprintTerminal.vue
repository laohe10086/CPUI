<template>
  <div class="blueprint-terminal">
    <div class="blueprint-terminal__header">
      <span class="blueprint-terminal__title">{{ title }}</span>
      <div class="blueprint-terminal__controls">
        <span class="blueprint-terminal__dot">_</span>
        <span class="blueprint-terminal__dot">□</span>
        <span class="blueprint-terminal__dot">✕</span>
      </div>
    </div>
    <div ref="bodyRef" class="blueprint-terminal__body">
      <div
        v-for="(entry, i) in entries"
        :key="i"
        class="blueprint-terminal__line"
        :class="`blueprint-terminal__line--${entry.type || 'info'}`"
      >
        <span v-if="entry.timestamp" class="blueprint-terminal__ts">{{ entry.timestamp }}</span>
        <span v-if="entry.source" class="blueprint-terminal__src">[{{ entry.source }}]</span>
        <span class="blueprint-terminal__msg">{{ entry.message }}</span>
      </div>
      <slot />
    </div>
    <div v-if="showStatus" class="blueprint-terminal__status">
      <span class="blueprint-terminal__status-dot" :class="`blueprint-terminal__status-dot--${statusState}`" />
      <span class="blueprint-terminal__status-text">{{ statusText }}</span>
      <span v-if="memory" class="blueprint-terminal__mem">MEM: {{ memory }}</span>
      <span v-if="uptime" class="blueprint-terminal__uptime">UP: {{ uptime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TerminalProps } from '../../types/components'

withDefaults(defineProps<TerminalProps>(), {
  title: 'TERMINAL',
  entries: () => [],
  showStatus: true,
  statusState: 'online',
  statusText: 'ACTIVE',
  memory: '',
  uptime: '',
})

const bodyRef = ref<HTMLElement | null>(null)
</script>

<style lang="scss" scoped>
.blueprint-terminal {
  background: var(--cp-bg-void);
  border: 1px solid var(--cp-border-base);
  font-family: var(--cp-font-mono);
  font-size: 0.85em;
  overflow: hidden;
}

.blueprint-terminal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--cp-bg-elevated);
  border-bottom: 1px dashed var(--cp-border-base);
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border: 1px solid var(--cp-border-base);
  }

  &::before {
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    border-right: 0;
    border-top: 0;
    border-bottom: 0;
  }

  &::after {
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    border-left: 0;
    border-top: 0;
    border-bottom: 0;
  }
}

.blueprint-terminal__title {
  color: var(--cp-text-muted);
  letter-spacing: 1.5px;
  font-size: 0.85em;
  padding-left: 16px;
}

.blueprint-terminal__controls {
  display: flex;
  gap: 8px;
  padding-right: 16px;
}

.blueprint-terminal__dot {
  font-size: 10px;
  color: var(--cp-text-dim);
}

.blueprint-terminal__body {
  padding: 12px;
  max-height: 320px;
  overflow-y: auto;
  line-height: 1.6;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: var(--cp-border-base); }
}

.blueprint-terminal__line {
  padding: 2px 0;
  color: var(--cp-text-secondary);
  position: relative;
  padding-left: 12px;

  &::before {
    content: '▪';
    position: absolute;
    left: 0;
    font-size: 0.6em;
    opacity: 0.4;
  }

  &--info { color: var(--cp-text-secondary); }
  &--warning { 
    color: var(--cp-color-warning);
    &::before { color: var(--cp-color-warning); opacity: 0.6; }
  }
  &--error { 
    color: var(--cp-color-danger);
    &::before { color: var(--cp-color-danger); opacity: 0.6; }
  }
  &--success { 
    color: var(--cp-color-success);
    &::before { color: var(--cp-color-success); opacity: 0.6; }
  }
  &--system {
    color: var(--cp-color-primary);
    &::before { color: var(--cp-color-primary); opacity: 0.6; }
  }
}

.blueprint-terminal__ts {
  color: var(--cp-text-dim);
  margin-right: 8px;
  font-size: 0.9em;
}

.blueprint-terminal__src {
  color: var(--cp-color-secondary);
  margin-right: 6px;
}

.blueprint-terminal__status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-top: 1px dashed var(--cp-border-base);
  background: var(--cp-bg-elevated);
  font-size: 0.85em;
}

.blueprint-terminal__status-dot {
  width: 6px;
  height: 6px;
  background: var(--cp-text-dim);
  
  &--online { background: var(--cp-color-success); }
  &--busy { background: var(--cp-color-warning); }
  &--error { background: var(--cp-color-danger); }
  &--offline { background: var(--cp-text-dim); }
}

.blueprint-terminal__status-text {
  color: var(--cp-text-muted);
  letter-spacing: 0.5px;
}

.blueprint-terminal__mem,
.blueprint-terminal__uptime {
  margin-left: auto;
  color: var(--cp-text-dim);
  font-size: 0.85em;
}
</style>
