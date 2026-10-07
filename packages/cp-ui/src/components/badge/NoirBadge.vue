<template>
  <span class="noir-badge" :class="[`noir-badge--${variant}`]">
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
.noir-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0;
  font-family: var(--cp-font-mono);
  font-size: 10px;
  letter-spacing: 0.04em;
  border: 1px solid var(--cp-border-bright);
  border-radius: 50%;
  background: transparent;

  &--default {
    color: var(--cp-text-secondary);
    border-color: var(--cp-border-bright);
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
