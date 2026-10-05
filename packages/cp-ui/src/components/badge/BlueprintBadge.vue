<template>
  <span class="blueprint-badge" :class="[`blueprint-badge--${variant}`]">
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
// 图纸编号格：直角细线方格，与图签栏同一套语言
.blueprint-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 5px;
  font-family: var(--cp-font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  background: transparent;

  &--default {
    color: var(--cp-text-secondary);
    border-color: var(--cp-border-base);
  }
  &--primary {
    color: var(--cp-color-primary);
    border-color: var(--cp-color-primary);
  }
  &--secondary {
    color: var(--cp-color-secondary);
    border-color: var(--cp-color-secondary);
  }
  &--danger {
    color: var(--cp-color-danger);
    border-color: var(--cp-color-danger);
  }
  &--success {
    color: var(--cp-color-success);
    border-color: var(--cp-color-success);
  }
}
</style>
