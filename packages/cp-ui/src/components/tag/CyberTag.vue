<template>
  <span
    class="cyber-tag"
    :class="[
      `cyber-tag--${variant}`,
      `cyber-tag--${size}`,
      { 'cyber-tag--clickable': clickable },
      { 'cyber-tag--cut': shape === 'cut' },
      { 'cyber-tag--irregular': shape === 'irregular' },
      { 'cyber-tag--regular': shape === 'regular' },
    ]"
    @click="clickable && $emit('click', $event)"
  >
    <slot />
    <span v-if="closable" class="cyber-tag__close" @click.stop="$emit('close')">x</span>
  </span>
</template>

<script setup lang="ts">
import type { TagProps } from '../../types/components'

withDefaults(defineProps<TagProps>(), {
  variant: 'default',
  size: 'md',
  closable: false,
  clickable: false,
  shape: 'irregular',
})

defineEmits<{
  click: [e: MouseEvent]
  close: []
}>()
</script>

<style lang="scss" scoped>
.cyber-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--cp-font-mono);
  border: 1px solid var(--cp-border-base);
  border-left: 2px solid transparent;
  white-space: nowrap;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -2px;
    top: 4px;
    bottom: 4px;
    width: 2px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--cp-color-secondary);
    opacity: 0;
    transition: opacity var(--cp-duration-fast) var(--cp-easing);
  }

  &:hover::after {
    opacity: 0.2;
  }

  &--sm {
    padding: 2px 8px;
    font-size: 11px;
  }
  &--md {
    padding: 3px 10px;
    font-size: 12px;
  }

  &--cut {
    clip-path: var(--cp-cut-corner-sm);
  }
  &--irregular,
  &--regular {
    /* 保持原样，无额外形状 */
  }

  &--default {
    background: transparent;
    color: var(--cp-text-secondary);
    border-color: var(--cp-border-base);
    border-left-color: transparent;
    &::before { background: var(--cp-text-muted); }
  }
  &--primary {
    background: rgba(252, 232, 3, 0.15);
    color: var(--cp-color-primary);
    border-color: rgba(252, 232, 3, 0.3);
    border-left-color: transparent;
    &::before { background: var(--cp-color-primary); box-shadow: 0 0 6px var(--cp-glow-primary); }
  }
  &--secondary {
    background: rgba(0, 240, 255, 0.15);
    color: var(--cp-color-secondary);
    border-color: rgba(0, 240, 255, 0.3);
    border-left-color: transparent;
    &::before { background: var(--cp-color-secondary); box-shadow: 0 0 6px var(--cp-glow-secondary); }
  }
  &--danger {
    background: rgba(255, 0, 60, 0.15);
    color: var(--cp-color-danger);
    border-color: rgba(255, 0, 60, 0.3);
    border-left-color: transparent;
    &::before { background: var(--cp-color-danger); box-shadow: 0 0 6px var(--cp-glow-danger); }
  }
  &--success {
    background: rgba(0, 255, 65, 0.15);
    color: var(--cp-color-success);
    border-color: rgba(0, 255, 65, 0.3);
    border-left-color: transparent;
    &::before { background: var(--cp-color-success); box-shadow: 0 0 6px rgba(0, 255, 65, 0.4); }
  }

  &--clickable {
    cursor: pointer;
    transition: all var(--cp-duration-fast) var(--cp-easing);
    &:hover {
      box-shadow: 0 0 10px var(--cp-glow-primary);
      transform: translateY(-1px);
    }
  }

  &__close {
    cursor: pointer;
    opacity: 0.5;
    &:hover { opacity: 1; }
  }
}
</style>
