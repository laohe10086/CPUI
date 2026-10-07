<template>
  <span
    class="noir-status-led"
    :class="[
      `noir-status-led--${status}`,
      { 'noir-status-led--pulse': pulse },
      `noir-status-led--${size}`,
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
.noir-status-led {
  display: inline-block;
  border-radius: 50%;
  position: relative;

  &--sm { width: 6px; height: 6px; }
  &--md { width: 8px; height: 8px; }
  &--lg { width: 12px; height: 12px; }

  &--online {
    background: var(--cp-color-primary);
    box-shadow: 0 0 10px var(--cp-color-primary), 0 0 20px var(--cp-glow-primary);
  }
  &--offline {
    background: var(--cp-bg-elevated);
    box-shadow: inset 0 0 4px rgba(255, 255, 255, 0.1);
  }
  &--warning {
    background: var(--cp-color-warning);
    box-shadow: 0 0 10px var(--cp-color-warning), 0 0 20px rgba(255, 140, 0, 0.4);
  }
  &--error {
    background: var(--cp-color-danger);
    box-shadow: 0 0 10px var(--cp-color-danger), 0 0 20px var(--cp-glow-danger);
  }

  &--pulse {
    animation: noir-led-pulse 2s ease-in-out infinite;
  }
}

@keyframes noir-led-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
