<template>
  <Teleport to="body">
    <Transition name="blueprint-modal">
      <div v-if="modelValue" class="blueprint-modal-overlay" @click.self="onOverlayClick">
        <div class="blueprint-modal" :class="[`blueprint-modal--${size}`, { 'blueprint-modal--fullscreen': fullscreen }]">
          <div v-if="!hideClose" class="blueprint-modal__close" @click="close">
            <span class="blueprint-modal__close-x">✕</span>
          </div>
          <div class="blueprint-modal__corner blueprint-modal__corner--tl" />
          <div class="blueprint-modal__corner blueprint-modal__corner--tr" />
          <div class="blueprint-modal__corner blueprint-modal__corner--bl" />
          <div class="blueprint-modal__corner blueprint-modal__corner--br" />
          <div class="blueprint-modal__scale">
            <span v-for="i in 8" :key="i" class="blueprint-modal__tick" />
          </div>
          <div class="blueprint-modal__body">
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
.blueprint-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
}

.blueprint-modal {
  position: relative;
  background: var(--cp-bg-panel);
  border: 1px solid var(--cp-color-primary);
  max-height: 90vh;
  overflow: auto;

  &--sm { width: 400px; }
  &--md { width: 600px; }
  &--lg { width: 800px; }
  &--fullscreen { width: 95vw; height: 95vh; max-height: none; }

  &__close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--cp-border-base);
    background: var(--cp-bg-base);
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);
    z-index: 10;

    &:hover {
      border-color: var(--cp-color-primary);
      background: var(--cp-color-primary);
      .blueprint-modal__close-x {
        color: var(--cp-bg-base);
      }
    }
  }

  &__close-x {
    font-family: var(--cp-font-mono);
    font-size: 14px;
    color: var(--cp-text-muted);
    line-height: 1;
  }

  &__corner {
    position: absolute;
    width: 12px;
    height: 12px;
    
    &--tl { 
      top: -1px; 
      left: -1px; 
      border-top: 2px solid var(--cp-color-primary); 
      border-left: 2px solid var(--cp-color-primary); 
    }
    &--tr { 
      top: -1px; 
      right: -1px; 
      border-top: 2px solid var(--cp-color-primary); 
      border-right: 2px solid var(--cp-color-primary); 
    }
    &--bl { 
      bottom: -1px; 
      left: -1px; 
      border-bottom: 2px solid var(--cp-color-primary); 
      border-left: 2px solid var(--cp-color-primary); 
    }
    &--br { 
      bottom: -1px; 
      right: -1px; 
      border-bottom: 2px solid var(--cp-color-primary); 
      border-right: 2px solid var(--cp-color-primary); 
    }
  }

  &__scale {
    position: absolute;
    top: 16px;
    left: 16px;
    display: flex;
    gap: 2px;
  }

  &__tick {
    width: 1px;
    height: 6px;
    background: var(--cp-border-base);
    
    &:nth-child(4n) {
      height: 10px;
      background: var(--cp-color-primary);
    }
  }

  &__body {
    padding: 32px;
    background-image: 
      linear-gradient(var(--cp-border-dim) 1px, transparent 1px),
      linear-gradient(90deg, var(--cp-border-dim) 1px, transparent 1px);
    background-size: 20px 20px;
  }
}

.blueprint-modal-enter-active,
.blueprint-modal-leave-active {
  transition: opacity var(--cp-duration-normal) var(--cp-easing);
  
  .blueprint-modal {
    transition: all var(--cp-duration-normal) var(--cp-easing);
  }
}

.blueprint-modal-enter-from,
.blueprint-modal-leave-to {
  opacity: 0;
  
  .blueprint-modal {
    transform: scale(0.95);
    opacity: 0;
  }
}
</style>
