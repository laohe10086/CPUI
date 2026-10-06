<template>
  <div class="blueprint-progress">
    <div class="blueprint-progress__ruler">
      <span v-for="mark in rulerMarks" :key="mark" class="blueprint-progress__mark">{{ mark }}</span>
    </div>
    <div class="blueprint-progress__track">
      <div
        class="blueprint-progress__fill"
        :class="[`blueprint-progress__fill--${variant}`]"
        :style="{ width: clampedValue + '%' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProgressBarProps } from '../../types/components'

const props = withDefaults(defineProps<ProgressBarProps>(), {
  variant: 'default',
  height: 6,
  animated: false,
})

const clampedValue = computed(() => Math.max(0, Math.min(100, props.value)))
const rulerMarks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
</script>

<style lang="scss" scoped>
.blueprint-progress {
  width: 100%;
  
  &__ruler {
    display: flex;
    justify-content: space-between;
    padding: 0 2px 4px;
    margin-bottom: 2px;
  }
  
  &__mark {
    font-family: var(--cp-font-mono);
    font-size: 9px;
    color: var(--cp-text-dim);
    line-height: 1;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 1px;
      height: 3px;
      background: var(--cp-border-base);
    }
  }
  
  &__track {
    position: relative;
    width: 100%;
    height: 6px;
    background: var(--cp-bg-elevated);
    border: 1px solid var(--cp-border-base);
    overflow: hidden;
  }
  
  &__fill {
    height: 100%;
    position: relative;
    transition: width var(--cp-duration-base) var(--cp-easing);
    
    &--default,
    &--primary {
      background: linear-gradient(90deg, var(--cp-color-primary) 0%, var(--cp-color-secondary) 100%);
      
      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        width: 2px;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        animation: blueprint-progress-pulse 1.4s ease-in-out infinite;
      }
    }
    
    &--secondary {
      background: var(--cp-color-secondary);
    }
    
    &--danger {
      background: var(--cp-color-danger);
    }
  }
}

@keyframes blueprint-progress-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}
</style>
