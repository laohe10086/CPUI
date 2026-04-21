<template>
  <Teleport to="body">
    <Transition name="sterile-reader-fade">
      <div v-if="visible" class="sterile-article-reader__overlay" @click.self="$emit('close')">
        <div class="sterile-article-reader">

          <!-- Header -->
          <div class="sterile-article-reader__header">
            <span class="sterile-article-reader__header-title">{{ titleText }}</span>
            <button class="sterile-article-reader__close-btn" @click="$emit('close')">&times;</button>
          </div>

          <!-- Body -->
          <div class="sterile-article-reader__body" ref="bodyRef" @scroll="handleScroll">
            <div class="sterile-article-reader__content">

              <!-- Meta section -->
              <div class="sterile-article-reader__meta-card" v-if="metaItems.length">
                <div class="sterile-article-reader__meta-row" v-for="item in metaItems" :key="item.label">
                  <span class="sterile-article-reader__meta-label">{{ item.label }}</span>
                  <span class="sterile-article-reader__meta-value">{{ item.value }}</span>
                </div>
                <div class="sterile-article-reader__meta-footer">
                  <span>{{ metaTimestamp }}</span>
                </div>
              </div>

              <!-- Messages -->
              <TransitionGroup name="sterile-msg">
                <div
                  v-for="(msg, index) in messages"
                  :key="index"
                  class="sterile-article-reader__bubble"
                  :class="{ 'sterile-article-reader__bubble--right': msg.role === 'author' }"
                >
                  <div v-if="msg.role === 'author'" class="sterile-article-reader__avatar">
                    <img v-if="authorAvatar && !avatarError" :src="authorAvatar" alt="avatar" @error="avatarError = true" />
                    <div v-else class="sterile-article-reader__avatar-fallback">
                      <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                    </div>
                  </div>

                  <div class="sterile-article-reader__bubble-card">
                    <div v-if="msg.type === 'image'" class="sterile-article-reader__msg-image" @click="$emit('preview-image', msg.content)">
                      <img :src="msg.content" alt="image" />
                    </div>
                    <div v-else class="sterile-article-reader__msg-text">{{ msg.content }}</div>
                    <div class="sterile-article-reader__bubble-footer">
                      <span>{{ msg.time }}</span>
                    </div>
                  </div>
                </div>
              </TransitionGroup>

              <div v-if="loading" class="sterile-article-reader__typing">
                <span class="sterile-article-reader__typing-dot" />
                <span class="sterile-article-reader__typing-dot" />
                <span class="sterile-article-reader__typing-dot" />
              </div>
              <div class="sterile-article-reader__spacer" />
            </div>
          </div>

          <!-- New message hint -->
          <Transition name="sterile-reader-fade">
            <div v-if="hasNewMessages" class="sterile-article-reader__new-hint" @click="scrollToBottom">
              New messages &darr;
            </div>
          </Transition>
        </div>

        <!-- Lightbox -->
        <Transition name="sterile-reader-fade">
          <div v-if="previewUrl" class="sterile-article-reader__lightbox" @click="previewUrl = ''">
            <div class="sterile-article-reader__lightbox-content">
              <img :src="previewUrl" />
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
  metaTimestamp?: string
  footerText?: string
  authorAvatar?: string
  authorId?: string
}>(), {
  messages: () => [],
  metaItems: () => [],
  loading: false,
  titleText: 'Article',
  metaTimestamp: '',
  footerText: '',
  authorAvatar: '',
  authorId: 'Author',
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
.sterile-article-reader__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.sterile-article-reader {
  width: 100%;
  max-width: 900px;
  height: 90vh;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  font-family: var(--cp-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);

  // === Header ===
  &__header {
    height: 44px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.25rem;
    flex-shrink: 0;
  }

  &__header-title {
    font-size: 0.9rem;
    font-weight: 500;
    color: #333;
  }

  &__close-btn {
    background: none;
    border: none;
    color: #999;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 3px;
    transition: all 0.15s;

    &:hover {
      color: #333;
      background: #eee;
    }
  }

  // === Body ===
  &__body {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    scrollbar-width: thin;
    scrollbar-color: #ddd transparent;

    &::-webkit-scrollbar { width: 5px; background: transparent; }
    &::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
  }

  &__content { min-height: 100%; }

  // === Meta card ===
  &__meta-card {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
  }

  &__meta-row {
    display: flex;
    gap: 8px;
    padding: 0.25rem 0;
    font-size: 0.8rem;
    color: #555;
  }

  &__meta-label {
    color: #999;
    min-width: 60px;
  }

  &__meta-footer {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid #f0f0f0;
    font-size: 0.7rem;
    color: #bbb;
  }

  // === Bubble ===
  &__bubble {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1rem;

    &--right {
      flex-direction: row-reverse;
      justify-content: flex-start;
    }
  }

  // === Avatar ===
  &__avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    border: 1px solid #e0e0e0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__avatar-fallback {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f0f0;
    color: #bbb;
  }

  // === Bubble card ===
  &__bubble-card {
    max-width: 70%;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    padding: 0.75rem 1rem;

    .sterile-article-reader__bubble--right & {
      background: #f0f0f0;
    }
  }

  &__msg-text {
    font-size: 0.85rem;
    line-height: 1.65;
    color: #333;
    word-break: break-word;
  }

  &__msg-image {
    display: inline-block;
    max-width: 100%;
    cursor: zoom-in;

    img {
      max-width: 100%;
      height: auto;
      display: block;
      border-radius: 2px;
    }
  }

  &__bubble-footer {
    margin-top: 0.5rem;
    font-size: 0.65rem;
    color: #bbb;
  }

  // === Typing ===
  &__typing {
    padding: 0.5rem 0;
    display: flex;
    justify-content: flex-end;
    gap: 4px;
  }

  &__typing-dot {
    width: 5px;
    height: 5px;
    background: #ccc;
    border-radius: 50%;
    animation: sterile-typing 1.4s infinite;

    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }

  &__spacer { height: 1rem; }

  // === New message hint ===
  &__new-hint {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    color: #666;
    padding: 5px 16px;
    font-size: 0.75rem;
    cursor: pointer;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.15s;

    &:hover {
      background: #f5f5f5;
      color: #333;
    }
  }

  // === Lightbox ===
  &__lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 100000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: zoom-out;
  }

  &__lightbox-content {
    max-width: 95vw;
    max-height: 95vh;

    img {
      max-width: 100%;
      max-height: 95vh;
      display: block;
      border-radius: 3px;
    }
  }
}

// === Animations ===
@keyframes sterile-typing {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.sterile-reader-fade-enter-active,
.sterile-reader-fade-leave-active {
  transition: opacity 0.2s ease;
}

.sterile-reader-fade-enter-from,
.sterile-reader-fade-leave-to {
  opacity: 0;
}

.sterile-msg-enter-active {
  transition: opacity 0.3s ease;
}

.sterile-msg-enter-from {
  opacity: 0;
}
</style>
