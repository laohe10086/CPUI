<template>
  <div
    class="brutal-heading"
    :class="[
      { 'brutal-heading--underline': underline },
    ]"
    :style="{
      '--brutal-heading-line-color': lineColor || undefined,
      '--brutal-heading-text-color': textColor || undefined,
    }"
  >
    <span class="brutal-heading__text"><slot /></span>
    <div v-if="underline" class="brutal-heading__line" />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  underline?: boolean
  lineColor?: string
  textColor?: string
}>(), {
  underline: true,
  lineColor: '',
  textColor: '',
})
</script>

<style lang="scss" scoped>
// 终端粗野：等宽大写 + 2px 粗结构线
.brutal-heading {
  --brutal-heading-line-color: var(--cp-border-base);
  --brutal-heading-text-color: var(--cp-text-primary);

  display: inline-block;
  margin: 0;
  padding-bottom: 6px;
  font-family: var(--cp-font-mono);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1.3;
  color: var(--brutal-heading-text-color);

  &__line {
    width: 100%;
    height: 0;
    margin-top: 6px;
    border-bottom: 2px solid var(--brutal-heading-line-color);
  }
}
</style>
