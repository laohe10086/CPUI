<template>
  <div
    class="noir-chat-bubble"
    :class="[`noir-chat-bubble--${direction}`, `noir-chat-bubble--${variant}`]"
  >
    <NoirAvatar
      v-if="showAvatar"
      :src="avatarSrc"
      :alt="avatarAlt"
      size="sm"
      :scanline="avatarScanline"
      :id="avatarId"
      class="noir-chat-bubble__avatar"
    />
    <div class="noir-chat-bubble__body">
      <div v-if="header || tag" class="noir-chat-bubble__header">
        <span v-if="tag" class="noir-chat-bubble__tag">{{ tag }}</span>
        <span v-if="header" class="noir-chat-bubble__name">{{ header }}</span>
      </div>
      <div class="noir-chat-bubble__content">
        <slot />
      </div>
      <div v-if="timestamp || checksum" class="noir-chat-bubble__footer">
        <span v-if="timestamp" class="noir-chat-bubble__time">{{ timestamp }}</span>
        <span v-if="checksum" class="noir-chat-bubble__checksum">CHK:{{ checksum }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatBubbleProps } from '../../types/components'
import NoirAvatar from '../avatar/NoirAvatar.vue'

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
.noir-chat-bubble {
  display: flex;
  gap: 10px;
  max-width: 80%;
  font-size: 0.9em;

  &--right {
    align-self: flex-end;
    flex-direction: row-reverse;

    .noir-chat-bubble__body { align-items: flex-end; }
    .noir-chat-bubble__header { justify-content: flex-end; }
    .noir-chat-bubble__content {
      background: rgba(255, 0, 128, 0.05);
      border-color: var(--cp-color-secondary);
      box-shadow: 0 0 12px var(--cp-glow-secondary);
    }
    .noir-chat-bubble__footer { justify-content: flex-end; }
  }

  &--system .noir-chat-bubble__content {
    background: rgba(0, 240, 255, 0.05);
    border-color: var(--cp-color-primary);
    box-shadow: 0 0 15px var(--cp-glow-primary);
  }
}

.noir-chat-bubble__avatar {
  flex-shrink: 0;
}

.noir-chat-bubble__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.noir-chat-bubble__header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--cp-font-mono);
  font-size: 0.8em;
}

.noir-chat-bubble__tag {
  color: var(--cp-color-primary);
  letter-spacing: 1px;
  text-shadow: 0 0 8px var(--cp-glow-primary);
  text-decoration: underline;
  text-decoration-color: var(--cp-color-secondary);
  text-underline-offset: 2px;
}

.noir-chat-bubble__name {
  color: var(--cp-text-muted);
}

.noir-chat-bubble__content {
  padding: 12px 16px;
  background: var(--cp-bg-elevated);
  border: 2px solid var(--cp-color-primary);
  color: var(--cp-text-secondary);
  line-height: 1.6;
  position: relative;
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  box-shadow: 0 0 12px var(--cp-glow-primary);
  transition: all var(--cp-duration-fast) var(--cp-easing);

  &:hover {
    box-shadow: 0 0 20px var(--cp-glow-primary);
  }
}

.noir-chat-bubble__footer {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--cp-font-mono);
  font-size: 0.7em;
  color: var(--cp-text-dim);
}

.noir-chat-bubble__time {
  letter-spacing: 0.5px;
}

.noir-chat-bubble__checksum {
  opacity: 0.6;
  color: var(--cp-color-secondary);
}
</style>
