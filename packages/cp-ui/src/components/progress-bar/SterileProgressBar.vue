<template>
  <div class="sterile-progress" :style="{ height: height + 'px' }">
    <div
      class="sterile-progress__bar"
      :class="[`sterile-progress__bar--${variant}`, { 'sterile-progress__bar--animated': animated }]"
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
.sterile-progress {
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
    }

    &--danger {
      background: var(--cp-color-danger);
    }

    &--animated {
      background-image: linear-gradient(
        -45deg,
        transparent 25%,
        rgba(255, 255, 255, 0.03) 25%,
        rgba(255, 255, 255, 0.03) 50%,
        transparent 50%,
        transparent 75%,
        rgba(255, 255, 255, 0.03) 75%
      );
      background-size: 20px 20px;
      animation: sterile-progress-stripe 1.2s linear infinite;
    }
  }
}

@keyframes sterile-progress-stripe {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 20px 0;
  }
}
</style>
