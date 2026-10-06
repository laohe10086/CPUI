<template>
  <div class="brutal-category-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="brutal-category-tabs__tab"
      :class="{'brutal-category-tabs__tab--active': modelValue === tab.value}"
      @click="$emit('update:modelValue', tab.value)"
    >
      <span class="brutal-category-tabs__label">{{ tab.label }}</span>
      <span v-if="tab.count !== undefined" class="brutal-category-tabs__count">{{ tab.count }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CategoryTabsProps } from '../../types/components'

withDefaults(defineProps<CategoryTabsProps>(), {
  shape: 'regular',
})

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<style lang="scss" scoped>
.brutal-category-tabs {
  display: flex;
  gap: 8px;
  font-family: var(--cp-font-mono);

  &__tab {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 2px solid var(--cp-border-base);
    color: var(--cp-text-primary);
    padding: 8px 20px;
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.75em;
    font-weight: 700;

    &:hover:not(.brutal-category-tabs__tab--active) {
      border-color: var(--cp-text-primary);
    }

    &--active {
      background: var(--cp-text-primary);
      color: var(--cp-bg-base);
      border-color: var(--cp-text-primary);
    }
  }

  &__label {
    letter-spacing: 0.1em;
  }

  &__count {
    font-weight: 700;
    border: 2px solid currentColor;
    padding: 2px 6px;
    min-width: 24px;
    text-align: center;
  }
}
</style>
