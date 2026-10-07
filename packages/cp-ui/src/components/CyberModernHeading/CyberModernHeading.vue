<template>
  <component :is="level" class="cyber-modern-heading">
    <span class="cyber-modern-heading__glow"></span>
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { HeadingProps } from '../../types/components'

withDefaults(defineProps<HeadingProps>(), {
  level: 'h2',
})
</script>

<style scoped lang="scss">
.cyber-modern-heading {
  position: relative;
  margin: 0;
  font-family: var(--cp-font-family);
  font-weight: 600;
  color: var(--cp-text-primary);
  letter-spacing: 0.02em;
  line-height: 1.2;
  text-shadow: 0 0 20px var(--cp-primary-subtle);

  &:is(h1) {
    font-size: 48px;
  }

  &:is(h2) {
    font-size: 36px;
  }

  &:is(h3) {
    font-size: 24px;
  }

  &:is(h4) {
    font-size: 20px;
  }

  &:is(h5) {
    font-size: 16px;
  }

  &:is(h6) {
    font-size: 14px;
  }

  &__glow {
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, var(--cp-primary), var(--cp-secondary), transparent);
    opacity: 0.6;
  }
}
</style>
