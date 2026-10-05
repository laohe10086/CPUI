<template>
  <button
    class="blueprint-button"
    :class="[
      `blueprint-button--${variant}`,
      `blueprint-button--${size}`,
      { 'blueprint-button--loading': loading },
      { 'blueprint-button--block': block },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="blueprint-button__loader" />
    <span class="blueprint-button__content">
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
.blueprint-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--cp-font-mono);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  transition:
    background-color var(--cp-duration-fast) var(--cp-easing),
    color var(--cp-duration-fast) var(--cp-easing),
    border-color var(--cp-duration-fast) var(--cp-easing);

  // hover 叠加 45° 斜线填充（hatch）
  &:hover:not(:disabled):not(.blueprint-button--ghost) {
    background-image: repeating-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.14) 0 2px,
      transparent 2px 6px
    );
  }

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
    color: #fff;
    border-color: var(--cp-color-primary);

    &:hover:not(:disabled) {
      background-image: repeating-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.18) 0 2px,
        transparent 2px 6px
      );
    }
  }
  &--secondary {
    background: transparent;
    color: var(--cp-color-secondary);
    border-color: var(--cp-color-secondary);
  }
  &--danger {
    background: transparent;
    color: var(--cp-color-danger);
    border-color: var(--cp-color-danger);
  }
  &--ghost {
    background: transparent;
    color: var(--cp-text-muted);
    border-color: transparent;
    &:hover:not(:disabled) {
      color: var(--cp-text-primary);
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

  &--loading .blueprint-button__content {
    opacity: 0.5;
  }

  &:focus-visible {
    outline: 1px solid var(--cp-border-active);
    outline-offset: 2px;
  }

  &__loader {
    width: 12px;
    height: 12px;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 0;
    animation: blueprint-btn-spin 600ms steps(8) infinite;
  }
}

@keyframes blueprint-btn-spin {
  to { transform: rotate(360deg); }
}
</style>
