<template>
  <div class="sc-avatar" :class="[`sc-avatar--${size}`, { 'sc-avatar--loading': loading }]">
    <div class="sc-avatar__frame">
      <img
        v-if="src && !hasError"
        :src="src"
        :alt="alt"
        class="sc-avatar__img"
        @error="hasError = true"
      />
      <span v-else class="sc-avatar__fallback">{{ fallbackIcon }}</span>
    </div>
    <span v-if="id" class="sc-avatar__id">{{ id }}</span>
    <CpStatusLed
      v-if="status"
      :status="status"
      :pulse="statusPulse"
      size="sm"
      class="sc-avatar__status"
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
  fallbackIcon: '?',
})

const hasError = ref(false)
</script>

<style lang="scss" scoped>
.sc-avatar {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  &--sm .sc-avatar__frame { width: 32px; height: 32px; }
  &--md .sc-avatar__frame { width: 48px; height: 48px; }
  &--lg .sc-avatar__frame { width: 64px; height: 64px; }
}

.sc-avatar__frame {
  position: relative;
  width: 48px;
  height: 48px;
  border: 2px solid var(--cp-color-secondary);
  border-radius: 0;
  overflow: hidden;
  transition: border-color var(--cp-duration-fast) var(--cp-easing), box-shadow var(--cp-duration-fast) var(--cp-easing);

  .sc-avatar--loading & {
    border-color: var(--cp-text-muted);
    animation: sc-avatar-load 1s linear infinite;
  }

  &:hover {
    border-color: var(--cp-color-secondary);
    box-shadow: 0 0 10px var(--cp-glow-secondary);
  }
}

.sc-avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sc-avatar__fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--cp-bg-elevated);
  color: var(--cp-text-muted);
  font-family: var(--cp-font-mono);
  font-size: 1.2em;
}

.sc-avatar__id {
  font-family: var(--cp-font-mono);
  font-size: 0.65em;
  color: var(--cp-text-muted);
}

.sc-avatar__status {
  position: absolute;
  top: -2px;
  right: -2px;
}

@keyframes sc-avatar-load {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
