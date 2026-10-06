<template>
  <span class="cyber-modern-bracket-label">
    <span class="cyber-modern-bracket-label__bracket">[</span>
    <slot />
    <span class="cyber-modern-bracket-label__bracket">]</span>
  </span>
</template>

<script setup lang="ts">
import type { BracketLabelProps } from '../../types/components'

defineProps<BracketLabelProps>()
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
  border: 1px solid var(--cp-primary);
  border-radius: var(--cp-radius-sm);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  box-shadow: 0 0 16px var(--cp-primary-subtle);

  &__bracket {
    color: var(--cp-primary);
    font-weight: 700;
  }
}
</style>
