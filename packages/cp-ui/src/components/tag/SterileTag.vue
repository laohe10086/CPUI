<template>
  <span
    class="sterile-tag"
    :class="[
      `sterile-tag--${variant}`,
      `sterile-tag--${size}`,
      { 'sterile-tag--clickable': clickable },
    ]"
    @click="clickable && $emit('click', $event)"
  >
    <slot />
    <span v-if="closable" class="sterile-tag__close" @click.stop="$emit('close')">x</span>
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
.sterile-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--cp-font-sans);
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  white-space: nowrap;

  &--sm {
    padding: 2px 8px;
    font-size: 11px;
  }
  &--md {
    padding: 3px 10px;
    font-size: 12px;
  }

  &--default {
    background: transparent;
    color: var(--cp-text-secondary);
    border-color: var(--cp-border-base);
  }
  &--primary {
    background: rgba(184, 160, 0, 0.08);
    color: var(--cp-color-primary);
    border-color: rgba(184, 160, 0, 0.15);
  }
  &--secondary {
    background: rgba(0, 153, 170, 0.08);
    color: var(--cp-color-secondary);
    border-color: rgba(0, 153, 170, 0.15);
  }
  &--danger {
    background: rgba(200, 30, 30, 0.08);
    color: var(--cp-color-danger);
    border-color: rgba(200, 30, 30, 0.15);
  }
  &--success {
    background: rgba(0, 160, 40, 0.08);
    color: var(--cp-color-success);
    border-color: rgba(0, 160, 40, 0.15);
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
    opacity: 0.5;
    color: var(--cp-text-muted);
    &:hover {
      opacity: 1;
      color: var(--cp-text-secondary);
    }
  }
}
</style>
