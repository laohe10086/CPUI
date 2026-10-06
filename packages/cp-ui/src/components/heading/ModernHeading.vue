<template>
  <component :is="level" :class="['modern-heading', `modern-heading--${level}`]">
    <slot />
  </component>
</template>

<script setup lang="ts">
defineProps<{
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}>()
</script>

<style scoped lang="scss">
.modern-heading {
  font-family: var(--cp-font-family);
  font-weight: 600;
  color: var(--cp-text-primary);
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0;
  
  &--h1 {
    font-size: 48px;
    font-weight: 700;
  }
  
  &--h2 {
    font-size: 36px;
    font-weight: 700;
  }
  
  &--h3 {
    font-size: 28px;
  }
  
  &--h4 {
    font-size: 24px;
  }
  
  &--h5 {
    font-size: 20px;
  }
  
  &--h6 {
    font-size: 16px;
  }
}
</style>
