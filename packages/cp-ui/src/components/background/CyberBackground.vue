<template>
  <div class="cyber-background">
    <div class="cyber-background__grid" />
    <div class="cyber-background__glow cyber-background__glow--cyan" />
    <div class="cyber-background__glow cyber-background__glow--magenta" />
    <div class="cyber-background__scanline" />
  </div>
</template>

<script setup lang="ts">
// Cyberpunk 风格背景：网格 + 霓虹辉光 + 扫描线
</script>

<style lang="scss" scoped>
.cyber-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  background: #000000;
}

.cyber-background__grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.4;
}

.cyber-background__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  
  &--cyan {
    width: 50vw;
    height: 50vh;
    top: -10%;
    left: -10%;
    background: #00ffff;
    opacity: 0.15;
    animation: cyber-float-a 15s ease-in-out infinite alternate;
  }
  
  &--magenta {
    width: 45vw;
    height: 45vh;
    bottom: -10%;
    right: -10%;
    background: #ff0080;
    opacity: 0.12;
    animation: cyber-float-b 18s ease-in-out infinite alternate;
  }
}

.cyber-background__scanline {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 255, 0.03) 2px,
    rgba(0, 255, 255, 0.03) 4px
  );
  animation: cyber-scanline 8s linear infinite;
}

@keyframes cyber-float-a {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(5vw, 3vh) scale(1.1); }
}

@keyframes cyber-float-b {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-4vw, -2vh) scale(1.08); }
}

@keyframes cyber-scanline {
  0% { transform: translateY(0); }
  100% { transform: translateY(20px); }
}
</style>