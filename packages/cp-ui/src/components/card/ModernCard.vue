<template>
  <div :class="['modern-card', { 'modern-card--hoverable': hoverable }]">
    <div v-if="title" class="modern-card__header">
      <h3 class="modern-card__title">{{ title }}</h3>
    </div>
    <div class="modern-card__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  hoverable?: boolean
}>(), {
  hoverable: true,
})
</script>

<style scoped lang="scss">
.modern-card {
  background: var(--cp-surface-1);
  border: 1px solid var(--cp-border);
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: all var(--cp-transition);
  overflow: hidden;

  &--hoverable:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    transform: translateY(-2px);
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
