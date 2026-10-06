<template>
  <div class="cyber-modern-card">
    <div class="cyber-modern-card__glow"></div>
    <div v-if="title" class="cyber-modern-card__header">
      <h3 class="cyber-modern-card__title">{{ title }}</h3>
    </div>
    <div class="cyber-modern-card__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardProps } from '../../types/components'

defineProps<CardProps>()
</script>

<style scoped lang="scss">
.cyber-modern-card {
  position: relative;
  background: var(--cp-surface-1);
  border: 1px solid var(--cp-border);
  border-radius: var(--cp-radius-md);
  overflow: hidden;
  transition: all var(--cp-transition);

  &:hover {
    border-color: var(--cp-primary);
    box-shadow: 0 0 24px var(--cp-primary-subtle);

    .cyber-modern-card__glow {
      opacity: 0.6;
    }
  }

  &__glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      var(--cp-primary) 50%, 
      transparent
    );
    opacity: 0.3;
    transition: opacity var(--cp-transition);
  }

  &__header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--cp-border);
    background: var(--cp-surface-2);
  }

  &__title {
    margin: 0;
    font-family: var(--cp-font-family);
    font-size: var(--cp-font-size-base);
    font-weight: 600;
    color: var(--cp-text-primary);
    letter-spacing: 0.02em;
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
