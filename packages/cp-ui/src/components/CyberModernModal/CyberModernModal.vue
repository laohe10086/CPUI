<template>
  <Transition name="cyber-modern-modal">
    <div v-if="modelValue" class="cyber-modern-modal-overlay" @click.self="onOverlayClick">
      <div
        class="cyber-modern-modal"
        :class="[`cyber-modern-modal--${size}`, { 'cyber-modern-modal--fullscreen': fullscreen }]"
        role="dialog"
        aria-modal="true"
      >
        <div class="cyber-modern-modal__glow-line" />
        <button v-if="!hideClose" class="cyber-modern-modal__close" aria-label="Close" @click="close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>
        <div class="cyber-modern-modal__body">
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
.cyber-modern-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
}

.cyber-modern-modal {
  position: relative;
  background: var(--cp-surface-1);
  border: 1px solid var(--cp-primary);
  border-radius: var(--cp-radius-lg);
  box-shadow:
    0 0 24px var(--cp-primary-subtle),
    0 0 64px rgba(0, 217, 255, 0.08),
    var(--cp-shadow-lg);
  max-height: 90vh;
  overflow: hidden;

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

  &__glow-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--cp-primary) 50%, transparent);
    opacity: 0.8;
    pointer-events: none;
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
      color: var(--cp-secondary);
      border-color: var(--cp-secondary);
      box-shadow: 0 0 12px var(--cp-secondary-subtle);
    }
  }
}

.cyber-modern-modal-enter-active,
.cyber-modern-modal-leave-active {
  transition: opacity var(--cp-transition);

  .cyber-modern-modal {
    transition: transform var(--cp-transition), opacity var(--cp-transition);
  }
}

.cyber-modern-modal-enter-from,
.cyber-modern-modal-leave-to {
  opacity: 0;

  .cyber-modern-modal {
    transform: scale(0.97) translateY(8px);
    opacity: 0;
  }
}
</style>
