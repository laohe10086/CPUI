<template>
  <div class="cyber-modern-progress-bar">
    <div class="cyber-modern-progress-bar__track">
      <div 
        class="cyber-modern-progress-bar__fill" 
        :style="{ width: `${value}%` }"
      >
        <div class="cyber-modern-progress-bar__glow"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProgressBarProps } from '../../types/components'

withDefaults(defineProps<ProgressBarProps>(), {
  value: 0,
})
</script>

<style scoped lang="scss">
.cyber-modern-progress-bar {
  width: 100%;

  &__track {
    width: 100%;
    height: 6px;
    background: var(--cp-surface-2);
    border-radius: var(--cp-radius-full);
    overflow: hidden;
    border: 1px solid var(--cp-border);
  }

  &__fill {
    position: relative;
    height: 100%;
    background: linear-gradient(90deg, var(--cp-primary), var(--cp-secondary));
    border-radius: var(--cp-radius-full);
    transition: width 400ms cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }

  &__glow {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5));
    animation: cyber-modern-scan 1.5s ease-in-out infinite;
  }
}

@keyframes cyber-modern-scan {
  0%, 100% {
    transform: translateX(0);
    opacity: 0.5;
  }
  50% {
    transform: translateX(-20px);
    opacity: 1;
  }
}
</style>
