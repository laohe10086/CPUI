<template>
  <div :class="['modern-chip', `modern-chip--${variant}`, { 'modern-chip--closable': closable }]">
    <span class="modern-chip__text"><slot>{{ text }}</slot></span>
    <button v-if="closable" class="modern-chip__close" @click="handleClose">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  variant?: 'default' | 'primary' | 'danger'
  closable?: boolean
}

withDefaults(defineProps<Props>(), {
  text: '',
  variant: 'default',
  closable: false,
})

const emit = defineEmits<{
  close: []
}>()

const handleClose = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.modern-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  font-family: var(--cp-font-family);
  letter-spacing: -0.01em;
  border-radius: 9999px;
  transition: all var(--cp-transition);

  &--default {
    color: var(--cp-text-primary);
    background: var(--cp-surface-1);
    border: 1px solid var(--cp-border);

    &:hover {
      background: var(--cp-surface-2);
      border-color: var(--cp-primary);
    }
  }

  &--primary {
    color: #ffffff;
    background: var(--cp-primary);
    border: 1px solid transparent;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

    &:hover {
      background: var(--cp-primary-hover);
    }
  }

  &--danger {
    color: #ffffff;
    background: var(--cp-error);
    border: 1px solid transparent;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

    &:hover {
      background: #dc2626;
    }
  }

  &--closable {
    padding-right: 8px;
  }

  &__text {
    line-height: 1;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    padding: 0;
    color: currentColor;
    opacity: 0.7;
    background: transparent;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all var(--cp-transition);

    &:hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.15);
    }

    &:active {
      transform: scale(0.9);
    }
  }
}
</style>
