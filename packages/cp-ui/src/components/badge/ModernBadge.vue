<template>
  <span class="modern-badge" :class="[`modern-badge--${variant}`]">
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

<style scoped lang="scss">
.modern-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  font-family: var(--cp-font-sans, 'Inter', sans-serif);
  letter-spacing: 0.02em;
  border-radius: 6px;
  position: relative;
  
  &::before {
    content: '[';
    margin-right: 4px;
    opacity: 0.6;
  }
  
  &::after {
    content: ']';
    margin-left: 4px;
    opacity: 0.6;
  }

  &--default {
    background: rgba(255, 255, 255, 0.06);
    color: rgba(200, 200, 220, 0.9);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
  
  &--primary {
    background: linear-gradient(135deg, rgba(100, 120, 255, 0.15), rgba(80, 100, 255, 0.1));
    color: #6078ff;
    box-shadow: 0 2px 4px rgba(100, 120, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  &--secondary {
    background: linear-gradient(135deg, rgba(0, 200, 180, 0.15), rgba(0, 180, 160, 0.1));
    color: #00c8b4;
    box-shadow: 0 2px 4px rgba(0, 200, 180, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  &--danger {
    background: linear-gradient(135deg, rgba(255, 80, 100, 0.15), rgba(255, 60, 80, 0.1));
    color: #ff5064;
    box-shadow: 0 2px 4px rgba(255, 80, 100, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  &--success {
    background: linear-gradient(135deg, rgba(0, 220, 120, 0.15), rgba(0, 200, 100, 0.1));
    color: #00dc78;
    box-shadow: 0 2px 4px rgba(0, 220, 120, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
}
</style>
