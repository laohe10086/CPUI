<template>
  <span class="sterile-bracket" :class="[`sterile-bracket--${variant}`]">
    <span class="sterile-bracket__left">[</span>
    <span class="sterile-bracket__text">{{ text }}</span>
    <span class="sterile-bracket__right">]</span>
  </span>
</template>

<script setup lang="ts">
import type { BracketLabelProps } from '../../types/components'

withDefaults(defineProps<BracketLabelProps>(), {
  variant: 'default',
})
</script>

<style lang="scss" scoped>
.sterile-bracket {
  display: inline-flex;
  align-items: center;
  font-family: var(--cp-font-sans, 'Inter', sans-serif);
  font-size: 12px;
  white-space: nowrap;

  &__left,
  &__right {
    color: var(--cp-text-dim);
    opacity: 0.4;
  }
  &__text {
    padding: 0 4px;
  }

  &--default {
    color: var(--cp-text-secondary);
  }
  &--accent {
    color: var(--cp-color-primary);
    .sterile-bracket__left,
    .sterile-bracket__right {
      color: var(--cp-text-muted);
    }
  }
  &--muted {
    color: var(--cp-text-dim);
    .sterile-bracket__left,
    .sterile-bracket__right {
      opacity: 0.3;
    }
  }
  &--danger {
    color: var(--cp-color-danger);
    .sterile-bracket__left,
    .sterile-bracket__right {
      color: var(--cp-text-muted);
    }
  }
}
</style>
