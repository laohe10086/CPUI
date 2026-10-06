<template>
  <div class="brutal-terminal">
    <div class="brutal-terminal__header">
      <span class="brutal-terminal__title">{{ title }}</span>
      <div class="brutal-terminal__controls">
        <span class="brutal-terminal__btn">_</span>
        <span class="brutal-terminal__btn">□</span>
        <span class="brutal-terminal__btn">X</span>
      </div>
    </div>
    <div ref="bodyRef" class="brutal-terminal__body">
      <div
        v-for="(entry, i) in entries"
        :key="i"
        class="brutal-terminal__line"
        :class="`brutal-terminal__line--${entry.type || 'info'}`"
      >
        <span class="brutal-terminal__prompt">&gt;</span>
        <span v-if="entry.timestamp" class="brutal-terminal__ts">{{ entry.timestamp }}</span>
        <span v-if="entry.source" class="brutal-terminal__src">[ {{ entry.source }} ]</span>
        <span class="brutal-terminal__msg">{{ entry.message }}</span>
      </div>
      <slot />
    </div>
    <div v-if="showStatus" class="brutal-terminal__status">
      <span class="brutal-terminal__status-label">[ {{ statusText }} ]</span>
      <span v-if="memory" class="brutal-terminal__mem">MEM: {{ memory }}</span>
      <span v-if="uptime" class="brutal-terminal__uptime">UP: {{ uptime }}</span>
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
.brutal-terminal {
  background: var(--cp-bg-void);
  border: 2px solid var(--cp-border-base);
  font-family: var(--cp-font-mono);
  font-size: 0.85em;
  overflow: hidden;
}

.brutal-terminal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--cp-bg-elevated);
  border-bottom: 2px solid var(--cp-border-base);
}

.brutal-terminal__title {
  color: var(--cp-text-primary);
  letter-spacing: 2px;
  font-size: 0.85em;
  font-weight: 700;
  text-transform: uppercase;
}

.brutal-terminal__controls {
  display: flex;
  gap: 8px;
}

.brutal-terminal__btn {
  font-size: 10px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cp-text-muted);
  border: 2px solid var(--cp-border-base);
  font-weight: 700;
}

.brutal-terminal__body {
  padding: 12px;
  max-height: 320px;
  overflow-y: auto;
  line-height: 1.8;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { 
    background: var(--cp-border-base);
    border: 2px solid var(--cp-bg-void);
  }
}

.brutal-terminal__line {
  padding: 2px 0;
  color: var(--cp-text-primary);
  display: flex;
  gap: 8px;

  &--info { color: var(--cp-text-primary); }
  &--warning { color: var(--cp-color-warning); }
  &--error { color: var(--cp-color-danger); }
  &--success { color: var(--cp-color-success); }
  &--system { color: var(--cp-color-primary); }
}

.brutal-terminal__prompt {
  color: var(--cp-text-primary);
  font-weight: 700;
}

.brutal-terminal__ts {
  color: var(--cp-text-muted);
  font-size: 0.9em;
}

.brutal-terminal__src {
  color: var(--cp-text-primary);
  font-weight: 700;
}

.brutal-terminal__status {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-top: 2px solid var(--cp-border-base);
  background: var(--cp-bg-elevated);
  font-size: 0.85em;
}

.brutal-terminal__status-label {
  color: var(--cp-text-primary);
  font-weight: 700;
  letter-spacing: 1px;
}

.brutal-terminal__mem,
.brutal-terminal__uptime {
  margin-left: auto;
  color: var(--cp-text-muted);
  font-size: 0.85em;
  font-weight: 700;
}
</style>
