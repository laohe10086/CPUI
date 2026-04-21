<template>
  <div class="sterile-category-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="sterile-category-tabs__tab"
      :class="{'sterile-category-tabs__tab--active': modelValue === tab.value}"
      @click="$emit('update:modelValue', tab.value)"
    >
      <span class="sterile-category-tabs__label">{{ tab.label }}</span>
      <span v-if="tab.count !== undefined" class="sterile-category-tabs__count">{{ tab.count }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CategoryTabsProps, CategoryTab } from '../../types/components'

defineProps<CategoryTabsProps>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<style lang="scss" scoped>
.sterile-category-tabs {
  display: flex;
  gap: 2px;
  font-family: var(--cp-font-sans);

  &__tab {
    border-radius: 0;
    background: transparent;
    border: 1px solid transparent;
    color: var(--cp-text-muted);
    padding: 6px 14px;
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);

    &--active {
      background: var(--cp-bg-hover);
      border-color: var(--cp-border-bright);
      color: var(--cp-text-primary);
    }

    &:hover:not(.sterile-category-tabs__tab--active) {
      background: var(--cp-bg-hover);
    }
  }

  &__label {
    // no uppercase, no letter-spacing
  }

  &__count {
    color: var(--cp-text-dim);
    font-size: 0.85em;
  }
}
</style>
