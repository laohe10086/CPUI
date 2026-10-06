<template>
  <div class="noir-panel">
    <div v-if="title || $slots.header" class="noir-panel__header">
      <slot name="header">
        <span v-if="label" class="noir-panel__label">{{ label }}</span>
        <span v-if="title" class="noir-panel__title">{{ title }}</span>
      </slot>
      <div class="noir-panel__glow" />
    </div>
    <div class="noir-panel__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PanelProps } from '../../types/components'

withDefaults(defineProps<PanelProps>(), {
  title: '',
  label: '',
  shape: 'cut',
})
</script>

<style lang="scss" scoped>
.noir-panel {
  background: var(--cp-bg-panel);
  border: 2px solid var(--cp-color-primary);
  clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
  box-shadow: 0 0 20px var(--cp-glow-primary);

  &__header {
    position: relative;
    padding: 14px 18px;
    border-bottom: 2px solid var(--cp-color-primary);
    background: linear-gradient(90deg, 
      rgba(0, 240, 255, 0.1) 0%, 
      transparent 100%
    );
    overflow: hidden;
  }

  &__label {
    display: block;
    font-family: var(--cp-font-mono);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 10px;
    color: var(--cp-color-secondary);
    text-decoration: underline;
    text-decoration-color: var(--cp-color-secondary);
    text-underline-offset: 2px;
    margin-bottom: 4px;
  }

  &__title {
    font-family: var(--cp-font-display);
    font-size: 16px;
    color: var(--cp-color-primary);
    text-shadow: 0 0 10px var(--cp-glow-primary);
  }

  &__glow {
    position: absolute;
    top: 0;
    right: -50px;
    width: 100px;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(0, 240, 255, 0.2) 50%, 
      transparent 100%
    );
    animation: noir-panel-sweep 3s ease-in-out infinite;
  }

  &__body {
    padding: 20px;
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

@keyframes noir-panel-sweep {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(100% + 100px)); }
}
</style>
