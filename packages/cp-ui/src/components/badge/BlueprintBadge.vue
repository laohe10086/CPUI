<template>
  <span class="blueprint-badge" :class="[`blueprint-badge--${variant}`]">
    <span class="blueprint-badge__prefix">№</span>
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { BadgeProps } from '../../types/components'

withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
})
</script>

<style lang="scss" scoped>
.blueprint-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px 8px;
  font-family: 'Cormorant Garamond', 'Noto Serif SC', serif;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid var(--cp-border-base);
  border-radius: 50%;
  background: transparent;
  min-width: 28px;
  height: 28px;
  justify-content: center;

  &__prefix {
    font-size: 11px;
    opacity: 0.6;
  }

  &--default {
    color: var(--cp-text-secondary);
    border-color: var(--cp-border-base);
  }

  &--primary {
    color: var(--cp-color-primary);
    border-color: var(--cp-color-primary);
  }

  &--secondary {
    color: var(--cp-color-secondary);
    border-color: var(--cp-color-secondary);
  }

  &--danger {
    color: var(--cp-color-danger);
    border-color: var(--cp-color-danger);
  }
}
</style>
