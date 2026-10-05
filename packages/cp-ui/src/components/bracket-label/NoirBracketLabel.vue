<template>
  <span class="noir-bracket" :class="[`noir-bracket--${variant}`]">{{ text }}</span>
</template>

<script setup lang="ts">
import type { BracketLabelProps } from '../../types/components'

withDefaults(defineProps<BracketLabelProps>(), {
  variant: 'default',
})
</script>

<style lang="scss" scoped>
.noir-bracket {
  display: inline-flex;
  align-items: center;
  font-family: var(--cp-font-sans);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  white-space: nowrap;

  &::before {
    content: '—  ';
  }
  &::after {
    content: '  —';
  }

  &--default {
    color: var(--cp-text-secondary);
  }
  &--accent {
    color: var(--cp-color-primary);
  }
  &--muted {
    color: var(--cp-text-muted);
  }
  &--danger {
    color: var(--cp-color-danger);
  }
}
</style>
