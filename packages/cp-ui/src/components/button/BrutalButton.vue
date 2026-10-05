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
// 终端粗野：直角方块 + 等宽大写，hover 直接反白填充——黑底上的硬结构
.brutal-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--cp-font-mono);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: 1px solid transparent;
  border-radius: 0;
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  transition:
    background-color var(--cp-duration-fast) var(--cp-easing),
    border-color var(--cp-duration-fast) var(--cp-easing),
    color var(--cp-duration-fast) var(--cp-easing),
    filter var(--cp-duration-fast) var(--cp-easing);

  &--sm {
    padding: 4px 14px;
    font-size: 11px;
    height: 30px;
  }
  &--md {
    padding: 6px 20px;
    font-size: 13px;
    height: 36px;
  }
  &--lg {
    padding: 8px 26px;
    font-size: 14px;
    height: 42px;
  }

  &--primary {
    background: var(--cp-color-primary);
    color: #fff;
    border-color: var(--cp-color-primary);
    &:hover:not(:disabled) {
      filter: brightness(1.2);
    }
  }
  &--secondary {
    color: var(--cp-text-primary);
    border-color: var(--cp-border-base);
    &:hover:not(:disabled) {
      background: var(--cp-text-primary);
      color: #000;
      border-color: var(--cp-text-primary);
    }
  }
  &--danger {
    color: var(--cp-color-danger);
    border-color: rgba(239, 68, 68, 0.5);
    &:hover:not(:disabled) {
      background: var(--cp-color-danger);
      color: #000;
      border-color: var(--cp-color-danger);
    }
  }
  &--ghost {
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

  &--loading .brutal-button__content {
    opacity: 0.5;
  }

  &:focus-visible {
    outline: 2px solid var(--cp-border-active);
    outline-offset: 2px;
  }

  &__loader {
    width: 12px;
    height: 12px;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: brutal-btn-spin 700ms linear infinite;
  }
}

@keyframes brutal-btn-spin {
  to { transform: rotate(360deg); }
}
</style>
