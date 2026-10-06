<template>
  <div class="blueprint-pagination">
    <button
      class="blueprint-pagination__btn"
      :disabled="currentPage <= 1"
      @click="$emit('update:currentPage', currentPage - 1)"
    >
      ◄── PREV
    </button>
    <span class="blueprint-pagination__info">
      <span class="blueprint-pagination__fig">PG.</span>
      <span class="blueprint-pagination__current">{{ String(currentPage).padStart(2, '0') }}</span>
      <span class="blueprint-pagination__sep">/</span>
      <span class="blueprint-pagination__total">{{ String(totalPages).padStart(2, '0') }}</span>
    </span>
    <button
      class="blueprint-pagination__btn"
      :disabled="currentPage >= totalPages"
      @click="$emit('update:currentPage', currentPage + 1)"
    >
      NEXT ──►
    </button>
  </div>
</template>

<script setup lang="ts">
import type { PaginationProps } from '../../types/components'

withDefaults(defineProps<PaginationProps>(), {
  shape: 'regular',
})

defineEmits<{ 'update:currentPage': [page: number] }>()
</script>

<style lang="scss" scoped>
.blueprint-pagination {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--cp-font-mono);
  font-size: 0.85em;

  &__btn {
    background: transparent;
    border: 1px solid var(--cp-border-base);
    color: var(--cp-text-muted);
    padding: 6px 12px;
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);
    letter-spacing: 1px;

    &:hover:not(:disabled) {
      background: var(--cp-color-primary);
      border-color: var(--cp-color-primary);
      color: var(--cp-bg-base);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  &__info {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--cp-text-muted);
  }

  &__fig {
    font-size: 0.75em;
    opacity: 0.6;
  }

  &__current {
    color: var(--cp-color-primary);
    font-weight: 600;
  }

  &__sep {
    opacity: 0.4;
    margin: 0 2px;
  }

  &__total {
    opacity: 0.8;
  }
}
</style>
