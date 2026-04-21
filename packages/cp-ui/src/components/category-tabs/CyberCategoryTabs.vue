<template>
  <div class="cyber-category-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="cyber-category-tabs__tab"
      :class="{'cyber-category-tabs__tab--active': modelValue === tab.value}"
      @click="$emit('update:modelValue', tab.value)"
    >
      <span class="cyber-category-tabs__bracket">[</span>
      <span class="cyber-category-tabs__label">{{ tab.label }}</span>
      <span v-if="tab.count !== undefined" class="cyber-category-tabs__count">{{ tab.count }}</span>
      <span class="cyber-category-tabs__bracket">]</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CategoryTabsProps, CategoryTab } from '../../types/components'

defineProps<CategoryTabsProps>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<style lang="scss" scoped>
.cyber-category-tabs {
  display: flex;
  gap: 4px;
  font-family: var(--cp-font-mono);

  &__tab {
    background: transparent;
    border: 1px solid var(--cp-border-base);
    color: var(--cp-text-muted);
    padding: 6px 14px;
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);
    text-transform: uppercase;
    clip-path: polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%);

    &--active {
      border-color: var(--cp-color-secondary);
      color: var(--cp-text-secondary);
      background: rgba(0, 240, 255, 0.05);
      box-shadow: 0 0 10px var(--cp-glow-secondary);

      .cyber-category-tabs__bracket {
        opacity: 1;
      }
    }

    &:hover:not(.cyber-category-tabs__tab--active) {
      border-color: var(--cp-border-bright);
      color: var(--cp-text-secondary);
    }
  }

  &__bracket {
    opacity: 0.3;
    transition: opacity var(--cp-duration-fast) var(--cp-easing),
                transform var(--cp-duration-fast) var(--cp-easing);
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
