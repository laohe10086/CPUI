<template>
  <Teleport to="body">
    <Transition name="sc-modal">
      <div v-if="modelValue" class="sc-modal-overlay" @click.self="onOverlayClick">
        <div class="sc-modal" :class="[`sc-modal--${size}`, { 'sc-modal--fullscreen': fullscreen }]">
          <div v-if="!hideClose" class="sc-modal__close" @click="close">
            <span class="sc-modal__close-x">✕</span>
          </div>
          <div class="sc-modal__body">
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
.sc-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.sc-modal {
  position: relative;
  background: var(--cp-bg-panel);
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 240, 255, 0.05);
  max-height: 90vh;
  padding: 0;

  &__body {
    overflow-y: auto;
    max-height: 90vh;
    padding: 32px;
    scrollbar-width: thin;
    scrollbar-color: var(--cp-color-secondary) transparent;

    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-thumb { background: var(--cp-color-secondary); }
  }

  &--sm { width: 400px; }
  &--md { width: 600px; }
  &--lg { width: 800px; }
  &--fullscreen {
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    border: none;
    border-radius: 0;
  }
}

.sc-modal__close {
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
  border-radius: 0;
  border: 1px solid var(--cp-border-base);
  transition: all var(--cp-duration-fast) var(--cp-easing);

  &:hover {
    color: var(--cp-color-danger);
    border-color: var(--cp-color-danger);
    background: rgba(255, 0, 60, 0.06);
  }
}

.sc-modal__close-x {
  font-size: 14px;
  line-height: 1;
}

.sc-modal-enter-active,
.sc-modal-leave-active {
  transition: opacity var(--cp-duration-base) var(--cp-easing);
  .sc-modal { transition: transform var(--cp-duration-base) var(--cp-easing), opacity var(--cp-duration-base) var(--cp-easing); }
}
.sc-modal-enter-from,
.sc-modal-leave-to {
  opacity: 0;
  .sc-modal { transform: scale(0.95); opacity: 0; }
}
</style>
