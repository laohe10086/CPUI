<template>
  <span class="cyber-bracket" :class="[`cyber-bracket--${variant}`]">
    <span class="cyber-bracket__left">[</span>
    <span class="cyber-bracket__text">{{ text }}</span>
    <span class="cyber-bracket__right">]</span>
  </span>
</template>

<script setup lang="ts">
import type { BracketLabelProps } from '../../types/components'

withDefaults(defineProps<BracketLabelProps>(), {
  variant: 'default',
})
</script>

<style lang="scss" scoped>
.cyber-bracket {
  display: inline-flex;
  align-items: center;
  font-family: var(--cp-font-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;

  &__left,
  &__right {
    color: var(--cp-text-muted);
    opacity: 0.5;
  }
  &__text {
    padding: 0 4px;
  }

  &--default {
    color: var(--cp-text-secondary);
  }
  &--accent {
    color: var(--cp-color-primary);
    .cyber-bracket__left,
    .cyber-bracket__right {
      color: var(--cp-text-muted);
      text-shadow: 0 0 6px var(--cp-glow-secondary);
    }
  }
  &--muted {
    color: var(--cp-text-dim);
    .cyber-bracket__left,
    .cyber-bracket__right {
      opacity: 0.3;
    }
  }
  &--danger {
    color: var(--cp-color-danger);
    .cyber-bracket__left,
    .cyber-bracket__right {
      color: var(--cp-text-muted);
      text-shadow: 0 0 6px var(--cp-glow-danger);
    }
  }
}
</style>
