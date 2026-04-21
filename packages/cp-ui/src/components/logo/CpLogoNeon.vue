<template>
  <component
    :is="href ? 'a' : tag"
    class="cp-logo-neon"
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
.cp-logo-neon {
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
  animation: neon-glow 2s ease-in-out infinite alternate;

  &::before {
    content: var(--cp-logo-text);
    position: absolute;
    z-index: -1;
    text-shadow: inherit;
  }
}

@keyframes neon-glow {
  from {
    filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.4))
            drop-shadow(0 0 20px rgba(0, 240, 255, 0.2));
  }
  to {
    filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.7))
            drop-shadow(0 0 40px rgba(0, 240, 255, 0.3))
            drop-shadow(0 0 80px rgba(0, 240, 255, 0.1));
  }
}
</style>
