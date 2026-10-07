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
  font-weight: 500;
  padding: 2px 8px;
  letter-spacing: 0.04em;
  border: 1px solid var(--cp-border-base);
  border-left: 2px solid transparent;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -2px;
    top: 4px;
    bottom: 4px;
    width: 2px;
  }

  &--default {
    background: rgba(255, 255, 255, 0.06);
    color: var(--cp-text-secondary);
    &::before { background: var(--cp-text-muted); }
  }
  &--primary {
    background: rgba(252, 232, 3, 0.15);
    color: var(--cp-color-primary);
    border-color: rgba(252, 232, 3, 0.3);
    border-left-color: transparent;
    text-shadow: 0 0 6px var(--cp-glow-primary);
    animation: cp-badge-pulse-primary 2.5s ease-in-out infinite;
    &::before { background: var(--cp-color-primary); box-shadow: 0 0 6px var(--cp-glow-primary); }
  }
  &--secondary {
    background: rgba(0, 240, 255, 0.15);
    color: var(--cp-color-secondary);
    border-color: rgba(0, 240, 255, 0.3);
    border-left-color: transparent;
    text-shadow: 0 0 6px var(--cp-glow-secondary);
    animation: cp-badge-pulse-secondary 2.5s ease-in-out infinite;
    &::before { background: var(--cp-color-secondary); box-shadow: 0 0 6px var(--cp-glow-secondary); }
  }
  &--danger {
    background: rgba(255, 0, 60, 0.15);
    color: var(--cp-color-danger);
    border-color: rgba(255, 0, 60, 0.3);
    border-left-color: transparent;
    text-shadow: 0 0 6px var(--cp-glow-danger);
    animation: cp-badge-pulse-danger 2.5s ease-in-out infinite;
    &::before { background: var(--cp-color-danger); box-shadow: 0 0 6px var(--cp-glow-danger); }
  }
  &--success {
    background: rgba(0, 255, 65, 0.15);
    color: var(--cp-color-success);
    border-color: rgba(0, 255, 65, 0.3);
    border-left-color: transparent;
    &::before { background: var(--cp-color-success); box-shadow: 0 0 6px rgba(0, 255, 65, 0.4); }
  }

  &--cut {
    clip-path: var(--cp-cut-corner-sm);
  }
  &--irregular,
  &--regular {
    /* 保持原样，无额外形状 */
  }
}

@keyframes cp-badge-pulse-primary {
  0%, 100% {
    text-shadow: 0 0 4px var(--cp-glow-primary);
    box-shadow: 0 0 4px rgba(252, 232, 3, 0.1);
  }
  50% {
    text-shadow: 0 0 12px var(--cp-glow-primary), 0 0 20px rgba(252, 232, 3, 0.3);
    box-shadow: 0 0 8px rgba(252, 232, 3, 0.2), 0 0 16px rgba(252, 232, 3, 0.1);
  }
}

@keyframes cp-badge-pulse-secondary {
  0%, 100% {
    text-shadow: 0 0 4px var(--cp-glow-secondary);
    box-shadow: 0 0 4px rgba(0, 240, 255, 0.1);
  }
  50% {
    text-shadow: 0 0 12px var(--cp-glow-secondary), 0 0 20px rgba(0, 240, 255, 0.3);
    box-shadow: 0 0 8px rgba(0, 240, 255, 0.2), 0 0 16px rgba(0, 240, 255, 0.1);
  }
}

@keyframes cp-badge-pulse-danger {
  0%, 100% {
    text-shadow: 0 0 4px var(--cp-glow-danger);
    box-shadow: 0 0 4px rgba(255, 0, 60, 0.1);
  }
  50% {
    text-shadow: 0 0 12px var(--cp-glow-danger), 0 0 20px rgba(255, 0, 60, 0.3);
    box-shadow: 0 0 8px rgba(255, 0, 60, 0.2), 0 0 16px rgba(255, 0, 60, 0.1);
  }
}
</style>
