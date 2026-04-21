<template>
  <span
    class="cp-logo-decipher-wrap"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <component
      :is="href ? 'a' : tag"
      class="cp-logo-decipher"
      :href="href"
      :style="{ ...sizeStyle, '--cp-logo-text': `'${text}'` }"
    >
      {{ displayText || text }}
    </component>
  </span>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  text?: string
  href?: string
  tag?: string
  size?: 'sm' | 'md' | 'lg'
  speed?: number
  rounds?: number
  fontFamily?: string
}>(), {
  text: '',
  tag: 'span',
  size: 'md',
  speed: 50,
  rounds: 2,
  fontFamily: '',
})

const sizeMap = { sm: '1.5em', md: '2em', lg: '3em' }
const sizeStyle = computed(() => ({
  fontSize: sizeMap[props.size],
  ...(props.fontFamily ? { fontFamily: props.fontFamily } : {}),
}))

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?<>[]{}'
const displayText = ref('')
const revealed = ref(0)
const animating = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

function scramble() {
  if (timer) { clearInterval(timer); timer = null }
  if (!props.text) return
  animating.value = true
  revealed.value = 0
  displayText.value = ''

  let round = 0
  const totalRounds = props.rounds
  let phase: 'scramble' | 'reveal' = 'scramble'

  timer = setInterval(() => {
    if (phase === 'scramble') {
      let result = ''
      for (let i = 0; i < props.text.length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)]
      }
      displayText.value = result
      round++
      if (round >= totalRounds * props.text.length) {
        phase = 'reveal'
        revealed.value = 0
      }
    } else {
      if (revealed.value >= props.text.length) {
        if (timer) { clearInterval(timer); timer = null }
        displayText.value = props.text
        animating.value = false
        return
      }
      revealed.value++
      let result = props.text.slice(0, revealed.value)
      for (let i = revealed.value; i < props.text.length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)]
      }
      displayText.value = result
    }
  }, props.speed)
}

function onEnter() {
  if (animating.value) return
  scramble()
}

function onLeave() {
  // nothing — animation plays to completion
}

watch(() => props.text, () => {
  displayText.value = ''
  revealed.value = 0
})
</script>

<style lang="scss" scoped>
.cp-logo-decipher-wrap {
  display: inline-block;
}

.cp-logo-decipher {
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
  min-width: 1em;
}
</style>
