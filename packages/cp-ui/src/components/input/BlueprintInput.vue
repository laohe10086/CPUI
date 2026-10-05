<template>
  <div
    class="blueprint-input"
    :class="{
      'blueprint-input--focused': focused,
      'blueprint-input--disabled': disabled,
    }"
  >
    <span v-if="$slots.prefix" class="blueprint-input__prefix"><slot name="prefix" /></span>
    <input
      ref="inputRef"
      class="blueprint-input__field"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="type"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="focused = true"
      @blur="focused = false"
    />
    <span v-if="clearable && modelValue" class="blueprint-input__clear" @click="$emit('update:modelValue', '')">[x]</span>
    <span v-if="$slots.suffix" class="blueprint-input__suffix"><slot name="suffix" /></span>
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
  shape: 'regular',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

const focused = ref(false)
const inputRef = ref<HTMLInputElement>()

defineExpose({ inputRef })
</script>

<style lang="scss" scoped>
.blueprint-input {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  padding: 0 12px;
  height: 38px;
  transition: border-color var(--cp-duration-fast) var(--cp-easing);
  font-family: var(--cp-font-mono);

  // 左上 / 右下角的 6px L 形刻度 tick
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background-image:
      linear-gradient(#fff, #fff),
      linear-gradient(#fff, #fff);
    background-size: 6px 1px, 1px 6px;
    background-repeat: no-repeat;
    pointer-events: none;
  }
  &::before {
    top: -1px;
    left: -1px;
    background-position: left top, left top;
  }
  &::after {
    bottom: -1px;
    right: -1px;
    background-position: right bottom, right bottom;
  }

  &--focused {
    border-color: var(--cp-border-active);
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
    font-size: 13px;
    width: 100%;
    caret-color: var(--cp-color-primary);

    &::placeholder { color: var(--cp-text-dim); }
  }

  &__clear {
    cursor: pointer;
    color: var(--cp-text-muted);
    font-size: 11px;
    &:hover { color: var(--cp-text-primary); }
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
