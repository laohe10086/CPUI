<template>
  <span class="modern-badge">
    {{ text }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  text: string | number
}>()
</script>

<style scoped lang="scss">
.modern-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  font-size: 11px;
  font-weight: 600;
  background: var(--cp-primary);
  color: #ffffff;
  border-radius: 9999px;
  font-family: var(--cp-font-family);
  letter-spacing: -0.01em;
}
</style>
