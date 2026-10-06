<template>
  <div class="noir-pagination">
    <button
      class="noir-pagination__btn"
      :disabled="currentPage <= 1"
      @click="$emit('update:currentPage', currentPage - 1)"
    >
      ◄ PREV
    </button>
    <span class="noir-pagination__info">
      <span class="noir-pagination__label">PAGE</span>
      <span class="noir-pagination__current">{{ currentPage }}</span>
      <span class="noir-pagination__sep">/</span>
      <span class="noir-pagination__total">{{ totalPages }}</span>
    </span>
    <button
      class="noir-pagination__btn"
      :disabled="currentPage >= totalPages"
      @click="$emit('update:currentPage', currentPage + 1)"
    >
      NEXT ►
    </button>
  </div>
</template>

<script setup lang="ts">
import type { PaginationProps } from '../../types/components'

withDefaults(defineProps<PaginationProps>(), {
  shape: 'cut',
})

defineEmits<{ 'update:currentPage': [page: number] }>()
</script>

<style lang="scss" scoped>
.noir-pagination {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--cp-font-mono);
  font-size: 0.85em;

  &__btn {
    background: transparent;
    border: 2px solid var(--cp-color-primary);
    color: var(--cp-color-primary);
    padding: 6px 14px;
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);
    clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
    letter-spacing: 1px;
    text-shadow: 0 0 8px var(--cp-glow-primary);

    &:hover:not(:disabled) {
      background: var(--cp-color-primary);
      color: var(--cp-bg-base);
      box-shadow: 0 0 20px var(--cp-glow-primary);
      text-shadow: none;
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
      text-shadow: none;
    }
  }

  &__info {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__label {
    color: var(--cp-text-muted);
    font-size: 0.9em;
  }

  &__current {
    color: var(--cp-color-primary);
    text-shadow: 0 0 10px var(--cp-glow-primary);
    text-decoration: underline;
    text-decoration-color: var(--cp-color-secondary);
    text-underline-offset: 2px;
    font-weight: 600;
  }

  &__sep {
    color: var(--cp-text-muted);
    opacity: 0.5;
  }

  &__total {
    color: var(--cp-text-muted);
  }
}
</style>
