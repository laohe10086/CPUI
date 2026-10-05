<template>
  <div
    class="brutal-card"
    :class="[
      `brutal-card--${variant}`,
      { 'brutal-card--hoverable': hoverable },
      { 'brutal-card--bordered': bordered },
    ]"
  >
    <div v-if="$slots.header || title" class="brutal-card__header">
      <slot name="header">
        <span class="brutal-card__title">{{ title }}</span>
      </slot>
    </div>
    <div class="brutal-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="brutal-card__footer">
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
// 终端粗野：直角面板 + 等宽，标题行用 2px 粗结构线压阵
.brutal-card {
  position: relative;
  background: var(--cp-bg-panel);
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  transition: border-color var(--cp-duration-fast) var(--cp-easing);
  font-family: var(--cp-font-mono);

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
    }
  }

  &__header {
    padding: 10px 14px;
    border-bottom: 2px solid var(--cp-border-base);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--cp-text-muted);
  }

  &__title {
    color: var(--cp-text-secondary);
  }

  &__body {
    padding: 14px;
    font-size: 13px;
  }

  &__footer {
    padding: 10px 14px;
    border-top: 1px solid var(--cp-border-base);
  }
}
</style>
