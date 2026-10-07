<template>
  <div class="brutal-avatar" :class="[`brutal-avatar--${size}`, { 'brutal-avatar--loading': loading }]">
    <div class="brutal-avatar__frame">
      <img
        v-if="src && !hasError"
        :src="src"
        :alt="alt"
        class="brutal-avatar__img"
        @error="hasError = true"
      />
      <span v-else class="brutal-avatar__fallback">{{ fallbackIcon }}</span>
    </div>
    <span v-if="id" class="brutal-avatar__id">[ {{ id }} ]</span>
    <CpStatusLed
      v-if="status"
      :status="status"
      :pulse="statusPulse"
      size="sm"
      class="brutal-avatar__status"
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
  fallbackIcon: 'X',
  shape: 'regular',
})

const hasError = ref(false)
</script>

<style lang="scss" scoped>
.brutal-avatar {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  &--sm .brutal-avatar__frame { width: 32px; height: 32px; }
  &--md .brutal-avatar__frame { width: 48px; height: 48px; }
  &--lg .brutal-avatar__frame { width: 64px; height: 64px; }
}

.brutal-avatar__frame {
  position: relative;
  width: 48px;
  height: 48px;
  border: 2px solid var(--cp-color-primary);
  overflow: hidden;
  transition: all var(--cp-duration-fast) var(--cp-easing);

  .brutal-avatar--loading & {
    animation: brutal-avatar-pulse 1s ease-in-out infinite;
  }

  &:hover {
    background: var(--cp-color-primary);
    border-color: var(--cp-bg-base);
    
    .brutal-avatar__img {
      filter: invert(1);
    }
    .brutal-avatar__fallback {
      color: var(--cp-bg-base);
    }
  }
}

.brutal-avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(80%) contrast(1.3);
}

.brutal-avatar__fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle, var(--cp-color-primary) 1px, transparent 1px),
    var(--cp-bg-base);
  background-size: 4px 4px;
  background-position: 0 0, 2px 2px;
  color: var(--cp-color-primary);
  font-family: var(--cp-font-mono);
  font-size: 1.4em;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0;
}

.brutal-avatar__id {
  font-family: var(--cp-font-mono);
  font-size: 0.65em;
  color: var(--cp-text-primary);
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.brutal-avatar__status {
  position: absolute;
  top: -4px;
  right: -4px;
}

@keyframes brutal-avatar-pulse {
  0%, 100% { border-color: var(--cp-color-primary); }
  50% { border-color: var(--cp-text-muted); }
}
</style>
