<template>
  <div class="sterile-terminal">
    <div class="sterile-terminal__header">
      <span class="sterile-terminal__title">{{ title }}</span>
      <div class="sterile-terminal__controls">
        <span class="sterile-terminal__dot sterile-terminal__dot--min">_</span>
        <span class="sterile-terminal__dot sterile-terminal__dot--max">□</span>
        <span class="sterile-terminal__dot sterile-terminal__dot--close">✕</span>
      </div>
    </div>
    <div ref="bodyRef" class="sterile-terminal__body">
      <div
        v-for="(entry, i) in entries"
        :key="i"
        class="sterile-terminal__line"
        :class="`sterile-terminal__line--${entry.type || 'info'}`"
      >
        <span v-if="entry.timestamp" class="sterile-terminal__ts">{{ entry.timestamp }}</span>
        <span v-if="entry.source" class="sterile-terminal__src">[{{ entry.source }}]</span>
        <span class="sterile-terminal__msg">{{ entry.message }}</span>
      </div>
      <slot />
    </div>
    <div v-if="showStatus" class="sterile-terminal__status">
      <CpStatusLed :status="statusState" :pulse="true" size="sm" />
      <span class="sterile-terminal__status-text">{{ statusText }}</span>
      <span v-if="memory" class="sterile-terminal__mem">MEM: {{ memory }}</span>
      <span v-if="uptime" class="sterile-terminal__uptime">UP: {{ uptime }}</span>
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
.sterile-terminal {
  background: var(--cp-bg-void);
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  font-family: var(--cp-font-mono);
  font-size: 0.85em;
  overflow: hidden;
}

.sterile-terminal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--cp-bg-elevated);
  border-bottom: 1px solid var(--cp-border-base);
}

.sterile-terminal__title {
  font-family: var(--cp-font-sans, 'Inter', sans-serif);
  color: var(--cp-text-secondary);
  font-size: 0.9em;
}

.sterile-terminal__controls {
  display: flex;
  gap: 6px;
}

.sterile-terminal__dot {
  font-size: 10px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cp-text-muted);

  &--close { color: var(--cp-color-danger); }
}

.sterile-terminal__body {
  padding: 12px;
  max-height: 320px;
  overflow-y: auto;
  line-height: 1.6;

  &::-webkit-scrollbar { width: 4px; border-radius: 2px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: var(--cp-border-base); border-radius: 2px; }
}

.sterile-terminal__line {
  padding: 2px 0;
  color: var(--cp-text-secondary);

  &--info { color: var(--cp-text-secondary); }
  &--warning { color: var(--cp-color-warning); }
  &--error { color: var(--cp-color-danger); }
  &--success { color: var(--cp-color-success); }
  &--system { color: var(--cp-color-secondary); }
}

.sterile-terminal__ts {
  color: var(--cp-text-dim);
  margin-right: 8px;
}

.sterile-terminal__src {
  color: var(--cp-color-secondary);
  margin-right: 6px;
}

.sterile-terminal__status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-top: 1px solid var(--cp-border-base);
  background: var(--cp-bg-elevated);
  font-size: 0.85em;
}

.sterile-terminal__status-text {
  color: var(--cp-text-secondary);
}

.sterile-terminal__mem,
.sterile-terminal__uptime {
  margin-left: auto;
  color: var(--cp-text-dim);
  font-size: 0.85em;
}

.sterile-terminal__uptime {
  margin-left: 12px;
}
</style>
