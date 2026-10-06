<template>
  <div class="modern-progress">
    <div class="modern-progress__track">
      <div 
        class="modern-progress__fill"
        :style="{ width: `${value}%` }"
      />
    </div>
    <span v-if="showLabel" class="modern-progress__label">{{ value }}%</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: number
  showLabel?: boolean
}>()
</script>

<style scoped lang="scss">
.modern-progress {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  
  &__track {
    flex: 1;
    height: 8px;
    background: var(--cp-surface-2);
    border-radius: var(--cp-radius-full);
    overflow: hidden;
    position: relative;
  }
  
  &__fill {
    height: 100%;
    background: linear-gradient(90deg, var(--cp-primary), var(--cp-secondary));
    border-radius: var(--cp-radius-full);
    transition: width 0.3s var(--cp-transition);
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
