<template>
  <component
    :is="tag"
    class="cyber-glitch"
    :class="[
      { 'cyber-glitch--active': active },
      { 'cyber-glitch--pulse': pulse },
      `cyber-glitch--${glitchIntensity}`,
    ]"
    :data-text="text"
    :style="{ fontFamily, fontSize }"
  >
    {{ text }}
  </component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  text: string
  tag?: string
  active?: boolean
  pulse?: boolean
  glitchIntensity?: 'low' | 'medium' | 'high'
  fontFamily?: string
  fontSize?: string
}>(), {
  tag: 'span',
  active: true,
  pulse: false,
  glitchIntensity: 'medium',
  fontFamily: '',
  fontSize: '',
})
</script>

<style lang="scss" scoped>
.cyber-glitch {
  position: relative;
  display: inline-block;
  font-family: var(--cp-font-mono);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #fff;
  text-shadow: 2px 0 var(--cp-color-secondary), -2px 0 var(--cp-color-danger);

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #020202;
    pointer-events: none;
  }

  &--active::before {
    left: 2px;
    text-shadow: -3px 0 var(--cp-color-danger);
    clip-path: inset(44px 0 56px 0);
    animation: cp-glitch-1 3s infinite steps(2, end) alternate-reverse;
  }

  &--active::after {
    left: -2px;
    text-shadow: 3px 0 var(--cp-color-secondary);
    clip-path: inset(44px 0 56px 0);
    animation: cp-glitch-2 3s infinite steps(2, end) alternate-reverse;
  }

  &--pulse {
    animation: cp-glitch-pulse 3s ease-in-out infinite;
  }

  &--low {
    &.cyber-glitch--active::before {
      animation-duration: 8s;
      left: 1px;
    }

    &.cyber-glitch--active::after {
      animation-duration: 8s;
      left: -1px;
    }
  }

  &--high {
    &.cyber-glitch--active::before {
      animation-duration: 1.5s;
      transform: skewX(-2deg);
    }

    &.cyber-glitch--active::after {
      animation-duration: 1.5s;
      transform: skewX(2deg);
    }
  }
}

@keyframes cp-glitch-1 {
  0%  { clip-path: inset(34px 0 11px 0); }
  5%  { clip-path: inset(78px 0 94px 0); }
  10% { clip-path: inset(12px 0 6px 0); }
  15% { clip-path: inset(54px 0 23px 0); }
  20% { clip-path: inset(9px 0 82px 0); }
  25% { clip-path: inset(63px 0 37px 0); }
  30% { clip-path: inset(18px 0 71px 0); }
  35% { clip-path: inset(85px 0 12px 0); }
  40% { clip-path: inset(5px 0 45px 0); }
  45% { clip-path: inset(71px 0 19px 0); }
  50% { clip-path: inset(28px 0 63px 0); }
  55% { clip-path: inset(91px 0 4px 0); }
  60% { clip-path: inset(14px 0 87px 0); }
  65% { clip-path: inset(47px 0 32px 0); }
  70% { clip-path: inset(3px 0 56px 0); }
  75% { clip-path: inset(66px 0 8px 0); }
  80% { clip-path: inset(39px 0 74px 0); }
  85% { clip-path: inset(82px 0 27px 0); }
  90% { clip-path: inset(21px 0 49px 0); }
  95% { clip-path: inset(57px 0 16px 0); }
  100% { clip-path: inset(2px 0 45px 0); }
}

@keyframes cp-glitch-2 {
  0%  { clip-path: inset(24px 0 91px 0); }
  5%  { clip-path: inset(38px 0 14px 0); }
  10% { clip-path: inset(2px 0 76px 0); }
  15% { clip-path: inset(94px 0 3px 0); }
  20% { clip-path: inset(19px 0 52px 0); }
  25% { clip-path: inset(73px 0 29px 0); }
  30% { clip-path: inset(46px 0 68px 0); }
  35% { clip-path: inset(8px 0 35px 0); }
  40% { clip-path: inset(61px 0 83px 0); }
  45% { clip-path: inset(31px 0 47px 0); }
  50% { clip-path: inset(87px 0 11px 0); }
  55% { clip-path: inset(15px 0 59px 0); }
  60% { clip-path: inset(53px 0 22px 0); }
  65% { clip-path: inset(79px 0 41px 0); }
  70% { clip-path: inset(4px 0 96px 0); }
  75% { clip-path: inset(67px 0 13px 0); }
  80% { clip-path: inset(42px 0 78px 0); }
  85% { clip-path: inset(26px 0 55px 0); }
  90% { clip-path: inset(88px 0 7px 0); }
  95% { clip-path: inset(33px 0 64px 0); }
  100% { clip-path: inset(52px 0 15px 0); }
}

@keyframes cp-glitch-pulse {
  0%, 100% {
    text-shadow:
      0 0 2px var(--cp-color-secondary),
      2px 0 var(--cp-color-secondary),
      -2px 0 var(--cp-color-danger),
      0 0 10px rgba(0, 240, 255, 0.3);
  }
  50% {
    text-shadow:
      0 0 8px var(--cp-color-secondary),
      2px 0 var(--cp-color-secondary),
      -2px 0 var(--cp-color-danger),
      0 0 30px rgba(0, 240, 255, 0.6),
      0 0 60px rgba(0, 240, 255, 0.2);
  }
}
</style>
