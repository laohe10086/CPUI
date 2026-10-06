<template>
  <button 
    :class="['modern-button', `modern-button--${variant}`, { 'modern-button--disabled': disabled }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from '../../types/components'

withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  disabled: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped lang="scss">
.modern-button {
  padding: 10px 24px;
  font-family: var(--cp-font-family);
  font-size: var(--cp-font-size-sm);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all var(--cp-transition);
  border-radius: var(--cp-radius-full);
  letter-spacing: -0.01em;

  &--primary {
    background: var(--cp-text-primary);
    color: var(--cp-background);
    
    &:hover:not(.modern-button--disabled) {
      background: var(--cp-text-secondary);
      transform: translateY(-1px);
    }
  }

  &--secondary {
    background: transparent;
    color: var(--cp-text-primary);
    border: 1px solid var(--cp-border);
    
    &:hover:not(.modern-button--disabled) {
      border-color: var(--cp-primary);
      color: var(--cp-primary);
    }
  }

  &--danger {
    background: transparent;
    color: var(--cp-error);
    border: 1px solid var(--cp-error);
    
    &:hover:not(.modern-button--disabled) {
      background: var(--cp-error);
      color: var(--cp-text-primary);
    }
  }

  &--disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}
</style>
