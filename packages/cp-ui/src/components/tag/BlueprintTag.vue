<template>
  <span class="blueprint-tag" :class="[`blueprint-tag--${variant}`, `blueprint-tag--${size}`]">
    <span class="blueprint-tag__icon">▪</span>
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { TagProps } from '../../types/components'

withDefaults(defineProps<TagProps>(), {
  variant: 'default',
  size: 'md',
})
</script>

<style lang="scss" scoped>
.blueprint-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-family: var(--cp-font-mono);
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid var(--cp-border-base);
  background: transparent;
  white-space: nowrap;

  &__icon {
    font-size: 8px;
    line-height: 1;
  }

  &--sm {
    padding: 2px 8px;
    font-size: 10px;
    gap: 4px;
  }

  &--lg {
    padding: 6px 12px;
    font-size: 12px;
    gap: 8px;
  }

  &--default {
    color: var(--cp-text-secondary);
    border-color: var(--cp-border-base);
    
    .blueprint-tag__icon {
      color: var(--cp-text-muted);
    }
  }

  &--primary {
    color: var(--cp-color-primary);
    border-color: var(--cp-color-primary);
    
    .blueprint-tag__icon {
      color: var(--cp-color-primary);
    }
  }

  &--secondary {
    color: var(--cp-color-secondary);
    border-color: var(--cp-color-secondary);
    
    .blueprint-tag__icon {
      color: var(--cp-color-secondary);
    }
  }

  &--danger {
    color: var(--cp-color-danger);
    border-color: var(--cp-color-danger);
    
    .blueprint-tag__icon {
      color: var(--cp-color-danger);
    }
  }
}
</style>
