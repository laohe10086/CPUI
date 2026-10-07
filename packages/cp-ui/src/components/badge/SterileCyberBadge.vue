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
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  position: relative;

  &--default {
    background: rgba(255, 255, 255, 0.04);
    color: rgba(200, 200, 220, 0.9);
    border: 1px solid rgba(200, 200, 220, 0.2);
  }
  &--primary {
    background: rgba(252, 232, 3, 0.08);
    color: #fce803;
    border: 1px solid rgba(252, 232, 3, 0.3);
    text-shadow: 0 0 8px rgba(252, 232, 3, 0.4);
    box-shadow: 0 0 8px rgba(252, 232, 3, 0.15);
  }
  &--secondary {
    background: rgba(0, 240, 255, 0.08);
    color: #00f0ff;
    border: 1px solid rgba(0, 240, 255, 0.3);
    text-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
    box-shadow: 0 0 8px rgba(0, 240, 255, 0.15);
  }
  &--danger {
    background: rgba(255, 0, 60, 0.08);
    color: #ff003c;
    border: 1px solid rgba(255, 0, 60, 0.3);
    text-shadow: 0 0 8px rgba(255, 0, 60, 0.4);
    box-shadow: 0 0 8px rgba(255, 0, 60, 0.15);
  }
  &--success {
    background: rgba(0, 255, 65, 0.08);
    color: #00ff41;
    border: 1px solid rgba(0, 255, 65, 0.3);
    text-shadow: 0 0 8px rgba(0, 255, 65, 0.4);
    box-shadow: 0 0 8px rgba(0, 255, 65, 0.15);
  }
}
</style>
