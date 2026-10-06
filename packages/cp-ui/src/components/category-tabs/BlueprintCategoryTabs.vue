<template>
  <div class="blueprint-category-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="blueprint-category-tabs__tab"
      :class="{'blueprint-category-tabs__tab--active': modelValue === tab.value}"
      @click="$emit('update:modelValue', tab.value)"
    >
      <span class="blueprint-category-tabs__label">{{ tab.label }}</span>
      <span v-if="tab.count !== undefined" class="blueprint-category-tabs__count">{{ tab.count }}</span>
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
.blueprint-category-tabs {
  display: flex;
  gap: 2px;
  font-family: var(--cp-font-mono);
  background: var(--cp-border-base);

  &__tab {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--cp-bg-panel);
    border: 1px solid var(--cp-border-base);
    color: var(--cp-text-muted);
    padding: 8px 16px;
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.75em;

    &::before {
      content: '';
      position: absolute;
      left: 8px;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 4px;
      background: var(--cp-border-base);
      transition: all var(--cp-duration-fast) var(--cp-easing);
    }

    &:hover:not(.blueprint-category-tabs__tab--active) {
      border-color: var(--cp-color-primary);
      color: var(--cp-text-primary);
      
      &::before {
        background: var(--cp-color-primary);
      }
    }

    &--active {
      background: var(--cp-bg-elevated);
      color: var(--cp-color-primary);
      border-color: var(--cp-color-primary);
      font-weight: 600;
      
      &::before {
        background: var(--cp-color-primary);
        width: 6px;
        height: 6px;
      }
    }
  }

  &__label {
    padding-left: 8px;
  }

  &__count {
    color: var(--cp-text-dim);
    font-size: 0.9em;
    border: 1px solid var(--cp-border-base);
    padding: 2px 6px;
    min-width: 20px;
    text-align: center;
  }
}
</style>
