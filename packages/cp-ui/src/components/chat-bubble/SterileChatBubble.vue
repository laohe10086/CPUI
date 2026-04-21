<template>
  <div
    class="sterile-chat-bubble"
    :class="[`sterile-chat-bubble--${direction}`, `sterile-chat-bubble--${variant}`]"
  >
    <SterileAvatar
      v-if="showAvatar"
      :src="avatarSrc"
      :alt="avatarAlt"
      size="sm"
      :id="avatarId"
      class="sterile-chat-bubble__avatar"
    />
    <div class="sterile-chat-bubble__body">
      <div v-if="header || tag" class="sterile-chat-bubble__header">
        <span v-if="tag" class="sterile-chat-bubble__tag">{{ tag }}</span>
        <span v-if="header" class="sterile-chat-bubble__name">{{ header }}</span>
      </div>
      <div class="sterile-chat-bubble__content">
        <slot />
      </div>
      <div v-if="timestamp || checksum" class="sterile-chat-bubble__footer">
        <span v-if="timestamp" class="sterile-chat-bubble__time">{{ timestamp }}</span>
        <span v-if="checksum" class="sterile-chat-bubble__checksum">CHK:{{ checksum }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatBubbleProps } from '../../types/components'
import SterileAvatar from '../avatar/SterileAvatar.vue'

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
.sterile-chat-bubble {
  display: flex;
  gap: 10px;
  max-width: 80%;
  font-size: 0.9em;

  &--right {
    align-self: flex-end;
    flex-direction: row-reverse;

    .sterile-chat-bubble__body { align-items: flex-end; }
    .sterile-chat-bubble__header { justify-content: flex-end; }
    .sterile-chat-bubble__content {
      background: rgba(184, 160, 0, 0.04);
      border-color: rgba(184, 160, 0, 0.12);
    }
    .sterile-chat-bubble__footer { justify-content: flex-end; }
  }

  &--system .sterile-chat-bubble__content {
    background: var(--cp-bg-elevated);
    border-color: var(--cp-border-bright);
  }
}

.sterile-chat-bubble__avatar {
  flex-shrink: 0;
}

.sterile-chat-bubble__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sterile-chat-bubble__header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--cp-font-sans, 'Inter', sans-serif);
  font-size: 0.8em;
}

.sterile-chat-bubble__tag {
  color: var(--cp-color-secondary);
}

.sterile-chat-bubble__name {
  color: var(--cp-text-muted);
}

.sterile-chat-bubble__content {
  padding: 10px 14px;
  background: var(--cp-bg-elevated);
  border: 1px solid var(--cp-border-base);
  border-radius: 0;
  color: var(--cp-text-secondary);
  line-height: 1.6;
}

.sterile-chat-bubble__footer {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--cp-font-sans, 'Inter', sans-serif);
  font-size: 0.75em;
  color: var(--cp-text-dim);
  padding: 0 2px;
}

.sterile-chat-bubble__checksum {
  color: var(--cp-text-dim);
}
</style>
