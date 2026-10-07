<template>
  <div class="cyber-modern-panel">
    <div class="cyber-modern-panel__glow-line" />
    <div v-if="title || $slots.header" class="cyber-modern-panel__header">
      <slot name="header">
        <span v-if="label" class="cyber-modern-panel__label">{{ label }}</span>
        <span v-if="title" class="cyber-modern-panel__title">{{ title }}</span>
      </slot>
    </div>
    <div class="cyber-modern-panel__body">
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
.cyber-modern-panel {
  position: relative;
  background: var(--cp-surface-1);
  border: 1px solid var(--cp-border);
  border-radius: var(--cp-radius-md);
  overflow: hidden;
  transition: all var(--cp-transition);

  &:hover {
    border-color: var(--cp-primary);
    box-shadow: 0 0 24px var(--cp-primary-subtle);
  }

  &__glow-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--cp-primary) 50%, transparent);
    opacity: 0.5;
    pointer-events: none;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 18px;
    border-bottom: 1px solid var(--cp-border);
    background: var(--cp-surface-2);
    font-family: var(--cp-font-family);
  }

  &__label {
    padding: 2px 8px;
    font-size: 11px;
    font-weight: 500;
    color: var(--cp-secondary);
    background: var(--cp-secondary-subtle);
    border: 1px solid var(--cp-secondary);
    border-radius: var(--cp-radius-full);
    letter-spacing: 0.02em;
  }

  &__title {
    font-size: var(--cp-font-size-sm);
    font-weight: 600;
    color: var(--cp-text-primary);
    letter-spacing: 0.02em;
  }

  &__body {
    padding: 18px;
    font-family: var(--cp-font-family);
    font-size: var(--cp-font-size-sm);
    color: var(--cp-text-secondary);
  }
}
</style>
