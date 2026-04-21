<template>
  <span class="cyber-decipher">
    {{ displayedText
    }}<span v-if="isDecoding" class="cyber-decipher__cursor">_</span>
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  active?: boolean
  speed?: number
}>(), {
  active: true,
  speed: 30,
})

const emit = defineEmits<{
  complete: []
}>()

const displayedText = ref('')
const isDecoding = ref(false)
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+<>?:{}|'

const decode = async () => {
  if (isDecoding.value) return
  isDecoding.value = true
  displayedText.value = ''

  const targetText = props.text
  const length = targetText.length

  for (let i = 0; i <= length; i++) {
    let currentStr = targetText.substring(0, i)

    if (i < length) {
      for (let j = 0; j < Math.min(3, length - i); j++) {
        currentStr += chars[Math.floor(Math.random() * chars.length)]
      }
    }

    displayedText.value = currentStr
    await new Promise(resolve => setTimeout(resolve, props.speed))
  }

  isDecoding.value = false
  emit('complete')
}

onMounted(() => {
  if (props.active) {
    decode()
  } else {
    displayedText.value = props.text
  }
})

watch(() => props.active, (newVal) => {
  if (newVal) decode()
})
</script>

<style lang="scss" scoped>
.cyber-decipher {
  font-family: var(--cp-font-mono);
  color: var(--cp-color-primary);
  display: inline;
}

.cyber-decipher__cursor {
  color: var(--cp-color-secondary);
  animation: cp-blink 1s step-end infinite;
}

@keyframes cp-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
