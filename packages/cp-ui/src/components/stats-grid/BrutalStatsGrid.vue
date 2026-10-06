<template>
  <div class="brutal-stats-grid">
    <div
      v-for="(stat, index) in stats"
      :key="index"
      class="brutal-stats-grid__cell"
      :class="{
        'brutal-stats-grid__cell--highlight': stat.highlight,
      }"
    >
      <span
        v-if="stat.trend"
        class="brutal-stats-grid__trend"
        :class="`brutal-stats-grid__trend--${stat.trend}`"
      >
        {{ trendArrow(stat.trend) }}
        <span v-if="stat.trendValue" class="brutal-stats-grid__trend-value">{{ stat.trendValue }}</span>
      </span>

      <div class="brutal-stats-grid__value">
        <span class="brutal-stats-grid__digits">{{ stat.value }}</span>
      </div>

      <div class="brutal-stats-grid__label">
        [ {{ stat.label }} ]
      </div>
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
.brutal-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  background: var(--cp-border-base);

  &__cell {
    position: relative;
    padding: 1.2rem 1rem;
    background: var(--cp-bg-panel);
    border: 2px solid var(--cp-border-base);
    text-align: center;
    transition: all 0.15s ease;

    &:hover {
      background: var(--cp-text-primary);
      
      .brutal-stats-grid__digits {
        color: var(--cp-bg-base);
      }
      .brutal-stats-grid__label {
        color: var(--cp-bg-base);
      }
    }

    &--highlight {
      border-color: var(--cp-color-primary);
    }
  }

  &__trend {
    position: absolute;
    top: 8px;
    right: 8px;
    font-family: var(--cp-font-mono);
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 4px;
    letter-spacing: 1px;

    &--up { color: var(--cp-color-secondary); }
    &--down { color: var(--cp-color-danger); }
    &--stable { color: var(--cp-text-muted); }
  }

  &__trend-value {
    font-size: 10px;
  }

  &__value {
    margin-bottom: 0.5rem;
  }

  &__digits {
    font-family: var(--cp-font-mono);
    font-size: 2rem;
    font-weight: 700;
    color: var(--cp-text-primary);
    line-height: 1;
    letter-spacing: 2px;
  }

  &__label {
    font-family: var(--cp-font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--cp-text-primary);
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }
}
</style>
