<template>
  <div class="cyber-modern-progress-bar">
    <div class="cyber-modern-progress-bar__track" :style="{ height: `${height}px` }">
      <div
        class="cyber-modern-progress-bar__fill"
        :style="{ width: `${value}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProgressBarProps } from '../../types/components'

withDefaults(defineProps<ProgressBarProps>(), {
  value: 0,
  height: 6,
})
</script>

<style scoped lang="scss">
.cyber-modern-progress-bar {
  width: 100%;

  &__track {
    width: 100%;
    background: var(--cp-surface-2);
    border-radius: var(--cp-radius-full);
    overflow: hidden;
    border: 1px solid var(--cp-border);
  }

  &__fill {
    height: 100%;
    background: linear-gradient(90deg, var(--cp-primary), var(--cp-secondary));
    border-radius: var(--cp-radius-full);
    box-shadow: 0 0 12px var(--cp-primary-subtle);
    transition: width 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>
