<template>
  <button
    class="cyber-button"
    :class="[
      `cyber-button--${variant}`,
      `cyber-button--${size}`,
      { 'cyber-button--loading': loading },
      { 'cyber-button--block': block },
      { 'cyber-button--cut': shape === 'cut' },
      { 'cyber-button--irregular': shape === 'irregular' },
      { 'cyber-button--regular': shape === 'regular' },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="cyber-button__loader" />
    <span class="cyber-button__content">
      <slot />
    </span>
    <span class="cyber-button__glitch" aria-hidden="true">
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
.cyber-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--cp-font-mono);
  font-weight: 600;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--cp-duration-fast) var(--cp-easing);
  white-space: nowrap;
  user-select: none;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  overflow: hidden;

  &--sm {
    padding: 4px 12px;
    font-size: 11px;
    height: 30px;
  }
  &--md {
    padding: 6px 20px;
    font-size: 13px;
    height: 38px;
  }
  &--lg {
    padding: 8px 28px;
    font-size: 15px;
    height: 44px;
  }

  &--primary {
    background: var(--cp-color-primary);
    color: #050505;
    border-color: var(--cp-color-primary);
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
    &:hover:not(:disabled) {
      box-shadow:
        0 0 20px var(--cp-glow-primary),
        0 0 50px rgba(252, 232, 3, 0.15),
        inset 0 0 20px rgba(255, 255, 255, 0.05);
      filter: brightness(1.15);
      transform: translateY(-1px);
    }
    &::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -60%;
      width: 40%;
      height: 200%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
      transform: skewX(-20deg);
      transition: left 0.6s ease;
    }
    &:hover::after {
      left: 120%;
    }
  }
  &--secondary {
    background: transparent;
    color: var(--cp-color-secondary);
    border-color: var(--cp-color-secondary);
    &:hover:not(:disabled) {
      background: rgba(0, 240, 255, 0.08);
      box-shadow:
        0 0 20px var(--cp-glow-secondary),
        0 0 40px rgba(0, 240, 255, 0.1),
        inset 0 0 15px rgba(0, 240, 255, 0.05);
      transform: translateY(-1px);
    }
  }
  &--danger {
    background: transparent;
    color: var(--cp-color-danger);
    border-color: var(--cp-color-danger);
    &:hover:not(:disabled) {
      background: rgba(255, 0, 60, 0.1);
      box-shadow:
        0 0 20px var(--cp-glow-danger),
        0 0 40px rgba(255, 0, 60, 0.1);
      transform: translateY(-1px);
    }
  }
  &--ghost {
    background: transparent;
    color: var(--cp-text-secondary);
    border-color: var(--cp-border-base);
    &:hover:not(:disabled) {
      color: var(--cp-text-primary);
      border-color: var(--cp-text-muted);
      box-shadow: none;
      transform: translateY(-1px);
    }
  }

  &--cut {
    clip-path: var(--cp-cut-corner-md);
  }
  &--irregular {
    /* 左右斜切不对称 — 赛博朋克梯形按钮 */
    clip-path: polygon(10px 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
  }
  &--regular {
    border-left: 0;
    border-right: 0;
  }

  &--ghost#{&}--regular {
    border-color: var(--cp-text-muted);
    &:hover:not(:disabled) {
      color: var(--cp-text-primary);
      border-color: var(--cp-text-muted);
      box-shadow: none;
      transform: translateY(-1px);
    }
  }
  &--block {
    display: flex;
    width: 100%;
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    filter: grayscale(0.5);
  }

  &--loading .cyber-button__content {
    opacity: 0.4;
  }

  &--loading .cyber-button__loader {
    box-shadow: 0 0 10px currentColor;
  }

  &:focus-visible {
    outline: 2px solid var(--cp-color-secondary);
    outline-offset: 2px;
    box-shadow: 0 0 15px var(--cp-glow-secondary);
  }

  &__glitch {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: var(--cp-font-mono);
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    opacity: 0;
    pointer-events: none;
    color: var(--cp-color-primary);
    text-shadow:
      2px 0 var(--cp-color-secondary),
      -2px 0 var(--cp-color-danger);
  }

  &:hover:not(:disabled) .cyber-button__glitch {
    animation: cyber-btn-glitch 0.3s steps(2, end) 1 forwards;
  }

  &__loader {
    width: 14px;
    height: 14px;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: cyber-btn-spin 600ms linear infinite;
  }
}

@keyframes cyber-btn-glitch {
  0%   { opacity: 1; clip-path: inset(40% -6px 61% 0);   transform: translate(-4px, 0); }
  20%  { opacity: 1; clip-path: inset(92% -6px 1% 0);    transform: translate(4px, 0); }
  40%  { opacity: 1; clip-path: inset(43% -6px 50% 0);   transform: translate(-2px, 0); }
  60%  { opacity: 1; clip-path: inset(25% -6px 58% 0);   transform: translate(4px, 0); }
  80%  { opacity: 1; clip-path: inset(54% -6px 7% 0);    transform: translate(-3px, 0); }
  100% { opacity: 0; clip-path: inset(40% -6px 61% 0);   transform: translate(-4px, 0); }
}

@keyframes cyber-btn-spin {
  to { transform: rotate(360deg); }
}
</style>
