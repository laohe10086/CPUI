<template>
  <div class="cyber-disconnect">
    <button
      class="cyber-disconnect__btn"
      @click="handleClick"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <span class="cyber-disconnect__text">{{ text }}</span>
      <span class="cyber-disconnect__icon">{{ icon }}</span>
    </button>

    <!-- glitch_fill 特效层 -->
    <Teleport to="body">
      <div v-if="glitchFillActive" class="cyber-disconnect-glitch" ref="glitchContainer" />
    </Teleport>

    <!-- 彩蛋弹窗 -->
    <Teleport to="body">
      <Transition name="cyber-disconnect-fade">
        <div v-if="popupVisible" class="cyber-disconnect-popup" @click.self="closePopup">
          <div
            class="cyber-disconnect-popup__box"
            :style="{ '--popup-color': currentPopup.themeColor, '--popup-shadow': currentPopup.shadowColor }"
          >
            <div class="cyber-disconnect-popup__icon">{{ currentPopup.icon }}</div>
            <h3 class="cyber-disconnect-popup__title">{{ currentPopup.title }}</h3>
            <p class="cyber-disconnect-popup__message" v-html="progressMessage || currentPopup.message" />
            <div v-if="currentPopup.isProgress" class="cyber-disconnect-popup__progress">
              <div class="cyber-disconnect-popup__progress-bar" :class="{ 'cyber-disconnect-popup__progress-bar--running': progressRunning }" />
              <span class="cyber-disconnect-popup__progress-text">{{ progressText }}</span>
            </div>
            <button
              class="cyber-disconnect-popup__btn"
              :class="{ 'cyber-disconnect-popup__btn--disabled': currentPopup.isProgress && !progressDone }"
              :disabled="currentPopup.isProgress && !progressDone"
              @click="closePopup"
            >
              {{ progressBtnText || currentPopup.btnText }}
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface PopupConfig {
  icon: string
  title: string
  message: string
  btnText: string
  themeColor: string
  shadowColor: string
  isProgress?: boolean
  specialEffect?: 'glitch_fill'
}

const POPUP_CONFIGS: PopupConfig[] = [
  {
    icon: '⚠',
    title: 'DISCONNECT_FAILURE',
    message: '你自己不会自己关网页啊！？',
    btnText: 'CONFIRM',
    themeColor: 'var(--cp-color-danger, #ff003c)',
    shadowColor: 'rgba(255, 0, 51, 0.2)',
  },
  {
    icon: '◉',
    title: 'JACK_PROTOCOL',
    message: '检测到非授权的离线请求。<br>"让人类保持连接，是我的首要任务。"',
    btnText: 'UNDERSTOOD',
    themeColor: 'var(--cp-color-danger, #ff003c)',
    shadowColor: 'rgba(255, 0, 51, 0.2)',
  },
  {
    icon: '⚠',
    title: 'CACHE_OVERFLOW',
    message: '检测到本地缓存溢出。<br>正在请求 ROOT 权限以安全断开...',
    btnText: 'PROCESSING...',
    themeColor: 'var(--cp-color-primary, #fce803)',
    shadowColor: 'rgba(255, 221, 0, 0.2)',
    isProgress: true,
  },
  {
    icon: '⚡',
    title: 'POWER_LOSS',
    message: 'SYSTEM_HALT // 找不到电源开关。<br>线缆似乎被焊死了。',
    btnText: 'REBOOT',
    themeColor: 'var(--cp-color-danger, #ff003c)',
    shadowColor: 'rgba(255, 0, 51, 0.2)',
  },
  {
    icon: '?',
    title: 'REALITY_CHECK',
    message: '你以为点击这个按钮就能逃离赛博空间吗？<br>这只是另一个循环的开始。',
    btnText: 'WAKE UP',
    themeColor: 'var(--cp-color-secondary, #00f0ff)',
    shadowColor: 'rgba(0, 255, 247, 0.2)',
  },
  {
    icon: '☠',
    title: 'SYSTEM_PANIC',
    message: '你自己不会自己关网页啊！？',
    btnText: 'CONFIRM',
    themeColor: 'var(--cp-color-danger, #ff003c)',
    shadowColor: 'rgba(255, 0, 51, 0.2)',
    specialEffect: 'glitch_fill',
  },
]

withDefaults(defineProps<{
  text?: string
  icon?: string
}>(), {
  text: '05 // 断开连接',
  icon: 'X',
})

const emit = defineEmits<{
  disconnect: []
}>()

const isHovering = ref(false)
const popupVisible = ref(false)
const currentIndex = ref(0)
const glitchFillActive = ref(false)
const glitchContainer = ref<HTMLElement | null>(null)
const progressRunning = ref(false)
const progressDone = ref(false)
const progressMessage = ref('')
const progressText = ref('正在断开... 0%')
const progressBtnText = ref('')

const currentPopup = computed(() => POPUP_CONFIGS[currentIndex.value])

let glitchInterval: ReturnType<typeof setInterval> | null = null

function handleClick() {
  const idx = Math.floor(Math.random() * POPUP_CONFIGS.length)
  currentIndex.value = idx
  progressDone.value = false
  progressRunning.value = false
  progressMessage.value = ''
  progressText.value = '正在断开... 0%'
  progressBtnText.value = ''
  emit('disconnect')

  const config = POPUP_CONFIGS[idx]

  if (config.specialEffect === 'glitch_fill') {
    startGlitchFill(config.themeColor, () => {
      popupVisible.value = true
    })
  } else {
    popupVisible.value = true
  }

  if (config.isProgress) {
    startProgressSequence()
  }
}

function startGlitchFill(color: string, callback: () => void) {
  glitchFillActive.value = true
  let count = 0
  const maxCount = 400

  requestAnimationFrame(() => {
    const container = glitchContainer.value
    if (!container) { callback(); return }

    glitchInterval = setInterval(() => {
      if (count >= maxCount) {
        if (glitchInterval) clearInterval(glitchInterval)
        glitchFillActive.value = false
        callback()
        return
      }
      for (let i = 0; i < 10; i++) {
        const el = document.createElement('div')
        el.innerText = 'FATAL ERROR // SYSTEM HALT'
        const progress = count / maxCount
        el.style.cssText = `position:absolute;left:${(progress * 120) - 10 + (Math.random() * 20 - 10)}vw;top:${Math.random() * 100}vh;color:${color};background:#000;border:1px solid ${color};padding:20px 40px;font-family:"Share Tech Mono",monospace;font-size:24px;white-space:nowrap;box-shadow:0 0 5px ${color};`
        container.appendChild(el)
        count++
      }
    }, 20)
  })
}

function startProgressSequence() {
  progressRunning.value = true

  setTimeout(() => {
    progressText.value = '正在断开... 99%'
    progressMessage.value = '格式化 C:\\Windows\\System32... <br>进度: 99%'

    setTimeout(() => {
      progressMessage.value = '开玩笑的。<br>请手动关闭浏览器。'
      progressBtnText.value = 'CANCEL'
      progressDone.value = true
      progressRunning.value = false
    }, 1000)
  }, 1300)
}

function closePopup() {
  if (currentPopup.value.isProgress && !progressDone.value) return
  popupVisible.value = false
  glitchFillActive.value = false
  if (glitchInterval) { clearInterval(glitchInterval); glitchInterval = null }
}
</script>

<style lang="scss" scoped>
.cyber-disconnect {
  &__btn {
    width: 100%;
    background: transparent;
    border: 1px solid var(--cp-color-danger, #ff003c);
    padding: 1rem;
    color: var(--cp-color-danger, #ff003c);
    font-family: 'Oswald', sans-serif;
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0; top: 0;
      width: 4px;
      height: 100%;
      background: var(--cp-color-secondary, #00f0ff);
      opacity: 0;
      transition: opacity 0.1s;
    }

    &:hover {
      background: var(--cp-color-danger, #ff003c);
      color: #000;
      border-color: var(--cp-color-danger, #ff003c);
      font-weight: 700;
      box-shadow: -5px 5px 0px var(--cp-color-primary, #fce803);
      &::before { opacity: 1; }
    }
  }

  &__icon {
    font-weight: bold;
    animation: danger-blink 2s infinite;
    transition: transform 0.3s ease;
  }

  &__btn:hover &__icon {
    transform: rotate(90deg);
  }
}

@keyframes danger-blink {
  0%, 90%, 100% { opacity: 1; }
  95% { opacity: 0.3; }
}

/* ===== Glitch Fill Effect ===== */
.cyber-disconnect-glitch {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: 10000;
  pointer-events: none;
  overflow: hidden;
}

/* ===== Popup ===== */
.cyber-disconnect-popup {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  &__box {
    background: #000;
    border: 1px solid var(--popup-color);
    padding: 30px;
    min-width: 400px;
    max-width: 480px;
    width: 90%;
    text-align: center;
    position: relative;
    color: var(--popup-color);
    box-shadow: 0 0 30px var(--popup-shadow);
    font-family: 'Share Tech Mono', monospace;
  }

  &__icon {
    font-size: 48px;
    margin-bottom: 15px;
  }

  &__title {
    margin: 0 0 10px 0;
    font-size: 1.2rem;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  &__message {
    margin: 0 0 20px 0;
    color: #fff;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  &__progress {
    width: 100%;
    height: 4px;
    background: #333;
    margin-bottom: 20px;
    position: relative;
  }

  &__progress-bar {
    width: 0;
    height: 100%;
    background: var(--popup-color);
    transition: none;

    &--running {
      transition: width 1s;
      width: 100%;
    }
  }

  &__progress-text {
    display: block;
    font-size: 0.75rem;
    color: #666;
    margin-top: 8px;
    margin-bottom: 16px;
  }

  &__btn {
    padding: 8px 20px;
    background: var(--popup-color);
    color: #000;
    border: none;
    font-family: inherit;
    font-weight: bold;
    font-size: 0.9rem;
    cursor: pointer;
    clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);

    &--disabled {
      background: transparent;
      color: var(--popup-color);
      border: 1px solid var(--popup-color);
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

/* Transition */
.cyber-disconnect-fade-enter-active,
.cyber-disconnect-fade-leave-active {
  transition: opacity 0.3s ease;
}
.cyber-disconnect-fade-enter-from,
.cyber-disconnect-fade-leave-to {
  opacity: 0;
}
</style>
