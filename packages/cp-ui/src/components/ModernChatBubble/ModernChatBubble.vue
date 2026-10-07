<template>
  <div
    class="modern-chat-bubble"
    :class="[`modern-chat-bubble--${direction}`, `modern-chat-bubble--${variant}`]"
  >
    <span v-if="showAvatar" class="modern-chat-bubble__avatar">{{ avatarId || avatarAlt || 'U' }}</span>
    <div class="modern-chat-bubble__body">
      <div v-if="header || tag" class="modern-chat-bubble__header">
        <span v-if="tag" class="modern-chat-bubble__tag">{{ tag }}</span>
        <span v-if="header" class="modern-chat-bubble__name">{{ header }}</span>
      </div>
      <div class="modern-chat-bubble__content">
        <slot />
      </div>
      <div v-if="timestamp || checksum" class="modern-chat-bubble__footer">
        <span v-if="timestamp" class="modern-chat-bubble__time">{{ timestamp }}</span>
        <span v-if="checksum" class="modern-chat-bubble__checksum">CHK:{{ checksum }}</span>
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
.modern-chat-bubble {
  display: flex;
  gap: 10px;
  max-width: 80%;
  font-family: var(--cp-font-family);
  font-size: var(--cp-font-size-sm);

  &--right {
    align-self: flex-end;
    flex-direction: row-reverse;

    .modern-chat-bubble__body { align-items: flex-end; }
    .modern-chat-bubble__header { justify-content: flex-end; }
    .modern-chat-bubble__content {
      background: var(--cp-primary-subtle);
      border-color: rgba(94, 106, 210, 0.25);
    }
    .modern-chat-bubble__footer { justify-content: flex-end; }
  }

  &--system .modern-chat-bubble__content {
    border-color: var(--cp-primary);
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
    color: #ffffff;
    background: var(--cp-primary);
    border-radius: 50%;
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
    color: var(--cp-primary);
    background: var(--cp-primary-subtle);
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
    border-radius: var(--cp-radius-lg);
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
