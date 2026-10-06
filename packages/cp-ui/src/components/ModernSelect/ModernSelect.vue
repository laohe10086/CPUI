<template>
  <div class="modern-select" :class="{ 'modern-select--open': isOpen }">
    <button class="modern-select__trigger" @click="toggle">
      <span class="modern-select__value">{{ selectedLabel || placeholder }}</span>
      <svg class="modern-select__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    
    <Transition name="modern-select-dropdown">
      <div v-if="isOpen" class="modern-select__dropdown">
        <button
          v-for="option in options"
          :key="option.value"
          class="modern-select__option"
          :class="{ 'modern-select__option--selected': option.value === modelValue }"
          @click="select(option)"
        >
          {{ option.label }}
          <svg v-if="option.value === modelValue" class="modern-select__check" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Option {
  value: string | number
  label: string
}

interface Props {
  modelValue: string | number
  options: Option[]
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const isOpen = ref(false)

const selectedLabel = computed(() => {
  const option = props.options.find(opt => opt.value === props.modelValue)
  return option?.label || ''
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const select = (option: Option) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}
</script>

<style scoped lang="scss">
.modern-select {
  position: relative;
  display: inline-block;
  min-width: 200px;
  
  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 14px;
    font-size: 14px;
    color: var(--cp-text-primary);
    background: var(--cp-surface-1);
    border: 1px solid var(--cp-border);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      border-color: var(--cp-primary);
    }
  }
  
  &__value {
    flex: 1;
    text-align: left;
  }
  
  &__arrow {
    flex-shrink: 0;
    margin-left: 8px;
    color: var(--cp-text-secondary);
    transition: transform 0.2s ease;
  }
  
  &--open &__arrow {
    transform: rotate(180deg);
  }
  
  &__dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    z-index: 100;
    max-height: 240px;
    overflow-y: auto;
    background: var(--cp-surface-1);
    border: 1px solid var(--cp-border);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 14px;
    font-size: 14px;
    color: var(--cp-text-primary);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: background 0.15s ease;
    
    &:hover {
      background: var(--cp-surface-2);
    }
    
    &--selected {
      color: var(--cp-primary);
      font-weight: 500;
    }
  }
  
  &__check {
    flex-shrink: 0;
    margin-left: 8px;
    color: var(--cp-primary);
  }
}

.modern-select-dropdown-enter-active,
.modern-select-dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.modern-select-dropdown-enter-from,
.modern-select-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
