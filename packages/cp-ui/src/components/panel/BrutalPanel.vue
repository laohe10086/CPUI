<template>
  <div class="brutal-panel">
    <div v-if="title || $slots.header" class="brutal-panel__header">
      <slot name="header">
        <span v-if="label" class="brutal-panel__label">[ {{ label }} ]</span>
        <span v-if="title" class="brutal-panel__title">{{ title }}</span>
      </slot>
    </div>
    <div class="brutal-panel__body">
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
.brutal-panel {
  background: var(--cp-bg-panel);
  border: 2px solid var(--cp-border-base);

  &__header {
    padding: 12px 16px;
    border-bottom: 2px solid var(--cp-border-base);
    background: var(--cp-bg-base);
  }

  &__label {
    display: block;
    font-family: var(--cp-font-mono);
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 10px;
    font-weight: 700;
    color: var(--cp-text-muted);
    margin-bottom: 6px;
  }

  &__title {
    font-family: var(--cp-font-mono);
    font-size: 14px;
    font-weight: 700;
    color: var(--cp-text-primary);
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }

  &__body {
    padding: 20px;
    line-height: 1.6;
  }
}
</style>
