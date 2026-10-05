<template>
  <div
    class="blueprint-heading"
    :class="[
      { 'blueprint-heading--underline': underline },
    ]"
    :style="{
      '--blueprint-heading-line-color': lineColor || undefined,
      '--blueprint-heading-text-color': textColor || undefined,
    }"
  >
    <span class="blueprint-heading__text"><slot /></span>
    <div v-if="underline" class="blueprint-heading__line" />
  </div>
</template>

<script setup lang="ts">
import type { HeadingProps } from '../../types/components'

withDefaults(defineProps<HeadingProps>(), {
  underline: true,
  lineColor: '',
  textColor: '',
  glitched: false,
  neon: false,
  rgbSplit: false,
  linePulse: false,
  lineGlow: false,
})
</script>

<style lang="scss" scoped>
.blueprint-heading {
  --blueprint-heading-line-color: var(--cp-border-bright);
  --blueprint-heading-text-color: var(--cp-text-primary);

  display: inline-block;
  margin: 0;
  padding-bottom: 8px;
  font-family: var(--cp-font-mono);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  line-height: 1.3;
  color: var(--blueprint-heading-text-color);

  // 尺寸标注线：1px 横线 + 两端 8px 竖 tick
  &__line {
    position: relative;
    width: 100%;
    height: 8px;
    margin-top: 8px;
    border-bottom: 1px solid var(--blueprint-heading-line-color);

    &::before,
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      width: 1px;
      height: 8px;
      background: var(--blueprint-heading-line-color);
    }
    &::before { left: 0; }
    &::after { right: 0; }
  }
}
</style>
