<template>
  <div class="blueprint-input-wrapper">
    <div class="blueprint-input__scale blueprint-input__scale--tl"></div>
    <div class="blueprint-input__scale blueprint-input__scale--tr"></div>
    <div class="blueprint-input__scale blueprint-input__scale--bl"></div>
    <div class="blueprint-input__scale blueprint-input__scale--br"></div>
    <input
      class="blueprint-input"
      :class="{ 'blueprint-input--error': error }"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
import type { InputProps } from '../../types/components'

withDefaults(defineProps<InputProps>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  error: false,
  modelValue: '',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style lang="scss" scoped>
.blueprint-input-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.blueprint-input__scale {
  position: absolute;
  width: 8px;
  height: 8px;
  pointer-events: none;
  
  &--tl {
    top: 0;
    left: 0;
    border-top: 1px solid var(--cp-border-base);
    border-left: 1px solid var(--cp-border-base);
  }
  
  &--tr {
    top: 0;
    right: 0;
    border-top: 1px solid var(--cp-border-base);
    border-right: 1px solid var(--cp-border-base);
  }
  
  &--bl {
    bottom: 0;
    left: 0;
    border-bottom: 1px solid var(--cp-border-base);
    border-left: 1px solid var(--cp-border-base);
  }
  
  &--br {
    bottom: 0;
    right: 0;
    border-bottom: 1px solid var(--cp-border-base);
    border-right: 1px solid var(--cp-border-base);
  }
}

.blueprint-input {
  width: 100%;
  padding: 10px 14px;
  font-family: var(--cp-font-mono);
  font-size: 13px;
  color: var(--cp-text-primary);
  background: var(--cp-bg-elevated);
  border: 1px solid var(--cp-border-base);
  outline: none;
  transition: border-color var(--cp-duration-base) var(--cp-easing);

  &::placeholder {
    color: var(--cp-text-dim);
    font-style: italic;
  }

  &:focus {
    border-color: var(--cp-color-primary);
    
    ~ .blueprint-input__scale {
      border-color: var(--cp-color-primary);
    }
  }

  &--error {
    border-color: var(--cp-color-danger);
    
    ~ .blueprint-input__scale {
      border-color: var(--cp-color-danger);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
