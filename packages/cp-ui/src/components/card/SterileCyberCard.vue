<template>
  <div
    class="sc-card"
    :class="[
      `sc-card--${variant}`,
      { 'sc-card--hoverable': hoverable },
      { 'sc-card--bordered': bordered },
    ]"
  >
    <div v-if="$slots.header || title" class="sc-card__header">
      <slot name="header">
        <span class="sc-card__title">{{ title }}</span>
      </slot>
    </div>
    <div class="sc-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="sc-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardProps } from '../../types/components'

withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  shape: 'regular',
  hoverable: false,
  bordered: true,
  title: '',
})
</script>

<style lang="scss" scoped>
.sc-card {
  background: var(--cp-bg-panel);
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  font-family: var(--cp-font-mono);
  transition: all var(--cp-duration-base) var(--cp-easing);
  overflow: hidden;

  &--outlined {
    background: transparent;
  }

  &--elevated {
    box-shadow: var(--cp-shadow-md);
  }

  &--bordered {
    border-color: var(--cp-border-base);
  }

  &--hoverable {
    cursor: pointer;
    &:hover {
      border-color: var(--cp-color-secondary);
      box-shadow: 0 0 12px var(--cp-glow-secondary);
    }
  }

  &__header {
    padding: 14px 18px;
    border-bottom: 1px solid var(--cp-border-dim);
    box-shadow: 0 1px 0 rgba(0, 240, 255, 0.05);
    font-family: var(--cp-font-mono);
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--cp-text-muted);
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
}
</style>
