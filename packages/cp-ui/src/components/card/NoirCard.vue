<template>
  <div
    class="noir-card"
    :class="[
      `noir-card--${variant}`,
      { 'noir-card--hoverable': hoverable },
      { 'noir-card--bordered': bordered },
    ]"
  >
    <div v-if="$slots.header || title" class="noir-card__header">
      <slot name="header">
        <span class="noir-card__title">{{ title }}</span>
      </slot>
    </div>
    <div class="noir-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="noir-card__footer">
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
.noir-card {
  position: relative;
  background: var(--cp-bg-panel);
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  padding: 24px;
  font-family: var(--cp-font-sans);
  transition:
    border-color var(--cp-duration-base) var(--cp-easing),
    box-shadow var(--cp-duration-base) var(--cp-easing);

  &--outlined {
    background: transparent;
  }

  &--elevated {
    background: var(--cp-bg-elevated);
  }

  &--hoverable {
    cursor: pointer;
    &:hover {
      border-color: var(--cp-border-bright);
      box-shadow: 0 0 24px rgba(0, 240, 255, 0.06);
    }
  }

  &__header {
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--cp-border-base);
  }

  &__title {
    font-family: 'Cormorant Garamond', 'Noto Serif SC', Georgia, serif;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.04em;
    line-height: 1.3;
    color: var(--cp-text-primary);
  }

  &__body {
    font-size: 13px;
    line-height: 1.7;
    color: var(--cp-text-secondary);
  }

  &__footer {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--cp-border-base);
  }
}
</style>
