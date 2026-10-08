<template>
  <div class="cyber-avatar" :class="[`cyber-avatar--${size}`, { 'cyber-avatar--loading': loading, 'cyber-avatar--cut': shape === 'cut', 'cyber-avatar--irregular': shape === 'irregular', 'cyber-avatar--regular': shape === 'regular' }]">
    <div class="cyber-avatar__frame">
      <div class="cyber-avatar__inner">
        <img
          v-if="src && !hasError"
          :src="src"
          :alt="alt"
          class="cyber-avatar__img"
          @error="hasError = true"
        />
        <span v-else-if="fallbackIcon" class="cyber-avatar__fallback">{{ fallbackIcon }}</span>
        <div v-if="scanline" class="cyber-avatar__scanline" />
      </div>
    </div>
    <span v-if="id" class="cyber-avatar__id">{{ id }}</span>
    <CpStatusLed
      v-if="status"
      :status="status"
      :pulse="statusPulse"
      size="sm"
      class="cyber-avatar__status"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AvatarProps } from '../../types/components'
import CpStatusLed from '../status-led/CpStatusLed.vue'

withDefaults(defineProps<AvatarProps>(), {
  src: '',
  alt: '',
  size: 'md',
  loading: false,
  scanline: false,
  id: '',
  status: undefined,
  statusPulse: false,
  fallbackIcon: '',
  shape: 'regular',
})

const hasError = ref(false)
</script>

<style lang="scss" scoped>
.cyber-avatar {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  &--sm .cyber-avatar__frame { width: 32px; height: 32px; }
  &--md .cyber-avatar__frame { width: 48px; height: 48px; }
  &--lg .cyber-avatar__frame { width: 64px; height: 64px; }

  &--cut {
    .cyber-avatar__frame,
    .cyber-avatar__inner {
      clip-path: var(--cp-cut-corner-sm);
    }
  }
  &--irregular {
    .cyber-avatar__frame,
    .cyber-avatar__inner {
      clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    }
  }
}

.cyber-avatar__frame {
  position: relative;
  width: 48px;
  height: 48px;
  background: var(--cp-color-secondary);
  transition: filter var(--cp-duration-fast) var(--cp-easing), transform var(--cp-duration-fast) var(--cp-easing), background var(--cp-duration-fast) var(--cp-easing);

  .cyber-avatar--loading & {
    background: var(--cp-text-muted);
    animation: cyber-avatar-load 1s linear infinite;
  }

  &:hover {
    transform: translateY(-2px);
    filter: drop-shadow(0 0 8px var(--cp-glow-secondary));
  }
}

.cyber-avatar__inner {
  position: absolute;
  inset: 2px;
  overflow: hidden;
  background: var(--cp-bg-elevated);
}

.cyber-avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cyber-avatar__fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--cp-bg-elevated);
  color: var(--cp-color-primary);
  font-family: var(--cp-font-mono);
  font-size: 1.2em;
  font-weight: 700;
  letter-spacing: 1px;
}

.cyber-avatar__scanline {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    transparent 0%,
    rgba(0, 240, 255, 0.06) 50%,
    transparent 100%
  );
  background-size: 100% 8px;
  animation: cyber-scanline-sweep 3s linear infinite;
  pointer-events: none;
}

.cyber-avatar__id {
  font-family: var(--cp-font-mono);
  font-size: 0.65em;
  color: var(--cp-text-muted);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.cyber-avatar__status {
  position: absolute;
  top: -2px;
  right: -2px;
}

@keyframes cyber-avatar-load {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

@keyframes cyber-scanline-sweep {
  0% { background-position: 0 -100%; }
  100% { background-position: 0 200%; }
}
</style>
