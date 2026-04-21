<template>
  <div class="cyber-terminal">
    <div class="cyber-terminal__header">
      <span class="cyber-terminal__title">{{ title }}</span>
      <div class="cyber-terminal__controls">
        <span class="cyber-terminal__dot cyber-terminal__dot--min">_</span>
        <span class="cyber-terminal__dot cyber-terminal__dot--max">□</span>
        <span class="cyber-terminal__dot cyber-terminal__dot--close">✕</span>
      </div>
    </div>
    <div ref="bodyRef" class="cyber-terminal__body">
      <div
        v-for="(entry, i) in entries"
        :key="i"
        class="cyber-terminal__line"
        :class="`cyber-terminal__line--${entry.type || 'info'}`"
      >
        <span v-if="entry.timestamp" class="cyber-terminal__ts">{{ entry.timestamp }}</span>
        <span v-if="entry.source" class="cyber-terminal__src">[{{ entry.source }}]</span>
        <span class="cyber-terminal__msg">{{ entry.message }}</span>
      </div>
      <slot />
    </div>
    <div v-if="showStatus" class="cyber-terminal__status">
      <CpStatusLed :status="statusState" :pulse="true" size="sm" />
      <span class="cyber-terminal__status-text">{{ statusText }}</span>
      <span v-if="memory" class="cyber-terminal__mem">MEM: {{ memory }}</span>
      <span v-if="uptime" class="cyber-terminal__uptime">UP: {{ uptime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TerminalProps } from '../../types/components'
import CpStatusLed from '../status-led/CpStatusLed.vue'

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
.cyber-terminal {
  background: var(--cp-bg-void);
  border: 1px solid var(--cp-border-base);
  font-family: var(--cp-font-mono);
  font-size: 0.85em;
  overflow: hidden;
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 10px));
}

.cyber-terminal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--cp-bg-elevated);
  border-bottom: 1px solid var(--cp-border-base);
  box-shadow: 0 1px 0 rgba(0, 240, 255, 0.08);
}

.cyber-terminal__title {
  color: var(--cp-text-secondary);
  letter-spacing: 1px;
  font-size: 0.9em;
}

.cyber-terminal__controls {
  display: flex;
  gap: 6px;
}

.cyber-terminal__dot {
  font-size: 10px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cp-text-muted);

  &--close {
    color: var(--cp-color-danger);
    box-shadow: 0 0 4px var(--cp-color-danger);
  }
}

.cyber-terminal__body {
  padding: 12px;
  max-height: 320px;
  overflow-y: auto;
  line-height: 1.6;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: var(--cp-border-base); }
}

.cyber-terminal__line {
  padding: 2px 0;
  color: var(--cp-text-secondary);

  &--info { color: var(--cp-text-secondary); }
  &--warning { color: var(--cp-color-warning); }
  &--error { color: var(--cp-color-danger); }
  &--success { color: var(--cp-color-success); }
  &--system {
    color: var(--cp-color-secondary);
    text-shadow: 0 0 4px var(--cp-glow-secondary);
  }
}

.cyber-terminal__ts {
  color: var(--cp-text-dim);
  margin-right: 8px;
}

.cyber-terminal__src {
  color: var(--cp-color-secondary);
  margin-right: 6px;
}

.cyber-terminal__status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-top: 1px solid var(--cp-border-base);
  background: var(--cp-bg-elevated);
  font-size: 0.85em;
}

.cyber-terminal__status-text {
  color: var(--cp-text-secondary);
}

.cyber-terminal__mem,
.cyber-terminal__uptime {
  margin-left: auto;
  color: var(--cp-text-dim);
  font-size: 0.85em;
}

.cyber-terminal__uptime {
  margin-left: 12px;
}
</style>
