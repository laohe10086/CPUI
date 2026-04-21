<template>
  <div
    class="sterile-input"
    :class="{
      'sterile-input--focused': focused,
      'sterile-input--disabled': disabled,
    }"
  >
    <span v-if="$slots.prefix" class="sterile-input__prefix"><slot name="prefix" /></span>
    <input
      ref="inputRef"
      class="sterile-input__field"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="type"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="focused = true"
      @blur="focused = false"
    />
    <span v-if="clearable && modelValue" class="sterile-input__clear" @click="$emit('update:modelValue', '')">x</span>
    <span v-if="$slots.suffix" class="sterile-input__suffix"><slot name="suffix" /></span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  type?: string
}>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  clearable: false,
  type: 'text',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

const focused = ref(false)
const inputRef = ref<HTMLInputElement>()

defineExpose({ inputRef })
</script>

<style lang="scss" scoped>
.sterile-input {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--cp-bg-base);
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  padding: 0 12px;
  height: 38px;
  transition: all var(--cp-duration-fast) var(--cp-easing);
  font-family: var(--cp-font-sans);

  &--focused {
    border-color: var(--cp-border-active);
    box-shadow: 0 0 0 2px rgba(138, 180, 196, 0.15);
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__field {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: var(--cp-text-primary);
    font-family: inherit;
    font-size: 14px;
    width: 100%;

    &::placeholder { color: var(--cp-text-dim); }
  }

  &__clear {
    cursor: pointer;
    color: var(--cp-text-muted);
    font-size: 12px;
    &:hover { color: var(--cp-text-primary); }
  }

  &__prefix,
  &__suffix {
    color: var(--cp-text-muted);
    font-size: 13px;
    display: flex;
    align-items: center;
  }
}
</style>
