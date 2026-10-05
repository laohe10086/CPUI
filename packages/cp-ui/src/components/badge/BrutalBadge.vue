<template>
  <span class="brutal-badge" :class="[`brutal-badge--${variant}`]">
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
// 直角编号格：等宽数字 + 硬边框，primary 实色填充
.brutal-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  font-family: var(--cp-font-mono);
  font-size: 11px;
  font-weight: 600;
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  background: transparent;

  &--default {
    color: var(--cp-text-secondary);
    border-color: var(--cp-border-base);
  }
  &--primary {
    color: #fff;
    background: var(--cp-color-primary);
    border-color: var(--cp-color-primary);
  }
  &--secondary {
    color: var(--cp-color-secondary);
    border-color: var(--cp-color-secondary);
  }
  &--danger {
    color: var(--cp-color-danger);
    border-color: rgba(239, 68, 68, 0.5);
  }
  &--success {
    color: var(--cp-color-success);
    border-color: rgba(74, 222, 128, 0.5);
  }
}
</style>
