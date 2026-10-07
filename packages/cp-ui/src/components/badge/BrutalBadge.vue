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
  padding: 5px 14px;
  font-family: var(--cp-font-mono);
  font-size: 14px;
  font-weight: 900;
  border: 4px solid currentColor;
  background: currentColor;
  color: #000;
  min-width: 48px;
  height: 36px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
  position: relative;

  &--default {
    background: #888;
    border-color: #888;
    color: #000;
  }

  &--primary {
    background: #fce803;
    border-color: #fce803;
    color: #000;
  }

  &--secondary {
    background: #ff6b35;
    border-color: #ff6b35;
    color: #000;
  }

  &--danger {
    background: #ff003c;
    border-color: #ff003c;
    color: #fff;
  }
  
  &--success {
    background: #00ff41;
    border-color: #00ff41;
    color: #000;
  }
}
</style>
