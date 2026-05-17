<template>
  <div class="sc-category-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="sc-category-tabs__tab"
      :class="{'sc-category-tabs__tab--active': modelValue === tab.value}"
      @click="$emit('update:modelValue', tab.value)"
    >
      <span class="sc-category-tabs__label">{{ tab.label }}</span>
      <span v-if="tab.count !== undefined" class="sc-category-tabs__count">{{ tab.count }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CategoryTabsProps, CategoryTab } from '../../types/components'

defineProps<CategoryTabsProps>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<style lang="scss" scoped>
.sc-category-tabs {
  display: flex;
  gap: 6px;
  font-family: var(--cp-font-mono);

  &__tab {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: 1px solid var(--cp-border-base);
    color: var(--cp-text-muted);
    padding: 8px 18px;
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);
    text-transform: uppercase;
    letter-spacing: 0.03em;
    font-weight: 600;
    font-size: 0.8em;

    &:hover:not(.sc-category-tabs__tab--active) {
      border-color: var(--cp-border-bright);
      color: var(--cp-text-secondary);
    }

    &--active {
      background: rgba(0, 240, 255, 0.1);
      color: var(--cp-color-secondary);
      border-color: var(--cp-color-secondary);
      box-shadow: 0 0 10px var(--cp-glow-secondary);
    }
  }

  &__label {
    letter-spacing: 0.03em;
  }

  &__count {
    color: var(--cp-text-dim);
    font-size: 0.85em;
  }
}
</style>
