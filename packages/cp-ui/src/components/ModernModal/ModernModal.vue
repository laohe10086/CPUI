<template>
  <Transition name="modern-modal">
    <div v-if="modelValue" class="modern-modal-overlay" @click.self="onOverlayClick">
      <div
        class="modern-modal"
        :class="[`modern-modal--${size}`, { 'modern-modal--fullscreen': fullscreen }]"
        role="dialog"
        aria-modal="true"
      >
        <button v-if="!hideClose" class="modern-modal__close" aria-label="Close" @click="close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>
        <div class="modern-modal__body">
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onUnmounted, watch } from 'vue'
import type { ModalProps } from '../../types/components'

const props = withDefaults(defineProps<ModalProps>(), {
  fullscreen: false,
  closeOnOverlay: true,
  closeOnEscape: true,
  hideClose: false,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function close() {
  emit('update:modelValue', false)
}

function onOverlayClick() {
  if (props.closeOnOverlay) close()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.closeOnEscape && props.modelValue) close()
}

watch(() => props.modelValue, (val) => {
  if (val) document.addEventListener('keydown', onKeydown)
  else document.removeEventListener('keydown', onKeydown)
})

onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<style scoped lang="scss">
.modern-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.modern-modal {
  position: relative;
  background: var(--cp-surface-1);
  border: 1px solid var(--cp-border);
  border-radius: var(--cp-radius-lg);
  box-shadow: var(--cp-shadow-lg);
  max-height: 90vh;

  &--sm { width: 400px; }
  &--md { width: 560px; }
  &--lg { width: 720px; }
  &--fullscreen {
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    border: none;
    border-radius: 0;
  }

  &__body {
    overflow-y: auto;
    max-height: 90vh;
    padding: 28px;
    font-family: var(--cp-font-family);
    font-size: var(--cp-font-size-sm);
    color: var(--cp-text-secondary);
    line-height: 1.6;
    scrollbar-width: thin;
    scrollbar-color: var(--cp-surface-3) transparent;
  }

  &--fullscreen &__body {
    max-height: 100vh;
  }

  &__close {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    color: var(--cp-text-tertiary);
    background: transparent;
    border: 1px solid var(--cp-border);
    border-radius: var(--cp-radius-sm);
    cursor: pointer;
    transition: all var(--cp-transition);

    &:hover {
      color: var(--cp-text-primary);
      background: var(--cp-surface-2);
      border-color: var(--cp-text-tertiary);
    }
  }
}

.modern-modal-enter-active,
.modern-modal-leave-active {
  transition: opacity var(--cp-transition);

  .modern-modal {
    transition: transform var(--cp-transition), opacity var(--cp-transition);
  }
}

.modern-modal-enter-from,
.modern-modal-leave-to {
  opacity: 0;

  .modern-modal {
    transform: scale(0.97) translateY(8px);
    opacity: 0;
  }
}
</style>
