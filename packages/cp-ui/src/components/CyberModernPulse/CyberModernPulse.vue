<template>
  <button
    :class="[`cyber-modern-pulse`, `cyber-modern-pulse--${variant}`, `cyber-modern-pulse--${size}`]"
    @click="handleClick"
  >
    <span class="cyber-modern-pulse__ripple"></span>
    <span class="cyber-modern-pulse__ripple cyber-modern-pulse__ripple--delayed"></span>
    <span class="cyber-modern-pulse__text">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>

<style scoped lang="scss">
@keyframes pulse-ripple {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.cyber-modern-pulse {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  font-family: var(--cp-font-heading, 'Rajdhani', 'Inter', sans-serif);
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: transparent;
  border: 2px solid var(--cp-primary);
  border-radius: var(--cp-radius-full);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: var(--cp-primary);
    opacity: 0;
    filter: blur(12px);
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover::before {
    opacity: 0.3;
  }

  &--sm {
    padding: 8px 16px;
    font-size: 13px;
  }

  &--lg {
    padding: 16px 32px;
    font-size: 17px;
  }

  &__ripple {
    position: absolute;
    inset: -2px;
    border: 2px solid var(--cp-primary);
    border-radius: var(--cp-radius-full);
    animation: pulse-ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    pointer-events: none;

    &--delayed {
      animation-delay: 1s;
    }
  }

  &__text {
    position: relative;
    z-index: 1;
    color: var(--cp-primary);
    transition: color 0.3s ease;
  }

  &:hover &__text {
    color: #fff;
    text-shadow: 0 0 8px var(--cp-primary);
  }

  &:active {
    transform: scale(0.95);
  }

  &--primary {
    border-color: var(--cp-primary);

    .cyber-modern-pulse__ripple {
      border-color: var(--cp-primary);
    }

    &:hover {
      background: var(--cp-primary);
      box-shadow: 0 0 20px rgba(0, 217, 255, 0.4);
    }
  }

  &--secondary {
    border-color: var(--cp-secondary);

    .cyber-modern-pulse__ripple {
      border-color: var(--cp-secondary);
    }

    .cyber-modern-pulse__text {
      color: var(--cp-secondary);
    }

    &::before {
      background: var(--cp-secondary);
    }

    &:hover {
      background: var(--cp-secondary);
      box-shadow: 0 0 20px rgba(255, 0, 170, 0.4);
    }

    &:hover .cyber-modern-pulse__text {
      text-shadow: 0 0 8px var(--cp-secondary);
    }
  }

  &--danger {
    border-color: var(--cp-error);

    .cyber-modern-pulse__ripple {
      border-color: var(--cp-error);
    }

    .cyber-modern-pulse__text {
      color: var(--cp-error);
    }

    &::before {
      background: var(--cp-error);
    }

    &:hover {
      background: var(--cp-error);
      box-shadow: 0 0 20px rgba(255, 0, 85, 0.4);
    }

    &:hover .cyber-modern-pulse__text {
      text-shadow: 0 0 8px var(--cp-error);
    }
  }
}
</style>
