<template>
  <div class="brutal-pagination">
    <button
      class="brutal-pagination__btn"
      :disabled="currentPage <= 1"
      @click="$emit('update:currentPage', currentPage - 1)"
    >
      &lt; PREV
    </button>
    <span class="brutal-pagination__info">
      [ PAGE {{ currentPage }} / {{ totalPages }} ]
    </span>
    <button
      class="brutal-pagination__btn"
      :disabled="currentPage >= totalPages"
      @click="$emit('update:currentPage', currentPage + 1)"
    >
      NEXT &gt;
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
.brutal-pagination {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--cp-font-mono);
  font-size: 0.85em;

  &__btn {
    background: transparent;
    border: 2px solid var(--cp-border-base);
    color: var(--cp-text-primary);
    padding: 6px 16px;
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;

    &:hover:not(:disabled) {
      background: var(--cp-text-primary);
      color: var(--cp-bg-base);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  &__info {
    color: var(--cp-text-primary);
    font-weight: 700;
    letter-spacing: 1px;
  }
}
</style>
