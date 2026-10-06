<template>
  <div class="brutal-card">
    <div v-if="title" class="brutal-card__header">
      <h3 class="brutal-card__title">{{ title }}</h3>
    </div>
    <div class="brutal-card__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardProps } from '../../types/components'

withDefaults(defineProps<CardProps>(), {
  title: '',
})
</script>

<style lang="scss" scoped>
.brutal-card {
  position: relative;
  padding: 24px;
  background: var(--cp-bg-panel);
  border: 4px solid var(--cp-border-bright);
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3);

  &__header {
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--cp-border-base);
  }

  &__title {
    font-family: var(--cp-font-mono);
    font-size: 15px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--cp-text-primary);
    margin: 0;
  }

  &__body {
    font-family: var(--cp-font-mono);
    color: var(--cp-text-secondary);
    line-height: 1.6;
  }
}
</style>
