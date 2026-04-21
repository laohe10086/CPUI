<template>
  <div class="cyber-filter-bar">
    <button
      v-for="(filter, index) in filters"
      :key="index"
      class="cyber-filter-bar__btn"
      :class="{ 'cyber-filter-bar__btn--active': modelValue === filter.value }"
      @click="$emit('update:modelValue', filter.value)"
    >
      {{ filter.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
export interface FilterItem {
  label: string
  value: string
}

defineProps<{
  filters: FilterItem[]
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style lang="scss" scoped>
.cyber-filter-bar {
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
}

.cyber-filter-bar__btn {
  background: transparent;
  color: var(--cp-color-secondary);
  border: 1px solid var(--cp-color-secondary);
  padding: 0.5rem 1.5rem;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  clip-path: polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%);

  &:hover {
    background: var(--cp-color-secondary);
    color: #000;
    box-shadow: 0 0 15px var(--cp-color-secondary);
  }

  &--active {
    background: var(--cp-color-secondary);
    color: #000;
    box-shadow: 0 0 15px var(--cp-color-secondary);
  }
}
</style>
