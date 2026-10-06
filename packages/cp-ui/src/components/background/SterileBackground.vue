<template>
  <div class="sterile-background">
    <div class="sterile-background__gradient" />
    <div class="sterile-background__glow" />
  </div>
</template>

<script setup lang="ts">
// Sterile 风格背景：纯净白色渐变 + 微妙辉光
</script>

<style lang="scss" scoped>
.sterile-background {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  background: #000000;
}

.sterile-background__gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 50%,
    rgba(255, 255, 255, 0.02) 0%,
    transparent 50%
  );
}

.sterile-background__glow {
  position: absolute;
  width: 70vw;
  height: 70vh;
  top: 15%;
  left: 15%;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 212, 255, 0.04) 0%,
    transparent 70%
  );
  animation: sterile-pulse 6s ease-in-out infinite;
}

@keyframes sterile-pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}
</style>
