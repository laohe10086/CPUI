<template>
  <div class="cp-grid-layer" :class="[`cp-grid-layer--${pattern}`]" :style="gridStyle">
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  pattern?: 'dot' | 'line'
  opacity?: number
}>(), {
  pattern: 'dot',
  opacity: 0.6,
})

const gridStyle = computed(() => ({
  opacity: props.opacity,
}))
</script>

<style lang="scss" scoped>
.cp-grid-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;

  &--dot {
    background-image: radial-gradient(circle, var(--cp-grid-dot) 1px, transparent 1px);
    background-size: 24px 24px;
  }
  &--line {
    background-image:
      linear-gradient(var(--cp-grid-line) 1px, transparent 1px),
      linear-gradient(90deg, var(--cp-grid-line) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  // Scanline overlay — horizontal stripes
}
</style>
