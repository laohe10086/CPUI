<template>
  <div class="cyber-modern-input-wrapper">
    <input
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      class="cyber-modern-input"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <div class="cyber-modern-input__glow"></div>
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
.cyber-modern-input-wrapper {
  position: relative;
  width: 100%;
}

.cyber-modern-input {
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
  position: relative;
  z-index: 1;

  &::placeholder {
    color: var(--cp-text-tertiary);
  }

  &:focus {
    border-color: var(--cp-primary);
    background: var(--cp-surface-2);
    box-shadow: 0 0 16px var(--cp-primary-subtle);

    ~ .cyber-modern-input__glow {
      opacity: 1;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.cyber-modern-input__glow {
  position: absolute;
  inset: 0;
  border-radius: var(--cp-radius-md);
  background: linear-gradient(
    135deg,
    var(--cp-primary-subtle),
    var(--cp-secondary-subtle)
  );
  opacity: 0;
  transition: opacity var(--cp-transition);
  pointer-events: none;
  z-index: 0;
}
</style>
