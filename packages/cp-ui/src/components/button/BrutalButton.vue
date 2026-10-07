<template>
  <button
    class="brutal-button"
    :class="[
      `brutal-button--${variant}`,
      `brutal-button--${size}`,
      { 'brutal-button--loading': loading },
      { 'brutal-button--block': block },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="brutal-button__loader" />
    <span class="brutal-button__content">
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
.brutal-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--cp-font-mono);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border: 3px solid #000;
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  transition: all var(--cp-duration-fast) linear;

  &--sm {
    padding: 6px 16px;
    font-size: 11px;
    height: 32px;
    border-width: 3px;
  }
  &--md {
    padding: 8px 22px;
    font-size: 13px;
    height: 38px;
  }
  &--lg {
    padding: 10px 28px;
    font-size: 14px;
    height: 44px;
    border-width: 5px;
  }

  &--primary {
    background: var(--cp-color-primary);
    background-image: var(--cp-halftone-pattern);
    background-size: var(--cp-halftone-size);
    color: #000;
    border-color: #000;

    &:hover:not(:disabled) {
      background: #000;
      color: var(--cp-color-primary);
    }
  }

  &--secondary {
    background: transparent;
    color: var(--cp-color-secondary);
    border-color: var(--cp-color-secondary);

    &:hover:not(:disabled) {
      background: var(--cp-color-secondary);
      color: #000;
    }
  }

  &--danger {
    background: var(--cp-color-danger);
    color: #fff;
    border-color: #000;

    &:hover:not(:disabled) {
      background: #000;
      color: var(--cp-color-danger);
    }
  }

  &--ghost {
    background: transparent;
    color: var(--cp-text-muted);
    border-color: var(--cp-border-base);
    border-width: 2px;

    &:hover:not(:disabled) {
      color: var(--cp-text-primary);
      border-color: var(--cp-text-primary);
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

  &--loading .brutal-button__content {
    opacity: 0.6;
  }

  &__loader {
    width: 12px;
    height: 12px;
    border: 3px solid transparent;
    border-top-color: currentColor;
    animation: brutal-btn-spin 400ms linear infinite;
  }
}

@keyframes brutal-btn-spin {
  to { transform: rotate(360deg); }
}
</style>
