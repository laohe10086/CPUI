<template>
  <div class="sc-pagination">
    <button
      class="sc-pagination__btn"
      :disabled="currentPage <= 1"
      @click="$emit('update:currentPage', currentPage - 1)"
    >
      &#9664; PREV
    </button>
    <span class="sc-pagination__info">
      PAGE <span class="sc-pagination__current">{{ currentPage }}</span> / {{ totalPages }}
    </span>
    <button
      class="sc-pagination__btn"
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
.sc-pagination {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--cp-font-mono);
  font-size: 0.85em;
  letter-spacing: 1px;

  &__btn {
    border-radius: 0;
    background: transparent;
    border: 1px solid var(--cp-border-base);
    color: var(--cp-text-secondary);
    padding: 4px 14px;
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);

    &:hover:not(:disabled) {
      border-color: var(--cp-border-bright);
      box-shadow: 0 0 10px var(--cp-glow-secondary);
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
    text-shadow: 0 0 8px var(--cp-glow-primary);
  }
}
</style>
