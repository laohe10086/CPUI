<template>
  <span
    class="cyber-status-led"
    :class="[
      `cyber-status-led--${status}`,
      { 'cyber-status-led--pulse': pulse },
      `cyber-status-led--${size}`,
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
.cyber-status-led {
  display: inline-block;
  border-radius: 50%;
  position: relative;

  &--sm { width: 6px; height: 6px; }
  &--md { width: 8px; height: 8px; }
  &--lg { width: 12px; height: 12px; }

  &--online {
    background: #00ffff;
    box-shadow: 0 0 8px #00ffff, 0 0 16px rgba(0, 255, 255, 0.5);
  }
  &--offline {
    background: #333;
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
  }
  &--warning {
    background: #ffff00;
    box-shadow: 0 0 8px #ffff00, 0 0 16px rgba(255, 255, 0, 0.5);
  }
  &--error {
    background: #ff0080;
    box-shadow: 0 0 8px #ff0080, 0 0 16px rgba(255, 0, 128, 0.5);
  }

  &--pulse {
    animation: cyber-led-pulse 2s ease-in-out infinite;
  }
}

@keyframes cyber-led-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
