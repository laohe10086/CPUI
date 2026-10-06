<template>
  <div class="brutal-progress">
    <div class="brutal-progress__bar">{{ progressBar }}</div>
    <div class="brutal-progress__value">{{ clampedValue }}%</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProgressBarProps } from '../../types/components'

const props = withDefaults(defineProps<ProgressBarProps>(), {
  variant: 'default',
  height: 20,
  animated: false,
})

const clampedValue = computed(() => Math.max(0, Math.min(100, props.value)))

const progressBar = computed(() => {
  const filled = Math.floor(clampedValue.value / 10)
  const empty = 10 - filled
  return '█'.repeat(filled) + '░'.repeat(empty)
})
</script>

<style lang="scss" scoped>
.brutal-progress {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--cp-font-mono);
  
  &__bar {
    font-size: 16px;
    line-height: 1;
    color: var(--cp-color-primary);
    letter-spacing: 1px;
    white-space: nowrap;
  }
  
  &__value {
    font-size: 13px;
    font-weight: 700;
    color: var(--cp-text-secondary);
    min-width: 40px;
  }
}
</style>
