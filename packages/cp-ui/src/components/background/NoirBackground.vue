<template>
  <div class="noir-background">
    <div class="noir-background__vignette" />
    <div class="noir-background__glow noir-background__glow--pink" />
    <div class="noir-background__glow noir-background__glow--cyan" />
    <div class="noir-background__grain" />
  </div>
</template>

<script setup lang="ts">
// Noir 风格背景：暗角 + 霓虹粉/青辉光 + 胶片颗粒
</script>

<style lang="scss" scoped>
.noir-background {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  background: #0a0a0a;
}

.noir-background__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.7) 100%);
}

.noir-background__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(150px);
  
  &--pink {
    width: 55vw;
    height: 55vh;
    top: -15%;
    right: -15%;
    background: #ff0099;
    opacity: 0.12;
    animation: noir-float-a 20s ease-in-out infinite alternate;
  }
  
  &--cyan {
    width: 50vw;
    height: 50vh;
    bottom: -15%;
    left: -10%;
    background: #00ffff;
    opacity: 0.08;
    animation: noir-float-b 22s ease-in-out infinite alternate;
  }
}

.noir-background__grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  opacity: 0.3;
}

@keyframes noir-float-a {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-3vw, 4vh) scale(1.1); }
}

@keyframes noir-float-b {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(4vw, -3vh) scale(1.08); }
}
</style>
