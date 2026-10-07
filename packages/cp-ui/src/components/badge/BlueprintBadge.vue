<template>
  <span class="blueprint-badge" :class="[`blueprint-badge--${variant}`]">
    <span class="blueprint-badge__prefix">№</span>
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
.blueprint-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px 5px 10px;
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: 12px;
  font-weight: 600;
  border: 2px solid currentColor;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.4);
  min-width: 52px;
  height: 28px;
  justify-content: center;
  position: relative;
  letter-spacing: 0.04em;
  box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.03);

  &__prefix {
    font-size: 11px;
    opacity: 0.7;
    font-weight: 500;
    letter-spacing: 0;
  }

  &--default {
    color: rgba(200, 200, 220, 0.85);
    border-color: rgba(200, 200, 220, 0.4);
  }

  &--primary {
    color: #e8d547;
    border-color: #e8d547;
    text-shadow: 0 0 8px rgba(232, 213, 71, 0.4);
    box-shadow: inset 0 0 12px rgba(232, 213, 71, 0.08), 0 0 12px rgba(232, 213, 71, 0.2);
  }

  &--secondary {
    color: #ff4757;
    border-color: #ff4757;
    text-shadow: 0 0 8px rgba(255, 71, 87, 0.4);
    box-shadow: inset 0 0 12px rgba(255, 71, 87, 0.08), 0 0 12px rgba(255, 71, 87, 0.2);
  }

  &--danger {
    color: #ff4757;
    border-color: #ff4757;
    text-shadow: 0 0 8px rgba(255, 71, 87, 0.4);
    box-shadow: inset 0 0 12px rgba(255, 71, 87, 0.08), 0 0 12px rgba(255, 71, 87, 0.2);
    animation: blueprint-badge-alert 2s ease-in-out infinite;
  }
  
  &--success {
    color: #5cd85c;
    border-color: #5cd85c;
    text-shadow: 0 0 8px rgba(92, 216, 92, 0.4);
    box-shadow: inset 0 0 12px rgba(92, 216, 92, 0.08), 0 0 12px rgba(92, 216, 92, 0.2);
  }
}

@keyframes blueprint-badge-alert {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
