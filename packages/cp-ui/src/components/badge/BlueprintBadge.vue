<template>
  <span class="blueprint-badge" :class="[`blueprint-badge--${variant}`]">
    <span class="blueprint-badge__corner blueprint-badge__corner--tl">+</span>
    <span class="blueprint-badge__corner blueprint-badge__corner--tr">+</span>
    <span class="blueprint-badge__corner blueprint-badge__corner--bl">+</span>
    <span class="blueprint-badge__corner blueprint-badge__corner--br">+</span>
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
.blueprint-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 8px;
  font-family: var(--cp-font-mono);
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: 1px solid currentColor;
  background: transparent;
  line-height: 1;

  &__corner {
    position: absolute;
    font-size: 7px;
    line-height: 1;
    opacity: 0.4;
    pointer-events: none;
    
    &--tl { top: -1px; left: -1px; }
    &--tr { top: -1px; right: -1px; }
    &--bl { bottom: -1px; left: -1px; }
    &--br { bottom: -1px; right: -1px; }
  }

  &--default {
    color: var(--cp-text-secondary);
    border-color: var(--cp-border-base);
  }

  &--primary {
    color: var(--cp-color-primary);
    border-color: var(--cp-color-primary);
    background: var(--cp-color-primary);
    color: var(--cp-bg-base);
  }

  &--secondary {
    color: var(--cp-color-secondary);
    border-color: var(--cp-color-secondary);
    border-style: dashed;
  }

  &--danger {
    color: var(--cp-color-danger);
    border-color: var(--cp-color-danger);
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      rgba(255, 0, 60, 0.08) 2px,
      rgba(255, 0, 60, 0.08) 4px
    );
  }

  &--success {
    color: var(--cp-color-success);
    border-color: var(--cp-color-success);
  }
}
</style>
