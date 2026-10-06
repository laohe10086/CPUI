<template>
  <input
    :class="['modern-input']"
    :value="modelValue"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string
  placeholder?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped lang="scss">
.modern-input {
  width: 100%;
  padding: 10px 16px;
  font-size: 14px;
  font-family: var(--cp-font-family);
  background: var(--cp-surface-1);
  color: var(--cp-text-primary);
  border: 1px solid var(--cp-border);
  border-radius: 8px;
  outline: none;
  transition: all var(--cp-transition);
  
  &::placeholder {
    color: var(--cp-text-tertiary);
  }
  
  &:hover {
    border-color: var(--cp-primary);
  }
  
  &:focus {
    border-color: var(--cp-primary);
    box-shadow: 0 0 0 3px var(--cp-primary-subtle);
  }
}
</style>
