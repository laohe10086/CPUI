<template>
  <Teleport to="body">
    <Transition name="cyber-modal">
      <div v-if="modelValue" class="cyber-modal-overlay" @click.self="onOverlayClick">
        <div class="cyber-modal" :class="[`cyber-modal--${size}`, { 'cyber-modal--fullscreen': fullscreen, 'cyber-modal--cut': shape === 'cut', 'cyber-modal--irregular': shape === 'irregular', 'cyber-modal--regular': shape === 'regular' }]">
          <div v-if="!hideClose" class="cyber-modal__close" @click="close">
            <span class="cyber-modal__close-x">✕</span>
          </div>
          <div class="cyber-modal__corner cyber-modal__corner--tl" />
          <div class="cyber-modal__corner cyber-modal__corner--tr" />
          <div class="cyber-modal__corner cyber-modal__corner--bl" />
          <div class="cyber-modal__corner cyber-modal__corner--br" />
          <div class="cyber-modal__body">
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
  shape: 'irregular',
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
.cyber-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
}

.cyber-modal {
  position: relative;
  background: var(--cp-bg-panel);
  border: 1px solid var(--cp-border-bright);
  box-shadow:
    0 0 40px rgba(0, 240, 255, 0.08),
    0 0 80px rgba(0, 240, 255, 0.04);
  max-height: 90vh;
  animation: cyber-modal-glow 2s ease-in-out infinite;

  &--sm { width: 400px; }
  &--md { width: 600px; }
  &--lg { width: 800px; }
  &--fullscreen {
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    border: none;
  }
  &--cut {
    clip-path: var(--cp-cut-corner-md);
  }
  &--irregular {
    clip-path: polygon(
      0 0,
      100% 0,
      100% 100%,
      20px 100%,
      0 calc(100% - 20px)
    );
  }
  &--regular {
    border-radius: 0;
  }
}

.cyber-modal__body {
  overflow-y: auto;
  max-height: 90vh;
  padding: 32px;
  scrollbar-width: thin;
  scrollbar-color: var(--cp-color-secondary) transparent;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: var(--cp-color-secondary); }
}

.cyber-modal--fullscreen .cyber-modal__body {
  max-height: 100vh;
}

.cyber-modal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--cp-color-secondary);
  opacity: 0.3;
  pointer-events: none;
}

.cyber-modal__close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--cp-text-muted);
  border: 1px solid var(--cp-border-base);
  z-index: 2;
  transition: all var(--cp-duration-fast) var(--cp-easing);

  &:hover {
    color: var(--cp-color-danger);
    border-color: var(--cp-color-danger);
    box-shadow:
      0 0 10px var(--cp-glow-danger),
      0 0 20px rgba(255, 0, 60, 0.1);
  }
}

.cyber-modal__close-x {
  font-size: 14px;
  line-height: 1;
}

.cyber-modal__corner {
  position: absolute;
  width: 12px;
  height: 12px;
  pointer-events: none;
  z-index: 2;

  &--tl { top: -1px; left: -1px; border-top: 2px solid var(--cp-color-secondary); border-left: 2px solid var(--cp-color-secondary); }
  &--br { bottom: -1px; right: -1px; border-bottom: 2px solid var(--cp-color-primary); border-right: 2px solid var(--cp-color-primary); }
}

.cyber-modal--irregular .cyber-modal__corner--tr,
.cyber-modal--irregular .cyber-modal__corner--bl {
  display: none;
}

@keyframes cyber-modal-glow {
  0%, 100% {
    box-shadow:
      0 0 40px rgba(0, 240, 255, 0.08),
      0 0 80px rgba(0, 240, 255, 0.04);
  }
  50% {
    box-shadow:
      0 0 50px rgba(0, 240, 255, 0.12),
      0 0 100px rgba(0, 240, 255, 0.06),
      inset 0 0 30px rgba(0, 240, 255, 0.03);
  }
}

.cyber-modal-enter-active,
.cyber-modal-leave-active {
  transition: opacity var(--cp-duration-base) var(--cp-easing);
  .cyber-modal { transition: transform var(--cp-duration-base) var(--cp-easing), opacity var(--cp-duration-base) var(--cp-easing); }
}
.cyber-modal-enter-from,
.cyber-modal-leave-to {
  opacity: 0;
  .cyber-modal { transform: scale(0.95); opacity: 0; }
}
</style>
