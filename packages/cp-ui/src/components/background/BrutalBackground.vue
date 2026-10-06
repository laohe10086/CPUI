<template>
  <div class="brutal-background">
    <div class="brutal-background__noise" />
    <div class="brutal-background__grid" />
  </div>
</template>

<script setup lang="ts">
// Brutal 风格背景：终端 ASCII 网格 + 噪点
</script>

<style lang="scss" scoped>
.brutal-background {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  background: #000000;
}

.brutal-background__noise {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 1px,
    rgba(0, 255, 0, 0.02) 1px,
    rgba(0, 255, 0, 0.02) 2px
  );
  opacity: 0.3;
}

.brutal-background__grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 255, 0, 0.05) 2px, transparent 2px),
    linear-gradient(90deg, rgba(0, 255, 0, 0.05) 2px, transparent 2px);
  background-size: 40px 40px;
  opacity: 0.2;
  animation: brutal-flicker 3s steps(2) infinite;
}

@keyframes brutal-flicker {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.15; }
}
</style>
