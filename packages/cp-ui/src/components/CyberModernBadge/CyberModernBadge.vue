<template>
  <span class="cyber-modern-badge">
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { BadgeProps } from '../../types/components'

defineProps<BadgeProps>()
</script>

<style scoped lang="scss">
.cyber-modern-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  font-family: var(--cp-font-family);
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  color: var(--cp-background);
  background: var(--cp-primary);
  border-radius: var(--cp-radius-full);
  letter-spacing: 0.02em;
  box-shadow: 0 0 12px rgba(0, 217, 255, 0.5);
  animation: cyber-modern-pulse 2s ease-in-out infinite;
}

@keyframes cyber-modern-pulse {
  0%, 100% {
    box-shadow: 0 0 12px rgba(0, 217, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 217, 255, 0.8);
  }
}
</style>
