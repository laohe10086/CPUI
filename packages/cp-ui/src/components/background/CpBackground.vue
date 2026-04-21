<template>
  <div v-if="variant === 'neon'" class="cp-bg cp-bg--neon">
    <div class="cp-bg__orb cp-bg__orb--primary" />
    <div class="cp-bg__orb cp-bg__orb--secondary" />
    <div class="cp-bg__orb cp-bg__orb--accent" />
    <div class="cp-bg__orb cp-bg__orb--warm" />
    <div class="cp-bg__orb cp-bg__orb--cyan" />
    <div class="cp-bg__orb cp-bg__orb--rose" />
    <div class="cp-bg__orb cp-bg__orb--floor1" />
    <div class="cp-bg__orb cp-bg__orb--floor2" />
  </div>
  <div v-else class="cp-bg" :class="[`cp-bg--${variant}`]" />
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'mesh' | 'glow' | 'minimal' | 'horizon' | 'neon'
}>(), {
  variant: 'neon',
})
</script>

<style lang="scss" scoped>
.cp-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

/* ========== mesh ========== */
.cp-bg--mesh {
  background:
    radial-gradient(ellipse 80% 60% at 15% 80%, rgba(252, 232, 3, 0.03) 0%, transparent 60%),
    radial-gradient(ellipse 70% 50% at 85% 20%, rgba(0, 240, 255, 0.03) 0%, transparent 55%),
    radial-gradient(ellipse 90% 70% at 50% 50%, transparent 30%, rgba(0, 0, 0, 0.4) 100%);
}

/* ========== glow ========== */
.cp-bg--glow {
  background:
    radial-gradient(ellipse 50% 40% at 8% 85%, rgba(252, 232, 3, 0.06) 0%, transparent 55%),
    radial-gradient(ellipse 45% 35% at 92% 10%, rgba(0, 240, 255, 0.05) 0%, transparent 50%),
    radial-gradient(ellipse 60% 50% at 50% 100%, rgba(180, 0, 255, 0.03) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0, 0, 0, 0.35) 100%);
}

/* ========== minimal ========== */
.cp-bg--minimal {
  background: radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0, 0, 0, 0.25) 100%);
}

/* ========== horizon ========== */
.cp-bg--horizon {
  background:
    linear-gradient(0deg, rgba(0, 240, 255, 0.04) 0%, transparent 30%),
    linear-gradient(0deg, rgba(252, 232, 3, 0.02) 0%, transparent 15%),
    radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0, 0, 0, 0.3) 100%);
}

/* ========== neon — 霓虹迷离 ========== */
/* 用实体色块 + blur 做真正的霓虹光晕 */

.cp-bg--neon {
  background: #020108;
}

.cp-bg__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  will-change: transform;

  // deep indigo — 左上，深靛蓝主光源
  &--primary {
    width: 42vw;
    height: 38vh;
    top: -12vh;
    left: -10vw;
    background: #1a00ff;
    opacity: 0.18;
    animation: cp-neon-float-a 12s ease-in-out infinite alternate;
  }

  // warm orange — 右上，暖橙红对冲
  &--secondary {
    width: 38vw;
    height: 42vh;
    top: -10vh;
    right: -12vw;
    background: #ff5500;
    opacity: 0.15;
    animation: cp-neon-float-b 14s ease-in-out infinite alternate;
  }

  // deep teal — 中部，桥接组件的青色
  &--accent {
    width: 30vw;
    height: 28vh;
    top: 30%;
    left: 8%;
    background: #004d66;
    opacity: 0.12;
    filter: blur(110px);
    animation: cp-neon-float-c 18s ease-in-out infinite alternate;
  }

  // warm amber — 右中，橙色余韵
  &--warm {
    width: 22vw;
    height: 22vh;
    top: 50%;
    right: 12%;
    background: #ff8c00;
    opacity: 0.08;
    filter: blur(95px);
    animation: cp-neon-float-warm 16s ease-in-out infinite alternate;
  }

  // cool indigo — 左下，冷色沉淀
  &--cyan {
    width: 26vw;
    height: 22vh;
    top: 58%;
    left: 18%;
    background: #2200aa;
    opacity: 0.10;
    filter: blur(100px);
    animation: cp-neon-float-cyan 15s ease-in-out infinite alternate;
  }

  // soft crimson — 右上偏中，暖色过渡
  &--rose {
    width: 20vw;
    height: 26vh;
    top: 15%;
    right: 22%;
    background: #cc2200;
    opacity: 0.07;
    filter: blur(100px);
    animation: cp-neon-float-rose 20s ease-in-out infinite alternate;
  }

  // floor reflection — 底部
  &--floor1 {
    width: 55vw;
    height: 22vh;
    bottom: -8vh;
    left: 3%;
    background: #1a00ff;
    opacity: 0.10;
    filter: blur(75px);
    border-radius: 40%;
    animation: cp-neon-float-d 10s ease-in-out infinite alternate;
  }

  &--floor2 {
    width: 50vw;
    height: 20vh;
    bottom: -6vh;
    right: -2vw;
    background: #ff5500;
    opacity: 0.09;
    filter: blur(70px);
    border-radius: 40%;
    animation: cp-neon-float-e 11s ease-in-out infinite alternate;
  }
}

@keyframes cp-neon-float-a {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(3vw, 2vh) scale(1.08); }
}
@keyframes cp-neon-float-b {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-2vw, 3vh) scale(1.05); }
}
@keyframes cp-neon-float-c {
  0%   { transform: translate(0, 0); opacity: 0.08; }
  100% { transform: translate(5vw, -3vh); opacity: 0.05; }
}
@keyframes cp-neon-float-warm {
  0%   { transform: translate(0, 0) scale(1); opacity: 0.10; }
  100% { transform: translate(-3vw, -2vh) scale(1.06); opacity: 0.07; }
}
@keyframes cp-neon-float-cyan {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(2vw, 2vh) scale(1.05); }
}
@keyframes cp-neon-float-rose {
  0%   { transform: translate(0, 0) scale(1); opacity: 0.08; }
  100% { transform: translate(-2vw, 3vh) scale(0.95); opacity: 0.05; }
}
@keyframes cp-neon-float-d {
  0%   { transform: translate(0, 0) scaleX(1); }
  100% { transform: translate(4vw, -1vh) scaleX(1.1); }
}
@keyframes cp-neon-float-e {
  0%   { transform: translate(0, 0) scaleX(1); }
  100% { transform: translate(-3vw, -1vh) scaleX(1.06); }
}
</style>
