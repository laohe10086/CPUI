<template>
  <div class="blueprint-avatar" :class="[`blueprint-avatar--${size}`, { 'blueprint-avatar--loading': loading }]">
    <div class="blueprint-avatar__frame">
      <div class="blueprint-avatar__corner blueprint-avatar__corner--tl" />
      <div class="blueprint-avatar__corner blueprint-avatar__corner--tr" />
      <div class="blueprint-avatar__corner blueprint-avatar__corner--bl" />
      <div class="blueprint-avatar__corner blueprint-avatar__corner--br" />
      <img
        v-if="src && !hasError"
        :src="src"
        :alt="alt"
        class="blueprint-avatar__img"
        @error="hasError = true"
      />
      <span v-else class="blueprint-avatar__fallback">{{ fallbackIcon }}</span>
    </div>
    <span v-if="id" class="blueprint-avatar__id">FIG.{{ id }}</span>
    <CpStatusLed
      v-if="status"
      :status="status"
      :pulse="statusPulse"
      size="sm"
      class="blueprint-avatar__status"
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
  shape: 'regular',
})

const hasError = ref(false)
</script>

<style lang="scss" scoped>
.blueprint-avatar {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  &--sm .blueprint-avatar__frame { width: 32px; height: 32px; }
  &--md .blueprint-avatar__frame { width: 48px; height: 48px; }
  &--lg .blueprint-avatar__frame { width: 64px; height: 64px; }
}

.blueprint-avatar__frame {
  position: relative;
  width: 48px;
  height: 48px;
  border: 1px solid var(--cp-color-primary);
  overflow: hidden;
  transition: all var(--cp-duration-fast) var(--cp-easing);

  .blueprint-avatar--loading & {
    border-style: dashed;
    animation: blueprint-avatar-dash 1.2s linear infinite;
  }

  &:hover {
    border-color: var(--cp-color-secondary);
    box-shadow: 0 0 0 1px var(--cp-color-secondary);
  }
}

.blueprint-avatar__corner {
  position: absolute;
  width: 8px;
  height: 8px;
  
  &--tl { top: -1px; left: -1px; border-top: 2px solid var(--cp-color-primary); border-left: 2px solid var(--cp-color-primary); }
  &--tr { top: -1px; right: -1px; border-top: 2px solid var(--cp-color-primary); border-right: 2px solid var(--cp-color-primary); }
  &--bl { bottom: -1px; left: -1px; border-bottom: 2px solid var(--cp-color-primary); border-left: 2px solid var(--cp-color-primary); }
  &--br { bottom: -1px; right: -1px; border-bottom: 2px solid var(--cp-color-primary); border-right: 2px solid var(--cp-color-primary); }
}

.blueprint-avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(20%) contrast(1.1);
}

.blueprint-avatar__fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--cp-bg-base);
  color: var(--cp-text-muted);
  font-family: var(--cp-font-mono);
  font-size: 1.2em;
  text-transform: uppercase;
}

.blueprint-avatar__id {
  font-family: var(--cp-font-mono);
  font-size: 0.65em;
  color: var(--cp-text-muted);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.blueprint-avatar__status {
  position: absolute;
  top: -4px;
  right: -4px;
}

@keyframes blueprint-avatar-dash {
  0% { border-color: var(--cp-color-primary); }
  50% { border-color: var(--cp-color-secondary); }
  100% { border-color: var(--cp-color-primary); }
}
</style>
