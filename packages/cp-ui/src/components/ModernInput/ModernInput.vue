<template>
  <div class="modern-input-wrapper">
    <input
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      class="modern-input"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
import type { InputProps } from '../../types/components'

withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped lang="scss">
.modern-input-wrapper {
  position: relative;
  width: 100%;
}

.modern-input {
  width: 100%;
  padding: 10px 16px;
  font-family: var(--cp-font-family);
  font-size: var(--cp-font-size-sm);
  color: var(--cp-text-primary);
  background: var(--cp-surface-1);
  border: 1px solid var(--cp-border);
  border-radius: var(--cp-radius-md);
  outline: none;
  transition: all var(--cp-transition);

  &::placeholder {
    color: var(--cp-text-tertiary);
  }

  &:hover:not(:disabled) {
    border-color: var(--cp-primary);
  }

  &:focus {
    border-color: var(--cp-primary);
    box-shadow: 0 0 0 3px var(--cp-primary-subtle);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
