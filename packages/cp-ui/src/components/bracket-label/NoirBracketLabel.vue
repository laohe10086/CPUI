<template>
  <span class="noir-bracket" :class="[`noir-bracket--${variant}`]">
    <span class="noir-bracket__dash noir-bracket__dash--left">—</span>
    <span class="noir-bracket__text">{{ text }}<slot /></span>
    <span class="noir-bracket__dash noir-bracket__dash--right">—</span>
  </span>
</template>

<script setup lang="ts">
import type { BracketLabelProps } from '../../types/components'

withDefaults(defineProps<BracketLabelProps>(), {
  variant: 'default',
  text: '',
})
</script>

<style lang="scss" scoped>
.noir-bracket {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 2px 8px;
  font-family: var(--cp-font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
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
  line-height: 1.4;
  transition: all var(--cp-duration-base) var(--cp-easing);

  &__dash {
    font-size: 10px;
    opacity: 0.6;
  }

  &--default {
    color: var(--cp-text-secondary);
    border-color: var(--cp-border-base);
  }

  &--accent {
    color: var(--cp-color-primary);
    border-color: var(--cp-color-primary);
    box-shadow: 0 0 8px rgba(0, 240, 255, 0.12);
  }

  &--muted {
    color: var(--cp-text-muted);
    border-color: var(--cp-border-base);
    opacity: 0.7;
  }

  &--danger {
    color: var(--cp-color-danger);
    border-color: var(--cp-color-danger);
    box-shadow: 0 0 6px rgba(255, 0, 60, 0.12);
  }
}
</style>
