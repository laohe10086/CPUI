<template>
  <div
    class="sterile-heading"
    :class="[
      { 'sterile-heading--line-pulse': linePulse },
    ]"
    :style="{
      '--sterile-heading-line-color': lineColor || undefined,
      '--sterile-heading-text-color': textColor || undefined,
    }"
  >
    <span class="sterile-heading__text"><slot /></span>
    <div v-if="underline" class="sterile-heading__line" />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  underline?: boolean
  lineColor?: string
  textColor?: string
  linePulse?: boolean
}>(), {
  underline: false,
  lineColor: '',
  textColor: '',
  linePulse: false,
})
</script>

<style lang="scss" scoped>
.sterile-heading {
  --sterile-heading-line-color: var(--cp-border-base);
  --sterile-heading-text-color: var(--cp-text-primary);

  display: inline-block;
  margin: 0;
  padding-bottom: 8px;
  font-family: var(--cp-font-sans);
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.3;
  color: var(--sterile-heading-text-color);

  &__line {
    width: 100%;
    height: 1px;
    background-color: var(--sterile-heading-line-color);
  }

  &--line-pulse .sterile-heading__line {
    animation: sterile-heading-line-pulse 2s ease-in-out infinite;
  }
}

@keyframes sterile-heading-line-pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.3; }
}
</style>
