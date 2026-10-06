<template>
  <div class="docs-title">
    <h2 class="docs-title__main">{{ title }}</h2>
    <p class="docs-title__desc">{{ desc }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  desc: string
}>()
</script>

<style scoped lang="scss">
.docs-title {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--cp-border);

  &__main {
    margin: 0 0 8px;
    font-size: 28px;
    font-weight: 600;
    color: var(--cp-text-primary);
    font-family: var(--cp-font-family);
  }

  &__desc {
    margin: 0;
    font-size: 14px;
    color: var(--cp-text-secondary);
    line-height: 1.6;
  }
}
</style>
