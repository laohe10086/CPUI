<template>
  <div class="noir-category-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="noir-category-tabs__tab"
      :class="{'noir-category-tabs__tab--active': modelValue === tab.value}"
      @click="$emit('update:modelValue', tab.value)"
    >
      <span class="noir-category-tabs__label">{{ tab.label }}</span>
      <span v-if="tab.count !== undefined" class="noir-category-tabs__count">{{ tab.count }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CategoryTabsProps } from '../../types/components'

withDefaults(defineProps<CategoryTabsProps>(), {
  shape: 'cut',
})

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<style lang="scss" scoped>
.noir-category-tabs {
  display: flex;
  gap: 8px;
  font-family: var(--cp-font-mono);

  &__tab {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 2px solid var(--cp-color-primary);
    color: var(--cp-color-primary);
    padding: 6px 16px;
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: 0.75em;
    clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
    text-shadow: 0 0 8px var(--cp-glow-primary);

    &:hover:not(.noir-category-tabs__tab--active) {
      border-color: var(--cp-color-secondary);
      color: var(--cp-color-secondary);
      box-shadow: 0 0 15px var(--cp-glow-secondary);
      text-shadow: 0 0 8px var(--cp-glow-secondary);
    }

    &--active {
      background: var(--cp-color-primary);
      color: var(--cp-bg-base);
      border-color: var(--cp-color-primary);
      box-shadow: 0 0 20px var(--cp-glow-primary);
      text-shadow: none;
    }
  }

  &__label {
    text-decoration: underline;
    text-decoration-color: var(--cp-color-secondary);
    text-underline-offset: 2px;
    
    .noir-category-tabs__tab--active & {
      text-decoration: none;
    }
  }

  &__count {
    font-size: 0.9em;
    opacity: 0.8;
    
    .noir-category-tabs__tab--active & {
      opacity: 1;
      font-weight: 600;
    }
  }
}
</style>
