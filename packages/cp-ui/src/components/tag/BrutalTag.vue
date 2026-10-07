<template>
  <span class="brutal-tag" :class="[`brutal-tag--${variant}`, `brutal-tag--${size}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { TagProps } from '../../types/components'

withDefaults(defineProps<TagProps>(), {
  variant: 'default',
  size: 'md',
})
</script>

<style lang="scss" scoped>
.brutal-tag {
  display: inline-block;
  padding: 4px 12px;
  font-family: var(--cp-font-mono);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 3px solid currentColor;
  background: transparent;
  white-space: nowrap;
  transform: skewX(-3deg);
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.3));

  &--sm {
    padding: 2px 10px;
    font-size: 10px;
    border-width: 3px;
  }

  &--lg {
    padding: 6px 14px;
    font-size: 12px;
    border-width: 4px;
  }

  &--default {
    color: var(--cp-text-secondary);
  }

  &--primary {
    background: var(--cp-color-primary);
    background-image: var(--cp-halftone-pattern);
    background-size: var(--cp-halftone-size);
    color: #000;
    border-color: #000;
  }

  &--secondary {
    color: var(--cp-color-secondary);
    border-color: var(--cp-color-secondary);
  }

  &--danger {
    background: var(--cp-color-danger);
    color: #fff;
    border-color: #000;
  }
}
</style>
