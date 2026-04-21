<template>
  <div class="cyber-not-found">
    <!-- 四角装饰 -->
    <div class="cyber-not-found__corner cyber-not-found__corner--tl" />
    <div class="cyber-not-found__corner cyber-not-found__corner--tr" />
    <div class="cyber-not-found__corner cyber-not-found__corner--bl" />
    <div class="cyber-not-found__corner cyber-not-found__corner--br" />

    <!-- 扫描线覆盖层 -->
    <div class="cyber-not-found__scanline" />

    <div class="cyber-not-found__content">
      <!-- 猫咪图片 / 自定义 slot — 核心视觉 -->
      <div v-if="!$slots.media" class="cyber-not-found__cat" :class="{ 'cyber-not-found__cat--glitch': glitch }">
        <div class="cyber-not-found__cat-wrapper">
          <div v-if="glitch" class="cyber-not-found__cat-glitch-layer cyber-not-found__cat-glitch-layer--r">
            <img :src="resolvedImage" :alt="imageAlt" class="cyber-not-found__cat-img" />
          </div>
          <div v-if="glitch" class="cyber-not-found__cat-glitch-layer cyber-not-found__cat-glitch-layer--b">
            <img :src="resolvedImage" :alt="imageAlt" class="cyber-not-found__cat-img" />
          </div>
          <img :src="resolvedImage" :alt="imageAlt" class="cyber-not-found__cat-img" />
        </div>
      </div>
      <div v-else class="cyber-not-found__cat">
        <slot name="media" />
      </div>

      <!-- 错误码：缩小 + 霓虹黄 -->
      <div class="cyber-not-found__error-code">
        <span v-if="!glitch" class="cyber-not-found__error-code-text">{{ code }}</span>
        <CyberGlitchText v-else :text="code" tag="span" font-family="Oswald, sans-serif" :font-size="fontSize" :glitch-intensity="glitchIntensity" />
      </div>

      <!-- 标题 -->
      <h1 class="cyber-not-found__error-title">{{ title }}</h1>
      <!-- 描述 -->
      <p class="cyber-not-found__error-message">{{ description }}</p>

      <!-- 操作按钮 -->
      <div class="cyber-not-found__actions">
        <slot name="actions">
          <button class="cyber-not-found__home-btn" @click="$emit('home')">返回首页</button>
          <button class="cyber-not-found__back-btn" @click="$emit('back')">返回上页</button>
        </slot>
      </div>
    </div>

    <!-- 底部装饰条 -->
    <div class="cyber-not-found__bottom-bar">
      <span class="cyber-not-found__bar-line cyber-not-found__bar-line--left" />
      <span class="cyber-not-found__bar-label">ERROR_{{ code }}</span>
      <span class="cyber-not-found__bar-line cyber-not-found__bar-line--right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CyberGlitchText from '../glitch-text/CyberGlitchText.vue'
import defaultCat from './assets/cat.gif'

const props = withDefaults(defineProps<{
  code?: string
  title?: string
  description?: string
  imageSrc?: string
  imageAlt?: string
  glitch?: boolean
  glitchIntensity?: 'low' | 'medium' | 'high'
}>(), {
  code: '404',
  title: '页面未找到',
  description: '抱歉，您访问的页面不存在或已被移除。',
  imageSrc: '',
  imageAlt: '404',
  glitch: false,
  glitchIntensity: 'medium',
})

defineEmits<{
  home: []
  back: []
}>()

const fontSize = computed(() => '2.5rem')

const resolvedImage = computed(() => props.imageSrc || defaultCat)
</script>

<style lang="scss" scoped>
@keyframes glitch-cat-r {
  0%, 100% { clip-path: inset(0 0 80% 0); transform: translate(-8px, -3px); }
  25% { clip-path: inset(20% 0 50% 0); transform: translate(6px, 2px); }
  50% { clip-path: inset(50% 0 20% 0); transform: translate(-5px, 4px); }
  75% { clip-path: inset(70% 0 5% 0); transform: translate(7px, -2px); }
}

@keyframes glitch-cat-b {
  0%, 100% { clip-path: inset(70% 0 0 0); transform: translate(7px, 3px); }
  25% { clip-path: inset(40% 0 30% 0); transform: translate(-6px, -2px); }
  50% { clip-path: inset(10% 0 60% 0); transform: translate(5px, -4px); }
  75% { clip-path: inset(55% 0 15% 0); transform: translate(-8px, 2px); }
}

@keyframes neon-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes scanline-move {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

.cyber-not-found {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: 100%;
  background: #080808;
  overflow: hidden;

  /* ===== 扫描线覆盖 ===== */
  &__scanline {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.08) 2px,
      rgba(0, 0, 0, 0.08) 4px
    );
    pointer-events: none;
    z-index: 3;
  }

  /* ===== 四角装饰 ===== */
  &__corner {
    position: absolute;
    width: 30px;
    height: 30px;
    pointer-events: none;
    z-index: 2;

    &--tl {
      top: 0; left: 0;
      border-top: 3px solid var(--cp-color-primary);
      border-left: 3px solid var(--cp-color-primary);
    }
    &--tr {
      top: 0; right: 0;
      border-top: 3px solid var(--cp-color-primary);
      border-right: 3px solid var(--cp-color-primary);
    }
    &--bl {
      bottom: 36px; left: 0;
      border-bottom: 3px solid var(--cp-color-secondary);
      border-left: 3px solid var(--cp-color-secondary);
    }
    &--br {
      bottom: 36px; right: 0;
      border-bottom: 3px solid var(--cp-color-secondary);
      border-right: 3px solid var(--cp-color-secondary);
    }
  }

  /* ===== 主内容 ===== */
  &__content {
    text-align: center;
    z-index: 1;
    padding: 2rem;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* ===== 猫咪图片 — 核心视觉 ===== */
  &__cat {
    margin-bottom: 1.5rem;
    position: relative;
  }

  &__cat-wrapper {
    position: relative;
    display: inline-block;
  }

  &__cat-img {
    width: 260px;
    height: auto;
    filter: contrast(110%) brightness(1.05);
    position: relative;
    z-index: 1;
    animation: neon-pulse 3s ease-in-out infinite;
  }

  /* glitch 图片：RGB 色差偏移层 */
  &__cat-glitch-layer {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;

    img {
      width: 260px;
      height: auto;
      filter: contrast(110%) brightness(1.05);
    }

    &--r {
      img { filter: contrast(110%) brightness(1.05); opacity: 0.7; mix-blend-mode: screen; }
      animation: glitch-cat-r 1.8s infinite steps(3);
    }

    &--b {
      img { filter: contrast(110%) brightness(1.05); opacity: 0.7; mix-blend-mode: screen; }
      animation: glitch-cat-b 2s infinite steps(3);
    }
  }

  /* ===== 错误码 — 缩小 ===== */
  &__error-code {
    margin-bottom: 0.3rem;
  }

  &__error-code-text {
    font-family: 'Oswald', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: 3px;
    color: var(--cp-color-primary);
    text-shadow:
      0 0 10px rgba(255, 221, 0, 0.4),
      0 0 20px rgba(255, 221, 0, 0.15);
    text-transform: uppercase;
  }

  /* ===== 标题 ===== */
  &__error-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0 0 0.8rem;
    font-family: 'Oswald', sans-serif;
  }

  /* ===== 描述 ===== */
  &__error-message {
    font-size: 0.9rem;
    color: #666;
    line-height: 1.6;
    font-family: 'Share Tech Mono', monospace;
    margin: 0 0 2rem;
  }

  /* ===== 操作按钮 ===== */
  &__actions {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  &__home-btn {
    display: inline-block;
    padding: 10px 30px;
    background: #000;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    font-size: 0.9rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: 'Oswald', sans-serif;

    &:hover {
      background: var(--cp-color-primary);
      color: #000;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 221, 0, 0.3);
    }
  }

  &__back-btn {
    padding: 10px 30px;
    background: transparent;
    color: #fff;
    border: 2px solid var(--cp-color-primary);
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: 'Oswald', sans-serif;

    &:hover {
      background: var(--cp-color-primary);
      color: #000;
      box-shadow: 0 5px 15px rgba(255, 221, 0, 0.3);
      transform: translateY(-2px);
    }
  }

  /* ===== 底部装饰条 ===== */
  &__bottom-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 36px;
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    gap: 1rem;
    background: rgba(0, 0, 0, 0.6);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    z-index: 2;
  }

  &__bar-line {
    flex: 1;
    height: 1px;

    &--left {
      background: linear-gradient(90deg, var(--cp-color-primary), transparent);
    }
    &--right {
      background: linear-gradient(90deg, transparent, var(--cp-color-secondary));
    }
  }

  &__bar-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    color: #555;
    letter-spacing: 0.15em;
    white-space: nowrap;
  }

  /* ===== 响应式 ===== */
  @media (max-width: 768px) {
    &__error-code-text {
      font-size: 2rem;
    }

    &__cat-img,
    &__cat-glitch-layer img {
      width: 180px;
    }

    &__error-title {
      font-size: 1.1rem;
    }

    &__actions {
      flex-direction: column;
      gap: 1rem;
      width: 100%;
    }

    &__home-btn,
    &__back-btn {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
