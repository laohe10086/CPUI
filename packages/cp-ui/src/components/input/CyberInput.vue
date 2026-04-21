<template>
  <div
    class="cyber-input"
    :class="[
      `cyber-input--${shape}`,
      {
        'cyber-input--focused': focused,
        'cyber-input--disabled': disabled,
      },
    ]"
  >
    <span v-if="$slots.prefix" class="cyber-input__prefix"><slot name="prefix" /></span>
    <input
      ref="inputRef"
      class="cyber-input__field"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="type"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="focused = true"
      @blur="focused = false"
    />
    <span v-if="clearable && modelValue" class="cyber-input__clear" @click="$emit('update:modelValue', '')">x</span>
    <span v-if="$slots.suffix" class="cyber-input__suffix"><slot name="suffix" /></span>
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
  shape?: 'regular' | 'cut' | 'irregular'
}>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  clearable: false,
  type: 'text',
  shape: 'irregular',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

const focused = ref(false)
const inputRef = ref<HTMLInputElement>()

defineExpose({ inputRef })
</script>

<style lang="scss" scoped>
.cyber-input {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--cp-bg-base);
  border: 1px solid var(--cp-border-base);
  border-radius: 2px;
  padding: 0 12px;
  height: 38px;
  transition: all var(--cp-duration-fast) var(--cp-easing);
  font-family: var(--cp-font-mono);
  position: relative;

  &--irregular {
    border-radius: 0;
    clip-path: polygon(
      0 6px, 6px 0,
      calc(60% - 12px) 0, 60% 8px,
      100% 8px, 100% calc(100% - 8px),
      calc(100% - 8px) 100%, 8px 100%,
      0 calc(100% - 6px)
    );
  }

  &--cut {
    border-radius: 0;
    clip-path: var(--cp-cut-corner-sm);
  }

  &--regular {
    border-radius: 0;
  }

  &--focused {
    border-color: var(--cp-color-secondary);
    box-shadow:
      0 0 0 1px var(--cp-color-secondary),
      0 0 20px var(--cp-glow-secondary);
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

    &::placeholder { color: var(--cp-text-dim); }
  }

  &__clear {
    cursor: pointer;
    color: var(--cp-text-muted);
    font-size: 12px;
    &:hover { color: var(--cp-color-danger); }
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
