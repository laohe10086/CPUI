<template>
  <div class="sc-category-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="sc-category-tabs__tab"
      :class="{'sc-category-tabs__tab--active': modelValue === tab.value}"
      @click="$emit('update:modelValue', tab.value)"
    >
      <span class="sc-category-tabs__bracket">[</span>
      <span class="sc-category-tabs__label">{{ tab.label }}</span>
      <span v-if="tab.count !== undefined" class="sc-category-tabs__count">{{ tab.count }}</span>
      <span class="sc-category-tabs__bracket">]</span>
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
  gap: 4px;
  font-family: var(--cp-font-mono);

  &__tab {
    border-radius: 0;
    background: transparent;
    border: 1px solid var(--cp-border-base);
    color: var(--cp-text-muted);
    padding: 6px 14px;
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);
    text-transform: uppercase;

    &--active {
      border-color: var(--cp-color-secondary);
      color: var(--cp-text-secondary);
      background: rgba(0, 240, 255, 0.05);
      box-shadow: 0 0 8px var(--cp-glow-secondary);

      .sc-category-tabs__bracket {
        opacity: 0.8;
      }
    }

    &:hover:not(.sc-category-tabs__tab--active) {
      border-color: var(--cp-border-bright);
      color: var(--cp-text-secondary);
    }
  }

  &__bracket {
    opacity: 0.3;
    transition: opacity var(--cp-duration-fast) var(--cp-easing);
  }

  &__label {
    letter-spacing: 0.05em;
  }

  &__count {
    color: var(--cp-text-dim);
    font-size: 0.85em;
  }
}
</style>
