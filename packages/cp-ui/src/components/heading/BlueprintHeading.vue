<template>
  <div class="blueprint-heading">
    <component :is="level" class="blueprint-heading__text">
      <slot />
    </component>
    <div class="blueprint-heading__dimension">
      <span class="blueprint-heading__line"></span>
      <span class="blueprint-heading__label">{{ dimensionLabel }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HeadingProps } from '../../types/components'

const props = withDefaults(defineProps<HeadingProps>(), {
  level: 'h2',
})

const dimensionLabel = computed(() => {
  const sizes: Record<string, string> = {
    h1: '32pt',
    h2: '24pt',
    h3: '18pt',
    h4: '16pt',
    h5: '14pt',
    h6: '12pt',
  }
  return sizes[props.level] || '24pt'
})
</script>

<style lang="scss" scoped>
.blueprint-heading {
  position: relative;
  display: inline-block;
  margin: 0 0 16px 0;

  &__text {
    font-family: var(--cp-font-mono);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--cp-text-primary);
    margin: 0;
    padding-right: 60px;
  }

  &__dimension {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__line {
    width: 40px;
    height: 1px;
    background: var(--cp-border-base);
    position: relative;
    
    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 1px;
      height: 5px;
      background: var(--cp-border-base);
      top: 50%;
      transform: translateY(-50%);
    }
    
    &::before { left: 0; }
    &::after { right: 0; }
  }

  &__label {
    font-family: var(--cp-font-mono);
    font-size: 9px;
    color: var(--cp-text-dim);
  }
}
</style>
