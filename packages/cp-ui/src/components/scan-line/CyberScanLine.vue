<template>
  <div class="cyber-scanline" :style="{ '--scanline-opacity': opacity }">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  opacity?: number
  color?: string
  speed?: number
}>(), {
  opacity: 0.06,
  color: 'rgba(255, 255, 255, 0.08)',
  speed: 8,
})
</script>

<style lang="scss" scoped>
@keyframes scanline-move {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

.cyber-scanline {
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 2px,
      var(--scanline-opacity-color, rgba(255, 255, 255, 0.03)) 2px,
      var(--scanline-opacity-color, rgba(255, 255, 255, 0.03)) 4px
    );
    pointer-events: none;
    z-index: 10;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 80px;
    background: linear-gradient(
      180deg,
      transparent,
      var(--scanline-bar-color, rgba(0, 240, 255, 0.08)),
      transparent
    );
    pointer-events: none;
    z-index: 11;
    animation: scanline-move 8s linear infinite;
  }
}
</style>
