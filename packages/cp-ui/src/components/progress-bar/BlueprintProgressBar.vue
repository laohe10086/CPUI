<template>
  <div class="blueprint-progress" :style="{ height: height + 'px' }">
    <div
      class="blueprint-progress__bar"
      :class="[`blueprint-progress__bar--${variant}`, { 'blueprint-progress__bar--animated': animated }]"
      :style="{ width: clampedValue + '%' }"
    />
    <div class="blueprint-progress__ticks" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProgressBarProps } from '../../types/components'

const props = withDefaults(defineProps<ProgressBarProps>(), {
  variant: 'default',
  height: 10,
  animated: false,
})

const clampedValue = computed(() => Math.max(0, Math.min(100, props.value)))
</script>

<style lang="scss" scoped>
// 图纸标尺：固定刻度在上，靛蓝→青色填充从下推进，末端亮边为尺寸界线
.blueprint-progress {
  position: relative;
  width: 100%;
  background: transparent;
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  overflow: hidden;

  &__bar {
    position: relative;
    height: 100%;
    transition: width var(--cp-duration-base) var(--cp-easing);

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 2px;
      height: 100%;
      background: currentColor;
    }

    &--default,
    &--primary {
      color: var(--cp-color-secondary);
      background: linear-gradient(90deg, var(--cp-color-primary), var(--cp-color-secondary));
    }

    &--secondary {
      color: var(--cp-color-secondary);
      background: linear-gradient(90deg, rgba(0, 240, 255, 0.35), var(--cp-color-secondary));
    }

    &--danger {
      color: var(--cp-color-danger);
      background: linear-gradient(90deg, rgba(255, 0, 60, 0.35), var(--cp-color-danger));
    }

    &--animated::after {
      animation: blueprint-progress-pulse 1.2s var(--cp-easing) infinite;
    }
  }

  &__ticks {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.22) 0 1px,
      transparent 1px 8px
    );
    background-size: 8px 4px;
    background-repeat: repeat-x;
  }
}

@keyframes blueprint-progress-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}
</style>
