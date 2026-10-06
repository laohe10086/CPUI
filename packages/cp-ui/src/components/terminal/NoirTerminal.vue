<template>
  <div class="noir-terminal">
    <div class="noir-terminal__header">
      <span class="noir-terminal__title">{{ title }}</span>
      <div class="noir-terminal__controls">
        <span class="noir-terminal__dot noir-terminal__dot--min">_</span>
        <span class="noir-terminal__dot noir-terminal__dot--max">□</span>
        <span class="noir-terminal__dot noir-terminal__dot--close">✕</span>
      </div>
    </div>
    <div ref="bodyRef" class="noir-terminal__body">
      <div
        v-for="(entry, i) in entries"
        :key="i"
        class="noir-terminal__line"
        :class="`noir-terminal__line--${entry.type || 'info'}`"
      >
        <span v-if="entry.timestamp" class="noir-terminal__ts">{{ entry.timestamp }}</span>
        <span v-if="entry.source" class="noir-terminal__src">[{{ entry.source }}]</span>
        <span class="noir-terminal__msg">{{ entry.message }}</span>
      </div>
      <slot />
    </div>
    <div v-if="showStatus" class="noir-terminal__status">
      <span class="noir-terminal__status-dot" :class="`noir-terminal__status-dot--${statusState}`" />
      <span class="noir-terminal__status-text">{{ statusText }}</span>
      <span v-if="memory" class="noir-terminal__mem">MEM: {{ memory }}</span>
      <span v-if="uptime" class="noir-terminal__uptime">UP: {{ uptime }}</span>
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
.noir-terminal {
  background: var(--cp-bg-void);
  border: 2px solid var(--cp-color-primary);
  font-family: var(--cp-font-mono);
  font-size: 0.85em;
  overflow: hidden;
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  box-shadow: 0 0 20px var(--cp-glow-primary);
}

.noir-terminal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--cp-bg-elevated);
  border-bottom: 2px solid var(--cp-color-primary);
}

.noir-terminal__title {
  color: var(--cp-color-primary);
  letter-spacing: 1px;
  font-size: 0.9em;
  text-shadow: 0 0 8px var(--cp-glow-primary);
  text-decoration: underline;
  text-decoration-color: var(--cp-color-secondary);
  text-underline-offset: 3px;
}

.noir-terminal__controls {
  display: flex;
  gap: 6px;
}

.noir-terminal__dot {
  font-size: 10px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cp-text-muted);

  &--close {
    color: var(--cp-color-danger);
    text-shadow: 0 0 8px var(--cp-color-danger);
  }
}

.noir-terminal__body {
  padding: 12px;
  max-height: 320px;
  overflow-y: auto;
  line-height: 1.6;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: var(--cp-color-primary); }
}

.noir-terminal__line {
  padding: 2px 0;
  color: var(--cp-text-secondary);

  &--info { color: var(--cp-text-secondary); }
  &--warning { 
    color: var(--cp-color-warning);
    text-shadow: 0 0 6px var(--cp-color-warning);
  }
  &--error { 
    color: var(--cp-color-danger);
    text-shadow: 0 0 6px var(--cp-color-danger);
  }
  &--success { 
    color: var(--cp-color-success);
    text-shadow: 0 0 6px var(--cp-color-success);
  }
  &--system {
    color: var(--cp-color-primary);
    text-shadow: 0 0 8px var(--cp-glow-primary);
    text-decoration: underline;
    text-decoration-color: var(--cp-color-secondary);
    text-underline-offset: 2px;
  }
}

.noir-terminal__ts {
  color: var(--cp-text-dim);
  margin-right: 8px;
}

.noir-terminal__src {
  color: var(--cp-color-secondary);
  margin-right: 6px;
  text-shadow: 0 0 6px var(--cp-glow-secondary);
}

.noir-terminal__status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-top: 2px solid var(--cp-color-primary);
  background: var(--cp-bg-elevated);
  font-size: 0.85em;
}

.noir-terminal__status-dot {
  width: 8px;
  height: 8px;
  background: var(--cp-text-dim);
  clip-path: polygon(2px 0, 100% 0, 100% calc(100% - 2px), calc(100% - 2px) 100%, 0 100%, 0 2px);
  
  &--online { 
    background: var(--cp-color-success);
    box-shadow: 0 0 8px var(--cp-color-success);
  }
  &--busy { 
    background: var(--cp-color-warning);
    box-shadow: 0 0 8px var(--cp-color-warning);
  }
  &--error { 
    background: var(--cp-color-danger);
    box-shadow: 0 0 8px var(--cp-color-danger);
  }
  &--offline { background: var(--cp-text-dim); }
}

.noir-terminal__status-text {
  color: var(--cp-color-primary);
  text-shadow: 0 0 6px var(--cp-glow-primary);
}

.noir-terminal__mem,
.noir-terminal__uptime {
  margin-left: auto;
  color: var(--cp-text-dim);
  font-size: 0.85em;
}
</style>
