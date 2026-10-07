<template>
  <div class="cyber-modern-pagination">
    <button
      class="cyber-modern-pagination__btn"
      :disabled="currentPage <= 1"
      @click="$emit('update:currentPage', currentPage - 1)"
    >
      &#9664; Prev
    </button>
    <span class="cyber-modern-pagination__info">
      Page <span class="cyber-modern-pagination__current">{{ currentPage }}</span> / {{ totalPages }}
    </span>
    <button
      class="cyber-modern-pagination__btn"
      :disabled="currentPage >= totalPages"
      @click="$emit('update:currentPage', currentPage + 1)"
    >
      Next &#9654;
    </button>
  </div>
</template>

<script setup lang="ts">
import type { PaginationProps } from '../../types/components'

defineProps<PaginationProps>()

defineEmits<{ 'update:currentPage': [page: number] }>()
</script>

<style scoped lang="scss">
.cyber-modern-pagination {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--cp-font-family);
  font-size: var(--cp-font-size-sm);

  &__btn {
    padding: 6px 16px;
    background: transparent;
    border: 1px solid var(--cp-border);
    border-radius: var(--cp-radius-full);
    color: var(--cp-text-secondary);
    font-family: var(--cp-font-family);
    font-size: var(--cp-font-size-xs);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--cp-transition);

    &:hover:not(:disabled) {
      border-color: var(--cp-primary);
      color: var(--cp-primary);
      box-shadow: 0 0 12px var(--cp-primary-subtle);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &__info {
    color: var(--cp-text-tertiary);
  }

  &__current {
    color: var(--cp-primary);
    font-weight: 600;
    text-shadow: 0 0 8px var(--cp-primary-subtle);
  }
}
</style>
