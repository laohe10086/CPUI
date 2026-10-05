<template>
  <div
    class="noir-input"
    :class="{
      'noir-input--focused': focused,
      'noir-input--disabled': disabled,
    }"
  >
    <span v-if="$slots.prefix" class="noir-input__prefix"><slot name="prefix" /></span>
    <input
      ref="inputRef"
      class="noir-input__field"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="type"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="focused = true"
      @blur="focused = false"
    />
    <span v-if="clearable && modelValue" class="noir-input__clear" @click="$emit('update:modelValue', '')">[x]</span>
    <span v-if="$slots.suffix" class="noir-input__suffix"><slot name="suffix" /></span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { InputProps } from '../../types/components'

withDefaults(defineProps<InputProps>(), {
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
.noir-input {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--cp-border-base);
  border-radius: 0;
  padding: 10px 0;
  transition:
    border-color var(--cp-duration-base) var(--cp-easing),
    box-shadow var(--cp-duration-base) var(--cp-easing);
  font-family: var(--cp-font-sans);

  &--focused {
    border-bottom-color: var(--cp-color-primary);
    box-shadow: 0 8px 16px -8px var(--cp-glow-primary);
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
    caret-color: var(--cp-color-primary);

    &::placeholder { color: var(--cp-text-dim); }
  }

  &__clear {
    cursor: pointer;
    color: var(--cp-text-muted);
    font-size: 11px;
    transition: color var(--cp-duration-base) var(--cp-easing);
    &:hover { color: var(--cp-color-primary); }
  }

  &__prefix,
  &__suffix {
    color: var(--cp-text-muted);
    font-size: 12px;
    display: flex;
    align-items: center;
  }
}
</style>
