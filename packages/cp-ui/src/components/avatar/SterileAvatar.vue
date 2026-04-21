<template>
  <div class="sterile-avatar" :class="[`sterile-avatar--${size}`, { 'sterile-avatar--loading': loading }]">
    <div class="sterile-avatar__frame">
      <img
        v-if="src && !hasError"
        :src="src"
        :alt="alt"
        class="sterile-avatar__img"
        @error="hasError = true"
      />
      <span v-else class="sterile-avatar__fallback">{{ fallbackIcon }}</span>
    </div>
    <span v-if="id" class="sterile-avatar__id">{{ id }}</span>
    <CpStatusLed
      v-if="status"
      :status="status"
      :pulse="statusPulse"
      size="sm"
      class="sterile-avatar__status"
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
.sterile-avatar {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  &--sm .sterile-avatar__frame { width: 32px; height: 32px; }
  &--md .sterile-avatar__frame { width: 48px; height: 48px; }
  &--lg .sterile-avatar__frame { width: 64px; height: 64px; }
}

.sterile-avatar__frame {
  position: relative;
  width: 48px;
  height: 48px;
  border: 2px solid var(--cp-border-base);
  border-radius: 0;
  overflow: hidden;
  transition: border-color var(--cp-duration-fast) var(--cp-easing);

  .sterile-avatar--loading & {
    border-color: var(--cp-text-muted);
    animation: sterile-avatar-load 1s linear infinite;
  }

  &:hover {
    border-color: var(--cp-border-bright);
  }
}

.sterile-avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sterile-avatar__fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--cp-bg-elevated);
  color: var(--cp-text-muted);
  font-family: var(--cp-font-sans, 'Inter', sans-serif);
  font-size: 1.2em;
}

.sterile-avatar__id {
  font-family: var(--cp-font-sans, 'Inter', sans-serif);
  font-size: 0.65em;
  color: var(--cp-text-muted);
}

.sterile-avatar__status {
  position: absolute;
  top: -2px;
  right: -2px;
}

@keyframes sterile-avatar-load {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
