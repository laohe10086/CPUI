<template>
  <span :class="['modern-tag', `modern-tag--${variant}`]">
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
.modern-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  font-family: var(--cp-font-family);
  font-size: var(--cp-font-size-xs);
  font-weight: 500;
  border-radius: var(--cp-radius-full);
  letter-spacing: 0.02em;

  &--default {
    background: var(--cp-surface-2);
    color: var(--cp-text-secondary);
    border: 1px solid var(--cp-border);
  }

  &--primary {
    background: var(--cp-primary-subtle);
    color: var(--cp-primary);
    border: 1px solid var(--cp-primary);
  }

  &--success {
    background: rgba(16, 185, 129, 0.1);
    color: var(--cp-success);
    border: 1px solid var(--cp-success);
  }

  &--warning {
    background: rgba(245, 158, 11, 0.1);
    color: var(--cp-warning);
    border: 1px solid var(--cp-warning);
  }

  &--danger {
    background: rgba(239, 68, 68, 0.1);
    color: var(--cp-error);
    border: 1px solid var(--cp-error);
  }
}
</style>
