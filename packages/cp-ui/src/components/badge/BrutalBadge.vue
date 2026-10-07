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
.brutal-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 8px;
  font-family: var(--cp-font-mono);
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  border: 3px solid #000;
  background: transparent;
  line-height: 1;

  &--default {
    color: var(--cp-text-secondary);
    border-color: var(--cp-text-secondary);
  }

  &--primary {
    background: var(--cp-color-primary);
    background-image: var(--cp-halftone-pattern);
    background-size: var(--cp-halftone-size);
    color: #000;
    border-color: #000;
  }

  &--secondary {
    color: var(--cp-color-secondary);
    border-color: var(--cp-color-secondary);
    background: transparent;
  }

  &--danger {
    background: var(--cp-color-danger);
    color: #fff;
    border-color: #000;
  }

  &--success {
    background: var(--cp-color-success);
    color: #000;
    border-color: #000;
  }
}
</style>
