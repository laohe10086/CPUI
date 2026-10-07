<template>
  <span :class="['modern-tag', `modern-tag--${variant}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'danger'
}>(), {
  variant: 'default',
})
</script>

<style scoped lang="scss">
.modern-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 9999px;
  font-family: var(--cp-font-family);
  letter-spacing: -0.01em;

  &--default {
    background: var(--cp-surface-2);
    color: var(--cp-text-secondary);
    border: 1px solid var(--cp-border-subtle);
  }

  &--primary {
    background: var(--cp-primary-subtle);
    color: var(--cp-primary);
    border: 1px solid rgba(94, 106, 210, 0.2);
  }

  &--secondary {
    background: var(--cp-secondary-subtle);
    color: var(--cp-secondary);
    border: 1px solid rgba(0, 217, 255, 0.2);
  }

  &--success {
    background: rgba(16, 185, 129, 0.1);
    color: var(--cp-success);
    border: 1px solid rgba(16, 185, 129, 0.2);
  }

  &--danger {
    background: rgba(239, 68, 68, 0.1);
    color: var(--cp-error);
    border: 1px solid rgba(239, 68, 68, 0.2);
  }
}
</style>
