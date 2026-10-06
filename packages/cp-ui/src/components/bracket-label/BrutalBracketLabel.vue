<template>
  <span class="brutal-label">
    <span class="brutal-label__bracket">[</span>
    <span class="brutal-label__text"><slot /></span>
    <span class="brutal-label__bracket">]</span>
  </span>
</template>

<script setup lang="ts">
import type { BracketLabelProps } from '../../types/components'

withDefaults(defineProps<BracketLabelProps>(), {
  variant: 'default',
})
</script>

<style lang="scss" scoped>
.brutal-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--cp-font-mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--cp-text-primary);

  &__bracket {
    font-size: 15px;
    font-weight: 900;
    color: var(--cp-text-dim);
  }

  &__text {
    text-transform: uppercase;
  }
}
</style>
