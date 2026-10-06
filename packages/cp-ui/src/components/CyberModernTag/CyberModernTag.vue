<template>
  <span :class="['cyber-modern-tag', `cyber-modern-tag--${variant}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { TagProps } from '../../types/components'

withDefaults(defineProps<TagProps>(), {
  variant: 'default',
})
</script>

<style scoped lang="scss">
.cyber-modern-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  font-family: var(--cp-font-family);
  font-size: var(--cp-font-size-xs);
  font-weight: 500;
  border-radius: var(--cp-radius-full);
  letter-spacing: 0.03em;

  &--default {
    background: var(--cp-surface-2);
    color: var(--cp-text-secondary);
    border: 1px solid var(--cp-border);
    box-shadow: 0 0 8px rgba(0, 217, 255, 0.05);
  }

  &--primary {
    background: var(--cp-primary-subtle);
    color: var(--cp-primary);
    border: 1px solid var(--cp-primary);
    box-shadow: 0 0 12px var(--cp-primary-subtle);
  }

  &--success {
    background: rgba(0, 255, 159, 0.1);
    color: var(--cp-success);
    border: 1px solid var(--cp-success);
    box-shadow: 0 0 12px rgba(0, 255, 159, 0.2);
  }

  &--warning {
    background: rgba(255, 170, 0, 0.1);
    color: var(--cp-warning);
    border: 1px solid var(--cp-warning);
    box-shadow: 0 0 12px rgba(255, 170, 0, 0.2);
  }

  &--danger {
    background: rgba(255, 0, 85, 0.1);
    color: var(--cp-error);
    border: 1px solid var(--cp-error);
    box-shadow: 0 0 12px rgba(255, 0, 85, 0.2);
  }
}
</style>
