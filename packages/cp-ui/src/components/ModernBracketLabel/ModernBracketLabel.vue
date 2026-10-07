<template>
  <span :class="['modern-bracket-label', `modern-bracket-label--${variant}`]">
    <span class="modern-bracket-label__bracket">[</span>
    <span class="modern-bracket-label__text"><slot>{{ text }}</slot></span>
    <span class="modern-bracket-label__bracket">]</span>
  </span>
</template>

<script setup lang="ts">
import type { BracketLabelProps } from '../../types/components'

withDefaults(defineProps<BracketLabelProps>(), {
  variant: 'default',
})
</script>

<style scoped lang="scss">
.modern-bracket-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--cp-font-family-mono);
  font-size: var(--cp-font-size-sm);
  line-height: 1;

  &__bracket {
    color: var(--cp-text-tertiary);
    font-weight: 600;
  }

  &__text {
    color: var(--cp-text-primary);
    font-weight: 500;
  }

  &--accent {
    .modern-bracket-label__bracket,
    .modern-bracket-label__text {
      color: var(--cp-primary);
    }
  }

  &--muted {
    .modern-bracket-label__bracket,
    .modern-bracket-label__text {
      color: var(--cp-text-tertiary);
    }
  }

  &--danger {
    .modern-bracket-label__bracket,
    .modern-bracket-label__text {
      color: var(--cp-error);
    }
  }
}
</style>
