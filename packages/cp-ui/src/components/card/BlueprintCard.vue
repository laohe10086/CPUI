<template>
  <div
    class="blueprint-card"
    :class="[
      `blueprint-card--${variant}`,
      { 'blueprint-card--hoverable': hoverable },
      { 'blueprint-card--bordered': bordered },
    ]"
  >
    <div class="blueprint-card__inner">
      <div v-if="$slots.header || title" class="blueprint-card__header">
        <slot name="header">
          <span class="blueprint-card__title">{{ title }}</span>
        </slot>
      </div>
      <div class="blueprint-card__body">
        <slot />
      </div>
      <div v-if="$slots.footer" class="blueprint-card__footer">
        <slot name="footer" />
      </div>
      <div v-if="title" class="blueprint-card__fig">FIG. 01</div>
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
.blueprint-card {
  position: relative;
  background: var(--cp-bg-panel);
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  transition: border-color var(--cp-duration-fast) var(--cp-easing);
  font-family: var(--cp-font-mono);

  // 四角十字定位标记（外框两角 + 内框两角，各负责一个角）
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
      linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6));
    background-size: 10px 1px, 1px 10px;
    background-repeat: no-repeat;
    background-position: center;
    pointer-events: none;
  }
  &::before { top: -5px; left: -5px; }
  &::after { bottom: -5px; right: -5px; }

  &__inner {
    position: relative;
    margin: 6px;
    border: 1px dashed rgba(255, 255, 255, 0.2);

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
        linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6));
      background-size: 10px 1px, 1px 10px;
      background-repeat: no-repeat;
      background-position: center;
      pointer-events: none;
    }
    &::before { top: -12px; right: -12px; }
    &::after { bottom: -12px; left: -12px; }
  }

  &--outlined {
    background: transparent;
  }

  &--elevated {
    box-shadow: none;
  }

  &--hoverable {
    cursor: pointer;
    &:hover {
      border-color: var(--cp-border-active);
    }
  }

  &__header {
    padding: 12px 16px;
    border-bottom: 1px dashed var(--cp-border-base);
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-align: left;
    color: var(--cp-text-muted);
  }

  &__title {
    color: var(--cp-text-primary);
  }

  &__body {
    padding: 16px;
  }

  &__footer {
    padding: 10px 16px;
    border-top: 1px dashed var(--cp-border-base);
  }

  &__fig {
    padding: 6px 12px;
    border-top: 1px solid var(--cp-border-base);
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-align: right;
    color: var(--cp-text-muted);
  }
}
</style>
