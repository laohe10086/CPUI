<template>
  <Transition name="cp-toc">
    <div v-if="modelValue" class="cp-toc">
      <div class="cp-toc__header">
        <span class="cp-toc__title">{{ title }}</span>
        <button class="cp-toc__close" @click="emit('update:modelValue', false)">✕</button>
      </div>
      <div class="cp-toc__list">
        <button
          v-for="(chapter, i) in chapters"
          :key="i"
          class="cp-toc__item"
          :class="{ 'cp-toc__item--active': activeIndex === i }"
          @click="emit('select', i)"
        >
          <span class="cp-toc__index">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="cp-toc__name">{{ chapter }}</span>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: boolean
  chapters: string[]
  activeIndex?: number
  title?: string
}>(), {
  activeIndex: -1,
  title: 'CONTENTS',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  select: [index: number]
}>()
</script>

<style lang="scss" scoped>
.cp-toc {
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  z-index: 200;
  background: var(--cp-bg-panel);
  border-left: 1px solid var(--cp-color-primary);
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
}

.cp-toc__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--cp-border-base);
}

.cp-toc__title {
  font-family: var(--cp-font-mono);
  font-size: 0.9em;
  color: var(--cp-color-primary);
  letter-spacing: 2px;
}

.cp-toc__close {
  background: none;
  border: none;
  color: var(--cp-text-muted);
  cursor: pointer;
  font-size: 1em;
  padding: 4px;
  transition: color var(--cp-duration-fast);

  &:hover { color: var(--cp-color-danger); }
}

.cp-toc__list {
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;

  &::-webkit-scrollbar { width: 3px; }
  &::-webkit-scrollbar-thumb { background: var(--cp-border-base); }
}

.cp-toc__item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 20px;
  background: none;
  border: none;
  color: var(--cp-text-muted);
  cursor: pointer;
  font-family: var(--cp-font-mono);
  font-size: 0.85em;
  text-align: left;
  transition: all var(--cp-duration-fast) var(--cp-easing);

  &:hover {
    background: rgba(252, 232, 3, 0.03);
    color: var(--cp-text-secondary);
  }

  &--active {
    color: var(--cp-color-primary);
    background: rgba(252, 232, 3, 0.06);
    border-left: 2px solid var(--cp-color-primary);
  }
}

.cp-toc__index {
  color: var(--cp-text-dim);
  font-size: 0.85em;
}

.cp-toc-enter-active,
.cp-toc-leave-active {
  transition: transform var(--cp-duration-base) var(--cp-easing);
}
.cp-toc-enter-from,
.cp-toc-leave-to {
  transform: translateX(100%);
}
</style>
