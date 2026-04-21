<template>
  <div
    class="sterile-card"
    :class="[
      `sterile-card--${variant}`,
      { 'sterile-card--hoverable': hoverable },
      { 'sterile-card--bordered': bordered },
    ]"
  >
    <div v-if="$slots.header || title" class="sterile-card__header">
      <slot name="header">
        <span class="sterile-card__title">{{ title }}</span>
      </slot>
    </div>
    <div class="sterile-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="sterile-card__footer">
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
.sterile-card {
  background: var(--cp-bg-panel);
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
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
      border-color: var(--cp-border-bright);
    }
  }

  &__header {
    padding: 14px 18px;
    border-bottom: 1px solid var(--cp-border-dim);
    font-family: var(--cp-font-sans);
    font-size: 13px;
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
