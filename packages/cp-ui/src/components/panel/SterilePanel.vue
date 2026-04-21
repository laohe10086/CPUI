<template>
  <div class="sterile-panel" :class="{'sterile-panel--cut': shape === 'cut'}">
    <div v-if="title || $slots.header" class="sterile-panel__header">
      <slot name="header">
        <span v-if="label" class="sterile-panel__label">{{ label }}</span>
        <span v-if="title" class="sterile-panel__title">{{ title }}</span>
      </slot>
    </div>
    <div class="sterile-panel__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PanelProps } from '../../types/components'

withDefaults(defineProps<PanelProps>(), {
  title: '',
  label: '',
  shape: 'regular',
})
</script>

<style lang="scss" scoped>
.sterile-panel {
  background: var(--cp-bg-panel);
  border: 1px solid var(--cp-border-base);
  border-radius: 0;

  &__header {
    padding: 14px 18px;
    border-bottom: 1px solid var(--cp-border-dim);
    font-family: var(--cp-font-sans);
    font-size: 13px;
  }

  &__label {
    font-size: 11px;
    color: var(--cp-text-dim);
  }

  &__title {
    font-family: var(--cp-font-sans);
    font-size: 13px;
    color: var(--cp-text-secondary);
  }

  &__body {
    padding: 18px;
  }
}
</style>
