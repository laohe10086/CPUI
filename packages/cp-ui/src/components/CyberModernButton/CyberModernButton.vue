<template>
  <button 
    :class="['cyber-modern-button', `cyber-modern-button--${variant}`, { 'cyber-modern-button--disabled': disabled }]"
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
.cyber-modern-button {
  padding: 10px 24px;
  font-family: var(--cp-font-family);
  font-size: var(--cp-font-size-sm);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all var(--cp-transition);
  border-radius: var(--cp-radius-full);
  letter-spacing: 0.02em;
  position: relative;

  &--primary {
    background: var(--cp-primary);
    color: var(--cp-background);
    box-shadow: 0 0 20px var(--cp-primary-subtle);
    
    &:hover:not(.cyber-modern-button--disabled) {
      background: var(--cp-primary-hover);
      box-shadow: 0 0 30px rgba(0, 217, 255, 0.4);
      transform: translateY(-2px);
    }
  }

  &--secondary {
    background: transparent;
    color: var(--cp-secondary);
    border: 1px solid var(--cp-secondary);
    box-shadow: 0 0 10px var(--cp-secondary-subtle);
    
    &:hover:not(.cyber-modern-button--disabled) {
      background: var(--cp-secondary-subtle);
      box-shadow: 0 0 20px rgba(255, 0, 170, 0.3);
    }
  }

  &--danger {
    background: transparent;
    color: var(--cp-error);
    border: 1px solid var(--cp-error);
    
    &:hover:not(.cyber-modern-button--disabled) {
      background: rgba(255, 0, 85, 0.1);
      box-shadow: 0 0 20px rgba(255, 0, 85, 0.3);
    }
  }

  &--disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}
</style>
