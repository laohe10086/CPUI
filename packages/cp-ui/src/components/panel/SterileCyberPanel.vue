<template>
  <div class="sc-panel">
    <div v-if="title || $slots.header" class="sc-panel__header">
      <slot name="header">
        <span v-if="label" class="sc-panel__label">{{ label }}</span>
        <span v-if="title" class="sc-panel__title">{{ title }}</span>
      </slot>
    </div>
    <div class="sc-panel__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PanelProps } from '../../types/components'

withDefaults(defineProps<PanelProps>(), {
  title: '',
  label: '',
  shape: 'regular',
})
</script>

<style lang="scss" scoped>
.sc-panel {
  background: var(--cp-bg-panel);
  border: 1px solid var(--cp-border-base);
  border-radius: 0;

  &__header {
    padding: 14px 18px;
    background: rgba(255, 255, 255, 0.02);
    border-bottom: 1px solid var(--cp-border-dim);
    box-shadow: 0 1px 0 rgba(0, 240, 255, 0.05);
  }

  &__label {
    font-family: var(--cp-font-mono);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 10px;
    color: var(--cp-color-secondary);
    opacity: 0.6;
  }

  &__title {
    font-family: var(--cp-font-mono);
    font-size: 13px;
    color: var(--cp-text-secondary);
  }

  &__body {
    padding: 18px;
  }
}
</style>
