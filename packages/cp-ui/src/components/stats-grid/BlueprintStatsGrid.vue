<template>
  <div class="blueprint-stats-grid">
    <div
      v-for="(stat, index) in stats"
      :key="index"
      class="blueprint-stats-grid__cell"
      :class="{
        'blueprint-stats-grid__cell--highlight': stat.highlight,
      }"
    >
      <div class="blueprint-stats-grid__corner blueprint-stats-grid__corner--tl" />
      <div class="blueprint-stats-grid__corner blueprint-stats-grid__corner--tr" />
      <div class="blueprint-stats-grid__corner blueprint-stats-grid__corner--bl" />
      <div class="blueprint-stats-grid__corner blueprint-stats-grid__corner--br" />

      <span
        v-if="stat.trend"
        class="blueprint-stats-grid__trend"
        :class="`blueprint-stats-grid__trend--${stat.trend}`"
      >
        {{ trendArrow(stat.trend) }}
        <span v-if="stat.trendValue" class="blueprint-stats-grid__trend-value">{{ stat.trendValue }}</span>
      </span>

      <div class="blueprint-stats-grid__value">
        <span class="blueprint-stats-grid__digits">{{ stat.value }}</span>
      </div>

      <div class="blueprint-stats-grid__label">
        FIG.{{ String(index + 1).padStart(2, '0') }} · {{ stat.label }}
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
.blueprint-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--cp-border-base);

  &__cell {
    position: relative;
    padding: 1.2rem 1rem;
    background: var(--cp-bg-panel);
    border: 1px solid var(--cp-border-base);
    text-align: center;
    transition: all 0.2s ease;
    background-image: 
      linear-gradient(var(--cp-border-dim) 1px, transparent 1px),
      linear-gradient(90deg, var(--cp-border-dim) 1px, transparent 1px);
    background-size: 10px 10px;

    &:hover {
      border-color: var(--cp-color-primary);
    }

    &--highlight {
      border-color: var(--cp-color-secondary);
    }
  }

  &__corner {
    position: absolute;
    width: 8px;
    height: 8px;
    
    &--tl { 
      top: -1px; 
      left: -1px; 
      border-top: 2px solid var(--cp-color-primary); 
      border-left: 2px solid var(--cp-color-primary); 
    }
    &--tr { 
      top: -1px; 
      right: -1px; 
      border-top: 2px solid var(--cp-color-primary); 
      border-right: 2px solid var(--cp-color-primary); 
    }
    &--bl { 
      bottom: -1px; 
      left: -1px; 
      border-bottom: 2px solid var(--cp-color-primary); 
      border-left: 2px solid var(--cp-color-primary); 
    }
    &--br { 
      bottom: -1px; 
      right: -1px; 
      border-bottom: 2px solid var(--cp-color-primary); 
      border-right: 2px solid var(--cp-color-primary); 
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

    &--up { color: var(--cp-color-secondary); }
    &--down { color: var(--cp-color-danger); }
    &--stable { color: var(--cp-text-muted); }
  }

  &__trend-value {
    font-size: 10px;
    opacity: 0.8;
  }

  &__value {
    margin-bottom: 0.5rem;
  }

  &__digits {
    font-family: var(--cp-font-mono);
    font-size: 2rem;
    font-weight: 600;
    color: var(--cp-color-primary);
    line-height: 1;
  }

  &__label {
    font-family: var(--cp-font-mono);
    font-size: 0.75rem;
    color: var(--cp-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
}
</style>
