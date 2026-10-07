<template>
  <span :class="['modern-badge', `modern-badge--${variant}`]">
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
.modern-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 8px;
  font-family: var(--cp-font-family);
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  border-radius: var(--cp-radius-full);
  letter-spacing: -0.01em;
  transition: all var(--cp-transition);

  &--default {
    background: var(--cp-surface-2);
    color: var(--cp-text-secondary);
    border: 1px solid var(--cp-border);
  }

  &--primary {
    background: var(--cp-primary);
    color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  &--secondary {
    background: transparent;
    color: var(--cp-text-primary);
    border: 1px solid var(--cp-border);
  }

  &--success {
    background: var(--cp-success);
    color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  &--danger {
    background: var(--cp-error);
    color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
}
</style>
