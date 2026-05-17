<template>
  <div class="cyber-stats-grid" :class="{ 'cyber-stats-grid--scanline': scanline }">
    <div
      v-for="(stat, index) in stats"
      :key="index"
      class="cyber-stats-grid__cell"
      :class="{
        'cyber-stats-grid__cell--highlight': stat.highlight,
        'cyber-stats-grid__cell--dynamic': stat.dynamic,
      }"
    >
      <!-- 角装饰 -->
      <span class="cyber-stats-grid__corner cyber-stats-grid__corner--tl" />
      <span class="cyber-stats-grid__corner cyber-stats-grid__corner--tr" />
      <span class="cyber-stats-grid__corner cyber-stats-grid__corner--bl" />
      <span class="cyber-stats-grid__corner cyber-stats-grid__corner--br" />

      <!-- 趋势 -->
      <span
        v-if="stat.trend"
        class="cyber-stats-grid__trend"
        :class="`cyber-stats-grid__trend--${stat.trend}`"
      >
        {{ trendArrow(stat.trend) }}
        <span v-if="stat.trendValue" class="cyber-stats-grid__trend-value">{{ stat.trendValue }}</span>
      </span>

      <!-- 数值 -->
      <div class="cyber-stats-grid__value">
        <span class="cyber-stats-grid__digits">{{ stat.value }}</span>
      </div>

      <!-- 标签 -->
      <div class="cyber-stats-grid__label">
        <span class="cyber-stats-grid__bracket">[</span>
        {{ stat.label }}
        <span class="cyber-stats-grid__bracket">]</span>
      </div>

      <!-- 动态脉冲 -->
      <div v-if="stat.dynamic" class="cyber-stats-grid__pulse">
        <span class="cyber-stats-grid__pulse-dot" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StatsGridProps } from '../../types/components'

const props = withDefaults(defineProps<StatsGridProps & { scanline?: boolean }>(), {
  scanline: false,
})

function trendArrow(trend: string) {
  const map: Record<string, string> = {
    up: '▲',
    down: '▼',
    stable: '—',
  }
  return map[trend] || ''
}
</script>

<style lang="scss" scoped>
.cyber-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--cp-border-dim, rgba(255,255,255,0.06));
  position: relative;

  &--scanline::after {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 240, 255, 0.02) 2px,
      rgba(0, 240, 255, 0.02) 4px
    );
    pointer-events: none;
    z-index: 2;
  }

  &__cell {
    position: relative;
    padding: 1.2rem 1rem;
    background: var(--cp-bg-panel, rgba(10,10,15,0.8));
    text-align: center;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(0, 240, 255, 0.04);
    }
  }

  // 角装饰
  &__corner {
    position: absolute;
    width: 8px;
    height: 8px;
    pointer-events: none;

    &--tl {
      top: 4px;
      left: 4px;
      border-top: 1px solid var(--cp-border-base, #333);
      border-left: 1px solid var(--cp-border-base, #333);
    }
    &--tr {
      top: 4px;
      right: 4px;
      border-top: 1px solid var(--cp-border-base, #333);
      border-right: 1px solid var(--cp-border-base, #333);
    }
    &--bl {
      bottom: 4px;
      left: 4px;
      border-bottom: 1px solid var(--cp-border-base, #333);
      border-left: 1px solid var(--cp-border-base, #333);
    }
    &--br {
      bottom: 4px;
      right: 4px;
      border-bottom: 1px solid var(--cp-border-base, #333);
      border-right: 1px solid var(--cp-border-base, #333);
    }
  }

  // 趋势
  &__trend {
    position: absolute;
    top: 8px;
    right: 10px;
    font-size: 0.65rem;
    font-family: var(--cp-font-mono, monospace);
    letter-spacing: 0.05em;

    &--up {
      color: var(--cp-green, #00ff41);
      text-shadow: 0 0 6px rgba(0, 255, 65, 0.4);
    }
    &--down {
      color: var(--cp-red, #ff003c);
      text-shadow: 0 0 6px rgba(255, 0, 60, 0.4);
    }
    &--stable {
      color: var(--cp-text-dim, #555);
    }
  }

  &__trend-value {
    margin-left: 2px;
    opacity: 0.8;
  }

  // 数值
  &__value {
    margin-bottom: 0.3rem;
  }

  &__digits {
    color: var(--cp-color-primary, #fce803);
    font-size: 1.6rem;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    text-shadow:
      0 0 10px rgba(252, 232, 3, 0.4),
      0 0 30px rgba(252, 232, 3, 0.1);
    letter-spacing: 0.02em;
  }

  // 高亮项（动态数据）用青色
  &__cell--highlight &__digits {
    color: var(--cp-color-secondary, #00f0ff);
    text-shadow:
      0 0 10px rgba(0, 240, 255, 0.5),
      0 0 30px rgba(0, 240, 255, 0.15);
    animation: stats-pulse 2s ease-in-out infinite;
  }

  // 标签
  &__label {
    color: var(--cp-text-muted, #666);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-family: var(--cp-font-mono, 'Share Tech Mono', monospace);
  }

  &__bracket {
    color: var(--cp-border-bright, #444);
    opacity: 0.6;
  }

  // 动态脉冲
  &__pulse {
    position: absolute;
    bottom: 8px;
    right: 10px;
  }

  &__pulse-dot {
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--cp-color-secondary, #00f0ff);
    box-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
    animation: stats-dot-pulse 1.8s ease-in-out infinite;
  }
}

@keyframes stats-pulse {
  0%, 100% {
    opacity: 1;
    text-shadow: 0 0 10px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.15);
  }
  50% {
    opacity: 0.85;
    text-shadow: 0 0 16px rgba(0, 240, 255, 0.7), 0 0 40px rgba(0, 240, 255, 0.25);
  }
}

@keyframes stats-dot-pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.4);
  }
}

@media (max-width: 768px) {
  .cyber-stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
