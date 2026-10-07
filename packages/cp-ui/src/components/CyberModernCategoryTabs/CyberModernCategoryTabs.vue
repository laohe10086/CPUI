<template>
  <div class="cyber-modern-category-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="cyber-modern-category-tabs__tab"
      :class="{ 'cyber-modern-category-tabs__tab--active': modelValue === tab.value }"
      @click="$emit('update:modelValue', tab.value)"
    >
      <span class="cyber-modern-category-tabs__label">{{ tab.label }}</span>
      <span v-if="tab.count !== undefined" class="cyber-modern-category-tabs__count">{{ tab.count }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CategoryTabsProps } from '../../types/components'

defineProps<CategoryTabsProps>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<style scoped lang="scss">
.cyber-modern-category-tabs {
  display: flex;
  gap: 4px;
  font-family: var(--cp-font-family);

  &__tab {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--cp-radius-full);
    color: var(--cp-text-secondary);
    font-family: var(--cp-font-family);
    font-size: var(--cp-font-size-sm);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--cp-transition);

    &:hover:not(.cyber-modern-category-tabs__tab--active) {
      color: var(--cp-primary);
      background: var(--cp-primary-subtle);
    }

    &--active {
      color: var(--cp-primary);
      border-color: var(--cp-primary);
      background: var(--cp-primary-subtle);
      box-shadow: 0 0 12px var(--cp-primary-subtle);

      .cyber-modern-category-tabs__count {
        color: var(--cp-primary);
        border-color: var(--cp-primary);
      }
    }
  }

  &__count {
    padding: 0 6px;
    font-size: var(--cp-font-size-xs);
    color: var(--cp-text-tertiary);
    border: 1px solid var(--cp-border);
    border-radius: var(--cp-radius-full);
  }
}
</style>
