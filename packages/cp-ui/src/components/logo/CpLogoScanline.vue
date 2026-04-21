<template>
  <component
    :is="href ? 'a' : tag"
    class="cp-logo-scanline"
    :href="href"
    :style="{ ...sizeStyle, '--cp-logo-text': `'${text}'` }"
  >
    <span class="cp-logo-scanline__bg" aria-hidden="true">{{ text }}</span>
    <span class="cp-logo-scanline__fg">{{ text }}</span>
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
.cp-logo-scanline {
  display: inline-block;
  position: relative;
  font-weight: 900;
  font-style: italic;
  color: rgb(240, 240, 240);
  text-decoration: none;
  font-family: 'Oswald', sans-serif;
  z-index: 2;
  cursor: pointer;
  line-height: 1.4;
  animation: flicker 3s steps(1, end) infinite;

  &__bg {
    position: absolute;
    inset: 0;
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
    z-index: 0;
    pointer-events: none;
  }

  &__fg {
    position: relative;
    z-index: 1;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 2px,
      rgba(0, 0, 0, 0.2) 2px,
      rgba(0, 0, 0, 0.2) 4px
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

@keyframes flicker {
  0%    { opacity: 1; }
  4%    { opacity: 0.4; }
  6%    { opacity: 1; }
  12%   { opacity: 0.6; }
  14%   { opacity: 1; }
  30%   { opacity: 1; }
  32%   { opacity: 0.3; }
  34%   { opacity: 1; }
  60%   { opacity: 1; }
  62%   { opacity: 0.5; }
  63%   { opacity: 1; }
  80%   { opacity: 1; }
  82%   { opacity: 0.7; }
  84%   { opacity: 1; }
  100%  { opacity: 1; }
}
</style>