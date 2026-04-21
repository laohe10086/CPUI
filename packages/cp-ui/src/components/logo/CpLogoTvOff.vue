<template>
  <span class="cp-logo-tvoff-wrap" @mouseenter="onEnter" @mouseleave="onLeave">
    <component
      :is="href ? 'a' : tag"
      class="cp-logo-tvoff"
      :class="{
        'cp-logo-tvoff--glitch': phase === 'glitch',
        'cp-logo-tvoff--tvoff': phase === 'tvoff',
      }"
      :href="href"
      :style="{ ...sizeStyle, '--cp-logo-text': `'${text}'` }"
    >
      {{ text }}
    </component>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  text?: string
  href?: string
  tag?: string
  size?: 'sm' | 'md' | 'lg'
  fontFamily?: string
}>(), {
  text: '',
  tag: 'span',
  size: 'md',
  fontFamily: '',
})

const sizeMap = { sm: '1.5em', md: '2em', lg: '3em' }
const sizeStyle = computed(() => ({
  fontSize: sizeMap[props.size],
  ...(props.fontFamily ? { fontFamily: props.fontFamily } : {}),
}))

const phase = ref<'' | 'glitch' | 'tvoff'>('')
const animating = ref(false)
const mouseInside = ref(false)

function onEnter() {
  mouseInside.value = true
  if (animating.value) return
  startAnimation()
}

function onLeave() {
  mouseInside.value = false
}

function startAnimation() {
  animating.value = true
  phase.value = 'glitch'
  setTimeout(() => {
    phase.value = 'tvoff'
    setTimeout(() => {
      phase.value = ''
      animating.value = false
    }, 1000)
  }, 500)
}
</script>

<style lang="scss" scoped>
.cp-logo-tvoff-wrap {
  display: inline-block;
}

.cp-logo-tvoff {
  display: inline-block;
  font-weight: 900;
  font-style: italic;
  color: rgb(240, 240, 240);
  text-decoration: none;
  font-family: 'Oswald', sans-serif;
  text-shadow: 6px 6px #000000,
    5.75px 5.75px #000000,
    5.5px 5.5px #000000,
    5.25px 5.25px #181818,
    5px 5px #000000,
    4.75px 4.75px #181818,
    4.5px 4.5px #000000,
    4.25px 4.25px #222222,
    4px 4px #1b1b1b,
    3.75px 3.75px #000000,
    3.5px 3.5px #000000,
    3.25px 3.25px #313131,
    3px 3px #333333,
    2.75px 2.75px #353535,
    2.5px 2.5px #373737,
    2.25px 2.25px #3a3a3a,
    2px 2px #3f3f3f,
    1.75px 1.75px #404040,
    1.5px 1.5px #424242,
    1.25px 1.25px #474747,
    1px 1px #4b4b4b,
    0.75px 0.75px #888888,
    0.5px 0.5px #b3b3b394,
    0.25px 0.25px #ffffff8a;
  position: relative;
  z-index: 2;
  cursor: pointer;
  line-height: 1.4;
  transform-origin: center center;

  &::before {
    content: var(--cp-logo-text);
    position: absolute;
    z-index: -1;
    text-shadow: inherit;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -4px;
    background: white;
    opacity: 0;
    pointer-events: none;
    border-radius: 2px;
  }

  &--glitch {
    pointer-events: none;

    &::before {
      clip-path: inset(100% 0 0 0);
      animation: glitch 0.5s steps(10, end) forwards;
      z-index: 1;
    }
  }

  &--tvoff {
    pointer-events: none;
    animation: tv-off 0.6s ease-in forwards;

    &::after {
      animation: tv-flash 0.6s ease-in forwards;
    }
  }
}

@keyframes glitch {
  0%   { clip-path: inset(80% 0 0 0); transform: translate(-20px, -10px); }
  10%  { clip-path: inset(10% 0 85% 0); transform: translate(10px, 10px); }
  20%  { clip-path: inset(80% 0 0 0); transform: translate(-10px, 10px); }
  30%  { clip-path: inset(10% 0 85% 0); transform: translate(0px, 5px); }
  40%  { clip-path: inset(50% 0 30% 0); transform: translate(-5px, 0px); }
  50%  { clip-path: inset(10% 0 30% 0); transform: translate(5px, 0px); }
  60%  { clip-path: inset(40% 0 30% 0); transform: translate(5px, 10px); }
  70%  { clip-path: inset(50% 0 30% 0); transform: translate(-10px, 10px); }
  80%  { clip-path: inset(80% 0 5% 0); transform: translate(20px, -10px); }
  90%  { clip-path: inset(80% 0 0 0); transform: translate(-10px, 0px); }
  100% { clip-path: inset(0 0 0 0); transform: translate(0, 0); }
}

@keyframes tv-off {
  0% {
    transform: scale(1, 1);
    filter: brightness(1);
    opacity: 1;
  }
  40% {
    transform: scale(1.02, 0.04);
    filter: brightness(3);
    opacity: 1;
  }
  70% {
    transform: scale(0.3, 0.01);
    filter: brightness(5);
    opacity: 0.8;
  }
  100% {
    transform: scale(0, 0);
    filter: brightness(0);
    opacity: 0;
  }
}

@keyframes tv-flash {
  0%   { opacity: 0; }
  40%  { opacity: 0; }
  45%  { opacity: 0.5; }
  55%  { opacity: 0; }
  100% { opacity: 0; }
}
</style>
