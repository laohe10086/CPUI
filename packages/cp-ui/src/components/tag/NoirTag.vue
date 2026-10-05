<template>
  <span
    class="noir-tag"
    :class="[
      `noir-tag--${variant}`,
      `noir-tag--${size}`,
      { 'noir-tag--clickable': clickable },
    ]"
    @click="clickable && $emit('click', $event)"
  >
    <slot />
    <span v-if="closable" class="noir-tag__close" @click.stop="$emit('close')">[x]</span>
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
.noir-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--cp-font-sans);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  background: transparent;
  white-space: nowrap;

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
    transition: background var(--cp-duration-base) var(--cp-easing);
    &:hover {
      background: var(--cp-bg-hover);
    }
  }

  &__close {
    cursor: pointer;
    color: var(--cp-text-dim);
    transition: color var(--cp-duration-base) var(--cp-easing);
    &:hover {
      color: var(--cp-text-primary);
    }
  }
}
</style>
