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
  font-size: 10px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 999px;
  letter-spacing: 0.02em;
  text-transform: uppercase;

  &--default {
    background: rgba(255, 255, 255, 0.04);
    color: rgba(200, 200, 220, 0.9);
    border: 1px solid rgba(200, 200, 220, 0.2);
  }
  &--primary {
    background: rgba(184, 160, 0, 0.08);
    color: #b8a000;
    border: 1px solid rgba(184, 160, 0, 0.25);
  }
  &--secondary {
    background: rgba(0, 153, 170, 0.08);
    color: #0099aa;
    border: 1px solid rgba(0, 153, 170, 0.25);
  }
  &--danger {
    background: rgba(200, 30, 30, 0.08);
    color: #c81e1e;
    border: 1px solid rgba(200, 30, 30, 0.25);
  }
  &--success {
    background: rgba(0, 160, 40, 0.08);
    color: #00a028;
    border: 1px solid rgba(0, 160, 40, 0.25);
  }
}
</style>
