<template>
  <span class="brutal-bracket" :class="[`brutal-bracket--${variant}`]">
    <span class="brutal-bracket__mark">[</span>
    <span class="brutal-bracket__text">{{ text }}</span>
    <span class="brutal-bracket__mark">]</span>
  </span>
</template>

<script setup lang="ts">
import type { BracketLabelProps } from '../../types/components'

withDefaults(defineProps<BracketLabelProps>(), {
  variant: 'default',
})
</script>

<style lang="scss" scoped>
// 终端括号标注：[ TEXT ]，方括号弱一级
.brutal-bracket {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--cp-font-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  white-space: nowrap;

  &__mark {
    color: var(--cp-text-dim);
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
