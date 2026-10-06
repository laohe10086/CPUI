<template>
  <span
    class="blueprint-status-led"
    :class="[
      `blueprint-status-led--${status}`,
      { 'blueprint-status-led--pulse': pulse },
      `blueprint-status-led--${size}`,
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
.blueprint-status-led {
  display: inline-block;
  border-radius: 2px;
  position: relative;
  border: 1px solid currentColor;

  &--sm { width: 6px; height: 6px; }
  &--md { width: 8px; height: 8px; }
  &--lg { width: 12px; height: 12px; }

  &--online {
    background: rgba(0, 200, 255, 0.3);
    border-color: #00c8ff;
    box-shadow: 0 0 4px rgba(0, 200, 255, 0.6);
  }
  &--offline {
    background: rgba(100, 100, 100, 0.2);
    border-color: #666;
  }
  &--warning {
    background: rgba(255, 200, 0, 0.3);
    border-color: #ffc800;
    box-shadow: 0 0 4px rgba(255, 200, 0, 0.6);
  }
  &--error {
    background: rgba(255, 80, 80, 0.3);
    border-color: #ff5050;
    box-shadow: 0 0 4px rgba(255, 80, 80, 0.6);
  }

  &--pulse {
    animation: blueprint-led-pulse 2s ease-in-out infinite;
  }
}

@keyframes blueprint-led-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
