<template>
  <span class="modern-badge">
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { BadgeProps } from '../../types/components'

defineProps<BadgeProps>()
</script>

<style scoped lang="scss">
.modern-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  font-family: var(--cp-font-family);
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  color: var(--cp-background);
  background: var(--cp-primary);
  border-radius: var(--cp-radius-full);
  letter-spacing: 0.01em;
}
</style>
