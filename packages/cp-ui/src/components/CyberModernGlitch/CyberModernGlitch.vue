<template>
  <div
    class="cyber-modern-glitch"
    :class="[
      `cyber-modern-glitch--${variant}`,
      `cyber-modern-glitch--${intensity}`,
      { 'cyber-modern-glitch--active': active },
    ]"
  >
    <span class="cyber-modern-glitch__text" :data-text="text">{{ text }}</span>
    <span class="cyber-modern-glitch__text cyber-modern-glitch__text--clone" aria-hidden="true" :data-text="text">{{ text }}</span>
    <span class="cyber-modern-glitch__text cyber-modern-glitch__text--clone" aria-hidden="true" :data-text="text">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text: string
  active?: boolean
  intensity?: 'normal' | 'high'
  variant?: 'primary' | 'danger'
}

withDefaults(defineProps<Props>(), {
  active: true,
  intensity: 'normal',
  variant: 'primary',
})
</script>

<style scoped lang="scss">
@keyframes glitch-anim-1 {
  0%, 100% { clip-path: inset(40% 0 61% 0); }
  20% { clip-path: inset(92% 0 1% 0); }
  40% { clip-path: inset(43% 0 1% 0); }
  60% { clip-path: inset(25% 0 58% 0); }
  80% { clip-path: inset(54% 0 7% 0); }
}

@keyframes glitch-anim-2 {
  0%, 100% { clip-path: inset(1% 0 95% 0); }
  20% { clip-path: inset(60% 0 3% 0); }
  40% { clip-path: inset(10% 0 85% 0); }
  60% { clip-path: inset(85% 0 5% 0); }
  80% { clip-path: inset(27% 0 40% 0); }
}

.cyber-modern-glitch {
  position: relative;
  display: inline-block;
  font-family: var(--cp-font-heading, 'Rajdhani', 'Inter', sans-serif);
  font-weight: 700;
  font-size: 28px;
  color: var(--cp-primary);
  letter-spacing: 0.05em;

  &--danger {
    color: var(--cp-error);
  }

  &__text {
    position: relative;
    display: block;

    &--clone {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }
  }

  &--active {
    .cyber-modern-glitch__text--clone:nth-child(2) {
      color: var(--cp-primary);
      animation: glitch-anim-1 2s infinite linear alternate-reverse;
      opacity: 0.8;
      transform: translateX(-2px);
    }

    .cyber-modern-glitch__text--clone:nth-child(3) {
      color: var(--cp-secondary);
      animation: glitch-anim-2 2.5s infinite linear alternate-reverse;
      opacity: 0.8;
      transform: translateX(2px);
    }
  }

  &--high.cyber-modern-glitch--active {
    .cyber-modern-glitch__text--clone:nth-child(2) {
      animation-duration: 1.2s;
      transform: translateX(-4px);
    }

    .cyber-modern-glitch__text--clone:nth-child(3) {
      animation-duration: 1.5s;
      transform: translateX(4px);
    }
  }
}
</style>
