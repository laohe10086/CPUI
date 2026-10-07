<template>
  <span class="noir-badge" :class="[`noir-badge--${variant}`]">
    <span class="noir-badge__glow"></span>
    <span class="noir-badge__glow noir-badge__glow--secondary"></span>
    <span class="noir-badge__text"><slot>{{ text }}</slot></span>
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
  padding: 5px 16px;
  font-family: var(--cp-font-display);
  font-size: 13px;
  font-weight: 600;
  min-width: 48px;
  height: 28px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  position: relative;
  background: #000;
  border: 2px solid currentColor;
  border-radius: 4px;
  
  &__glow {
    position: absolute;
    inset: -4px;
    border: 2px solid currentColor;
    border-radius: 6px;
    opacity: 0.4;
    filter: blur(4px);
    
    &--secondary {
      inset: -8px;
      border-radius: 8px;
      opacity: 0.2;
      filter: blur(8px);
    }
  }
  
  &__text {
    position: relative;
    z-index: 1;
    text-shadow: 0 0 12px currentColor, 0 0 24px currentColor, 0 0 36px currentColor;
  }

  &--default {
    color: rgba(200, 200, 220, 0.8);
  }

  &--primary {
    color: #fce803;
    animation: noir-badge-flicker 4s ease-in-out infinite;
  }

  &--secondary {
    color: #00f0ff;
    animation: noir-badge-flicker 4s ease-in-out infinite 0.5s;
  }

  &--danger {
    color: #ff003c;
    animation: noir-badge-pulse-danger 2s ease-in-out infinite;
  }
  
  &--success {
    color: #00ff41;
  }
}

@keyframes noir-badge-flicker {
  0%, 100% {
    text-shadow: 0 0 8px currentColor, 0 0 16px currentColor, 0 0 24px currentColor;
  }
  50% {
    text-shadow: 0 0 12px currentColor, 0 0 24px currentColor, 0 0 48px currentColor, 0 0 72px currentColor;
  }
  93% {
    text-shadow: 0 0 4px currentColor, 0 0 8px currentColor;
  }
  95% {
    text-shadow: 0 0 12px currentColor, 0 0 24px currentColor, 0 0 48px currentColor;
  }
}

@keyframes noir-badge-pulse-danger {
  0%, 100% {
    text-shadow: 0 0 8px currentColor, 0 0 16px currentColor;
    box-shadow: 0 0 8px currentColor;
  }
  50% {
    text-shadow: 0 0 16px currentColor, 0 0 32px currentColor, 0 0 48px currentColor;
    box-shadow: 0 0 16px currentColor, 0 0 32px currentColor;
  }
}
</style>
