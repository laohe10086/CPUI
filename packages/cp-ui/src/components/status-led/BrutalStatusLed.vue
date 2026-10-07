<template>
  <span
    class="brutal-status-led"
    :class="[
      `brutal-status-led--${status}`,
      { 'brutal-status-led--pulse': pulse },
      `brutal-status-led--${size}`,
    ]"
    :aria-label="status"
  />
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  status?: 'online' | 'offline' | 'warning' | 'error'
  pulse?: boolean
  size?: 'sm' | 'md' | 'lg'
}>(), {
  status: 'online',
  pulse: false,
  size: 'md',
})
</script>

<style lang="scss" scoped>
.brutal-status-led {
  display: inline-block;
  border-radius: 0;
  position: relative;
  border: 2px solid currentColor;

  &--sm { width: 8px; height: 8px; }
  &--md { width: 10px; height: 10px; }
  &--lg { width: 14px; height: 14px; }

  &--online {
    background: var(--cp-color-success);
    border-color: var(--cp-color-success);
  }
  &--offline {
    background: var(--cp-bg-muted);
    border-color: var(--cp-border-base);
  }
  &--warning {
    background: var(--cp-color-warning);
    border-color: var(--cp-color-warning);
  }
  &--error {
    background: var(--cp-color-danger);
    border-color: var(--cp-color-danger);
  }

  &--pulse {
    animation: brutal-led-pulse 1s steps(2) infinite;
  }
}

@keyframes brutal-led-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
</style>
