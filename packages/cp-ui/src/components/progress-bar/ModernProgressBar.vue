<template>
  <div class="modern-progress">
    <div class="modern-progress__track" :style="{ height: `${height}px` }">
      <div
        class="modern-progress__fill"
        :style="{ width: `${value}%` }"
      />
    </div>
    <span v-if="showLabel" class="modern-progress__label">{{ value }}%</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  value: number
  height?: number
  showLabel?: boolean
}>(), {
  height: 8,
  showLabel: false,
})
</script>

<style scoped lang="scss">
.modern-progress {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;

  &__track {
    flex: 1;
    background: var(--cp-surface-2);
    border-radius: var(--cp-radius-full);
    overflow: hidden;
    position: relative;
  }

  &__fill {
    height: 100%;
    background: var(--cp-primary);
    border-radius: var(--cp-radius-full);
    transition: width 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &__label {
    font-family: var(--cp-font-family-mono);
    font-size: var(--cp-font-size-xs);
    color: var(--cp-text-secondary);
    min-width: 40px;
    text-align: right;
  }
}
</style>
