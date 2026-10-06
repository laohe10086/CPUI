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
    <span class="blueprint-button__corner blueprint-button__corner--tl">+</span>
    <span class="blueprint-button__corner blueprint-button__corner--tr">+</span>
    <span class="blueprint-button__corner blueprint-button__corner--bl">+</span>
    <span class="blueprint-button__corner blueprint-button__corner--br">+</span>
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
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: 1px solid var(--cp-color-primary);
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  transition: all var(--cp-duration-base) var(--cp-easing);

  &__corner {
    position: absolute;
    font-size: 9px;
    line-height: 1;
    opacity: 0.5;
    pointer-events: none;
    color: currentColor;
    font-weight: 300;
    
    &--tl { top: -1px; left: -1px; }
    &--tr { top: -1px; right: -1px; }
    &--bl { bottom: -1px; left: -1px; }
    &--br { bottom: -1px; right: -1px; }
  }

  &--sm {
    padding: 6px 14px;
    font-size: 11px;
    height: 28px;
  }
  &--md {
    padding: 8px 20px;
    font-size: 12px;
    height: 34px;
  }
  &--lg {
    padding: 10px 26px;
    font-size: 13px;
    height: 40px;
  }

  &--primary {
    background: var(--cp-color-primary);
    color: var(--cp-bg-base);
    border-color: var(--cp-color-primary);

    &:hover:not(:disabled) {
      background: transparent;
      color: var(--cp-color-primary);
      
      .blueprint-button__corner {
        opacity: 0.8;
      }
    }
  }

  &--secondary {
    background: transparent;
    color: var(--cp-color-secondary);
    border-color: var(--cp-color-secondary);
    border-style: dashed;

    &:hover:not(:disabled) {
      border-style: solid;
      background: rgba(0, 240, 255, 0.06);
    }
  }

  &--danger {
    background: transparent;
    color: var(--cp-color-danger);
    border-color: var(--cp-color-danger);
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 4px,
      rgba(255, 0, 60, 0.08) 4px,
      rgba(255, 0, 60, 0.08) 8px
    );

    &:hover:not(:disabled) {
      background-color: rgba(255, 0, 60, 0.12);
      background-image: none;
    }
  }

  &--ghost {
    background: transparent;
    color: var(--cp-text-muted);
    border-color: var(--cp-border-base);
    
    &:hover:not(:disabled) {
      color: var(--cp-text-primary);
      border-color: var(--cp-border-bright);
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
    opacity: 0.6;
  }

  &:focus-visible {
    outline: 1px solid var(--cp-border-active);
    outline-offset: 2px;
  }

  &__loader {
    width: 10px;
    height: 10px;
    border: 1.5px solid transparent;
    border-top-color: currentColor;
    border-radius: 0;
    animation: blueprint-btn-spin 600ms linear infinite;
  }
}

@keyframes blueprint-btn-spin {
  to { transform: rotate(360deg); }
}
</style>
