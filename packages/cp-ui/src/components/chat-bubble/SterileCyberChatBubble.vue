<template>
  <div
    class="sc-chat-bubble"
    :class="[`sc-chat-bubble--${direction}`, `sc-chat-bubble--${variant}`]"
  >
    <SterileCyberAvatar
      v-if="showAvatar"
      :src="avatarSrc"
      :alt="avatarAlt"
      size="sm"
      :scanline="avatarScanline"
      :id="avatarId"
      class="sc-chat-bubble__avatar"
    />
    <div class="sc-chat-bubble__body">
      <div v-if="header || tag" class="sc-chat-bubble__header">
        <span v-if="tag" class="sc-chat-bubble__tag">{{ tag }}</span>
        <span v-if="header" class="sc-chat-bubble__name">{{ header }}</span>
      </div>
      <div class="sc-chat-bubble__content">
        <slot />
      </div>
      <div v-if="timestamp || checksum" class="sc-chat-bubble__footer">
        <span v-if="timestamp" class="sc-chat-bubble__time">{{ timestamp }}</span>
        <span v-if="checksum" class="sc-chat-bubble__checksum">CHK:{{ checksum }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatBubbleProps } from '../../types/components'
import SterileCyberAvatar from '../avatar/SterileCyberAvatar.vue'

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
.sc-chat-bubble {
  display: flex;
  gap: 10px;
  max-width: 80%;
  font-size: 0.9em;

  &--right {
    align-self: flex-end;
    flex-direction: row-reverse;

    .sc-chat-bubble__body { align-items: flex-end; }
    .sc-chat-bubble__header { justify-content: flex-end; }
    .sc-chat-bubble__content {
      background: rgba(255, 140, 0, 0.06);
      border-color: rgba(255, 140, 0, 0.15);
    }
    .sc-chat-bubble__footer { justify-content: flex-end; }
  }

  &--system .sc-chat-bubble__content {
    background: rgba(0, 240, 255, 0.04);
    border-color: rgba(0, 240, 255, 0.12);
  }
}

.sc-chat-bubble__avatar {
  flex-shrink: 0;
}

.sc-chat-bubble__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sc-chat-bubble__header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--cp-font-mono);
  font-size: 0.8em;
}

.sc-chat-bubble__tag {
  color: var(--cp-color-secondary);
  letter-spacing: 1px;
  text-shadow: 0 0 4px var(--cp-glow-secondary);
}

.sc-chat-bubble__name {
  color: var(--cp-text-muted);
}

.sc-chat-bubble__content {
  padding: 10px 14px;
  background: var(--cp-bg-elevated);
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  color: var(--cp-text-secondary);
  line-height: 1.6;
  transition: border-color var(--cp-duration-fast) var(--cp-easing);
}

.sc-chat-bubble__footer {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--cp-font-mono);
  font-size: 0.75em;
  color: var(--cp-text-dim);
  padding: 0 2px;
}

.sc-chat-bubble__checksum {
  color: var(--cp-text-dim);
  letter-spacing: 1px;
}
</style>
