<template>
  <div
    class="cyber-pagination"
    :class="{
      'cyber-pagination--regular': shape === 'regular',
      'cyber-pagination--irregular': shape === 'irregular',
    }"
  >
    <button
      class="cyber-pagination__btn"
      :disabled="currentPage <= 1"
      @click="$emit('update:currentPage', currentPage - 1)"
    >
      &#9664; PREV
    </button>
    <span class="cyber-pagination__info">
      PAGE <span class="cyber-pagination__current">{{ currentPage }}</span> / {{ totalPages }}
    </span>
    <button
      class="cyber-pagination__btn"
      :disabled="currentPage >= totalPages"
      @click="$emit('update:currentPage', currentPage + 1)"
    >
      NEXT &#9654;
    </button>
  </div>
</template>

<script setup lang="ts">
import type { PaginationProps } from '../../types/components'

withDefaults(defineProps<PaginationProps>(), {
  shape: 'irregular',
})

defineEmits<{ 'update:currentPage': [page: number] }>()
</script>

<style lang="scss" scoped>
.cyber-pagination {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--cp-font-mono);
  font-size: 0.85em;
  letter-spacing: 1px;

  &__btn {
    background: transparent;
    border: 1px solid var(--cp-border-bright);
    color: var(--cp-color-secondary);
    padding: 4px 14px;
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);
    clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);

    &:hover:not(:disabled) {
      background: var(--cp-color-secondary);
      color: #050505;
      box-shadow:
        0 0 20px var(--cp-glow-secondary),
        0 0 40px rgba(0, 240, 255, 0.1);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  &--regular &__btn {
    clip-path: none;
    border-left: 0;
    border-right: 0;
  }

  &__info {
    color: var(--cp-text-muted);
  }

  &__current {
    color: var(--cp-color-primary);
    text-shadow:
      0 0 12px var(--cp-glow-primary),
      0 0 24px var(--cp-glow-primary);
    font-weight: 700;
  }
}
</style>
