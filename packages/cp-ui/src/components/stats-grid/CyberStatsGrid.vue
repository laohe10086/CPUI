<template>
  <div class="stats-panel">
    <div
      v-for="(stat, index) in stats"
      :key="index"
      class="stat-box"
      :class="{
        'current-visitors': stat.highlight,
        'dynamic-item': stat.dynamic,
      }"
    >
      <h4>{{ stat.value }}</h4>
      <p>{{ stat.label }}</p>
      <div v-if="stat.dynamic" class="dynamic-indicator">
        <div class="pulse-dot" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StatsGridProps } from '../../types/components'

defineProps<StatsGridProps>()
</script>

<style scoped>
.stats-panel {
  margin-top: auto;
  border-top: 1px solid #333;
  padding-top: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-box {
  text-align: center;
  position: relative;
}

.stat-box h4 {
  color: var(--cp-yellow, #fce803);
  font-size: 1.5rem;
  font-family: 'Oswald', sans-serif;
  margin: 0;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(252, 232, 3, 0.5);
}

.stat-box p {
  color: #666;
  font-size: 0.7rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Share Tech Mono', monospace;
}

.stat-box.current-visitors h4 {
  color: var(--cp-blue, #00f0ff);
  text-shadow: 0 0 12px rgba(0, 240, 255, 0.6);
}

.stat-box.current-visitors p {
  color: rgba(0, 240, 255, 0.55);
}

.stat-box.current-visitors::after {
  content: '';
  position: absolute;
  top: 6px;
  right: 6px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--cp-blue, #00f0ff);
  box-shadow: 0 0 12px rgba(0, 240, 255, 0.85);
  animation: dotPulse 1.5s infinite;
}

.stat-box:hover h4 {
  color: var(--cp-blue, #00f0ff);
  text-shadow: 0 0 15px rgba(0, 240, 255, 0.8);
  transform: scale(1.05);
  transition: all 0.2s ease;
}

.stat-box:hover {
  transform: translateY(-2px);
  transition: all 0.2s ease;
}

.stat-box.dynamic-item {
  cursor: pointer;
}

.dynamic-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
}

.pulse-dot {
  width: 4px;
  height: 4px;
  background: var(--cp-blue, #00f0ff);
  border-radius: 50%;
  animation: dotPulse 1.5s infinite;
}

@keyframes dotPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

@media (max-width: 768px) {
  .stats-panel {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .stat-box h4 {
    font-size: 1.2rem;
  }

  .stat-box p {
    font-size: 0.6rem;
  }
}
</style>
