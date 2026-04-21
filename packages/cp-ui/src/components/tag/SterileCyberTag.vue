<template>
  <span
    class="sc-tag"
    :class="[
      `sc-tag--${variant}`,
      `sc-tag--${size}`,
      { 'sc-tag--clickable': clickable },
    ]"
    @click="clickable && $emit('click', $event)"
  >
    <slot />
    <span v-if="closable" class="sc-tag__close" @click.stop="$emit('close')">x</span>
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
.sc-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--cp-font-mono);
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
    background: rgba(252, 232, 3, 0.1);
    color: var(--cp-color-primary);
    border-color: rgba(252, 232, 3, 0.2);
  }
  &--secondary {
    background: rgba(0, 240, 255, 0.1);
    color: var(--cp-color-secondary);
    border-color: rgba(0, 240, 255, 0.2);
  }
  &--danger {
    background: rgba(255, 0, 60, 0.1);
    color: var(--cp-color-danger);
    border-color: rgba(255, 0, 60, 0.2);
  }
  &--success {
    background: rgba(0, 255, 65, 0.1);
    color: var(--cp-color-success);
    border-color: rgba(0, 255, 65, 0.2);
  }

  &--clickable {
    cursor: pointer;
    transition: background var(--cp-duration-fast) var(--cp-easing),
                box-shadow var(--cp-duration-fast) var(--cp-easing);
    &:hover {
      background: rgba(0, 240, 255, 0.08);
      box-shadow: 0 0 8px var(--cp-glow-secondary);
    }
  }

  &__close {
    cursor: pointer;
    opacity: 0.5;
    &:hover { opacity: 1; }
  }
}
</style>
