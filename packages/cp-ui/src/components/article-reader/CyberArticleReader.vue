<template>
  <Teleport to="body">
    <Transition name="cyber-reader-fade">
      <div v-if="visible" class="cyber-article-reader__overlay" @click.self="$emit('close')">
        <div class="cyber-article-reader">

          <!-- 战术头部 -->
          <div class="cyber-article-reader__header">
            <div class="cyber-article-reader__header-status">
              <div class="cyber-article-reader__led" />
              <span>CONN: SECURE</span>
            </div>
            <div class="cyber-article-reader__header-title">
              <span class="cyber-article-reader__title-text">{{ titleText }}</span>
              <span class="cyber-article-reader__separator">//</span>
              <span class="cyber-article-reader__link-status">{{ linkStatus }}</span>
            </div>
            <button class="cyber-article-reader__close-btn" @click="$emit('close')">
              <span>{{ closeText }}</span>
              <span>&times;</span>
            </button>
          </div>

          <!-- 主体 -->
          <div class="cyber-article-reader__body" ref="bodyRef" @scroll="handleScroll">
            <div class="cyber-article-reader__content">

              <!-- 元数据 HUD (左侧系统讯息) -->
              <div class="cyber-article-reader__bubble cyber-article-reader__bubble--left cyber-article-reader__bubble--system">
                <div class="cyber-article-reader__idx-marker">
                  <span class="cyber-article-reader__idx-num">00</span>
                  <div class="cyber-article-reader__idx-line" />
                </div>
                <div class="cyber-article-reader__bubble-area">
                  <div class="cyber-article-reader__bubble-main">
                    <div class="cyber-article-reader__bolt cyber-article-reader__bolt--tl" />
                    <div class="cyber-article-reader__bolt cyber-article-reader__bolt--tr" />
                    <div class="cyber-article-reader__bolt cyber-article-reader__bolt--bl" />
                    <div class="cyber-article-reader__bolt cyber-article-reader__bolt--br" />
                    <div class="cyber-article-reader__bubble-header">
                      <span class="cyber-article-reader__bubble-tag">系统讯息</span>
                      <span class="cyber-article-reader__bubble-status">就绪</span>
                    </div>
                    <div class="cyber-article-reader__bubble-text">
                      <div class="cyber-article-reader__meta-hud">
                        <div class="cyber-article-reader__meta-row" v-for="item in metaItems" :key="item.label">
                          <span class="cyber-article-reader__meta-label">{{ item.label }}:</span> {{ item.value }}
                        </div>
                      </div>
                    </div>
                    <div class="cyber-article-reader__bubble-footer">
                      <span class="cyber-article-reader__timestamp">{{ metaTimestamp }}</span>
                      <span class="cyber-article-reader__checksum">{{ metaChecksum }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 消息列表 -->
              <TransitionGroup name="cyber-reader-msg">
                <div
                  v-for="(msg, index) in messages"
                  :key="index"
                  class="cyber-article-reader__bubble"
                  :class="[
                    msg.role === 'system' ? 'cyber-article-reader__bubble--left' : 'cyber-article-reader__bubble--right',
                    msg.role === 'system' ? 'cyber-article-reader__bubble--system' : 'cyber-article-reader__bubble--author',
                  ]"
                >
                  <div class="cyber-article-reader__idx-marker">
                    <span class="cyber-article-reader__idx-num">{{ String(index + 1).padStart(2, '0') }}</span>
                    <div class="cyber-article-reader__idx-line" />
                  </div>

                  <div v-if="msg.role === 'author'" class="cyber-article-reader__avatar-container">
                    <div class="cyber-article-reader__avatar-frame">
                      <img v-if="authorAvatar && !avatarError" :src="authorAvatar" alt="contact" @error="avatarError = true" />
                      <div v-if="!authorAvatar || avatarError" class="cyber-article-reader__avatar-fallback">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                      </div>
                      <div class="cyber-article-reader__avatar-scan" />
                    </div>
                    <div class="cyber-article-reader__avatar-id">{{ authorId }}</div>
                  </div>

                  <div class="cyber-article-reader__bubble-area">
                    <div class="cyber-article-reader__bubble-main">
                      <div class="cyber-article-reader__bolt cyber-article-reader__bolt--tl" />
                      <div class="cyber-article-reader__bolt cyber-article-reader__bolt--tr" />
                      <div class="cyber-article-reader__bolt cyber-article-reader__bolt--bl" />
                      <div class="cyber-article-reader__bolt cyber-article-reader__bolt--br" />
                      <div class="cyber-article-reader__bubble-header">
                        <span class="cyber-article-reader__bubble-tag">{{ msg.role === 'system' ? '系统讯息' : '数据日志' }}</span>
                      </div>
                      <div class="cyber-article-reader__bubble-text">
                        <div v-if="msg.type === 'image'" class="cyber-article-reader__msg-image" @click="$emit('preview-image', msg.content)">
                          <img :src="msg.content" alt="Visual Data" />
                          <div class="cyber-article-reader__img-overlay" />
                        </div>
                        <div v-else class="cyber-article-reader__msg-text">{{ msg.content }}</div>
                      </div>
                      <div class="cyber-article-reader__bubble-footer">
                        <span class="cyber-article-reader__timestamp">{{ msg.time }}</span>
                        <span v-if="msg.checksum" class="cyber-article-reader__checksum">{{ msg.checksum }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TransitionGroup>

              <!-- 打字指示器 -->
              <div v-if="loading" class="cyber-article-reader__typing">
                <span class="cyber-article-reader__typing-dot" />
                <span class="cyber-article-reader__typing-dot" />
                <span class="cyber-article-reader__typing-dot" />
              </div>
              <div class="cyber-article-reader__spacer" />
            </div>
          </div>

          <!-- 新消息提示 -->
          <Transition name="cyber-reader-fade">
            <div v-if="hasNewMessages" class="cyber-article-reader__new-hint" @click="scrollToBottom">
              <span>&#9660;</span>
              <span>NEW_DATA_PACKETS_RECEIVED // CLICK_TO_SYNC</span>
              <span>&#9660;</span>
            </div>
          </Transition>

          <!-- 四角装饰 -->
          <div class="cyber-article-reader__corner cyber-article-reader__corner--tl" />
          <div class="cyber-article-reader__corner cyber-article-reader__corner--tr" />
          <div class="cyber-article-reader__corner cyber-article-reader__corner--bl" />
          <div class="cyber-article-reader__corner cyber-article-reader__corner--br" />

          <!-- 底部装饰条 -->
          <div class="cyber-article-reader__bottom-bar">
            <span class="cyber-article-reader__bar-text">{{ footerText }}</span>
            <div class="cyber-article-reader__bar-stripes" />
          </div>
        </div>

        <!-- 灯箱 -->
        <Transition name="cyber-reader-fade">
          <div v-if="previewUrl" class="cyber-article-reader__lightbox" @click="previewUrl = ''">
            <div class="cyber-article-reader__lightbox-content">
              <img :src="previewUrl" />
              <div class="cyber-article-reader__lightbox-caption">VISUAL_DATA_FULL_RES // CLICK_TO_CLOSE</div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

export interface ArticleMessage {
  role: 'system' | 'author'
  type: 'text' | 'image'
  content: string
  time?: string
  checksum?: string
}

export interface ArticleMetaItem {
  label: string
  value: string
}

const props = withDefaults(defineProps<{
  visible: boolean
  messages?: ArticleMessage[]
  metaItems?: ArticleMetaItem[]
  loading?: boolean
  titleText?: string
  linkStatus?: string
  closeText?: string
  metaTimestamp?: string
  metaChecksum?: string
  footerText?: string
  authorAvatar?: string
  authorId?: string
}>(), {
  messages: () => [],
  metaItems: () => [],
  loading: false,
  titleText: 'DATA_STREAM',
  linkStatus: 'LINK_ESTABLISHED',
  closeText: 'TERMINATE',
  metaTimestamp: '2077.12.18_INIT',
  metaChecksum: '0x8F2D4B',
  footerText: 'ENCRYPTED_LINE_SECURE // V2.4.0',
  authorAvatar: '',
  authorId: 'AUTHOR_LOG',
})

defineEmits<{
  close: []
  'preview-image': [url: string]
}>()

const bodyRef = ref<HTMLElement | null>(null)
const hasNewMessages = ref(false)
const previewUrl = ref('')
const avatarError = ref(false)
const lastScrollTop = ref(0)

const handleScroll = () => {
  if (!bodyRef.value) return
  const container = bodyRef.value
  const isScrollingDown = container.scrollTop > lastScrollTop.value
  lastScrollTop.value = container.scrollTop
  const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 50
  if (isScrollingDown || isAtBottom) {
    hasNewMessages.value = false
  }
}

const scrollToBottom = () => {
  if (!bodyRef.value) return
  bodyRef.value.scrollTo({ top: bodyRef.value.scrollHeight, behavior: 'smooth' })
  hasNewMessages.value = false
}

watch(() => props.messages.length, () => {
  if (!bodyRef.value) return
  const container = bodyRef.value
  const hasOverflow = container.scrollHeight > container.clientHeight
  const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100
  if (isAtBottom || !hasOverflow) {
    scrollToBottom()
  } else if (hasOverflow) {
    hasNewMessages.value = true
  }
})

watch(() => props.visible, (v) => {
  if (!v) {
    hasNewMessages.value = false
    lastScrollTop.value = 0
    previewUrl.value = ''
    avatarError.value = false
  }
})
</script>

<style lang="scss" scoped>
.cyber-article-reader__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.96);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.cyber-article-reader {
  width: 100%;
  max-width: 900px;
  height: 90vh;
  background: #050505;
  border: 2px solid #00fff7;
  border-top: 4px solid #f3e600;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 1),
    0 0 60px rgba(0, 255, 247, 0.15),
    0 20px 80px rgba(0, 0, 0, 1);
  overflow: hidden;

  // === 四角装饰 ===
  &__corner {
    position: absolute;
    width: 30px;
    height: 30px;
    border: 4px solid #00fff7;
    pointer-events: none;
    z-index: 20;

    &--tl { top: -2px; left: -2px; border-right: none; border-bottom: none; }
    &--tr { top: -2px; right: -2px; border-left: none; border-bottom: none; border-color: #f3e600; }
    &--bl { bottom: -2px; left: -2px; border-right: none; border-top: none; }
    &--br { bottom: -2px; right: -2px; border-left: none; border-top: none; }
  }

  // === 头部 ===
  &__header {
    height: 56px;
    background: #000;
    border-bottom: 2px solid #1a1a1a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    font-family: 'Share Tech Mono', monospace;
    user-select: none;
    z-index: 10;
  }

  &__header-status {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #00ff00;
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0.1em;
  }

  &__led {
    width: 10px;
    height: 10px;
    background: #00ff00;
    border-radius: 50%;
    box-shadow: 0 0 10px #00ff00;
    animation: reader-pulse 2s infinite;
  }

  &__header-title {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: bold;
    font-size: 1rem;
    background: #111;
    padding: 4px 16px;
    border: 1px solid #333;
    transform: skewX(-15deg);

    > span { transform: skewX(15deg); }
  }

  &__title-text { color: #f3e600; }
  &__link-status { color: #888; font-size: 0.8rem; }
  &__separator { color: #444; }

  &__close-btn {
    background: #1a0505;
    border: 1px solid #ff3333;
    color: #ff3333;
    padding: 6px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Share Tech Mono', monospace;
    font-weight: bold;
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.1em;

    &:hover {
      background: #ff3333;
      color: #000;
      box-shadow: 0 0 20px rgba(255, 51, 51, 0.6);
    }
  }

  // === 主体 ===
  &__body {
    flex: 1;
    overflow-y: auto;
    padding: 2.5rem 2.5rem 1rem 4.5rem;
    scrollbar-width: thin;
    scrollbar-color: #00fff7 #000;
    position: relative;
    background: #080808;

    &::-webkit-scrollbar { width: 6px; background: #000; }
    &::-webkit-scrollbar-thumb { background: #00fff7; }
  }

  &__content { min-height: 100%; }

  // === 气泡容器 ===
  &__bubble {
    display: flex;
    gap: 1.2rem;
    margin-bottom: 2.5rem;
    width: 100%;
    max-width: 80%;
    position: relative;

    &--left { max-width: 60%; }

    &--right {
      flex-direction: row-reverse;
      margin-left: auto;
    }
  }

  // === 侧边索引 ===
  &__idx-marker {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
    opacity: 0.6;
    color: #666;

    .cyber-article-reader__bubble--left & { left: -45px; }
    .cyber-article-reader__bubble--right & { right: -45px; flex-direction: row-reverse; }
  }

  &__idx-num { }
  &__idx-line { width: 15px; height: 2px; background: currentColor; }

  // === 头像 ===
  &__avatar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    flex-shrink: 0;
  }

  &__avatar-frame {
    width: 50px;
    height: 50px;
    border: 1px solid rgba(0, 255, 247, 0.4);
    padding: 3px;
    position: relative;
    background: #000;
    clip-path: polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%);

    .cyber-article-reader__bubble--right & {
      border-color: #ffb700;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(0.8) contrast(1.2);
    }
  }

  &__avatar-fallback {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #111;
    color: #444;

    .cyber-article-reader__bubble--right & { color: #554400; }
  }

  &__avatar-scan {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #00fff7;
    opacity: 0.5;
    animation: avatar-scan 3s linear infinite;

    .cyber-article-reader__bubble--right & {
      background: #ffb700;
    }
  }

  &__avatar-id {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: #00fff7;
    letter-spacing: 0.05em;
    text-transform: uppercase;

    .cyber-article-reader__bubble--right & {
      color: #ffb700;
    }
  }

  // === 气泡主体 ===
  &__bubble-area {
    position: relative;
    flex: 1;
  }

  &__bubble-main {
    background: #0b1013;
    border: 1px solid #1a202c;
    padding: 1.2rem 1.5rem;
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
    clip-path: polygon(
      0 12px, 12px 0,
      calc(100% - 12px) 0, 100% 12px,
      100% calc(100% - 12px), calc(100% - 12px) 100%,
      12px 100%, 0 calc(100% - 12px)
    );

    .cyber-article-reader__bubble--left & {
      border-left: 4px solid #00fff7;
      background: linear-gradient(135deg, rgba(0, 255, 247, 0.05) 0%, rgba(0, 0, 0, 0.9) 100%);
    }

    .cyber-article-reader__bubble--system & {
      border: 1px solid #00fff7;
      background: rgba(0, 255, 247, 0.08);
    }

    .cyber-article-reader__bubble--author & {
      border-right: 4px solid #ffb700;
      background: #1a1505;
      box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.6);
      border-top: 1px solid rgba(255, 183, 0, 0.2);
      border-bottom: 1px solid rgba(255, 183, 0, 0.2);
    }
  }

  // === 装饰螺栓 ===
  &__bolt {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #000;
    border-radius: 50%;
    opacity: 0.8;
    z-index: 2;

    &--tl { top: 5px; left: 5px; }
    &--tr { top: 5px; right: 5px; }
    &--bl { bottom: 5px; left: 5px; }
    &--br { bottom: 5px; right: 5px; }
  }

  // === 气泡头部 ===
  &__bubble-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
  }

  &__bubble-tag {
    color: #555;
    text-transform: uppercase;
    font-weight: bold;

    .cyber-article-reader__bubble--left & { color: rgba(0, 255, 247, 0.8); }
    .cyber-article-reader__bubble--right & { color: #ffb700; }
  }

  &__bubble-status {
    color: #f3e600;
    font-weight: bold;
  }

  // === 气泡正文 ===
  &__bubble-text { line-height: 1.7; word-break: break-word; }

  &__bubble-footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: #444;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 0.5rem;

    .cyber-article-reader__bubble--author & {
      border-top-color: rgba(255, 183, 0, 0.15);
      color: #886600;
    }
  }

  &__timestamp { }
  &__checksum { font-size: 0.6rem; opacity: 0.6; }

  // === Meta HUD ===
  &__meta-hud {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__meta-label {
    color: #666;
    margin-right: 10px;
  }

  &__meta-row { }

  // === 消息内容 ===
  &__msg-text {
    line-height: 1.7;
    word-break: break-word;

    .cyber-article-reader__bubble--left & { color: #cbd5e0; }
    .cyber-article-reader__bubble--right & { color: #ffffff; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5); }
  }

  &__msg-image {
    position: relative;
    display: inline-block;
    max-width: 100%;
    border: 1px solid #ffb700;
    padding: 2px;
    background: rgba(0, 0, 0, 0.5);
    cursor: zoom-in;
    transition: transform 0.2s;

    img { max-width: 100%; height: auto; display: block; }

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 0 20px rgba(255, 183, 0, 0.3);
    }
  }

  &__img-overlay {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      rgba(255, 183, 0, 0.1) 0px, rgba(255, 183, 0, 0.1) 1px,
      transparent 1px, transparent 4px
    );
    pointer-events: none;
    opacity: 0.5;
  }

  // === 打字指示器 ===
  &__typing {
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 4px;
  }

  &__typing-dot {
    width: 6px;
    height: 6px;
    background: #ffb700;
    border-radius: 50%;
    animation: reader-typing 1s infinite;
    opacity: 0.5;

    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }

  &__spacer { height: 4rem; }

  // === 新消息提示 ===
  &__new-hint {
    position: absolute;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 183, 0, 0.95);
    color: #000;
    padding: 10px 28px;
    font-family: 'Share Tech Mono', monospace;
    font-weight: bold;
    font-size: 0.85rem;
    cursor: pointer;
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 15px;
    border: 2px solid #fff;
    box-shadow:
      0 0 30px rgba(255, 183, 0, 0.5),
      inset 0 0 10px rgba(255, 255, 255, 0.5);
    clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
    animation: reader-bounce 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);

    &:hover {
      background: #fff;
      box-shadow: 0 0 30px rgba(255, 183, 0, 0.6);
    }
  }

  // === 底部条 ===
  &__bottom-bar {
    height: 32px;
    background: #000;
    border-top: 2px solid #1a1a1a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    color: #555;
    z-index: 10;
  }

  &__bar-stripes {
    width: 100px;
    height: 10px;
    background: repeating-linear-gradient(45deg, #222, #222 5px, #111 5px, #111 10px);
  }

  // === 灯箱 ===
  &__lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.98);
    z-index: 100000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: zoom-out;
  }

  &__lightbox-content {
    max-width: 95vw;
    max-height: 95vh;
    position: relative;
    border: 1px solid #ffb700;

    img { max-width: 100%; max-height: 95vh; display: block; box-shadow: 0 0 50px rgba(0, 0, 0, 1); }
  }

  &__lightbox-caption {
    position: absolute;
    bottom: -30px;
    left: 0;
    color: #888;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
  }
}

// === Animations ===
@keyframes reader-pulse {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}

@keyframes reader-typing {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50% { transform: translateY(-4px); opacity: 1; }
}

@keyframes reader-bounce {
  from { transform: translateX(-50%) translateY(20px); opacity: 0; }
  to { transform: translateX(-50%) translateY(0); opacity: 1; }
}

@keyframes avatar-scan {
  0% { top: 0; }
  100% { top: 100%; }
}

// === Transitions ===
.cyber-reader-fade-enter-active,
.cyber-reader-fade-leave-active {
  transition: opacity 0.2s ease;
}

.cyber-reader-fade-enter-from,
.cyber-reader-fade-leave-to {
  opacity: 0;
}

.cyber-reader-fade-enter-active .cyber-article-reader {
  animation: reader-scale-in 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

@keyframes reader-scale-in {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.cyber-reader-msg-enter-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.cyber-reader-msg-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
}
</style>
