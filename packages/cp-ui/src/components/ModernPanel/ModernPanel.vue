<template>
  <div class="modern-panel">
    <div v-if="title || $slots.header" class="modern-panel__header">
      <slot name="header">
        <span v-if="label" class="modern-panel__label">{{ label }}</span>
        <span v-if="title" class="modern-panel__title">{{ title }}</span>
      </slot>
    </div>
    <div class="modern-panel__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PanelProps } from '../../types/components'

withDefaults(defineProps<PanelProps>(), {
  title: '',
  label: '',
})
</script>

<style scoped lang="scss">
.modern-panel {
  background: var(--cp-surface-1);
  border: 1px solid var(--cp-border);
  border-radius: var(--cp-radius-lg);
  box-shadow: var(--cp-shadow-sm);
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 18px;
    border-bottom: 1px solid var(--cp-border);
    font-family: var(--cp-font-family);
  }

  &__label {
    padding: 2px 8px;
    font-size: 11px;
    font-weight: 500;
    color: var(--cp-primary);
    background: var(--cp-primary-subtle);
    border-radius: var(--cp-radius-full);
    letter-spacing: 0.02em;
  }

  &__title {
    font-size: var(--cp-font-size-sm);
    font-weight: 600;
    color: var(--cp-text-primary);
    letter-spacing: -0.01em;
  }

  &__body {
    padding: 18px;
    font-family: var(--cp-font-family);
    font-size: var(--cp-font-size-sm);
    color: var(--cp-text-secondary);
  }
}
</style>
