<template>
  <div class="noir-progress" :style="{ height: height + 'px' }">
    <div
      class="noir-progress__bar"
      :class="[`noir-progress__bar--${variant}`, { 'noir-progress__bar--animated': animated }]"
      :style="{ width: clampedValue + '%' }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProgressBarProps } from '../../types/components'

const props = withDefaults(defineProps<ProgressBarProps>(), {
  variant: 'default',
  height: 2,
  animated: false,
})

const clampedValue = computed(() => Math.max(0, Math.min(100, props.value)))
</script>

<style lang="scss" scoped>
.noir-progress {
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  border: none;
  border-radius: 0;

  &__bar {
    height: 100%;
    transition: width var(--cp-duration-base) var(--cp-easing);
    border-radius: 0;

    &--default,
    &--primary {
      background: var(--cp-color-primary);
      box-shadow: 0 0 8px var(--cp-glow-primary);
    }

    &--secondary {
      background: var(--cp-text-secondary);
    }

    &--danger {
      background: var(--cp-color-danger);
      box-shadow: 0 0 8px var(--cp-glow-danger);
    }

    &--animated {
      animation: noir-progress-breathe 2400ms var(--cp-easing) infinite;
    }
  }
}

@keyframes noir-progress-breathe {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
</style>
