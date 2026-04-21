<template>
  <component
    :is="href ? 'a' : tag"
    class="cp-logo-flicker"
    :href="href"
    :style="{ ...sizeStyle, '--cp-logo-text': `'${text}'` }"
  >
    {{ text }}
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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
</script>

<style lang="scss" scoped>
.cp-logo-flicker {
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

  /* 主循环：亮 → 快闪 → 短灭 → 恢复 → 亮 → 长灭 → 恢复 */
  animation:
    flicker-brightness 4s steps(1) infinite,
    flicker-glow 4s ease-in-out infinite;

  &::before {
    content: var(--cp-logo-text);
    position: absolute;
    z-index: -1;
    text-shadow: inherit;
  }
}

/* 接触不良：亮度剧烈跳动 */
@keyframes flicker-brightness {
  0%    { opacity: 1; }
  4%    { opacity: 0.9; }
  6%    { opacity: 1; }
  8%    { opacity: 0.4; }
  9%    { opacity: 1; }
  10%   { opacity: 0.85; }
  11%   { opacity: 1; }
  30%   { opacity: 1; }
  32%   { opacity: 0.3; }
  33%   { opacity: 1; }
  34%   { opacity: 0.7; }
  35%   { opacity: 1; }
  50%   { opacity: 1; }
  52%   { opacity: 0.5; }
  53%   { opacity: 0.9; }
  53.5% { opacity: 0.2; }
  54%   { opacity: 1; }
  70%   { opacity: 1; }
  72%   { opacity: 0.15; }
  74%   { opacity: 0.15; }
  75%   { opacity: 0.8; }
  76%   { opacity: 1; }
  90%   { opacity: 1; }
  91%   { opacity: 0.6; }
  92%   { opacity: 1; }
  93%   { opacity: 0.35; }
  94%   { opacity: 0.35; }
  95%   { opacity: 1; }
  100%  { opacity: 1; }
}

/* 霓虹发光随亮度联动 */
@keyframes flicker-glow {
  0% {
    filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.5))
            drop-shadow(0 0 25px rgba(0, 240, 255, 0.25));
  }
  6% {
    filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.5))
            drop-shadow(0 0 25px rgba(0, 240, 255, 0.25));
  }
  8% {
    filter: drop-shadow(0 0 2px rgba(0, 240, 255, 0.1));
  }
  9% {
    filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.5))
            drop-shadow(0 0 25px rgba(0, 240, 255, 0.25));
  }
  32% {
    filter: drop-shadow(0 0 2px rgba(0, 240, 255, 0.05));
  }
  35% {
    filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.5))
            drop-shadow(0 0 25px rgba(0, 240, 255, 0.25));
  }
  53.5% {
    filter: none;
  }
  54% {
    filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.5))
            drop-shadow(0 0 25px rgba(0, 240, 255, 0.25));
  }
  72% {
    filter: none;
  }
  76% {
    filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.5))
            drop-shadow(0 0 25px rgba(0, 240, 255, 0.25));
  }
  91% {
    filter: drop-shadow(0 0 4px rgba(0, 240, 255, 0.2));
  }
  95% {
    filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.5))
            drop-shadow(0 0 25px rgba(0, 240, 255, 0.25));
  }
  100% {
    filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.5))
            drop-shadow(0 0 25px rgba(0, 240, 255, 0.25));
  }
}
</style>
