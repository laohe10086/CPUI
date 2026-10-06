<template>
  <span class="modern-bracket-label">
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { BracketLabelProps } from '../../types/components'

defineProps<BracketLabelProps>()
</script>

<style scoped lang="scss">
.modern-bracket-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  font-family: var(--cp-font-family);
  font-size: var(--cp-font-size-xs);
  font-weight: 500;
  color: var(--cp-text-secondary);
  background: var(--cp-surface-1);
  border: 1px solid var(--cp-border);
  border-radius: var(--cp-radius-sm);
  letter-spacing: 0.03em;
  text-transform: uppercase;
}
</style>
