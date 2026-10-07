<template>
  <span class="brutal-bracket" :class="[`brutal-bracket--${variant}`]">
    <span class="brutal-bracket__bracket brutal-bracket__bracket--left">[</span>
    <span class="brutal-bracket__text">{{ text }}<slot /></span>
    <span class="brutal-bracket__bracket brutal-bracket__bracket--right">]</span>
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
.brutal-bracket {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  font-family: var(--cp-font-mono);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 3px solid #000;
  background: transparent;
  line-height: 1;

  &__bracket {
    font-size: 14px;
    font-weight: 900;
    
    &--left {
      margin-right: 2px;
    }
    
    &--right {
      margin-left: 2px;
    }
  }

  &--default {
    color: var(--cp-text-primary);
    border-color: var(--cp-text-primary);
  }

  &--accent {
    background: var(--cp-color-primary);
    background-image: var(--cp-halftone-pattern);
    background-size: var(--cp-halftone-size);
    color: #000;
    border-color: #000;
  }

  &--muted {
    color: var(--cp-text-muted);
    border-color: var(--cp-text-muted);
  }

  &--danger {
    background: var(--cp-color-danger);
    color: #fff;
    border-color: #000;
  }
}
</style>
