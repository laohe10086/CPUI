<template>
  <span
    class="modern-status-led"
    :class="[
      `modern-status-led--${status}`,
      { 'modern-status-led--pulse': pulse },
      `modern-status-led--${size}`,
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
.modern-status-led {
  display: inline-block;
  border-radius: 50%;
  position: relative;

  &--sm { width: 6px; height: 6px; }
  &--md { width: 8px; height: 8px; }
  &--lg { width: 12px; height: 12px; }

  &--online {
    background: #10b981;
    box-shadow: 0 0 4px rgba(16, 185, 129, 0.6);
  }
  &--offline {
    background: #3f3f46;
    box-shadow: none;
  }
  &--warning {
    background: #f59e0b;
    box-shadow: 0 0 4px rgba(245, 158, 11, 0.6);
  }
  &--error {
    background: #ef4444;
    box-shadow: 0 0 4px rgba(239, 68, 68, 0.6);
  }

  &--pulse {
    animation: modern-led-pulse 2s ease-in-out infinite;
  }
}

@keyframes modern-led-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
