<template>
  <div class="modern-background">
    <div class="modern-background__gradient" />
    <div class="modern-background__glow modern-background__glow--primary" />
    <div class="modern-background__glow modern-background__glow--secondary" />
  </div>
</template>

<script setup lang="ts">
// Modern 风格背景：commandcode.ai 启发的纯黑 + 电紫/青色微妙辉光
</script>

<style lang="scss" scoped>
.modern-background {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  background: #000000;
}

.modern-background__gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 50%,
    transparent 40%,
    rgba(0, 0, 0, 0.4) 100%
  );
}

.modern-background__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  
  &--primary {
    width: 50vw;
    height: 50vh;
    top: -10%;
    left: -10%;
    background: #5e6ad2;
    opacity: 0.08;
    animation: modern-float-a 16s ease-in-out infinite alternate;
  }
  
  &--secondary {
    width: 45vw;
    height: 45vh;
    bottom: -10%;
    right: -10%;
    background: #00d9ff;
    opacity: 0.06;
    animation: modern-float-b 18s ease-in-out infinite alternate;
  }
}

@keyframes modern-float-a {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(4vw, 3vh) scale(1.08); }
}

@keyframes modern-float-b {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-3vw, -2vh) scale(1.06); }
}
</style>
