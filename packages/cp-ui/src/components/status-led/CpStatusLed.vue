<template>
  <span
    class="cp-status-led"
    :class="[
      `cp-status-led--${status}`,
      { 'cp-status-led--pulse': pulse },
      `cp-status-led--${size}`,
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
.cp-status-led {
  display: inline-block;
  border-radius: 50%;

  &--sm { width: 6px; height: 6px; }
  &--md { width: 8px; height: 8px; }
  &--lg { width: 12px; height: 12px; }

  &--online {
    background: var(--cp-color-success);
    color: var(--cp-color-success);
  }
  &--offline {
    background: var(--cp-text-dim);
    color: var(--cp-text-dim);
  }
  &--warning {
    background: var(--cp-color-warning);
    color: var(--cp-color-warning);
  }
  &--error {
    background: var(--cp-color-danger);
    color: var(--cp-color-danger);
  }

  &--pulse {
    animation: cp-led-pulse 2s ease-in-out infinite;
  }
}
</style>
