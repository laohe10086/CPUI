<template>
  <div class="noir-stats-grid">
    <div
      v-for="(stat, index) in stats"
      :key="index"
      class="noir-stats-grid__cell"
      :class="{
        'noir-stats-grid__cell--highlight': stat.highlight,
        'noir-stats-grid__cell--dynamic': stat.dynamic,
      }"
    >
      <span
        v-if="stat.trend"
        class="noir-stats-grid__trend"
        :class="`noir-stats-grid__trend--${stat.trend}`"
      >
        {{ trendArrow(stat.trend) }}
        <span v-if="stat.trendValue" class="noir-stats-grid__trend-value">{{ stat.trendValue }}</span>
      </span>

      <div class="noir-stats-grid__value">
        <span class="noir-stats-grid__digits">{{ stat.value }}</span>
      </div>

      <div class="noir-stats-grid__label">
        {{ stat.label }}
      </div>

      <div v-if="stat.dynamic" class="noir-stats-grid__pulse" />
      <div class="noir-stats-grid__glow" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StatsGridProps } from '../../types/components'

const props = defineProps<StatsGridProps>()

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
.noir-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  background: var(--cp-bg-base);

  &__cell {
    position: relative;
    padding: 1.2rem 1rem;
    background: var(--cp-bg-panel);
    border: 2px solid var(--cp-color-primary);
    clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
    text-align: center;
    transition: all 0.2s ease;
    overflow: hidden;

    &:hover {
      border-color: var(--cp-color-secondary);
      box-shadow: 
        0 0 20px var(--cp-glow-primary),
        inset 0 0 30px rgba(0, 240, 255, 0.1);
    }

    &--highlight {
      box-shadow: 0 0 15px var(--cp-glow-secondary);
    }

    &--dynamic {
      animation: noir-stats-pulse 2s ease-in-out infinite;
    }
  }

  &__trend {
    position: absolute;
    top: 8px;
    right: 8px;
    font-family: var(--cp-font-mono);
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 4px;

    &--up { 
      color: var(--cp-color-secondary); 
      text-shadow: 0 0 8px var(--cp-glow-secondary);
    }
    &--down { 
      color: var(--cp-color-danger); 
      text-shadow: 0 0 8px rgba(255, 51, 51, 0.5);
    }
    &--stable { color: var(--cp-text-muted); }
  }

  &__trend-value {
    font-size: 10px;
  }

  &__value {
    margin-bottom: 0.5rem;
    position: relative;
    z-index: 1;
  }

  &__digits {
    font-family: var(--cp-font-display);
    font-size: 2rem;
    font-weight: 600;
    color: var(--cp-color-primary);
    text-shadow: 0 0 15px var(--cp-glow-primary);
    line-height: 1;
  }

  &__label {
    font-family: var(--cp-font-mono);
    font-size: 0.75rem;
    color: var(--cp-color-secondary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: underline;
    text-decoration-color: var(--cp-color-secondary);
    text-underline-offset: 2px;
    position: relative;
    z-index: 1;
  }

  &__pulse {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 6px;
    height: 6px;
    background: var(--cp-color-primary);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--cp-glow-primary);
    animation: noir-pulse-dot 1.5s ease-in-out infinite;
  }

  &__glow {
    position: absolute;
    inset: -2px;
    background: radial-gradient(circle at 50% 0%, var(--cp-color-primary) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;

    .noir-stats-grid__cell:hover & {
      opacity: 0.2;
    }
  }
}

@keyframes noir-stats-pulse {
  0%, 100% { 
    border-color: var(--cp-color-primary);
    box-shadow: 0 0 10px var(--cp-glow-primary);
  }
  50% { 
    border-color: var(--cp-color-secondary);
    box-shadow: 0 0 20px var(--cp-glow-secondary);
  }
}

@keyframes noir-pulse-dot {
  0%, 100% { 
    opacity: 1; 
    transform: scale(1);
  }
  50% { 
    opacity: 0.3; 
    transform: scale(1.3);
  }
}
</style>
