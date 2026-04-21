<template>
  <button
    class="sterile-button"
    :class="[
      `sterile-button--${variant}`,
      `sterile-button--${size}`,
      { 'sterile-button--loading': loading },
      { 'sterile-button--block': block },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="sterile-button__loader" />
    <span class="sterile-button__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from '../../types/components'

withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  shape: 'regular',
  disabled: false,
  loading: false,
  block: false,
})

defineEmits<{ click: [e: MouseEvent] }>()
</script>

<style lang="scss" scoped>
.sterile-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--cp-font-sans, 'Inter', 'Noto Sans SC', sans-serif);
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: 0;
  cursor: pointer;
  transition:
    background var(--cp-duration-fast) var(--cp-easing),
    border-color var(--cp-duration-fast) var(--cp-easing),
    color var(--cp-duration-fast) var(--cp-easing),
    opacity var(--cp-duration-fast) var(--cp-easing);
  white-space: nowrap;
  user-select: none;

  &--sm {
    padding: 4px 12px;
    font-size: 12px;
    height: 30px;
  }
  &--md {
    padding: 6px 18px;
    font-size: 14px;
    height: 36px;
  }
  &--lg {
    padding: 8px 24px;
    font-size: 15px;
    height: 42px;
  }

  &--primary {
    background: var(--cp-color-primary);
    color: #111;
    border-color: var(--cp-color-primary);
    &:hover:not(:disabled) {
      filter: brightness(1.05);
    }
  }
  &--secondary {
    background: transparent;
    color: var(--cp-color-secondary);
    border-color: var(--cp-border-bright);
    &:hover:not(:disabled) {
      background: var(--cp-bg-hover);
      border-color: var(--cp-color-secondary);
    }
  }
  &--danger {
    background: transparent;
    color: var(--cp-color-danger);
    border-color: rgba(255, 0, 60, 0.3);
    &:hover:not(:disabled) {
      background: rgba(255, 0, 60, 0.06);
    }
  }
  &--ghost {
    background: transparent;
    color: var(--cp-text-secondary);
    border-color: var(--cp-border-base);
    &:hover:not(:disabled) {
      color: var(--cp-text-primary);
      background: var(--cp-bg-hover);
    }
  }

  &--block {
    display: flex;
    width: 100%;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &--loading .sterile-button__content {
    opacity: 0.5;
  }

  &:focus-visible {
    outline: 2px solid var(--cp-border-active);
    outline-offset: 2px;
  }

  &__loader {
    width: 14px;
    height: 14px;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 0;
    animation: sterile-btn-spin 600ms linear infinite;
  }
}

@keyframes sterile-btn-spin {
  to { transform: rotate(360deg); }
}
</style>
