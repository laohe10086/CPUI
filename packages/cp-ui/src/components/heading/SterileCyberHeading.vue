<template>
  <div
    class="sc-heading"
    :class="[
      { 'sc-heading--neon': neon },
      { 'sc-heading--line-pulse': linePulse },
    ]"
    :style="{
      '--sc-heading-line-color': lineColor || undefined,
      '--sc-heading-text-color': textColor || undefined,
    }"
  >
    <span class="sc-heading__text"><slot /></span>
    <div v-if="underline" class="sc-heading__line" />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  underline?: boolean
  lineColor?: string
  textColor?: string
  neon?: boolean
  linePulse?: boolean
}>(), {
  underline: true,
  lineColor: '',
  textColor: '',
  neon: false,
  linePulse: false,
})
</script>

<style lang="scss" scoped>
.sc-heading {
  --sc-heading-line-color: var(--cp-color-secondary);
  --sc-heading-text-color: var(--cp-text-primary);

  display: inline-block;
  margin: 0;
  padding-bottom: 8px;
  font-family: var(--cp-font-sans);
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.3;
  color: var(--sc-heading-text-color);

  &--neon {
    text-shadow: 0 0 6px var(--sc-heading-line-color);
    animation: sc-heading-neon 2s ease-in-out infinite alternate;
  }

  &__line {
    width: 100%;
    height: 2px;
    background-color: var(--sc-heading-line-color);
    opacity: 0.35;
  }

  &--line-pulse .sc-heading__line {
    animation: sc-heading-line-pulse 2s ease-in-out infinite;
  }
}

@keyframes sc-heading-neon {
  from { filter: brightness(1); }
  to   { filter: brightness(1.15); }
}

@keyframes sc-heading-line-pulse {
  0%, 100% { opacity: 0.35; }
  50%      { opacity: 0.8; }
}
</style>
