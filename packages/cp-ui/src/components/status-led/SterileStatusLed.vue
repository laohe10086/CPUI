<template>
  <span
    class="sterile-status-led"
    :class="[
      `sterile-status-led--${status}`,
      { 'sterile-status-led--pulse': pulse },
      `sterile-status-led--${size}`,
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
.sterile-status-led {
  display: inline-block;
  border-radius: 50%;
  position: relative;

  &--sm { width: 6px; height: 6px; }
  &--md { width: 8px; height: 8px; }
  &--lg { width: 12px; height: 12px; }

  &--online {
    background: #ffffff;
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
  }
  &--offline {
    background: #404040;
    box-shadow: none;
  }
  &--warning {
    background: #00d4ff;
    box-shadow: 0 0 6px rgba(0, 212, 255, 0.8);
  }
  &--error {
    background: #ff4466;
    box-shadow: 0 0 6px rgba(255, 68, 102, 0.8);
  }

  &--pulse {
    animation: sterile-led-pulse 2s ease-in-out infinite;
  }
}

@keyframes sterile-led-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
