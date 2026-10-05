<template>
  <span
    class="brutal-tag"
    :class="[
      `brutal-tag--${variant}`,
      `brutal-tag--${size}`,
      { 'brutal-tag--clickable': clickable },
    ]"
    @click="clickable && $emit('click', $event)"
  >
    <slot />
    <span v-if="closable" class="brutal-tag__close" @click.stop="$emit('close')">×</span>
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
// 终端粗野：直角小格 + 等宽大写
.brutal-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--cp-font-mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
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
    border-color: var(--cp-border-bright);
  }
  &--secondary {
    color: var(--cp-color-secondary);
    border-color: var(--cp-color-secondary);
  }
  &--danger {
    color: var(--cp-color-danger);
    border-color: rgba(239, 68, 68, 0.5);
  }
  &--success {
    color: var(--cp-color-success);
    border-color: rgba(74, 222, 128, 0.5);
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
