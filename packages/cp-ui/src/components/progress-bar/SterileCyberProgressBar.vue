<template>
  <div class="sc-progress" :style="{ height: height + 'px' }">
    <div
      class="sc-progress__bar"
      :class="[`sc-progress__bar--${variant}`, { 'sc-progress__bar--animated': animated }]"
      :style="{ width: clampedValue + '%' }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProgressBarProps } from '../../types/components'

const props = withDefaults(defineProps<ProgressBarProps>(), {
  variant: 'default',
  height: 4,
  animated: false,
})

const clampedValue = computed(() => Math.max(0, Math.min(100, props.value)))
</script>

<style lang="scss" scoped>
.sc-progress {
  width: 100%;
  background: var(--cp-bg-elevated);
  border-radius: 0;
  overflow: hidden;

  &__bar {
    height: 100%;
    transition: width var(--cp-duration-base) var(--cp-easing);
    border-radius: 0;

    &--default,
    &--primary {
      background: var(--cp-color-primary);
    }

    &--secondary {
      background: var(--cp-color-secondary);
      box-shadow: 0 0 8px var(--cp-glow-secondary);
    }

    &--danger {
      background: var(--cp-color-danger);
      box-shadow: 0 0 8px var(--cp-glow-danger);
    }

    &--animated {
      background-image: linear-gradient(
        -45deg,
        transparent 25%,
        rgba(255, 255, 255, 0.06) 25%,
        rgba(255, 255, 255, 0.06) 50%,
        transparent 50%,
        transparent 75%,
        rgba(255, 255, 255, 0.06) 75%
      );
      background-size: 20px 20px;
      animation: sc-progress-stripe 1.2s linear infinite;
    }
  }
}

@keyframes sc-progress-stripe {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 20px 0;
  }
}
</style>
