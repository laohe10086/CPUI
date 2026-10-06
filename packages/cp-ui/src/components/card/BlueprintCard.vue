<template>
  <div class="blueprint-card">
    <div class="blueprint-card__corner blueprint-card__corner--tl"></div>
    <div class="blueprint-card__corner blueprint-card__corner--tr"></div>
    <div class="blueprint-card__corner blueprint-card__corner--bl"></div>
    <div class="blueprint-card__corner blueprint-card__corner--br"></div>
    <div v-if="title" class="blueprint-card__header">
      <h3 class="blueprint-card__title">{{ title }}</h3>
    </div>
    <div class="blueprint-card__body">
      <slot />
    </div>
    <div class="blueprint-card__figure">FIG. 01</div>
  </div>
</template>

<script setup lang="ts">
import type { CardProps } from '../../types/components'

withDefaults(defineProps<CardProps>(), {
  title: '',
})
</script>

<style lang="scss" scoped>
.blueprint-card {
  position: relative;
  padding: 20px;
  background: var(--cp-bg-panel);
  border: 1px solid var(--cp-border-base);
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 35px,
    rgba(255, 255, 255, 0.015) 35px,
    rgba(255, 255, 255, 0.015) 37px
  );

  &__corner {
    position: absolute;
    width: 12px;
    height: 12px;
    
    &--tl {
      top: -1px;
      left: -1px;
      border-top: 1px solid var(--cp-border-bright);
      border-left: 1px solid var(--cp-border-bright);
    }
    
    &--tr {
      top: -1px;
      right: -1px;
      border-top: 1px solid var(--cp-border-bright);
      border-right: 1px solid var(--cp-border-bright);
    }
    
    &--bl {
      bottom: -1px;
      left: -1px;
      border-bottom: 1px solid var(--cp-border-bright);
      border-left: 1px solid var(--cp-border-bright);
    }
    
    &--br {
      bottom: -1px;
      right: -1px;
      border-bottom: 1px solid var(--cp-border-bright);
      border-right: 1px solid var(--cp-border-bright);
    }
  }

  &__header {
    margin-bottom: 16px;
  }

  &__title {
    font-family: var(--cp-font-mono);
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--cp-text-primary);
    margin: 0;
  }

  &__body {
    color: var(--cp-text-secondary);
    line-height: 1.6;
  }

  &__figure {
    position: absolute;
    bottom: 8px;
    right: 12px;
    font-family: var(--cp-font-mono);
    font-size: 9px;
    color: var(--cp-text-dim);
    letter-spacing: 0.05em;
  }
}
</style>
