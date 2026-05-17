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
  gap: 28px;
  font-family: var(--cp-font-sans);

  &__tab {
    position: relative;
    background: transparent;
    border: none;
    color: var(--cp-text-muted);
    padding: 4px 0;
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);
    font-size: 0.9em;

    &:hover:not(.sterile-category-tabs__tab--active) {
      color: var(--cp-text-primary);
    }

    &--active {
      color: var(--cp-text-primary);
      font-weight: 600;

      // 短横线指示器（只占文字宽度的 1/3）
      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: 30%;
        height: 2px;
        background: var(--cp-text-primary);
        border-radius: 1px;
      }
    }
  }

  &__label {
    // no uppercase, no letter-spacing
  }

  &__count {
    color: var(--cp-text-dim);
    font-size: 0.85em;
    margin-left: 4px;
  }
}
</style>
