<template>
  <div
    class="cyber-modern-chat-bubble"
    :class="[`cyber-modern-chat-bubble--${direction}`, `cyber-modern-chat-bubble--${variant}`]"
  >
    <span v-if="showAvatar" class="cyber-modern-chat-bubble__avatar">{{ avatarId || avatarAlt || 'U' }}</span>
    <div class="cyber-modern-chat-bubble__body">
      <div v-if="header || tag" class="cyber-modern-chat-bubble__header">
        <span v-if="tag" class="cyber-modern-chat-bubble__tag">{{ tag }}</span>
        <span v-if="header" class="cyber-modern-chat-bubble__name">{{ header }}</span>
      </div>
      <div class="cyber-modern-chat-bubble__content">
        <slot />
      </div>
      <div v-if="timestamp || checksum" class="cyber-modern-chat-bubble__footer">
        <span v-if="timestamp" class="cyber-modern-chat-bubble__time">{{ timestamp }}</span>
        <span v-if="checksum" class="cyber-modern-chat-bubble__checksum">CHK:{{ checksum }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatBubbleProps } from '../../types/components'

withDefaults(defineProps<ChatBubbleProps>(), {
  direction: 'left',
  variant: 'default',
  showAvatar: false,
  avatarSrc: '',
  avatarAlt: '',
  avatarId: '',
  header: '',
  tag: '',
  timestamp: '',
  checksum: '',
})
</script>

<style scoped lang="scss">
.cyber-modern-chat-bubble {
  display: flex;
  gap: 10px;
  max-width: 80%;
  font-family: var(--cp-font-family);
  font-size: var(--cp-font-size-sm);

  &--right {
    align-self: flex-end;
    flex-direction: row-reverse;

    .cyber-modern-chat-bubble__body { align-items: flex-end; }
    .cyber-modern-chat-bubble__header { justify-content: flex-end; }
    .cyber-modern-chat-bubble__content {
      background: var(--cp-primary-subtle);
      border-color: var(--cp-primary);
      box-shadow: 0 0 16px var(--cp-primary-subtle);
    }
    .cyber-modern-chat-bubble__footer { justify-content: flex-end; }
  }

  &--system .cyber-modern-chat-bubble__content {
    border-color: var(--cp-secondary);
    box-shadow: 0 0 16px var(--cp-secondary-subtle);
  }

  &__avatar {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    font-size: 11px;
    font-weight: 600;
    color: var(--cp-background);
    background: var(--cp-primary);
    border-radius: 50%;
    box-shadow: 0 0 12px var(--cp-primary-subtle);
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--cp-font-size-xs);
  }

  &__tag {
    padding: 1px 6px;
    color: var(--cp-secondary);
    background: var(--cp-secondary-subtle);
    border: 1px solid var(--cp-secondary);
    border-radius: var(--cp-radius-full);
    font-weight: 500;
  }

  &__name {
    color: var(--cp-text-tertiary);
  }

  &__content {
    padding: 10px 14px;
    background: var(--cp-surface-2);
    border: 1px solid var(--cp-border);
    border-radius: var(--cp-radius-md);
    color: var(--cp-text-primary);
    line-height: 1.6;
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 11px;
    color: var(--cp-text-tertiary);
    padding: 0 2px;
  }
}
</style>
