<template>
  <div class="modern-progress-bar">
    <div class="modern-progress-bar__track" :style="{ height: `${height}px` }">
      <div
        class="modern-progress-bar__fill"
        :style="{ width: `${value}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProgressBarProps } from '../../types/components'

withDefaults(defineProps<ProgressBarProps>(), {
  value: 0,
  height: 4,
})
</script>

<style scoped lang="scss">
.modern-progress-bar {
  width: 100%;

  &__track {
    width: 100%;
    background: var(--cp-surface-2);
    border-radius: var(--cp-radius-full);
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    background: var(--cp-primary);
    border-radius: var(--cp-radius-full);
    transition: width 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>
