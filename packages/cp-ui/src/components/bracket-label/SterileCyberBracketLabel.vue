<template>
  <span class="sc-bracket" :class="[`sc-bracket--${variant}`]">
    <span class="sc-bracket__left">[</span>
    <span class="sc-bracket__text">{{ text }}</span>
    <span class="sc-bracket__right">]</span>
  </span>
</template>

<script setup lang="ts">
import type { BracketLabelProps } from '../../types/components'

withDefaults(defineProps<BracketLabelProps>(), {
  variant: 'default',
})
</script>

<style lang="scss" scoped>
.sc-bracket {
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
    .sc-bracket__left,
    .sc-bracket__right {
      color: var(--cp-text-muted);
    }
  }
  &--muted {
    color: var(--cp-text-dim);
    .sc-bracket__left,
    .sc-bracket__right {
      opacity: 0.3;
    }
  }
  &--danger {
    color: var(--cp-color-danger);
    .sc-bracket__left,
    .sc-bracket__right {
      color: var(--cp-text-muted);
    }
  }
}
</style>
