<template>
  <div class="brutal-progress" :style="{ height: height + 'px' }">
    <div
      class="brutal-progress__bar"
      :class="[`brutal-progress__bar--${variant}`, { 'brutal-progress__bar--animated': animated }]"
      :style="{ width: clampedValue + '%' }"
    />
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
// 终端粗野：直角轨道 + 分段方块填充，steps() 跳动推进
.brutal-progress {
  width: 100%;
  background: transparent;
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  overflow: hidden;

  &__bar {
    height: 100%;
    transition: width var(--cp-duration-base) var(--cp-easing);
    background-repeat: repeat;
    background-size: 10px 100%;

    &--default,
    &--primary {
      background-image: repeating-linear-gradient(
        90deg,
        var(--cp-color-primary) 0 8px,
        transparent 8px 10px
      );
    }

    &--secondary {
      background-image: repeating-linear-gradient(
        90deg,
        var(--cp-color-secondary) 0 8px,
        transparent 8px 10px
      );
    }

    &--danger {
      background-image: repeating-linear-gradient(
        90deg,
        var(--cp-color-danger) 0 8px,
        transparent 8px 10px
      );
    }

    &--animated {
      animation: brutal-progress-march 500ms steps(2) infinite;
    }
  }
}

@keyframes brutal-progress-march {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 10px 0;
  }
}
</style>
