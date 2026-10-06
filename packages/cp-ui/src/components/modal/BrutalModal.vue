<template>
  <Teleport to="body">
    <Transition name="brutal-modal">
      <div v-if="modelValue" class="brutal-modal-overlay" @click.self="onOverlayClick">
        <div class="brutal-modal" :class="[`brutal-modal--${size}`, { 'brutal-modal--fullscreen': fullscreen }]">
          <div v-if="!hideClose" class="brutal-modal__close" @click="close">
            <span class="brutal-modal__close-x">X</span>
          </div>
          <div class="brutal-modal__body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
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
  shape: 'regular',
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

<style lang="scss" scoped>
.brutal-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
}

.brutal-modal {
  position: relative;
  background: var(--cp-bg-panel);
  border: 2px solid var(--cp-border-base);
  max-height: 90vh;
  overflow: auto;

  &--sm { width: 400px; }
  &--md { width: 600px; }
  &--lg { width: 800px; }
  &--fullscreen { width: 95vw; height: 95vh; max-height: none; }

  &__close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--cp-border-base);
    background: var(--cp-bg-base);
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);
    z-index: 10;

    &:hover {
      background: var(--cp-text-primary);
      border-color: var(--cp-bg-base);
      
      .brutal-modal__close-x {
        color: var(--cp-bg-base);
      }
    }
  }

  &__close-x {
    font-family: var(--cp-font-mono);
    font-size: 14px;
    font-weight: 700;
    color: var(--cp-text-primary);
    line-height: 1;
    letter-spacing: 1px;
  }

  &__body {
    padding: 32px;
  }
}

.brutal-modal-enter-active,
.brutal-modal-leave-active {
  transition: opacity var(--cp-duration-normal) var(--cp-easing);
  
  .brutal-modal {
    transition: all var(--cp-duration-normal) var(--cp-easing);
  }
}

.brutal-modal-enter-from,
.brutal-modal-leave-to {
  opacity: 0;
  
  .brutal-modal {
    transform: scale(0.9);
    opacity: 0;
  }
}
</style>
