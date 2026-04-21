<template>
  <Teleport to="body">
    <Transition name="sc-reader-fade">
      <div v-if="visible" class="sc-article-reader__overlay" @click.self="$emit('close')">
        <div class="sc-article-reader">

          <!-- 头部 -->
          <div class="sc-article-reader__header">
            <div class="sc-article-reader__header-status">
              <div class="sc-article-reader__dot" />
              <span>CONN: SECURE</span>
            </div>
            <div class="sc-article-reader__header-title">
              <span class="sc-article-reader__title-text">{{ titleText }}</span>
              <span class="sc-article-reader__separator">//</span>
              <span class="sc-article-reader__link-status">{{ linkStatus }}</span>
            </div>
            <button class="sc-article-reader__close-btn" @click="$emit('close')">
              <span>{{ closeText }}</span>
              <span>&times;</span>
            </button>
          </div>

          <!-- 主体 -->
          <div class="sc-article-reader__body" ref="bodyRef" @scroll="handleScroll">
            <div class="sc-article-reader__content">

              <!-- 元数据 HUD (左侧系统讯息) -->
              <div class="sc-article-reader__bubble sc-article-reader__bubble--left sc-article-reader__bubble--system">
                <div class="sc-article-reader__idx-marker">
                  <span class="sc-article-reader__idx-num">00</span>
                  <div class="sc-article-reader__idx-line" />
                </div>
                <div class="sc-article-reader__bubble-area">
                  <div class="sc-article-reader__bubble-main">
                    <div class="sc-article-reader__bubble-header">
                      <span class="sc-article-reader__bubble-tag">系统讯息</span>
                      <span class="sc-article-reader__bubble-status">就绪</span>
                    </div>
                    <div class="sc-article-reader__bubble-text">
                      <div class="sc-article-reader__meta-hud">
                        <div class="sc-article-reader__meta-row" v-for="item in metaItems" :key="item.label">
                          <span class="sc-article-reader__meta-label">{{ item.label }}:</span> {{ item.value }}
                        </div>
                      </div>
                    </div>
                    <div class="sc-article-reader__bubble-footer">
                      <span class="sc-article-reader__timestamp">{{ metaTimestamp }}</span>
                      <span class="sc-article-reader__checksum">{{ metaChecksum }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 消息列表 -->
              <TransitionGroup name="sc-reader-msg">
                <div
                  v-for="(msg, index) in messages"
                  :key="index"
                  class="sc-article-reader__bubble"
                  :class="[
                    msg.role === 'system' ? 'sc-article-reader__bubble--left' : 'sc-article-reader__bubble--right',
                    msg.role === 'system' ? 'sc-article-reader__bubble--system' : 'sc-article-reader__bubble--author',
                  ]"
                >
                  <div class="sc-article-reader__idx-marker">
                    <span class="sc-article-reader__idx-num">{{ String(index + 1).padStart(2, '0') }}</span>
                    <div class="sc-article-reader__idx-line" />
                  </div>

                  <div v-if="msg.role === 'author'" class="sc-article-reader__avatar-container">
                    <div class="sc-article-reader__avatar-frame">
                      <img v-if="authorAvatar && !avatarError" :src="authorAvatar" alt="contact" @error="avatarError = true" />
                      <div v-if="!authorAvatar || avatarError" class="sc-article-reader__avatar-fallback">
                        <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                      </div>
                    </div>
                    <div class="sc-article-reader__avatar-id">{{ authorId }}</div>
                  </div>

                  <div class="sc-article-reader__bubble-area">
                    <div class="sc-article-reader__bubble-main">
                      <div class="sc-article-reader__bubble-header">
                        <span class="sc-article-reader__bubble-tag">{{ msg.role === 'system' ? '系统讯息' : '数据日志' }}</span>
                      </div>
                      <div class="sc-article-reader__bubble-text">
                        <div v-if="msg.type === 'image'" class="sc-article-reader__msg-image" @click="$emit('preview-image', msg.content)">
                          <img :src="msg.content" alt="Visual Data" />
                        </div>
                        <div v-else class="sc-article-reader__msg-text">{{ msg.content }}</div>
                      </div>
                      <div class="sc-article-reader__bubble-footer">
                        <span class="sc-article-reader__timestamp">{{ msg.time }}</span>
                        <span v-if="msg.checksum" class="sc-article-reader__checksum">{{ msg.checksum }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TransitionGroup>

              <!-- 打字指示器 -->
              <div v-if="loading" class="sc-article-reader__typing">
                <span class="sc-article-reader__typing-dot" />
                <span class="sc-article-reader__typing-dot" />
                <span class="sc-article-reader__typing-dot" />
              </div>
              <div class="sc-article-reader__spacer" />
            </div>
          </div>

          <!-- 新消息提示 -->
          <Transition name="sc-reader-fade">
            <div v-if="hasNewMessages" class="sc-article-reader__new-hint" @click="scrollToBottom">
              NEW_DATA_PACKETS_RECEIVED // CLICK_TO_SYNC
            </div>
          </Transition>

          <!-- 底部状态条 -->
          <div class="sc-article-reader__bottom-bar">
            <span>{{ footerText }}</span>
          </div>
        </div>

        <!-- 灯箱 -->
        <Transition name="sc-reader-fade">
          <div v-if="previewUrl" class="sc-article-reader__lightbox" @click="previewUrl = ''">
            <div class="sc-article-reader__lightbox-content">
              <img :src="previewUrl" />
              <div class="sc-article-reader__lightbox-caption">CLICK_TO_CLOSE</div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ArticleMessage, ArticleMetaItem } from './CyberArticleReader.vue'

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
const lastScrollTop = ref(0)
const avatarError = ref(false)

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
  }
})
</script>

<style lang="scss" scoped>
.sc-article-reader__overlay {
  position: fixed;
  inset: 0;
  background: rgba(5, 8, 12, 0.95);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.sc-article-reader {
  width: 100%;
  max-width: 900px;
  height: 90vh;
  background: linear-gradient(180deg, #0a0e14 0%, #0d1117 100%);
  border: 1px solid rgba(0, 240, 255, 0.15);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);

  // === 头部 ===
  &__header {
    height: 48px;
    background: rgba(0, 0, 0, 0.4);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
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
    gap: 10px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.75rem;
    letter-spacing: 0.08em;
  }

  &__dot {
    width: 6px;
    height: 6px;
    background: rgba(0, 255, 136, 0.6);
    border-radius: 50%;
  }

  &__header-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 0.05em;
  }

  &__title-text { color: rgba(0, 240, 255, 0.5); }
  &__link-status { color: rgba(255, 255, 255, 0.25); font-size: 0.7rem; }
  &__separator { color: rgba(255, 255, 255, 0.15); }

  &__close-btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.4);
    padding: 4px 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.08em;

    &:hover {
      border-color: rgba(255, 80, 80, 0.4);
      color: rgba(255, 80, 80, 0.8);
      background: rgba(255, 80, 80, 0.06);
    }
  }

  // === 主体 ===
  &__body {
    flex: 1;
    overflow-y: auto;
    padding: 2rem 2rem 1rem 4rem;
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 240, 255, 0.15) transparent;
    position: relative;

    &::-webkit-scrollbar { width: 3px; background: transparent; }
    &::-webkit-scrollbar-thumb { background: rgba(0, 240, 255, 0.15); }
  }

  &__content { min-height: 100%; }

  // === 气泡容器 ===
  &__bubble {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    width: 100%;
    max-width: 75%;
    position: relative;

    &--left { max-width: 55%; }

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
    gap: 6px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    opacity: 0.2;
    color: rgba(255, 255, 255, 0.5);

    .sc-article-reader__bubble--left & { left: -30px; }
    .sc-article-reader__bubble--right & { right: -30px; flex-direction: row-reverse; }
  }

  &__idx-line {
    width: 10px;
    height: 1px;
    background: currentColor;
    opacity: 0.5;
  }

  // === 头像 ===
  &__avatar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    flex-shrink: 0;
  }

  &__avatar-frame {
    width: 40px;
    height: 40px;
    border: 1px solid rgba(255, 183, 0, 0.2);
    padding: 2px;
    background: rgba(0, 0, 0, 0.3);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(0.3);
    }
  }

  &__avatar-fallback {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    color: rgba(255, 255, 255, 0.15);
  }

  &__avatar-id {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    color: rgba(255, 183, 0, 0.35);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  // === 气泡主体 ===
  &__bubble-area {
    position: relative;
    flex: 1;
  }

  &__bubble-main {
    padding: 1rem 1.2rem;
    background: rgba(0, 240, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    position: relative;
    border-radius: 0;

    .sc-article-reader__bubble--left & {
      border-left: 3px solid rgba(0, 240, 255, 0.3);
    }

    .sc-article-reader__bubble--system & {
      background: rgba(0, 240, 255, 0.05);
      border-color: rgba(0, 240, 255, 0.1);
      border-left: 3px solid rgba(0, 240, 255, 0.3);
    }

    .sc-article-reader__bubble--author & {
      background: rgba(255, 183, 0, 0.03);
      border-right: 3px solid rgba(255, 183, 0, 0.25);
      border-left: none;
    }
  }

  // === 气泡头部 ===
  &__bubble-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.6rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.06em;
  }

  &__bubble-tag {
    text-transform: uppercase;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.25);

    .sc-article-reader__bubble--left & { color: rgba(0, 240, 255, 0.4); }
    .sc-article-reader__bubble--right & { color: rgba(255, 183, 0, 0.35); }
  }

  &__bubble-status {
    color: rgba(255, 255, 255, 0.2);
    font-weight: bold;
  }

  // === 气泡正文 ===
  &__bubble-text { line-height: 1.7; word-break: break-word; }

  &__bubble-footer {
    margin-top: 0.7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.12);
    border-top: 1px solid rgba(255, 255, 255, 0.03);
    padding-top: 0.5rem;

    .sc-article-reader__bubble--author & {
      border-top-color: rgba(255, 183, 0, 0.06);
      color: rgba(255, 183, 0, 0.2);
    }
  }

  &__checksum { opacity: 0.5; }

  // === Meta HUD ===
  &__meta-hud {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    color: rgba(200, 220, 230, 0.6);
  }

  &__meta-label {
    color: rgba(255, 255, 255, 0.2);
    margin-right: 8px;
  }

  // === 消息内容 ===
  &__msg-text {
    line-height: 1.7;
    word-break: break-word;
    color: rgba(200, 215, 225, 0.7);

    .sc-article-reader__bubble--author & { color: rgba(255, 255, 255, 0.8); }
  }

  &__msg-image {
    position: relative;
    display: inline-block;
    max-width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 2px;
    background: rgba(0, 0, 0, 0.2);
    cursor: zoom-in;
    transition: border-color 0.2s;

    img { max-width: 100%; height: auto; display: block; }

    &:hover { border-color: rgba(255, 255, 255, 0.2); }
  }

  // === 打字指示器 ===
  &__typing {
    padding: 0.5rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 4px;
  }

  &__typing-dot {
    width: 4px;
    height: 4px;
    background: rgba(255, 183, 0, 0.4);
    border-radius: 50%;
    animation: sc-typing 1.2s infinite;

    &:nth-child(2) { animation-delay: 0.3s; }
    &:nth-child(3) { animation-delay: 0.6s; }
  }

  &__spacer { height: 2rem; }

  // === 新消息提示 ===
  &__new-hint {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    padding: 6px 20px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    cursor: pointer;
    z-index: 100;
    letter-spacing: 0.04em;
    border-radius: 2px;
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.7);
    }
  }

  // === 底部条 ===
  &__bottom-bar {
    height: 28px;
    background: rgba(0, 0, 0, 0.3);
    border-top: 1px solid rgba(255, 255, 255, 0.04);
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.12);
    z-index: 10;
  }

  // === 灯箱 ===
  &__lightbox {
    position: fixed;
    inset: 0;
    background: rgba(5, 8, 12, 0.95);
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
    border: 1px solid rgba(255, 255, 255, 0.1);

    img { max-width: 100%; max-height: 95vh; display: block; }
  }

  &__lightbox-caption {
    position: absolute;
    bottom: -24px;
    left: 0;
    color: rgba(255, 255, 255, 0.2);
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
  }
}

// === Animations ===
@keyframes sc-typing {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

// === Transitions ===
.sc-reader-fade-enter-active,
.sc-reader-fade-leave-active {
  transition: opacity 0.25s ease;
}

.sc-reader-fade-enter-from,
.sc-reader-fade-leave-to {
  opacity: 0;
}

.sc-reader-fade-enter-active .sc-article-reader {
  animation: sc-scale-in 0.25s ease-out;
}

@keyframes sc-scale-in {
  from { transform: scale(0.97); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.sc-reader-msg-enter-active {
  transition: all 0.4s ease;
}

.sc-reader-msg-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
</style>
