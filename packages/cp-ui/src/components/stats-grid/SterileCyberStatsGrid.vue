<template>
  <div class="sc-stats">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="sc-stats__item"
    >
      <span class="sc-stats__value">{{ stat.value }}</span>
      <span class="sc-stats__label">{{ stat.label }}</span>
      <span v-if="stat.trend" class="sc-stats__trend" :class="`sc-stats__trend--${stat.trend}`">
        <template v-if="stat.trend === 'up'">&#9650;</template>
        <template v-else-if="stat.trend === 'down'">&#9660;</template>
        <template v-else>&#9670;</template>
        <span v-if="stat.trendValue">{{ stat.trendValue }}</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StatsGridProps } from '../../types/components'

defineProps<StatsGridProps>()
</script>

<style lang="scss" scoped>
.sc-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.sc-stats__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 12px;
  background: var(--cp-bg-elevated);
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  transition: border-color var(--cp-duration-fast) var(--cp-easing);

  &:hover {
    border-color: var(--cp-color-secondary);
  }
}

.sc-stats__value {
  font-family: var(--cp-font-mono);
  font-size: 1.6em;
  font-weight: 700;
  color: var(--cp-color-primary);
  text-shadow: 0 0 8px var(--cp-glow-primary);
}

.sc-stats__label {
  font-family: var(--cp-font-mono);
  font-size: 0.75em;
  color: var(--cp-text-muted);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.sc-stats__trend {
  font-family: var(--cp-font-mono);
  font-size: 0.7em;
  display: flex;
  align-items: center;
  gap: 3px;

  &--up { color: var(--cp-color-success); }
  &--down { color: var(--cp-color-danger); }
  &--stable { color: var(--cp-color-warning); }
}
</style>
