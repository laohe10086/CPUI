<template>
  <div
    class="cyber-category-tabs"
    :class="{
      'cyber-category-tabs--regular': shape === 'regular',
      'cyber-category-tabs--irregular': shape === 'irregular',
    }"
  >
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="cyber-category-tabs__tab"
      :class="{'cyber-category-tabs__tab--active': modelValue === tab.value}"
      @click="$emit('update:modelValue', tab.value)"
    >
      <span class="cyber-category-tabs__label">{{ tab.label }}</span>
      <span v-if="tab.count !== undefined" class="cyber-category-tabs__count">{{ tab.count }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CategoryTabsProps, CategoryTab } from '../../types/components'

withDefaults(defineProps<CategoryTabsProps>(), {
  shape: 'irregular',
})

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<style lang="scss" scoped>
.cyber-category-tabs {
  display: flex;
  gap: 8px;
  font-family: var(--cp-font-mono);

  &__tab {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: 1px solid var(--cp-border-base);
    color: var(--cp-text-secondary);
    padding: 6px 18px;
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-weight: 600;
    font-size: 0.8em;
    clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);

    &:hover:not(.cyber-category-tabs__tab--active) {
      border-color: var(--cp-border-bright);
      color: var(--cp-text-primary);
      transform: translateY(-1px);
    }

    &--active {
      background: var(--cp-color-primary);
      color: #050505;
      border-color: var(--cp-color-primary);
      transform: translateY(-1px);
      box-shadow:
        0 0 20px var(--cp-glow-primary),
        0 0 40px rgba(252, 232, 3, 0.15);
    }
  }

  &--regular &__tab {
    clip-path: none;
    border-left: 0;
    border-right: 0;
  }

  &__label {
    letter-spacing: 0.04em;
  }

  &__count {
    color: var(--cp-text-dim);
    font-size: 0.85em;
  }
}
</style>
