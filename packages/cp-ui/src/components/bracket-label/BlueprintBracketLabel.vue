<template>
  <span class="blueprint-bracket" :class="[`blueprint-bracket--${variant}`]">
    <span class="blueprint-bracket__dim blueprint-bracket__dim--l" />
    <span class="blueprint-bracket__text">{{ text }}</span>
    <span class="blueprint-bracket__dim blueprint-bracket__dim--r" />
  </span>
</template>

<script setup lang="ts">
import type { BracketLabelProps } from '../../types/components'

withDefaults(defineProps<BracketLabelProps>(), {
  variant: 'default',
})
</script>

<style lang="scss" scoped>
// 工程尺寸标注：细线 + 外向箭头，文字居中
.blueprint-bracket {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--cp-font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;

  &__dim {
    position: relative;
    width: 20px;
    height: 1px;
    background: currentColor;
    opacity: 0.5;

    &::before {
      content: '';
      position: absolute;
      top: -2.5px;
      width: 0;
      height: 0;
      border-style: solid;
    }

    &--l::before {
      left: 0;
      border-width: 3px 5px 3px 0;
      border-color: transparent currentColor transparent transparent;
    }

    &--r::before {
      right: 0;
      border-width: 3px 0 3px 5px;
      border-color: transparent transparent transparent currentColor;
    }
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
