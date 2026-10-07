<template>
  <div class="modern-category-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="modern-category-tabs__tab"
      :class="{ 'modern-category-tabs__tab--active': modelValue === tab.value }"
      @click="$emit('update:modelValue', tab.value)"
    >
      <span class="modern-category-tabs__label">{{ tab.label }}</span>
      <span v-if="tab.count !== undefined" class="modern-category-tabs__count">{{ tab.count }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CategoryTabsProps } from '../../types/components'

defineProps<CategoryTabsProps>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<style scoped lang="scss">
.modern-category-tabs {
  display: flex;
  gap: 4px;
  font-family: var(--cp-font-family);

  &__tab {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    background: transparent;
    border: none;
    border-radius: var(--cp-radius-full);
    color: var(--cp-text-secondary);
    font-family: var(--cp-font-family);
    font-size: var(--cp-font-size-sm);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--cp-transition);

    &:hover:not(.modern-category-tabs__tab--active) {
      color: var(--cp-text-primary);
      background: var(--cp-surface-2);
    }

    &--active {
      color: #ffffff;
      background: var(--cp-primary);
      box-shadow: var(--cp-shadow-sm);

      .modern-category-tabs__count {
        color: rgba(255, 255, 255, 0.7);
        background: rgba(255, 255, 255, 0.15);
      }
    }
  }

  &__count {
    padding: 0 6px;
    font-size: var(--cp-font-size-xs);
    color: var(--cp-text-tertiary);
    background: var(--cp-surface-2);
    border-radius: var(--cp-radius-full);
  }
}
</style>
