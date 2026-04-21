<template>
  <Transition name="boot-anim">
    <div v-if="visible" class="boot-animation">
      <div class="boot-animation__title">{{ title }}</div>
      <div class="boot-animation__bar">
        <div class="boot-animation__fill" :style="{ width: progress + '%' }" />
      </div>
      <div class="boot-animation__info">{{ systemInfo }}</div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  systemInfo?: string
  duration?: number
  sessionOnce?: boolean
  sessionKey?: string
  autoStart?: boolean
}>(), {
  title: 'INITIALIZING NEURAL LINK...',
  systemInfo: 'BIOS DATE: 2077.08.20 // VER 550W',
  duration: 2200,
  sessionOnce: true,
  sessionKey: 'cp-boot-animation-played',
  autoStart: true,
})

const emit = defineEmits<{
  complete: []
}>()

const visible = ref(false)
const progress = ref(0)
const durationMs = computed(() => props.duration + 'ms')

function start() {
  if (props.sessionOnce) {
    const key = props.sessionKey
    if (sessionStorage.getItem(key)) {
      return
    }
    sessionStorage.setItem(key, '1')
  }

  progress.value = 0
  visible.value = true
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      progress.value = 100
    })
  })

  setTimeout(() => {
    visible.value = false
    emit('complete')
  }, props.duration + 600)
}

onMounted(() => {
  if (props.autoStart) start()
})

defineExpose({ start })
</script>

<style scoped>
.boot-animation {
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--cp-yellow, #fce803);
  font-family: 'Share Tech Mono', monospace;
}

.boot-animation__title {
  font-size: 1rem;
  letter-spacing: 2px;
  margin-bottom: 24px;
}

.boot-animation__bar {
  width: 300px;
  height: 4px;
  background: #333;
  overflow: hidden;
}

.boot-animation__fill {
  height: 100%;
  width: 0;
  background: var(--cp-yellow, #fce803);
  transition: width v-bind(durationMs) ease;
}

.boot-animation__info {
  margin-top: 16px;
  font-size: 0.6rem;
  color: #666;
  letter-spacing: 1px;
}

.boot-anim-leave-active {
  transition: opacity 0.5s ease;
}

.boot-anim-leave-to {
  opacity: 0;
}
</style>
