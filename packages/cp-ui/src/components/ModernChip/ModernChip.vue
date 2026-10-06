<template>
  <div class="modern-chip" :class="{ 'modern-chip--closable': closable }">
    <span class="modern-chip__text">{{ text }}</span>
    <button v-if="closable" class="modern-chip__close" @click="handleClose">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text: string
  closable?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const handleClose = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.modern-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--cp-text-primary);
  background: var(--cp-surface-1);
  border: 1px solid var(--cp-border);
  border-radius: 9999px;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--cp-surface-2);
    border-color: var(--cp-primary);
  }
  
  &--closable {
    padding-right: 8px;
  }
  
  &__text {
    line-height: 1;
  }
  
  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    padding: 0;
    color: var(--cp-text-secondary);
    background: transparent;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      color: var(--cp-text-primary);
      background: var(--cp-surface-3);
    }
    
    &:active {
      transform: scale(0.9);
    }
  }
}
</style>
