<template>
  <div class="cyber-panel" :class="{'cyber-panel--cut': shape === 'cut', 'cyber-panel--irregular': shape === 'irregular', 'cyber-panel--regular': shape === 'regular'}">
    <div v-if="title || $slots.header" class="cyber-panel__header">
      <slot name="header">
        <span v-if="label" class="cyber-panel__label">{{ label }}</span>
        <span v-if="title" class="cyber-panel__title">{{ title }}</span>
      </slot>
    </div>
    <div class="cyber-panel__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PanelProps } from '../../types/components'

withDefaults(defineProps<PanelProps>(), {
  title: '',
  label: '',
  shape: 'irregular',
})
</script>

<style lang="scss" scoped>
.cyber-panel {
  background: var(--cp-bg-panel);
  border: 1px solid var(--cp-border-base);

  &--cut {
    clip-path: var(--cp-cut-corner-md);
  }
  &--irregular {
    clip-path: polygon(
      6px 0,
      calc(100% - 12px) 0,
      100% 12px,
      100% calc(100% - 8px),
      calc(100% - 50%) calc(100% - 8px),
      calc(100% - 55%) 100%,
      calc(100% - 65%) 100%,
      calc(100% - 70%) calc(100% - 8px),
      0 calc(100% - 8px),
      0 6px
    );
  }
  &--regular {
    border-radius: 0;
  }

  &__header {
    padding: 14px 18px;
    background: rgba(255, 255, 255, 0.02);
    border-bottom: 1px solid var(--cp-border-dim);
    box-shadow: 0 1px 0 rgba(0, 240, 255, 0.08);
  }

  &__label {
    font-family: var(--cp-font-mono);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 10px;
    color: var(--cp-color-secondary);
    opacity: 0.7;
    text-shadow: 0 0 6px var(--cp-glow-secondary);
  }

  &__title {
    font-family: var(--cp-font-mono);
    font-size: 13px;
    color: var(--cp-text-secondary);
  }

  &__body {
    padding: 18px;
    background-image: radial-gradient(rgba(0, 240, 255, 0.04) 1px, transparent 1px);
    background-size: 8px 8px;
  }
}
</style>
