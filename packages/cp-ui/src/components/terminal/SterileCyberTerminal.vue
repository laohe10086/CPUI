<template>
  <div class="sc-terminal">
    <div class="sc-terminal__header">
      <span class="sc-terminal__title">{{ title }}</span>
      <div class="sc-terminal__controls">
        <span class="sc-terminal__dot sc-terminal__dot--min">_</span>
        <span class="sc-terminal__dot sc-terminal__dot--max">□</span>
        <span class="sc-terminal__dot sc-terminal__dot--close">✕</span>
      </div>
    </div>
    <div ref="bodyRef" class="sc-terminal__body">
      <div
        v-for="(entry, i) in entries"
        :key="i"
        class="sc-terminal__line"
        :class="`sc-terminal__line--${entry.type || 'info'}`"
      >
        <span v-if="entry.timestamp" class="sc-terminal__ts">{{ entry.timestamp }}</span>
        <span v-if="entry.source" class="sc-terminal__src">[{{ entry.source }}]</span>
        <span class="sc-terminal__msg">{{ entry.message }}</span>
      </div>
      <slot />
    </div>
    <div v-if="showStatus" class="sc-terminal__status">
      <CpStatusLed :status="statusState" :pulse="true" size="sm" />
      <span class="sc-terminal__status-text">{{ statusText }}</span>
      <span v-if="memory" class="sc-terminal__mem">MEM: {{ memory }}</span>
      <span v-if="uptime" class="sc-terminal__uptime">UP: {{ uptime }}</span>
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

defineExpose({ bodyRef })
</script>

<style lang="scss" scoped>
.sc-terminal {
  background: var(--cp-bg-void);
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  font-family: var(--cp-font-mono);
  font-size: 0.85em;
  overflow: hidden;
}

.sc-terminal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--cp-bg-elevated);
  border-bottom: 1px solid var(--cp-border-base);
  box-shadow: 0 1px 0 rgba(0, 240, 255, 0.05);
}

.sc-terminal__title {
  color: var(--cp-text-secondary);
  font-size: 0.9em;
  letter-spacing: 0.5px;
}

.sc-terminal__controls {
  display: flex;
  gap: 6px;
}

.sc-terminal__dot {
  font-size: 10px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cp-text-muted);

  &--close {
    color: var(--cp-color-danger);
    box-shadow: 0 0 3px var(--cp-color-danger);
  }
}

.sc-terminal__body {
  padding: 12px;
  max-height: 320px;
  overflow-y: auto;
  line-height: 1.6;

  &::-webkit-scrollbar { width: 4px; border-radius: 0; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: var(--cp-border-base); border-radius: 0; }
}

.sc-terminal__line {
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

.sc-terminal__ts {
  color: var(--cp-text-dim);
  margin-right: 8px;
}

.sc-terminal__src {
  color: var(--cp-color-secondary);
  margin-right: 6px;
}

.sc-terminal__status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-top: 1px solid var(--cp-border-base);
  background: var(--cp-bg-elevated);
  font-size: 0.85em;
}

.sc-terminal__status-text {
  color: var(--cp-text-secondary);
}

.sc-terminal__mem,
.sc-terminal__uptime {
  margin-left: auto;
  color: var(--cp-text-dim);
  font-size: 0.85em;
}

.sc-terminal__uptime {
  margin-left: 12px;
}
</style>
