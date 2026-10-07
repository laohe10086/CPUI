<template>
  <span class="cyber-modern-badge" :class="[`cyber-modern-badge--${variant}`]">
    <span class="cyber-modern-badge__bracket">[</span>
    <slot>{{ text }}</slot>
    <span class="cyber-modern-badge__bracket">]</span>
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
.cyber-modern-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  font-family: var(--cp-font-mono);
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  border-radius: 6px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  position: relative;
  
  &__bracket {
    opacity: 0.5;
    margin: 0 2px;
  }

  &--default {
    background: linear-gradient(135deg, rgba(100, 120, 255, 0.1), rgba(80, 100, 240, 0.05));
    color: rgba(180, 190, 255, 0.9);
    box-shadow: 0 2px 8px rgba(100, 120, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
  
  &--primary {
    background: linear-gradient(135deg, rgba(0, 217, 255, 0.15), rgba(0, 180, 255, 0.1));
    color: #00d9ff;
    box-shadow: 0 2px 12px rgba(0, 217, 255, 0.3), 0 0 20px rgba(0, 217, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    animation: cyber-modern-pulse 2.5s ease-in-out infinite;
  }
  
  &--secondary {
    background: linear-gradient(135deg, rgba(138, 43, 226, 0.15), rgba(120, 40, 200, 0.1));
    color: #b47dff;
    box-shadow: 0 2px 12px rgba(138, 43, 226, 0.3), 0 0 20px rgba(138, 43, 226, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    animation: cyber-modern-pulse 2.5s ease-in-out infinite 0.4s;
  }
  
  &--danger {
    background: linear-gradient(135deg, rgba(255, 20, 100, 0.15), rgba(255, 0, 80, 0.1));
    color: #ff1464;
    box-shadow: 0 2px 12px rgba(255, 20, 100, 0.3), 0 0 20px rgba(255, 20, 100, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    animation: cyber-modern-pulse-danger 2s ease-in-out infinite;
  }
  
  &--success {
    background: linear-gradient(135deg, rgba(0, 255, 150, 0.15), rgba(0, 220, 130, 0.1));
    color: #00ff96;
    box-shadow: 0 2px 12px rgba(0, 255, 150, 0.3), 0 0 20px rgba(0, 255, 150, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
}

@keyframes cyber-modern-pulse {
  0%, 100% {
    box-shadow: 0 2px 12px rgba(0, 217, 255, 0.3), 0 0 16px rgba(0, 217, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 0 2px 16px rgba(0, 217, 255, 0.5), 0 0 32px rgba(0, 217, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }
}

@keyframes cyber-modern-pulse-danger {
  0%, 100% {
    box-shadow: 0 2px 12px rgba(255, 20, 100, 0.3), 0 0 16px rgba(255, 20, 100, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 0 2px 16px rgba(255, 20, 100, 0.5), 0 0 32px rgba(255, 20, 100, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }
}
</style>
