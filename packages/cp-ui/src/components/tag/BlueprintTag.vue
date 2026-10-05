<template>
  <span
    class="blueprint-tag"
    :class="[
      `blueprint-tag--${variant}`,
      `blueprint-tag--${size}`,
      { 'blueprint-tag--clickable': clickable },
    ]"
    @click="clickable && $emit('click', $event)"
  >
    <span class="blueprint-tag__key" />
    <slot />
    <span v-if="closable" class="blueprint-tag__close" @click.stop="$emit('close')">[x]</span>
  </span>
</template>

<script setup lang="ts">
import type { TagProps } from '../../types/components'

withDefaults(defineProps<TagProps>(), {
  variant: 'default',
  size: 'md',
  closable: false,
  clickable: false,
})

defineEmits<{
  click: [e: MouseEvent]
  close: []
}>()
</script>

<style lang="scss" scoped>
// 图纸图例格：实色小方块图例键 + 细线框，与按钮同属一套直角语言
.blueprint-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--cp-font-mono);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  background: transparent;
  white-space: nowrap;

  &__key {
    flex: none;
    width: 5px;
    height: 5px;
    background: currentColor;
    opacity: 0.75;
  }

  &--sm {
    padding: 2px 8px;
    font-size: 10px;
  }
  &--md {
    padding: 3px 10px;
    font-size: 11px;
  }

  &--default {
    color: var(--cp-text-secondary);
    border-color: var(--cp-border-base);
  }
  &--primary {
    color: var(--cp-color-primary);
    border-color: var(--cp-color-primary);
  }
  &--secondary {
    color: var(--cp-color-secondary);
    border-color: var(--cp-color-secondary);
  }
  &--danger {
    color: var(--cp-color-danger);
    border-color: var(--cp-color-danger);
  }
  &--success {
    color: var(--cp-color-success);
    border-color: var(--cp-color-success);
  }

  &--clickable {
    cursor: pointer;
    transition: background var(--cp-duration-fast) var(--cp-easing);
    &:hover {
      background: var(--cp-bg-hover);
    }
  }

  &__close {
    cursor: pointer;
    color: var(--cp-text-dim);
    &:hover {
      color: var(--cp-text-primary);
    }
  }
}
</style>
