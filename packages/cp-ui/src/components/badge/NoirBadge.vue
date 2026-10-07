<template>
  <span class="noir-badge" :class="[`noir-badge--${variant}`]">
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
.noir-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 8px;
  font-family: var(--cp-font-sans);
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  border: 1px solid currentColor;
  background: transparent;
  clip-path: polygon(
    3px 0, 
    calc(100% - 3px) 0, 
    100% 3px, 
    100% calc(100% - 3px), 
    calc(100% - 3px) 100%, 
    3px 100%, 
    0 calc(100% - 3px), 
    0 3px
  );
  line-height: 1;
  transition: all var(--cp-duration-base) var(--cp-easing);

  &--default {
    color: var(--cp-text-secondary);
    border-color: var(--cp-border-base);
  }

  &--primary {
    color: var(--cp-color-primary);
    border-color: var(--cp-color-primary);
    background: color-mix(in srgb, var(--cp-color-primary) 8%, transparent);
    box-shadow: 
      0 0 8px color-mix(in srgb, var(--cp-color-primary) 15%, transparent),
      inset 0 0 8px color-mix(in srgb, var(--cp-color-primary) 8%, transparent);
  }

  &--secondary {
    color: var(--cp-color-secondary);
    border-color: var(--cp-color-secondary);
    box-shadow: 0 0 6px rgba(255, 0, 255, 0.12);
  }

  &--danger {
    color: var(--cp-color-danger);
    border-color: var(--cp-color-danger);
    box-shadow: 0 0 8px rgba(255, 0, 60, 0.15);
  }

  &--success {
    color: var(--cp-color-success);
    border-color: var(--cp-color-success);
    box-shadow: 0 0 6px rgba(0, 255, 159, 0.12);
  }
}
</style>
