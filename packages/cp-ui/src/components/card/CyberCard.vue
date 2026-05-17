<template>
  <div
    class="cyber-card"
    :class="[
      `cyber-card--${variant}`,
      { 'cyber-card--hoverable': hoverable },
      { 'cyber-card--cut': shape === 'cut' },
      { 'cyber-card--irregular': shape === 'irregular' },
      { 'cyber-card--regular': shape === 'regular' },
      { 'cyber-card--bordered': bordered },
    ]"
  >
    <div v-if="$slots.header || title" class="cyber-card__header">
      <slot name="header">
        <span class="cyber-card__title">{{ title }}</span>
      </slot>
    </div>
    <div class="cyber-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="cyber-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardProps } from '../../types/components'

withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  shape: 'irregular',
  hoverable: false,
  bordered: true,
  title: '',
})
</script>

<style lang="scss" scoped>
.cyber-card {
  position: relative;
  background: var(--cp-bg-panel);
  border: 1px solid var(--cp-border-base);
  transition: all var(--cp-duration-base) var(--cp-easing);
  overflow: hidden;

  &--cut {
    clip-path: var(--cp-cut-corner-md);
  }
  &--irregular {
    /* Asymmetric polygon: TL diagonal cut + BR diagonal cut */
    clip-path: polygon(
      0 12px,
      12px 0,
      100% 0,
      100% calc(100% - 12px),
      calc(100% - 12px) 100%,
      0 100%
    );
  }
  &--regular {
    border-radius: 0;
  }

  &--outlined {
    background: transparent;
  }

  &--elevated {
    box-shadow: var(--cp-shadow-md), 0 0 20px rgba(0, 240, 255, 0.05);
  }

  &--bordered {
    border-color: var(--cp-border-base);
  }

  &--hoverable {
    cursor: pointer;
    &:hover {
      border-color: var(--cp-color-secondary);
      box-shadow:
        0 8px 30px var(--cp-glow-secondary),
        0 0 40px rgba(0, 240, 255, 0.08);
      transform: translateY(-3px);
    }
  }

  &__header {
    padding: 14px 18px;
    border-bottom: 1px solid var(--cp-border-dim);
    font-family: var(--cp-font-mono);
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--cp-text-muted);
    box-shadow: 0 1px 0 rgba(0, 240, 255, 0.08);
  }

  &__title {
    color: var(--cp-text-secondary);
  }

  &__body {
    padding: 18px;
  }

  &__footer {
    padding: 12px 18px;
    border-top: 1px solid var(--cp-border-dim);
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--cp-color-secondary);
    opacity: 0.1;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 2px,
      rgba(0, 240, 255, 0.015) 2px,
      rgba(0, 240, 255, 0.015) 4px
    );
    pointer-events: none;
  }
}
</style>
