<template>
  <button class="cp-tool-btn" :title="title" @click="emit('click', $event)">
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
}>(), {
  title: '',
})

const emit = defineEmits<{
  click: [e: MouseEvent]
}>()
</script>

<style lang="scss" scoped>
.cp-tool-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cp-bg-elevated);
  border: 1px solid var(--cp-border-base);
  color: var(--cp-text-secondary);
  cursor: pointer;
  font-size: 1.1em;
  clip-path: polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px);
  transition: all var(--cp-duration-fast) var(--cp-easing);

  &:hover {
    border-color: var(--cp-color-secondary);
    color: var(--cp-color-secondary);
    background: rgba(0, 240, 255, 0.05);
  }
}
</style>
