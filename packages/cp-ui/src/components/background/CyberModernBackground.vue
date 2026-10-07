<template>
  <div class="cyber-modern-background">
    <div class="cyber-modern-background__grid" />
    <div class="cyber-modern-background__glow cyber-modern-background__glow--cyan" />
    <div class="cyber-modern-background__glow cyber-modern-background__glow--purple" />
    <div class="cyber-modern-background__scanline" />
  </div>
</template>

<script setup lang="ts">
// CyberModern 风格背景：赛博网格 + 现代渐变辉光 + 扫描线
</script>

<style lang="scss" scoped>
.cyber-modern-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  background: #000000;
}

.cyber-modern-background__grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 217, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 217, 255, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.3;
}

.cyber-modern-background__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(130px);
  
  &--cyan {
    width: 48vw;
    height: 48vh;
    top: -12%;
    left: -8%;
    background: #00d9ff;
    opacity: 0.12;
    animation: cyber-modern-float-a 17s ease-in-out infinite alternate;
  }
  
  &--purple {
    width: 44vw;
    height: 44vh;
    bottom: -12%;
    right: -8%;
    background: #a855f7;
    opacity: 0.10;
    animation: cyber-modern-float-b 19s ease-in-out infinite alternate;
  }
}

.cyber-modern-background__scanline {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 217, 255, 0.02) 2px,
    rgba(0, 217, 255, 0.02) 4px
  );
  animation: cyber-modern-scan 10s linear infinite;
}

@keyframes cyber-modern-float-a {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(4vw, 3vh) scale(1.1); }
}

@keyframes cyber-modern-float-b {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-3vw, -2vh) scale(1.08); }
}

@keyframes cyber-modern-scan {
  0% { transform: translateY(0); }
  100% { transform: translateY(30px); }
}
</style>
