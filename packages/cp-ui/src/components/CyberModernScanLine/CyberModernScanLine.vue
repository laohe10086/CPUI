<template>
  <div class="cyber-modern-scanline" :class="{ 'cyber-modern-scanline--active': active }">
    <slot />
    <div class="cyber-modern-scanline__line"></div>
    <div class="cyber-modern-scanline__overlay"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  active?: boolean
}

withDefaults(defineProps<Props>(), {
  active: true
})
</script>

<style scoped lang="scss">
@keyframes scanline-move {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

@keyframes scanline-flicker {
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.05; }
}

.cyber-modern-scanline {
  position: relative;
  overflow: hidden;
  
  &__line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 217, 255, 0.1) 50%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &__overlay {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15) 0px,
      transparent 1px,
      transparent 2px,
      rgba(0, 0, 0, 0.15) 3px
    );
    pointer-events: none;
    z-index: 9;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &--active &__line {
    opacity: 1;
    animation: scanline-move 3s linear infinite;
  }
  
  &--active &__overlay {
    opacity: 1;
    animation: scanline-flicker 0.1s infinite;
  }
}
</style>
