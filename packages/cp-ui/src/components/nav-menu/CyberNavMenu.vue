<template>
  <nav class="cyber-nav-menu">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="cyber-nav-menu__item"
      :class="{
        'cyber-nav-menu__item--active': index === activeIndex,
        'cyber-nav-menu__item--danger': item.danger,
        'cyber-nav-menu__item--disabled': item.disabled,
      }"
      @click="!item.disabled && $emit('select', index)"
      @mouseenter="hoveredIndex = index"
      @mouseleave="hoveredIndex = null"
    >
      <span class="cyber-nav-menu__text">{{ item.text }}</span>
      <span class="cyber-nav-menu__icon">{{ item.icon || '>' }}</span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface NavMenuItem {
  text: string
  icon?: string
  danger?: boolean
  disabled?: boolean
}

withDefaults(defineProps<{
  items: NavMenuItem[]
  activeIndex?: number
}>(), {
  activeIndex: 0,
})

defineEmits<{
  select: [index: number]
}>()

const hoveredIndex = ref<number | null>(null)
</script>

<style lang="scss" scoped>
.cyber-nav-menu {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cyber-nav-menu__item {
  background: transparent;
  border: 1px solid #333;
  padding: 1rem;
  color: #888;
  font-family: 'Oswald', sans-serif;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background: var(--cp-color-secondary);
    opacity: 0;
    transition: opacity 0.1s;
  }

  &:hover:not(.cyber-nav-menu__item--disabled) {
    background: var(--cp-color-primary);
    color: #000;
    border-color: var(--cp-color-primary);
    transform: translateX(10px);
    font-weight: 700;
    box-shadow: -5px 5px 0px var(--cp-color-danger);

    &::before { opacity: 1; }
    .cyber-nav-menu__icon { transform: rotate(90deg); }
  }

  &--active {
    background: var(--cp-color-primary);
    color: #000;
    border-color: var(--cp-color-primary);
    transform: translateX(10px);
    font-weight: 700;
    box-shadow: -5px 5px 0px var(--cp-color-danger);
    position: relative;

    &::before { opacity: 1; }

    &::after {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, var(--cp-color-primary), var(--cp-color-danger), var(--cp-color-secondary));
      z-index: -1;
      opacity: 0.7;
      animation: nav-glow 3s ease-in-out infinite;
    }
  }

  &--danger {
    border-color: var(--cp-color-danger);
    color: var(--cp-color-danger);

    &:hover {
      background: var(--cp-color-danger);
      color: #000;
      box-shadow: -5px 5px 0px var(--cp-color-primary);
    }

    .cyber-nav-menu__icon {
      color: var(--cp-color-danger);
      animation: danger-blink 2s infinite;
    }
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(100%);

    &:hover {
      background: transparent;
      color: #888;
      border-color: #333;
      transform: none;
      box-shadow: none;
    }
  }
}

.cyber-nav-menu__text {
  flex: 1;
  transition: all 0.3s ease;
}

.cyber-nav-menu__icon {
  font-weight: bold;
  transition: all 0.3s ease;
}

@keyframes nav-glow {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 0.3; }
}

@keyframes danger-blink {
  0%, 90%, 100% { opacity: 1; }
  95% { opacity: 0.3; }
}
</style>
