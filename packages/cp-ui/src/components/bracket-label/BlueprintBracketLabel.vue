<template>
  <span class="blueprint-bracket" :class="[`blueprint-bracket--${variant}`]">
    <span class="blueprint-bracket__corner blueprint-bracket__corner--tl">+</span>
    <span class="blueprint-bracket__corner blueprint-bracket__corner--tr">+</span>
    <span class="blueprint-bracket__corner blueprint-bracket__corner--bl">+</span>
    <span class="blueprint-bracket__corner blueprint-bracket__corner--br">+</span>
    <span class="blueprint-bracket__bracket blueprint-bracket__bracket--left">[ </span>
    <span class="blueprint-bracket__text">{{ text }}<slot /></span>
    <span class="blueprint-bracket__bracket blueprint-bracket__bracket--right"> ]</span>
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
.blueprint-bracket {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-family: var(--cp-font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid currentColor;
  background: transparent;
  line-height: 1.4;

  &__corner {
    position: absolute;
    font-size: 7px;
    line-height: 1;
    opacity: 0.4;
    pointer-events: none;
    
    &--tl { top: -1px; left: -1px; }
    &--tr { top: -1px; right: -1px; }
    &--bl { bottom: -1px; left: -1px; }
    &--br { bottom: -1px; right: -1px; }
  }

  &__bracket {
    opacity: 0.6;
    font-weight: 400;
  }

  &__text {
    margin: 0 2px;
  }

  &--default {
    color: var(--cp-text-secondary);
    border-color: var(--cp-border-base);
  }

  &--accent {
    color: var(--cp-color-primary);
    border-color: var(--cp-color-primary);
    border-style: dashed;
  }

  &--muted {
    color: var(--cp-text-muted);
    border-color: var(--cp-border-base);
    opacity: 0.7;
  }

  &--danger {
    color: var(--cp-color-danger);
    border-color: var(--cp-color-danger);
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      rgba(255, 0, 60, 0.08) 2px,
      rgba(255, 0, 60, 0.08) 4px
    );
  }
}
</style>
