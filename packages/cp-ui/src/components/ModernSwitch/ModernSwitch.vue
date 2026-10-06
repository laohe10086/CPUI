<template>
  <label class="modern-switch" :class="{ 'modern-switch--checked': modelValue, 'modern-switch--disabled': disabled }">
    <input
      type="checkbox"
      class="modern-switch__input"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
    />
    <span class="modern-switch__track">
      <span class="modern-switch__thumb"></span>
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  disabled?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<style scoped lang="scss">
.modern-switch {
  display: inline-block;
  cursor: pointer;
  
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &__input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  &__track {
    position: relative;
    display: block;
    width: 44px;
    height: 24px;
    background: var(--cp-surface-2);
    border: 1px solid var(--cp-border);
    border-radius: 9999px;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    background: var(--cp-text-secondary);
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &--checked &__track {
    background: var(--cp-primary);
    border-color: var(--cp-primary);
  }
  
  &--checked &__thumb {
    left: 22px;
    background: #ffffff;
  }
  
  &:not(&--disabled):hover &__track {
    border-color: var(--cp-primary);
  }
}
</style>
