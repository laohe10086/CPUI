<template>
  <div class="cp-hud" :class="[`cp-hud--${position}`, { 'cp-hud--dense': dense }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  position?: 'top' | 'bottom'
  dense?: boolean
}>(), {
  position: 'top',
  dense: false,
})
</script>

<style lang="scss" scoped>
.cp-hud {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  background: var(--cp-hud-bg);
  border-bottom: 1px solid var(--cp-hud-border);
  font-family: var(--cp-font-mono);
  font-size: 0.8em;
  color: var(--cp-text-secondary);
  backdrop-filter: blur(8px);

  &--top {
    top: 0;
    border-bottom: 1px solid var(--cp-hud-border);
  }

  &--bottom {
    bottom: 0;
    border-top: 1px solid var(--cp-hud-border);
    border-bottom: none;
  }

  &--dense {
    padding: 4px 16px;
    font-size: 0.7em;
  }
}
</style>
