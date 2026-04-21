<template>
  <div class="cp-toolbar" :class="[`cp-toolbar--${position}`]">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  position?: 'left' | 'right'
}>(), {
  position: 'right',
})
</script>

<style lang="scss" scoped>
.cp-toolbar {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &--right { right: 30px; }
  &--left { left: 30px; }
}
</style>
