<template>
  <div class="blueprint-background">
    <div class="blueprint-background__grid" />
    <div class="blueprint-background__dots" />
    <div class="blueprint-background__glow" />
  </div>
</template>

<script setup lang="ts">
// Blueprint 风格背景：工程蓝图网格 + 测量点
</script>

<style lang="scss" scoped>
.blueprint-background {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  background: #0a0e1a;
}

.blueprint-background__grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 200, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 200, 255, 0.08) 1px, transparent 1px),
    linear-gradient(rgba(0, 200, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 200, 255, 0.03) 1px, transparent 1px);
  background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
}

.blueprint-background__dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(0, 200, 255, 0.3) 1px, transparent 1px);
  background-size: 100px 100px;
  opacity: 0.4;
}

.blueprint-background__glow {
  position: absolute;
  width: 60vw;
  height: 60vh;
  top: 20%;
  left: 20%;
  background: radial-gradient(ellipse at center, rgba(0, 200, 255, 0.08) 0%, transparent 70%);
  animation: blueprint-pulse 4s ease-in-out infinite;
}

@keyframes blueprint-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}
</style>
