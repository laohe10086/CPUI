<template>
  <div
    class="sc-input"
    :class="{
      'sc-input--focused': focused,
      'sc-input--disabled': disabled,
    }"
  >
    <span v-if="$slots.prefix" class="sc-input__prefix"><slot name="prefix" /></span>
    <input
      ref="inputRef"
      class="sc-input__field"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="type"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="focused = true"
      @blur="focused = false"
    />
    <span v-if="clearable && modelValue" class="sc-input__clear" @click="$emit('update:modelValue', '')">x</span>
    <span v-if="$slots.suffix" class="sc-input__suffix"><slot name="suffix" /></span>
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
.sc-input {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--cp-bg-base);
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  padding: 0 12px;
  height: 38px;
  font-family: var(--cp-font-mono);
  font-size: 13px;
  transition: all var(--cp-duration-fast) var(--cp-easing);

  &--focused {
    border-color: var(--cp-color-secondary);
    box-shadow: 0 0 0 1px var(--cp-color-secondary), 0 0 10px var(--cp-glow-secondary);
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
    font-size: inherit;
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
