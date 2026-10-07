<template>
  <span class="sterile-badge" :class="[`sterile-badge--${variant}`]">
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
.sterile-badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--cp-font-sans, 'Inter', sans-serif);
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 0;

  &--default {
    background: rgba(255, 255, 255, 0.04);
    color: var(--cp-text-secondary);
    border: 1px solid var(--cp-border-base);
  }
  &--primary {
    background: rgba(184, 160, 0, 0.08);
    color: var(--cp-color-primary);
    border: 1px solid rgba(184, 160, 0, 0.15);
  }
  &--secondary {
    background: rgba(0, 153, 170, 0.08);
    color: var(--cp-color-secondary);
    border: 1px solid rgba(0, 153, 170, 0.15);
  }
  &--danger {
    background: rgba(200, 30, 30, 0.08);
    color: var(--cp-color-danger);
    border: 1px solid rgba(200, 30, 30, 0.15);
  }
  &--success {
    background: rgba(0, 160, 40, 0.08);
    color: var(--cp-color-success);
    border: 1px solid rgba(0, 160, 40, 0.15);
  }
}
</style>
