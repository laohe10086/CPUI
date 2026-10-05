<template>
  <div
    class="brutal-input"
    :class="{
      'brutal-input--focused': focused,
      'brutal-input--disabled': disabled,
    }"
  >
    <span class="brutal-input__prompt">&gt;</span>
    <span v-if="$slots.prefix" class="brutal-input__prefix"><slot name="prefix" /></span>
    <input
      ref="inputRef"
      class="brutal-input__field"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="type"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="focused = true"
      @blur="focused = false"
    />
    <span v-if="clearable && modelValue" class="brutal-input__clear" @click="$emit('update:modelValue', '')">×</span>
    <span v-if="$slots.suffix" class="brutal-input__suffix"><slot name="suffix" /></span>
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
// 终端粗野：直角输入条 + 内置 > 提示符，focus 亮靛蓝边
.brutal-input {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--cp-bg-base);
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  padding: 0 12px;
  height: 38px;
  transition:
    border-color var(--cp-duration-fast) var(--cp-easing),
    background var(--cp-duration-fast) var(--cp-easing);
  font-family: var(--cp-font-mono);

  &--focused {
    border-color: var(--cp-border-active);
    background: var(--cp-bg-panel);
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__prompt {
    color: var(--cp-color-primary);
    font-weight: 600;
    font-size: 13px;
    user-select: none;
    flex: none;
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
    font-size: 14px;
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
