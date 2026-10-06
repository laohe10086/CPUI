<template>
  <span class="brutal-badge" :class="[`brutal-badge--${variant}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { BadgeProps } from '../../types/components'

withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
})
</script>

<style lang="scss" scoped>
.brutal-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  font-family: var(--cp-font-mono);
  font-size: 13px;
  font-weight: 900;
  border: 3px solid currentColor;
  background: transparent;
  min-width: 32px;
  height: 32px;
  transform: skewX(-3deg);

  &--default {
    color: var(--cp-text-secondary);
    border-color: var(--cp-text-secondary);
  }

  &--primary {
    color: var(--cp-color-primary);
    border-color: var(--cp-color-primary);
    background: var(--cp-color-primary);
    color: #000;
  }

  &--secondary {
    color: var(--cp-color-secondary);
    border-color: var(--cp-color-secondary);
  }

  &--danger {
    color: var(--cp-color-danger);
    border-color: var(--cp-color-danger);
  }
}
</style>
