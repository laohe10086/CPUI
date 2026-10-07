<template>
  <div :class="['cyber-modern-hologram', `cyber-modern-hologram--${variant}`]">
    <div class="cyber-modern-hologram__inner">
      <div v-if="title" class="cyber-modern-hologram__header">
        <span class="cyber-modern-hologram__title">{{ title }}</span>
        <div class="cyber-modern-hologram__signal"></div>
      </div>
      <div class="cyber-modern-hologram__content">
        <slot />
      </div>
      <div class="cyber-modern-hologram__scanline"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  variant?: 'primary' | 'danger'
}

withDefaults(defineProps<Props>(), {
  title: '',
  variant: 'primary',
})
</script>

<style scoped lang="scss">
@keyframes hologram-flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.95; }
}

@keyframes hologram-scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(300%); }
}

@keyframes signal-pulse {
  0%, 100% {
    box-shadow: 0 0 4px var(--cp-primary), 0 0 8px var(--cp-primary);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 8px var(--cp-primary), 0 0 16px var(--cp-primary);
    transform: scale(1.1);
  }
}

.cyber-modern-hologram {
  position: relative;
  padding: 1px;
  background: linear-gradient(135deg, var(--cp-primary) 0%, var(--cp-secondary) 100%);
  border-radius: 12px;
  animation: hologram-flicker 3s infinite;

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, var(--cp-primary), var(--cp-secondary));
    border-radius: 12px;
    opacity: 0.3;
    filter: blur(8px);
    z-index: -1;
  }

  &--danger {
    background: linear-gradient(135deg, var(--cp-error) 0%, var(--cp-secondary) 100%);

    &::before {
      background: linear-gradient(135deg, var(--cp-error), var(--cp-secondary));
    }

    .cyber-modern-hologram__title {
      color: var(--cp-error);
    }

    .cyber-modern-hologram__signal {
      background: var(--cp-error);
    }
  }

  &__inner {
    position: relative;
    padding: 20px;
    background: var(--cp-surface-1);
    border-radius: 11px;
    overflow: hidden;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--cp-border);
  }

  &__title {
    font-family: var(--cp-font-heading, 'Rajdhani', 'Inter', sans-serif);
    font-size: 18px;
    font-weight: 700;
    color: var(--cp-primary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__signal {
    width: 8px;
    height: 8px;
    background: var(--cp-primary);
    border-radius: 50%;
    animation: signal-pulse 2s infinite;
  }

  &__content {
    position: relative;
    z-index: 1;
    color: var(--cp-text-primary);
    font-size: 14px;
    line-height: 1.6;
  }

  &__scanline {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 217, 255, 0.5),
      transparent
    );
    animation: hologram-scanline 4s linear infinite;
    pointer-events: none;
  }
}
</style>
