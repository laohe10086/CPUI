<template>
  <div class="brutal-input-wrapper">
    <span class="brutal-input__prompt">&gt;</span>
    <input
      class="brutal-input"
      :class="{ 'brutal-input--error': error }"
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
.brutal-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.brutal-input__prompt {
  font-family: var(--cp-font-mono);
  font-size: 16px;
  font-weight: 900;
  color: var(--cp-color-primary);
  line-height: 1;
  flex-shrink: 0;
}

.brutal-input {
  flex: 1;
  padding: 10px 14px;
  font-family: var(--cp-font-mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--cp-text-primary);
  background: var(--cp-bg-elevated);
  border: 3px solid var(--cp-border-base);
  outline: none;
  transition: border-color var(--cp-duration-fast) linear;

  &::placeholder {
    color: var(--cp-text-dim);
  }

  &:focus {
    border-color: var(--cp-color-primary);
  }

  &--error {
    border-color: var(--cp-color-danger);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
