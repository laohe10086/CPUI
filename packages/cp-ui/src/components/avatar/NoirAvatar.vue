<template>
  <div class="noir-avatar" :class="[`noir-avatar--${size}`, { 'noir-avatar--loading': loading }]">
    <div class="noir-avatar__frame">
      <div class="noir-avatar__inner">
        <img
          v-if="src && !hasError"
          :src="src"
          :alt="alt"
          class="noir-avatar__img"
          @error="hasError = true"
        />
        <span v-else class="noir-avatar__fallback">
          <svg v-if="!fallbackIcon" class="noir-avatar__fallback-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="12" cy="8.5" r="3.5" />
            <path d="M12 14.5c-3.9 0-7 2.1-7 4.8v.7h14v-.7c0-2.7-3.1-4.8-7-4.8z" />
          </svg>
          <template v-else>{{ fallbackIcon }}</template>
        </span>
        <div class="noir-avatar__glow" />
      </div>
    </div>
    <span v-if="id" class="noir-avatar__id">{{ id }}</span>
    <CpStatusLed
      v-if="status"
      :status="status"
      :pulse="statusPulse"
      size="sm"
      class="noir-avatar__status"
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
  shape: 'cut',
})

const hasError = ref(false)
</script>

<style lang="scss" scoped>
.noir-avatar {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  &--sm .noir-avatar__frame { width: 32px; height: 32px; }
  &--md .noir-avatar__frame { width: 48px; height: 48px; }
  &--lg .noir-avatar__frame { width: 64px; height: 64px; }
}

.noir-avatar__frame {
  position: relative;
  width: 48px;
  height: 48px;
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  background: var(--cp-color-primary);
  transition: background var(--cp-duration-fast) var(--cp-easing), filter var(--cp-duration-fast) var(--cp-easing);

  .noir-avatar--loading & {
    animation: noir-avatar-glow 1.5s ease-in-out infinite;
  }

  &:hover {
    background: var(--cp-color-secondary);
    filter: drop-shadow(0 0 10px var(--cp-glow-primary));
  }
}

.noir-avatar__inner {
  position: absolute;
  inset: 2px;
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  overflow: hidden;
  background: var(--cp-bg-elevated);
}

.noir-avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.noir-avatar__fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--cp-bg-base);
  color: var(--cp-color-primary);
  font-family: var(--cp-font-display);
  font-size: 1.4em;
}

.noir-avatar__fallback-icon {
  width: 55%;
  height: 55%;
  opacity: 0.75;
}

.noir-avatar__glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, var(--cp-color-primary) 0%, transparent 60%);
  opacity: 0;
  transition: opacity var(--cp-duration-base) var(--cp-easing);
  pointer-events: none;

  .noir-avatar__frame:hover & {
    opacity: 0.3;
  }
}

.noir-avatar__id {
  font-family: var(--cp-font-mono);
  font-size: 0.65em;
  color: var(--cp-text-muted);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.noir-avatar__status {
  position: absolute;
  top: -2px;
  right: -2px;
}

@keyframes noir-avatar-glow {
  0%, 100% {
    background: var(--cp-color-primary);
    filter: drop-shadow(0 0 4px var(--cp-glow-primary));
  }
  50% {
    background: var(--cp-color-secondary);
    filter: drop-shadow(0 0 10px var(--cp-glow-secondary));
  }
}
</style>
