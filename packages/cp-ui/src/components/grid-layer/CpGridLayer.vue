<template>
  <div class="cp-grid-layer" :class="[`cp-grid-layer--${pattern}`]" :style="gridStyle">
    <svg v-if="pattern === 'blueprint'" class="cp-grid-layer__svg" aria-hidden="true">
      <defs>
        <pattern id="cp-grid-blueprint" width="80" height="80" patternUnits="userSpaceOnUse">
          <!-- 虚线网格 -->
          <line x1="0" y1="0" x2="80" y2="0" class="cp-grid-layer__dash" />
          <line x1="0" y1="0" x2="0" y2="80" class="cp-grid-layer__dash" />
          <!-- 四角锚点方块（拼合后落在每个交点上） -->
          <rect x="-2.5" y="-2.5" width="5" height="5" class="cp-grid-layer__node" />
          <rect x="77.5" y="-2.5" width="5" height="5" class="cp-grid-layer__node" />
          <rect x="-2.5" y="77.5" width="5" height="5" class="cp-grid-layer__node" />
          <rect x="77.5" y="77.5" width="5" height="5" class="cp-grid-layer__node" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cp-grid-blueprint)" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  pattern?: 'dot' | 'line' | 'blueprint'
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

.cp-grid-layer__svg {
  width: 100%;
  height: 100%;
  display: block;
}

.cp-grid-layer__dash {
  stroke: var(--cp-grid-line);
  stroke-width: 1;
  stroke-dasharray: 5 5;
}

.cp-grid-layer__node {
  fill: var(--cp-grid-dot);
}
</style>
