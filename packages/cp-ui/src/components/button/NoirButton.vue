<template>
  <button
    class="noir-button"
    :class="[
      `noir-button--${variant}`,
      `noir-button--${size}`,
      { 'noir-button--loading': loading },
      { 'noir-button--block': block },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="noir-button__loader" />
    <span class="noir-button__content">
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
.noir-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--cp-font-sans);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  background: transparent;
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  transition:
    border-color var(--cp-duration-base) var(--cp-easing),
    color var(--cp-duration-base) var(--cp-easing),
    background var(--cp-duration-base) var(--cp-easing),
    text-shadow var(--cp-duration-base) var(--cp-easing),
    box-shadow var(--cp-duration-base) var(--cp-easing);

  &:hover:not(:disabled) {
    border-color: var(--cp-color-primary);
    color: var(--cp-color-primary);
    text-shadow: 0 0 12px var(--cp-glow-primary);
    box-shadow: 0 0 18px rgba(0, 240, 255, 0.12);
  }

  &--sm {
    padding: 4px 12px;
    font-size: 11px;
    height: 30px;
  }
  &--md {
    padding: 6px 18px;
    font-size: 12px;
    height: 36px;
  }
  &--lg {
    padding: 8px 24px;
    font-size: 13px;
    height: 42px;
  }

  &--primary {
    color: var(--cp-color-primary);
    border-color: var(--cp-color-primary);
    background: rgba(0, 240, 255, 0.06);
  }
  &--secondary {
    color: var(--cp-text-secondary);
    border-color: var(--cp-border-base);
  }
  &--danger {
    color: var(--cp-color-danger);
    border-color: var(--cp-color-danger);
    &:hover:not(:disabled) {
      border-color: var(--cp-color-danger);
      color: var(--cp-color-danger);
      text-shadow: 0 0 12px var(--cp-glow-danger);
      box-shadow: 0 0 18px rgba(255, 59, 92, 0.12);
    }
  }
  &--ghost {
    color: var(--cp-text-muted);
    border-color: transparent;
    &:hover:not(:disabled) {
      border-color: transparent;
      color: var(--cp-color-primary);
      text-shadow: 0 0 12px var(--cp-glow-primary);
      box-shadow: none;
    }
  }

  &--block {
    display: flex;
    width: 100%;
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  &--loading .noir-button__content {
    opacity: 0.5;
  }

  &:focus-visible {
    outline: 1px solid var(--cp-border-active);
    outline-offset: 2px;
  }

  &__loader {
    width: 12px;
    height: 12px;
    border: 1px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: noir-btn-spin 900ms linear infinite;
  }
}

@keyframes noir-btn-spin {
  to { transform: rotate(360deg); }
}
</style>
