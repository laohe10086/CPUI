<template>
  <div
    class="cyber-chat-bubble"
    :class="[`cyber-chat-bubble--${direction}`, `cyber-chat-bubble--${variant}`]"
  >
    <CyberAvatar
      v-if="showAvatar"
      :src="avatarSrc"
      :alt="avatarAlt"
      size="sm"
      :scanline="avatarScanline"
      :id="avatarId"
      class="cyber-chat-bubble__avatar"
    />
    <div class="cyber-chat-bubble__body">
      <div v-if="header || tag" class="cyber-chat-bubble__header">
        <span v-if="tag" class="cyber-chat-bubble__tag">{{ tag }}</span>
        <span v-if="header" class="cyber-chat-bubble__name">{{ header }}</span>
      </div>
      <div class="cyber-chat-bubble__content">
        <slot />
      </div>
      <div v-if="timestamp || checksum" class="cyber-chat-bubble__footer">
        <span v-if="timestamp" class="cyber-chat-bubble__time">{{ timestamp }}</span>
        <span v-if="checksum" class="cyber-chat-bubble__checksum">CHK:{{ checksum }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatBubbleProps } from '../../types/components'
import CyberAvatar from '../avatar/CyberAvatar.vue'

withDefaults(defineProps<ChatBubbleProps>(), {
  direction: 'left',
  variant: 'default',
  showAvatar: false,
  avatarSrc: '',
  avatarAlt: '',
  avatarScanline: false,
  avatarId: '',
  header: '',
  tag: '',
  timestamp: '',
  checksum: '',
})
</script>

<style lang="scss" scoped>
.cyber-chat-bubble {
  display: flex;
  gap: 10px;
  max-width: 80%;
  font-size: 0.9em;

  &--right {
    align-self: flex-end;
    flex-direction: row-reverse;

    .cyber-chat-bubble__body { align-items: flex-end; }
    .cyber-chat-bubble__header { justify-content: flex-end; }
    .cyber-chat-bubble__content {
      background: rgba(255, 140, 0, 0.08);
      border-color: rgba(255, 140, 0, 0.2);
      box-shadow: 0 0 8px rgba(255, 140, 0, 0.05);
    }
    .cyber-chat-bubble__footer { justify-content: flex-end; }
  }

  &--system .cyber-chat-bubble__content {
    background: rgba(0, 240, 255, 0.05);
    border-color: rgba(0, 240, 255, 0.15);
    box-shadow: 0 0 8px rgba(0, 240, 255, 0.05);
  }
}

.cyber-chat-bubble__avatar {
  flex-shrink: 0;
}

.cyber-chat-bubble__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cyber-chat-bubble__header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--cp-font-mono);
  font-size: 0.8em;
}

.cyber-chat-bubble__tag {
  color: var(--cp-color-secondary);
  letter-spacing: 1px;
  text-shadow: 0 0 6px var(--cp-glow-secondary);
}

.cyber-chat-bubble__name {
  color: var(--cp-text-muted);
}

.cyber-chat-bubble__content {
  padding: 10px 14px;
  background: var(--cp-bg-elevated);
  border: 1px solid var(--cp-border-base);
  color: var(--cp-text-secondary);
  line-height: 1.6;
  position: relative;
  transition: border-color var(--cp-duration-fast) var(--cp-easing),
              box-shadow var(--cp-duration-fast) var(--cp-easing);

  /* 左上斜切 */
  clip-path: polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 6px);
}

.cyber-chat-bubble__footer {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--cp-font-mono);
  font-size: 0.75em;
  color: var(--cp-text-dim);
  padding: 0 2px;
}

.cyber-chat-bubble__checksum {
  color: var(--cp-text-dim);
  letter-spacing: 1px;
}
</style>
