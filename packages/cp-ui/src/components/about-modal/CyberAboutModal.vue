<template>
  <Transition name="cyber-about-modal-fade">
    <div v-if="visible" class="cyber-about-modal__overlay" @click.self="$emit('close')">
      <div class="cyber-about-modal">
        <!-- 装饰性边角 -->
        <div class="cyber-about-modal__corner cyber-about-modal__corner--tl" />
        <div class="cyber-about-modal__corner cyber-about-modal__corner--tr" />
        <div class="cyber-about-modal__corner cyber-about-modal__corner--bl" />
        <div class="cyber-about-modal__corner cyber-about-modal__corner--br" />

        <!-- 头部 -->
        <div class="cyber-about-modal__header">
          <div class="cyber-about-modal__header-title">
            <span class="cyber-about-modal__blink">&gt;&gt;</span> {{ headerTitle }}
          </div>
          <div class="cyber-about-modal__close" @click="$emit('close')">&times;</div>
        </div>

        <!-- 主体 -->
        <div class="cyber-about-modal__body">
          <div class="cyber-about-modal__layout">
            <!-- 左侧头像区 -->
            <div class="cyber-about-modal__visual">
              <div class="cyber-about-modal__avatar-frame">
                <img
                  v-if="avatar && !imgError"
                  :src="avatar"
                  alt="Profile"
                  class="cyber-about-modal__avatar-img"
                  @error="imgError = true"
                />
                <span v-else class="cyber-about-modal__avatar-fallback">?</span>
                <div class="cyber-about-modal__scan-line" />
              </div>
              <div v-if="id" class="cyber-about-modal__id-badge">ID: {{ id }}</div>
            </div>

            <!-- 右侧信息区 -->
            <div class="cyber-about-modal__data">
              <div class="cyber-about-modal__main-info">
                <h1 class="cyber-about-modal__username">
                  {{ nickname }}
                  <span v-if="role" class="cyber-about-modal__role-tag">{{ role }}</span>
                </h1>
                <div class="cyber-about-modal__status-row">
                  <span class="cyber-about-modal__status-dot" />
                  <span class="cyber-about-modal__status-text">{{ statusText }}</span>
                </div>
              </div>

              <!-- 数据网格 -->
              <div v-if="dataItems.length" class="cyber-about-modal__data-grid">
                <div v-for="item in dataItems" :key="item.label" class="cyber-about-modal__data-item">
                  <span class="cyber-about-modal__data-label">{{ item.label }}</span>
                  <span class="cyber-about-modal__data-value">{{ item.value }}</span>
                </div>
              </div>

              <div class="cyber-about-modal__divider" />

              <!-- 技术栈 -->
              <div v-if="techStack.length" class="cyber-about-modal__section">
                <div class="cyber-about-modal__section-header">&gt;&gt; {{ techTitle }}</div>
                <div class="cyber-about-modal__skill-tags">
                  <span v-for="tech in techStack" :key="tech" class="cyber-about-modal__skill-tag">{{ tech }}</span>
                </div>
              </div>

              <!-- 使命宣言 -->
              <div v-if="mission.length" class="cyber-about-modal__section">
                <div class="cyber-about-modal__section-header">&gt;&gt; {{ missionTitle }}</div>
                <p class="cyber-about-modal__bio-text">
                  <template v-for="(line, idx) in mission" :key="idx">
                    &gt; {{ line }}<br v-if="idx < mission.length - 1" />
                  </template>
                </p>
              </div>

              <!-- 联络链接 -->
              <div v-if="contacts.length" class="cyber-about-modal__section">
                <div class="cyber-about-modal__section-header">&gt;&gt; {{ contactTitle }}</div>
                <div class="cyber-about-modal__contact-links">
                  <a
                    v-for="link in contacts"
                    :key="link.label"
                    :href="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="cyber-about-modal__link-item"
                    :class="`cyber-about-modal__link-item--${link.type || 'default'}`"
                  >
                    <span v-if="link.icon" class="cyber-about-modal__link-icon" v-html="link.icon" />
                    <span>{{ link.label }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部 -->
        <div class="cyber-about-modal__footer">
          <div class="cyber-about-modal__footer-deco">{{ footerText }}</div>
          <button class="cyber-about-modal__confirm-btn" @click="$emit('close')">{{ confirmText }}</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface AboutDataItem {
  label: string
  value: string
}

export interface AboutContactLink {
  label: string
  url: string
  type?: string
  icon?: string
}

withDefaults(defineProps<{
  visible: boolean
  avatar?: string
  nickname?: string
  id?: string
  role?: string
  statusText?: string
  headerTitle?: string
  dataItems?: AboutDataItem[]
  techStack?: string[]
  techTitle?: string
  mission?: string[]
  missionTitle?: string
  contacts?: AboutContactLink[]
  contactTitle?: string
  footerText?: string
  confirmText?: string
}>(), {
  avatar: '',
  nickname: 'GUEST',
  id: '',
  role: '',
  statusText: '系统在线 // 神经连接活跃',
  headerTitle: '用户档案 // [访问授权]',
  dataItems: () => [],
  techStack: () => [],
  techTitle: '技术栈模块 // TECH_STACK',
  mission: () => [],
  missionTitle: '使命宣言 // MISSION',
  contacts: () => [],
  contactTitle: '联络协议 // CONTACT',
  footerText: '加密连接已建立_V2.0 // ENCRYPTED',
  confirmText: '确 认',
})

defineEmits<{
  close: []
}>()

const imgError = ref(false)
</script>

<style lang="scss" scoped>
.cyber-about-modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cyber-about-modal {
  width: 800px;
  max-width: 90vw;
  background-color: rgba(15, 15, 20, 0.95);
  border: 1px solid #333;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__corner {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid var(--cp-color-primary);
    z-index: 10;

    &--tl { top: 0; left: 0; border-right: none; border-bottom: none; }
    &--tr { top: 0; right: 0; border-left: none; border-bottom: none; }
    &--bl { bottom: 0; left: 0; border-right: none; border-top: none; }
    &--br { bottom: 0; right: 0; border-left: none; border-top: none; }
  }

  &__header {
    background: linear-gradient(90deg, rgba(255, 215, 0, 0.1), transparent);
    padding: 15px 20px;
    border-bottom: 1px solid #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__header-title {
    color: var(--cp-color-primary);
    font-weight: bold;
    font-family: 'Share Tech Mono', monospace;
    font-size: 1.2rem;
    letter-spacing: 2px;
  }

  &__blink {
    animation: cam-blink 1s infinite;
  }

  &__close {
    color: #666;
    font-size: 1.5rem;
    cursor: pointer;
    line-height: 1;
    transition: color 0.3s;

    &:hover { color: var(--cp-color-danger); }
  }

  &__body {
    padding: 30px;
    color: #ccc;
    font-family: 'Share Tech Mono', sans-serif;
  }

  &__layout {
    display: flex;
    gap: 30px;
  }

  &__visual {
    width: 200px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__avatar-frame {
    width: 100%;
    aspect-ratio: 1;
    border: 2px solid var(--cp-color-secondary);
    position: relative;
    overflow: hidden;
  }

  &__avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.3s;

    .cyber-about-modal__avatar-frame:hover & {
      filter: brightness(1.1);
    }
  }

  &__avatar-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 4rem;
    color: #333;
  }

  &__scan-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgba(0, 255, 255, 0.5);
    box-shadow: 0 0 5px rgba(0, 255, 255, 0.8);
    animation: cam-scan 3s linear infinite;
  }

  &__id-badge {
    background-color: #111;
    border: 1px solid #333;
    color: #666;
    text-align: center;
    padding: 5px;
    font-size: 0.8rem;
    letter-spacing: 2px;
  }

  &__data { flex-grow: 1; }

  &__main-info { margin-bottom: 20px; }

  &__username {
    font-size: 2.5rem;
    color: #fff;
    margin: 0 0 5px 0;
    font-family: 'Oswald', sans-serif;
    display: flex;
    align-items: center;
    gap: 15px;
  }

  &__role-tag {
    font-size: 0.9rem;
    background: var(--cp-color-danger);
    color: #000;
    padding: 2px 8px;
    border-radius: 2px;
    font-weight: bold;
    vertical-align: middle;
  }

  &__status-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__status-dot {
    width: 10px;
    height: 10px;
    background-color: #0f0;
    border-radius: 50%;
    box-shadow: 0 0 10px #0f0;
    animation: cam-pulse 2s infinite;
  }

  &__status-text {
    color: #0f0;
    font-size: 0.8rem;
  }

  &__data-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
  }

  &__data-item {
    background: rgba(255, 255, 255, 0.05);
    padding: 10px;
    border-left: 2px solid var(--cp-color-secondary);
  }

  &__data-label {
    display: block;
    font-size: 0.7rem;
    color: #888;
    margin-bottom: 4px;
  }

  &__data-value {
    display: block;
    color: var(--cp-color-secondary);
    font-weight: bold;
    font-size: 1.1rem;
  }

  &__divider {
    height: 1px;
    background: #333;
    margin: 20px 0;
  }

  &__section { margin-bottom: 20px; }

  &__section-header {
    color: var(--cp-color-primary);
    margin: 0 0 10px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  &__skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  &__skill-tag {
    background: rgba(255, 215, 0, 0.1);
    border: 1px solid var(--cp-color-primary);
    color: var(--cp-color-primary);
    padding: 4px 12px;
    font-size: 0.85rem;
    cursor: default;
    transition: all 0.3s;

    &:hover {
      background: var(--cp-color-primary);
      color: #000;
      box-shadow: 0 0 10px var(--cp-color-primary);
    }
  }

  &__bio-text {
    line-height: 1.6;
    color: #aaa;
    background: rgba(0, 0, 0, 0.3);
    padding: 10px;
    border-left: 2px solid #666;
    margin: 0;
  }

  &__contact-links {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }

  &__link-item {
    color: #fff;
    text-decoration: none;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.9rem;

    &:hover {
      border-color: var(--cp-color-secondary);
      background: rgba(0, 240, 255, 0.1);
      color: var(--cp-color-secondary);
      box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
      transform: translateY(-2px);
    }

    &--github:hover {
      border-color: #fff;
      color: #fff;
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
    }

    &--email:hover {
      border-color: var(--cp-color-primary);
      color: var(--cp-color-primary);
      box-shadow: 0 0 15px rgba(252, 232, 3, 0.3);
    }

    &--bilibili:hover {
      border-color: #ff6699;
      color: #ff6699;
      box-shadow: 0 0 15px rgba(255, 102, 153, 0.3);
    }
  }

  &__link-icon {
    :deep(svg) { width: 18px; height: 18px; }
  }

  &__footer {
    border-top: 1px solid #333;
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1a1a1a;
  }

  &__footer-deco {
    font-size: 0.7rem;
    color: #444;
    text-transform: uppercase;
  }

  &__confirm-btn {
    background: transparent;
    border: 1px solid var(--cp-color-primary);
    color: var(--cp-color-primary);
    padding: 8px 25px;
    font-family: 'Share Tech Mono', monospace;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: bold;
    letter-spacing: 1px;

    &:hover {
      background: var(--cp-color-primary);
      color: #000;
      box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
    }
  }
}

@keyframes cam-scan {
  0% { top: -5%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 105%; opacity: 0; }
}

@keyframes cam-pulse {
  0% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7); }
  70% { box-shadow: 0 0 0 5px rgba(0, 255, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0); }
}

@keyframes cam-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.cyber-about-modal-fade-enter-active,
.cyber-about-modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.cyber-about-modal-fade-enter-from,
.cyber-about-modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .cyber-about-modal__layout {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .cyber-about-modal__visual {
    width: 150px;
  }

  .cyber-about-modal__data-grid {
    grid-template-columns: 1fr 1fr;
  }

  .cyber-about-modal__status-row {
    justify-content: center;
  }

  .cyber-about-modal__skill-tags {
    justify-content: center;
  }

  .cyber-about-modal__bio-text {
    text-align: left;
  }
}
</style>
