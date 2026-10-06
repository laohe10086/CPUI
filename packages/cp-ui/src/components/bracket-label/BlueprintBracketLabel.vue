<template>
  <span class="blueprint-label">
    <span class="blueprint-label__arrow blueprint-label__arrow--left">◄──</span>
    <span class="blueprint-label__text"><slot /></span>
    <span class="blueprint-label__arrow blueprint-label__arrow--right">──►</span>
  </span>
</template>

<script setup lang="ts">
import type { BracketLabelProps } from '../../types/components'

withDefaults(defineProps<BracketLabelProps>(), {
  variant: 'default',
})
</script>

<style lang="scss" scoped>
.blueprint-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--cp-font-mono);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.05em;
  color: var(--cp-text-secondary);

  &__arrow {
    font-size: 10px;
    color: var(--cp-text-dim);
    line-height: 1;
    
    &--left, &--right {
      opacity: 0.6;
    }
  }

  &__text {
    text-transform: uppercase;
  }
}
</style>
