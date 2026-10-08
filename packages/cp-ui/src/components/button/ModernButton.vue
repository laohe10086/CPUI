<template>
  <button
    :class="[
      'modern-button',
      `modern-button--${variant}`,
      `modern-button--${size}`,
      { 'modern-button--disabled': disabled },
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
})
</script>

<style scoped lang="scss">
.modern-button {
  position: relative;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: all var(--cp-transition);
  font-family: var(--cp-font-family);
  letter-spacing: -0.01em;

  &--sm {
    padding: 6px 16px;
    font-size: 12px;
  }

  &--lg {
    padding: 14px 32px;
    font-size: 16px;
  }

  &--primary {
    background: var(--cp-primary);
    color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

    &:hover:not(.modern-button--disabled) {
      background: var(--cp-primary-hover);
      box-shadow: 0 4px 12px rgba(94, 106, 210, 0.4);
      transform: translateY(-1px);
    }

    &:active:not(.modern-button--disabled) {
      transform: translateY(0);
    }
  }

  &--secondary {
    background: var(--cp-surface-2);
    color: var(--cp-text-primary);
    border: 1px solid var(--cp-border);

    &:hover:not(.modern-button--disabled) {
      background: var(--cp-surface-3);
      border-color: var(--cp-primary);
    }
  }

  &--danger {
    background: var(--cp-error);
    color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

    &:hover:not(.modern-button--disabled) {
      background: #dc2626;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
      transform: translateY(-1px);
    }

    &:active:not(.modern-button--disabled) {
      transform: translateY(0);
    }
  }

  &--ghost {
    background: transparent;
    color: var(--cp-text-secondary);

    &:hover:not(.modern-button--disabled) {
      background: var(--cp-surface-2);
      color: var(--cp-text-primary);
    }
  }

  &--disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}
</style>
