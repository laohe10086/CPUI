<template>
  <span class="sc-badge" :class="[`sc-badge--${variant}`]">
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

<style lang="scss" scoped>
.sc-badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--cp-font-mono);
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 0;
  letter-spacing: 0.04em;

  &--default {
    background: rgba(255, 255, 255, 0.06);
    color: var(--cp-text-secondary);
    border: 1px solid var(--cp-border-base);
  }
  &--primary {
    background: rgba(252, 232, 3, 0.1);
    color: var(--cp-color-primary);
    border: 1px solid rgba(252, 232, 3, 0.2);
    text-shadow: 0 0 6px rgba(252, 232, 3, 0.2);
  }
  &--secondary {
    background: rgba(0, 240, 255, 0.1);
    color: var(--cp-color-secondary);
    border: 1px solid rgba(0, 240, 255, 0.2);
    text-shadow: 0 0 6px rgba(0, 240, 255, 0.2);
  }
  &--danger {
    background: rgba(255, 0, 60, 0.1);
    color: var(--cp-color-danger);
    border: 1px solid rgba(255, 0, 60, 0.2);
    text-shadow: 0 0 6px rgba(255, 0, 60, 0.2);
  }
  &--success {
    background: rgba(0, 255, 65, 0.1);
    color: var(--cp-color-success);
    border: 1px solid rgba(0, 255, 65, 0.2);
    text-shadow: 0 0 6px rgba(0, 255, 65, 0.2);
  }
}
</style>
