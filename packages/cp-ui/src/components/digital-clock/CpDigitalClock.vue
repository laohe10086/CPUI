<template>
  <div class="cp-clock" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <span class="cp-clock__time" :class="{ 'cp-clock__time--glitch': glitching }">
      {{ displayTime }}
    </span>
    <span v-if="label" class="cp-clock__label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = withDefaults(defineProps<{
  format?: '24h' | '12h'
  showSeconds?: boolean
  label?: string
  glitch?: boolean
  glitchInterval?: number
}>(), {
  format: '24h',
  showSeconds: true,
  label: '',
  glitch: true,
  glitchInterval: 30000,
})

const time = ref(new Date())
const hovering = ref(false)
const glitching = ref(false)
let timer: ReturnType<typeof setInterval>
let glitchTimer: ReturnType<typeof setInterval> | undefined

const displayTime = computed(() => {
  if (glitching.value) return '88:88:88'

  const h = time.value.getHours()
  const m = time.value.getMinutes()
  const s = time.value.getSeconds()

  const pad = (n: number) => String(n).padStart(2, '0')

  if (props.format === '12h') {
    const hour = h % 12 || 12
    const suffix = h >= 12 ? 'PM' : 'AM'
    return props.showSeconds
      ? `${pad(hour)}:${pad(m)}:${pad(s)} ${suffix}`
      : `${pad(hour)}:${pad(m)} ${suffix}`
  }

  return props.showSeconds
    ? `${pad(h)}:${pad(m)}:${pad(s)}`
    : `${pad(h)}:${pad(m)}`
})

onMounted(() => {
  timer = setInterval(() => { time.value = new Date() }, 1000)

  if (props.glitch) {
    glitchTimer = setInterval(() => {
      glitching.value = true
      setTimeout(() => { glitching.value = false }, 150)
    }, props.glitchInterval + Math.random() * 10000)
  }
})

onUnmounted(() => {
  clearInterval(timer)
  if (glitchTimer) clearInterval(glitchTimer)
})
</script>

<style lang="scss" scoped>
.cp-clock {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  cursor: default;
}

.cp-clock__time {
  font-family: var(--cp-font-mono);
  font-size: 1.4em;
  font-weight: 700;
  letter-spacing: 3px;
  color: var(--cp-color-secondary);
  text-shadow: 0 0 10px var(--cp-glow-secondary);
  transition: color var(--cp-duration-fast) var(--cp-easing);

  .cp-clock:hover & {
    color: var(--cp-color-primary);
    text-shadow: 0 0 10px var(--cp-glow-primary);
  }

  &--glitch {
    animation: cp-clock-glitch 0.1s steps(2) infinite;
    color: var(--cp-color-danger);
    text-shadow:
      -2px 0 var(--cp-color-secondary),
      2px 0 var(--cp-color-danger);
  }
}

.cp-clock__label {
  font-family: var(--cp-font-mono);
  font-size: 0.65em;
  color: var(--cp-text-dim);
  letter-spacing: 2px;
  text-transform: uppercase;
}

@keyframes cp-clock-glitch {
  0%  { transform: translate(-1px, 1px); }
  50% { transform: translate(1px, -1px); }
}
</style>
