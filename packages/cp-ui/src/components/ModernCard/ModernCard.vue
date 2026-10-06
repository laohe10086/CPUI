<template>
  <div class="modern-card">
    <div v-if="title" class="modern-card__header">
      <h3 class="modern-card__title">{{ title }}</h3>
    </div>
    <div class="modern-card__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardProps } from '../../types/components'

defineProps<CardProps>()
</script>

<style scoped lang="scss">
.modern-card {
  background: var(--cp-surface-1);
  border: 1px solid var(--cp-border);
  border-radius: var(--cp-radius-md);
  overflow: hidden;
  transition: border-color var(--cp-transition);

  &:hover {
    border-color: var(--cp-border-subtle);
  }

  &__header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--cp-border);
  }

  &__title {
    margin: 0;
    font-family: var(--cp-font-family);
    font-size: var(--cp-font-size-base);
    font-weight: 600;
    color: var(--cp-text-primary);
    letter-spacing: -0.01em;
  }

  &__content {
    padding: 20px;
    font-family: var(--cp-font-family);
    font-size: var(--cp-font-size-sm);
    color: var(--cp-text-secondary);
    line-height: 1.6;
  }
}
</style>
