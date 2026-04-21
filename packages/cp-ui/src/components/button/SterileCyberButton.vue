<template>
  <button
    class="sc-button"
    :class="[
      `sc-button--${variant}`,
      `sc-button--${size}`,
      { 'sc-button--loading': loading },
      { 'sc-button--block': block },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="sc-button__loader" />
    <span class="sc-button__content">
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
.sc-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--cp-font-mono);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  border: 1px solid transparent;
  border-radius: 0;
  cursor: pointer;
  transition:
    background var(--cp-duration-fast) var(--cp-easing),
    border-color var(--cp-duration-fast) var(--cp-easing),
    color var(--cp-duration-fast) var(--cp-easing),
    box-shadow var(--cp-duration-fast) var(--cp-easing),
    filter var(--cp-duration-fast) var(--cp-easing),
    opacity var(--cp-duration-fast) var(--cp-easing);
  white-space: nowrap;
  user-select: none;

  &--sm {
    padding: 4px 12px;
    font-size: 11px;
    height: 30px;
  }
  &--md {
    padding: 6px 18px;
    font-size: 13px;
    height: 36px;
  }
  &--lg {
    padding: 8px 24px;
    font-size: 14px;
    height: 42px;
  }

  &--primary {
    background: var(--cp-color-primary);
    color: #111;
    border-color: var(--cp-color-primary);
    &:hover:not(:disabled) {
      box-shadow: 0 0 12px var(--cp-glow-primary);
      filter: brightness(1.05);
    }
  }
  &--secondary {
    background: transparent;
    color: var(--cp-color-secondary);
    border-color: var(--cp-color-secondary);
    &:hover:not(:disabled) {
      background: rgba(0, 240, 255, 0.06);
      box-shadow: 0 0 10px var(--cp-glow-secondary);
    }
  }
  &--danger {
    background: transparent;
    color: var(--cp-color-danger);
    border-color: rgba(255, 0, 60, 0.3);
    &:hover:not(:disabled) {
      background: rgba(255, 0, 60, 0.06);
      box-shadow: 0 0 10px var(--cp-glow-danger);
    }
  }
  &--ghost {
    background: transparent;
    color: var(--cp-text-secondary);
    border-color: var(--cp-border-base);
    &:hover:not(:disabled) {
      color: var(--cp-color-secondary);
      border-color: var(--cp-color-secondary);
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

  &--loading .sc-button__content {
    opacity: 0.5;
  }

  &:focus-visible {
    outline: 2px solid var(--cp-color-secondary);
    outline-offset: 2px;
  }

  &__loader {
    width: 14px;
    height: 14px;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 0;
    animation: sc-btn-spin 600ms linear infinite;
  }
}

@keyframes sc-btn-spin {
  to { transform: rotate(360deg); }
}
</style>
