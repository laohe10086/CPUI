<template>
  <component :is="level" class="modern-heading">
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
.modern-heading {
  margin: 0;
  font-family: var(--cp-font-family);
  font-weight: 600;
  color: var(--cp-text-primary);
  letter-spacing: -0.02em;
  line-height: 1.2;

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
}
</style>
