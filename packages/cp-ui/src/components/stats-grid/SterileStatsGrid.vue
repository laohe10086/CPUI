<template>
  <div class="sterile-stats">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="sterile-stats__item"
    >
      <span class="sterile-stats__value">{{ stat.value }}</span>
      <span class="sterile-stats__label">{{ stat.label }}</span>
      <span v-if="stat.trend" class="sterile-stats__trend" :class="`sterile-stats__trend--${stat.trend}`">
        <template v-if="stat.trend === 'up'">▲</template>
        <template v-else-if="stat.trend === 'down'">▼</template>
        <template v-else>◆</template>
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
.sterile-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.sterile-stats__item {
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
    border-color: var(--cp-border-bright);
  }
}

.sterile-stats__value {
  font-family: var(--cp-font-sans, 'Inter', sans-serif);
  font-size: 1.6em;
  font-weight: 700;
  color: var(--cp-text-primary);
}

.sterile-stats__label {
  font-family: var(--cp-font-sans, 'Inter', sans-serif);
  font-size: 0.75em;
  color: var(--cp-text-muted);
}

.sterile-stats__trend {
  font-family: var(--cp-font-sans, 'Inter', sans-serif);
  font-size: 0.7em;
  display: flex;
  align-items: center;
  gap: 3px;

  &--up { color: var(--cp-color-success); }
  &--down { color: var(--cp-color-danger); }
  &--stable { color: var(--cp-color-warning); }
}
</style>
