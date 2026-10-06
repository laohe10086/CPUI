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
    background: #ff0099;
    box-shadow: 0 0 10px #ff0099, 0 0 20px rgba(255, 0, 153, 0.4);
  }
  &--offline {
    background: #1a1a1a;
    box-shadow: inset 0 0 4px rgba(255, 255, 255, 0.1);
  }
  &--warning {
    background: #ffaa00;
    box-shadow: 0 0 10px #ffaa00, 0 0 20px rgba(255, 170, 0, 0.4);
  }
  &--error {
    background: #ff3366;
    box-shadow: 0 0 10px #ff3366, 0 0 20px rgba(255, 51, 102, 0.4);
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
