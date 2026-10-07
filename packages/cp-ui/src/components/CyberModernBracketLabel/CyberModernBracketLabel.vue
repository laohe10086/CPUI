<template>
  <span :class="['cyber-modern-bracket-label', `cyber-modern-bracket-label--${variant}`]">
    <span class="cyber-modern-bracket-label__bracket">[</span>
    <span class="cyber-modern-bracket-label__text"><slot>{{ text }}</slot></span>
    <span class="cyber-modern-bracket-label__bracket">]</span>
  </span>
</template>

<script setup lang="ts">
import type { BracketLabelProps } from '../../types/components'

withDefaults(defineProps<BracketLabelProps>(), {
  variant: 'default',
})
</script>

<style scoped lang="scss">
.cyber-modern-bracket-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  font-family: var(--cp-font-family);
  font-size: var(--cp-font-size-xs);
  font-weight: 500;
  color: var(--cp-text-primary);
  background: var(--cp-surface-2);
  border: 1px solid var(--cp-border);
  border-radius: var(--cp-radius-sm);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all var(--cp-transition);

  &__bracket {
    color: var(--cp-primary);
    font-weight: 700;
  }

  &--accent {
    border-color: var(--cp-primary);
    box-shadow: 0 0 16px var(--cp-primary-subtle);

    .cyber-modern-bracket-label__text {
      color: var(--cp-primary);
    }
  }

  &--muted {
    .cyber-modern-bracket-label__bracket {
      color: var(--cp-text-tertiary);
    }

    .cyber-modern-bracket-label__text {
      color: var(--cp-text-secondary);
    }
  }

  &--danger {
    border-color: var(--cp-error);
    box-shadow: 0 0 16px rgba(255, 0, 85, 0.15);

    .cyber-modern-bracket-label__bracket {
      color: var(--cp-error);
    }

    .cyber-modern-bracket-label__text {
      color: var(--cp-error);
    }
  }
}
</style>
