<template>
  <div class="sterile-pagination">
    <button
      class="sterile-pagination__btn"
      :disabled="currentPage <= 1"
      @click="$emit('update:currentPage', currentPage - 1)"
    >
      &#9664; PREV
    </button>
    <span class="sterile-pagination__info">
      PAGE <span class="sterile-pagination__current">{{ currentPage }}</span> / {{ totalPages }}
    </span>
    <button
      class="sterile-pagination__btn"
      :disabled="currentPage >= totalPages"
      @click="$emit('update:currentPage', currentPage + 1)"
    >
      NEXT &#9654;
    </button>
  </div>
</template>

<script setup lang="ts">
import type { PaginationProps } from '../../types/components'

defineProps<PaginationProps>()

defineEmits<{ 'update:currentPage': [page: number] }>()
</script>

<style lang="scss" scoped>
.sterile-pagination {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--cp-font-sans);
  font-size: 0.85em;

  &__btn {
    border-radius: 0;
    background: transparent;
    border: 1px solid var(--cp-border-base);
    color: var(--cp-text-secondary);
    padding: 4px 14px;
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);

    &:hover:not(:disabled) {
      background: var(--cp-bg-hover);
      border-color: var(--cp-border-bright);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &__info {
    color: var(--cp-text-muted);
  }

  &__current {
    color: var(--cp-color-primary);
    font-weight: 700;
  }
}
</style>
