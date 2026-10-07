<template>
  <span :class="['modern-bracket-label', `modern-bracket-label--${variant}`]">
    <span class="modern-bracket-label__bracket">[</span>
    <span class="modern-bracket-label__text"><slot>{{ text }}</slot></span>
    <span class="modern-bracket-label__bracket">]</span>
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  text?: string
  variant?: 'default' | 'accent' | 'muted' | 'danger' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
}>(), {
  text: '',
  variant: 'default',
})
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

  &--accent,
  &--primary {
    .modern-bracket-label__bracket,
    .modern-bracket-label__text {
      color: var(--cp-primary);
    }
  }

  &--secondary {
    .modern-bracket-label__bracket,
    .modern-bracket-label__text {
      color: var(--cp-secondary);
    }
  }

  &--muted {
    .modern-bracket-label__bracket,
    .modern-bracket-label__text {
      color: var(--cp-text-tertiary);
    }
  }

  &--success {
    .modern-bracket-label__bracket,
    .modern-bracket-label__text {
      color: var(--cp-success);
    }
  }

  &--warning {
    .modern-bracket-label__bracket,
    .modern-bracket-label__text {
      color: var(--cp-warning);
    }
  }

  &--danger,
  &--error {
    .modern-bracket-label__bracket,
    .modern-bracket-label__text {
      color: var(--cp-error);
    }
  }
}
</style>
