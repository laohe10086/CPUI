<template>
  <div class="cyber-progress" :style="{ height: height + 'px' }">
    <div
      class="cyber-progress__bar"
      :class="[`cyber-progress__bar--${variant}`, { 'cyber-progress__bar--animated': animated }]"
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
.cyber-progress {
  width: 100%;
  background: var(--cp-bg-elevated);
  overflow: hidden;
  clip-path: polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%);

  &__bar {
    height: 100%;
    transition: width var(--cp-duration-base) var(--cp-easing);

    &--default,
    &--primary {
      background: var(--cp-color-primary);
    }

    &--secondary {
      background: var(--cp-color-secondary);
      box-shadow:
        0 0 12px var(--cp-glow-secondary),
        0 0 4px var(--cp-color-secondary);
    }

    &--danger {
      background: var(--cp-color-danger);
      box-shadow:
        0 0 12px var(--cp-glow-danger),
        0 0 4px var(--cp-color-danger);
    }

    &--animated {
      background-image: linear-gradient(
        -45deg,
        transparent 25%,
        rgba(255, 255, 255, 0.1) 25%,
        rgba(255, 255, 255, 0.1) 50%,
        transparent 50%,
        transparent 75%,
        rgba(255, 255, 255, 0.1) 75%
      );
      background-size: 30px 30px;
      animation: cyber-progress-stripe 0.8s linear infinite;
    }
  }
}

@keyframes cyber-progress-stripe {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 30px 0;
  }
}
</style>
