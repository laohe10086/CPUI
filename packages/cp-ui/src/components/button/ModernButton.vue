<template>
  <button :class="['modern-button', `modern-button--${variant}`]">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'danger'
}>()
</script>

<style scoped lang="scss">
.modern-button {
  position: relative;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: all var(--cp-transition);
  font-family: var(--cp-font-family);
  letter-spacing: -0.01em;
  
  &--primary {
    background: var(--cp-primary);
    color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    
    &:hover {
      background: var(--cp-primary-hover);
      box-shadow: 0 4px 12px rgba(94, 106, 210, 0.4);
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
  
  &--secondary {
    background: transparent;
    color: var(--cp-text-primary);
    border: 1px solid var(--cp-border);
    
    &:hover {
      background: var(--cp-surface-1);
      border-color: var(--cp-primary);
    }
  }
  
  &--danger {
    background: var(--cp-error);
    color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    
    &:hover {
      background: #dc2626;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
}
</style>
