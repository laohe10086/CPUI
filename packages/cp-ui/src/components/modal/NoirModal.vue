<template>
  <Teleport to="body">
    <Transition name="noir-modal">
      <div v-if="modelValue" class="noir-modal-overlay" @click.self="onOverlayClick">
        <div class="noir-modal" :class="[`noir-modal--${size}`, { 'noir-modal--fullscreen': fullscreen }]">
          <div v-if="!hideClose" class="noir-modal__close" @click="close">
            <span class="noir-modal__close-x">✕</span>
          </div>
          <div class="noir-modal__glow" />
          <div class="noir-modal__body">
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
  shape: 'cut',
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
.noir-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
}

.noir-modal {
  position: relative;
  background: var(--cp-bg-panel);
  border: 2px solid var(--cp-color-primary);
  clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
  box-shadow: 
    0 0 40px var(--cp-glow-primary),
    0 0 80px rgba(0, 240, 255, 0.2);
  max-height: 90vh;
  overflow: auto;
  animation: noir-modal-pulse 2s ease-in-out infinite;

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
    clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
    border: 1px solid var(--cp-color-primary);
    background: var(--cp-bg-base);
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);
    z-index: 10;

    &:hover {
      border-color: var(--cp-color-secondary);
      background: var(--cp-color-secondary);
      box-shadow: 0 0 15px var(--cp-glow-secondary);
      
      .noir-modal__close-x {
        color: var(--cp-bg-base);
      }
    }
  }

  &__close-x {
    font-family: var(--cp-font-display);
    font-size: 16px;
    color: var(--cp-color-primary);
    line-height: 1;
  }

  &__glow {
    position: absolute;
    inset: -2px;
    background: radial-gradient(circle at 50% 0%, var(--cp-color-primary) 0%, transparent 70%);
    opacity: 0.2;
    pointer-events: none;
    animation: noir-modal-glow-pulse 3s ease-in-out infinite;
  }

  &__body {
    padding: 32px;
    position: relative;
    background-image: 
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 240, 255, 0.03) 2px,
        rgba(0, 240, 255, 0.03) 4px
      );
  }
}

@keyframes noir-modal-pulse {
  0%, 100% { 
    box-shadow: 
      0 0 40px var(--cp-glow-primary),
      0 0 80px rgba(0, 240, 255, 0.2);
  }
  50% { 
    box-shadow: 
      0 0 50px var(--cp-glow-primary),
      0 0 100px rgba(0, 240, 255, 0.3);
  }
}

@keyframes noir-modal-glow-pulse {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
}

.noir-modal-enter-active,
.noir-modal-leave-active {
  transition: opacity var(--cp-duration-normal) var(--cp-easing);
  
  .noir-modal {
    transition: all var(--cp-duration-normal) var(--cp-easing);
  }
}

.noir-modal-enter-from,
.noir-modal-leave-to {
  opacity: 0;
  
  .noir-modal {
    transform: scale(0.9);
    opacity: 0;
  }
}
</style>
