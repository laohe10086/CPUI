<template>
  <div
    class="noir-heading"
    :class="[
      { 'noir-heading--underline': underline },
    ]"
    :style="{
      '--noir-heading-line-color': lineColor || undefined,
      '--noir-heading-text-color': textColor || undefined,
    }"
  >
    <span class="noir-heading__text"><slot /></span>
  </div>
</template>

<script setup lang="ts">
import type { HeadingProps } from '../../types/components'

withDefaults(defineProps<HeadingProps>(), {
  underline: true,
  lineColor: '',
  textColor: '',
})
</script>

<style lang="scss" scoped>
.noir-heading {
  --noir-heading-line-color: var(--cp-border-base);
  --noir-heading-text-color: var(--cp-text-primary);

  display: inline-block;
  margin: 0;
  font-family: 'Cormorant Garamond', 'Noto Serif SC', Georgia, serif;
  font-weight: 600;
  font-size: 22px;
  letter-spacing: 0.04em;
  line-height: 1.3;
  color: var(--noir-heading-text-color);

  &--underline {
    padding-bottom: 8px;
    border-bottom: 1px solid var(--noir-heading-line-color);
  }
}
</style>
