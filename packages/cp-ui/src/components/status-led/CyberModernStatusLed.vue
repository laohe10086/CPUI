<template>
  <span
    class="cyber-modern-status-led"
    :class="[
      `cyber-modern-status-led--${status}`,
      { 'cyber-modern-status-led--pulse': pulse },
      `cyber-modern-status-led--${size}`,
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
.cyber-modern-status-led {
  display: inline-block;
  border-radius: 50%;
  position: relative;

  &--sm { width: 6px; height: 6px; }
  &--md { width: 8px; height: 8px; }
  &--lg { width: 12px; height: 12px; }

  &--online {
    background: #00d9ff;
    box-shadow: 0 0 8px #00d9ff, 0 0 16px rgba(0, 217, 255, 0.4);
  }
  &--offline {
    background: #2a2a2a;
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
  }
  &--warning {
    background: #a855f7;
    box-shadow: 0 0 8px #a855f7, 0 0 16px rgba(168, 85, 247, 0.4);
  }
  &--error {
    background: #ff0066;
    box-shadow: 0 0 8px #ff0066, 0 0 16px rgba(255, 0, 102, 0.4);
  }

  &--pulse {
    animation: cyber-modern-led-pulse 2s ease-in-out infinite;
  }
}

@keyframes cyber-modern-led-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
