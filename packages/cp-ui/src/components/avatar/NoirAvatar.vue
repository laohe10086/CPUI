<template>
  <div class="noir-avatar" :class="[`noir-avatar--${size}`, { 'noir-avatar--loading': loading }]">
    <div class="noir-avatar__frame">
      <img
        v-if="src && !hasError"
        :src="src"
        :alt="alt"
        class="noir-avatar__img"
        @error="hasError = true"
      />
      <span v-else class="noir-avatar__fallback">{{ fallbackIcon }}</span>
      <div class="noir-avatar__glow" />
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
  fallbackIcon: '◆',
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
  background: var(--cp-bg-elevated);
  border: 2px solid var(--cp-color-primary);
  overflow: hidden;
  transition: all var(--cp-duration-fast) var(--cp-easing);

  .noir-avatar--loading & {
    animation: noir-avatar-glow 1.5s ease-in-out infinite;
  }

  &:hover {
    border-color: var(--cp-color-secondary);
    box-shadow: 
      0 0 20px var(--cp-glow-primary),
      inset 0 0 20px rgba(0, 240, 255, 0.1);
  }
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

.noir-avatar__glow {
  position: absolute;
  inset: -2px;
  background: radial-gradient(circle at 50% 0%, var(--cp-color-primary) 0%, transparent 60%);
  opacity: 0;
  transition: opacity var(--cp-duration-normal) var(--cp-easing);
  pointer-events: none;

  .noir-avatar__frame:hover & {
    opacity: 0.3;
  }
}

.noir-avatar__id {
  font-family: var(--cp-font-mono);
  font-size: 0.65em;
  color: var(--cp-color-secondary);
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: underline;
  text-decoration-color: var(--cp-color-secondary);
  text-underline-offset: 2px;
}

.noir-avatar__status {
  position: absolute;
  top: -2px;
  right: -2px;
}

@keyframes noir-avatar-glow {
  0%, 100% { 
    border-color: var(--cp-color-primary);
    box-shadow: 0 0 10px var(--cp-glow-primary);
  }
  50% { 
    border-color: var(--cp-color-secondary);
    box-shadow: 0 0 20px var(--cp-glow-secondary);
  }
}
</style>
