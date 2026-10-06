<template>
  <span :class="['modern-bracket-label', `modern-bracket-label--${variant}`]">
    <span class="modern-bracket-label__bracket">[</span>
    <span class="modern-bracket-label__text">{{ text }}</span>
    <span class="modern-bracket-label__bracket">]</span>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  text: string
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
}>()
</script>

<style scoped lang="scss">
.modern-bracket-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--cp-font-family-mono);
  font-size: var(--cp-font-size-sm);
  line-height: 1;
  
  &__bracket {
    color: var(--cp-text-tertiary);
    font-weight: 600;
  }
  
  &__text {
    color: var(--cp-text-primary);
    font-weight: 500;
  }
  
  &--primary {
    .modern-bracket-label__bracket {
      color: var(--cp-primary);
    }
    .modern-bracket-label__text {
      color: var(--cp-primary);
    }
  }
  
  &--secondary {
    .modern-bracket-label__bracket {
      color: var(--cp-secondary);
    }
    .modern-bracket-label__text {
      color: var(--cp-secondary);
    }
  }
  
  &--success {
    .modern-bracket-label__bracket {
      color: var(--cp-success);
    }
    .modern-bracket-label__text {
      color: var(--cp-success);
    }
  }
  
  &--warning {
    .modern-bracket-label__bracket {
      color: var(--cp-warning);
    }
    .modern-bracket-label__text {
      color: var(--cp-warning);
    }
  }
  
  &--error {
    .modern-bracket-label__bracket {
      color: var(--cp-error);
    }
    .modern-bracket-label__text {
      color: var(--cp-error);
    }
  }
}
</style>
