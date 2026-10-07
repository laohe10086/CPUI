<template>
  <span class="cyber-badge" :class="[`cyber-badge--${variant}`, { 'cyber-badge--cut': shape === 'cut', 'cyber-badge--irregular': shape === 'irregular', 'cyber-badge--regular': shape === 'regular' }]">
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup lang="ts">
import type { BadgeProps } from '../../types/components'

withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
  text: '',
  shape: 'irregular',
})
</script>

<style lang="scss" scoped>
.cyber-badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--cp-font-mono);
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  position: relative;
  clip-path: polygon(3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%, 0 3px);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.6;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: currentColor;
    box-shadow: 0 0 8px currentColor;
  }

  &--default {
    background: rgba(100, 100, 120, 0.2);
    border: 1px solid rgba(160, 160, 180, 0.4);
    color: #a0a0b4;
  }
  
  &--primary {
    background: linear-gradient(135deg, rgba(252, 232, 3, 0.25), rgba(252, 232, 3, 0.15));
    border: 1px solid rgba(252, 232, 3, 0.5);
    color: #fce803;
    text-shadow: 0 0 8px rgba(252, 232, 3, 0.8), 0 0 4px rgba(252, 232, 3, 0.6);
    box-shadow: 0 0 12px rgba(252, 232, 3, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    animation: cyber-badge-glitch 3s ease-in-out infinite;
    &::before {
      background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.1), transparent);
      animation: cyber-badge-scan 2s linear infinite;
    }
  }
  
  &--secondary {
    background: linear-gradient(135deg, rgba(0, 240, 255, 0.25), rgba(0, 240, 255, 0.15));
    border: 1px solid rgba(0, 240, 255, 0.5);
    color: #00f0ff;
    text-shadow: 0 0 8px rgba(0, 240, 255, 0.8), 0 0 4px rgba(0, 240, 255, 0.6);
    box-shadow: 0 0 12px rgba(0, 240, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  &--danger {
    background: linear-gradient(135deg, rgba(255, 0, 60, 0.3), rgba(255, 0, 60, 0.2));
    border: 1px solid rgba(255, 0, 60, 0.6);
    color: #ff003c;
    text-shadow: 0 0 10px rgba(255, 0, 60, 0.9), 0 0 5px rgba(255, 0, 60, 0.7);
    box-shadow: 0 0 16px rgba(255, 0, 60, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    animation: cyber-badge-pulse 1.5s ease-in-out infinite;
  }
  
  &--success {
    background: linear-gradient(135deg, rgba(0, 255, 65, 0.25), rgba(0, 255, 65, 0.15));
    border: 1px solid rgba(0, 255, 65, 0.5);
    color: #00ff41;
    text-shadow: 0 0 8px rgba(0, 255, 65, 0.8);
    box-shadow: 0 0 12px rgba(0, 255, 65, 0.3);
  }

  &--cut {
    clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
  }
}

@keyframes cyber-badge-glitch {
  0%, 90%, 100% { transform: translate(0, 0); }
  92% { transform: translate(-1px, 0); }
  94% { transform: translate(1px, 0); }
  96% { transform: translate(0, 0); }
}

@keyframes cyber-badge-scan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

@keyframes cyber-badge-pulse {
  0%, 100% {
    box-shadow: 0 0 12px rgba(255, 0, 60, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 0 0 24px rgba(255, 0, 60, 0.6), 0 0 36px rgba(255, 0, 60, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
}
</style>
