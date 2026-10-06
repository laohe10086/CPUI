<template>
  <div class="brutal-heading">
    <component :is="level" class="brutal-heading__text">
      <slot />
    </component>
  </div>
</template>

<script setup lang="ts">
import type { HeadingProps } from '../../types/components'

withDefaults(defineProps<HeadingProps>(), {
  level: 'h2',
})
</script>

<style lang="scss" scoped>
.brutal-heading {
  position: relative;
  display: inline-block;
  margin: 0 0 20px 0;

  &__text {
    font-family: var(--cp-font-mono);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--cp-text-primary);
    margin: 0;
    padding-bottom: 8px;
    border-bottom: 3px solid var(--cp-color-primary);
  }
}
</style>
