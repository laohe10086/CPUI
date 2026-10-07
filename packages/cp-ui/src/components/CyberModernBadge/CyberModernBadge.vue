<template>
  <span :class="['cyber-modern-badge', `cyber-modern-badge--${variant}`]">
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup lang="ts">
import type { BadgeProps } from '../../types/components'

withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
  text: '',
})
</script>

<style scoped lang="scss">
.cyber-modern-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 10px;
  font-family: var(--cp-font-family);
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  border-radius: var(--cp-radius-full);
  letter-spacing: 0.02em;
  transition: all var(--cp-transition);

  &--default {
    background: var(--cp-surface-2);
    color: var(--cp-text-secondary);
    border: 1px solid var(--cp-border);
  }

  &--primary {
    background: var(--cp-primary);
    color: var(--cp-background);
    box-shadow: 0 0 12px var(--cp-primary-subtle);
  }

  &--secondary {
    background: transparent;
    color: var(--cp-secondary);
    border: 1px solid var(--cp-secondary);
    box-shadow: 0 0 8px var(--cp-secondary-subtle);
  }

  &--success {
    background: transparent;
    color: var(--cp-success);
    border: 1px solid var(--cp-success);
    box-shadow: 0 0 8px rgba(0, 255, 159, 0.15);
  }

  &--danger {
    background: transparent;
    color: var(--cp-error);
    border: 1px solid var(--cp-error);
    box-shadow: 0 0 8px rgba(255, 0, 85, 0.15);
  }
}
</style>
