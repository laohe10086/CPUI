<template>
  <div class="blueprint-panel">
    <div v-if="title || $slots.header" class="blueprint-panel__header">
      <slot name="header">
        <span v-if="label" class="blueprint-panel__label">{{ label }}</span>
        <span v-if="title" class="blueprint-panel__title">{{ title }}</span>
      </slot>
      <div class="blueprint-panel__scale">
        <span v-for="i in 5" :key="i" class="blueprint-panel__tick" />
      </div>
    </div>
    <div class="blueprint-panel__body">
      <div class="blueprint-panel__corner blueprint-panel__corner--tl" />
      <div class="blueprint-panel__corner blueprint-panel__corner--tr" />
      <div class="blueprint-panel__corner blueprint-panel__corner--bl" />
      <div class="blueprint-panel__corner blueprint-panel__corner--br" />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PanelProps } from '../../types/components'

withDefaults(defineProps<PanelProps>(), {
  title: '',
  label: '',
  shape: 'regular',
})
</script>

<style lang="scss" scoped>
.blueprint-panel {
  background: var(--cp-bg-panel);
  border: 1px solid var(--cp-border-base);

  &__header {
    position: relative;
    padding: 12px 16px;
    border-bottom: 1px solid var(--cp-border-base);
    background: linear-gradient(90deg, 
      rgba(99, 102, 241, 0.05) 0%, 
      transparent 50%
    );
  }

  &__label {
    display: block;
    font-family: var(--cp-font-mono);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-size: 9px;
    color: var(--cp-text-muted);
    margin-bottom: 4px;
  }

  &__title {
    font-family: var(--cp-font-mono);
    font-size: 13px;
    color: var(--cp-color-primary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__scale {
    position: absolute;
    top: 0;
    right: 16px;
    display: flex;
    gap: 3px;
    height: 100%;
    align-items: center;
  }

  &__tick {
    width: 1px;
    height: 8px;
    background: var(--cp-border-base);
    
    &:nth-child(3) {
      height: 12px;
      background: var(--cp-color-primary);
    }
  }

  &__body {
    position: relative;
    padding: 20px;
    background-image: 
      linear-gradient(var(--cp-border-dim) 1px, transparent 1px),
      linear-gradient(90deg, var(--cp-border-dim) 1px, transparent 1px);
    background-size: 20px 20px;
  }

  &__corner {
    position: absolute;
    width: 10px;
    height: 10px;
    
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
}
</style>
