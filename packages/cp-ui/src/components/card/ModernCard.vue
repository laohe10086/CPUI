<template>
  <div class="modern-card">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.modern-card {
  background: var(--cp-surface-1);
  border: 1px solid var(--cp-border);
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: all var(--cp-transition);
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    transform: translateY(-2px);
  }
}
</style>
