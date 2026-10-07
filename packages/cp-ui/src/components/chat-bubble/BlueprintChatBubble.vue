<template>
  <div
    class="blueprint-chat-bubble"
    :class="[`blueprint-chat-bubble--${direction}`, `blueprint-chat-bubble--${variant}`]"
  >
    <BlueprintAvatar
      v-if="showAvatar"
      :src="avatarSrc"
      :alt="avatarAlt"
      size="sm"
      :id="avatarId"
      class="blueprint-chat-bubble__avatar"
    />
    <div class="blueprint-chat-bubble__body">
      <div v-if="header || tag" class="blueprint-chat-bubble__header">
        <span v-if="tag" class="blueprint-chat-bubble__tag">▪ {{ tag }}</span>
        <span v-if="header" class="blueprint-chat-bubble__name">{{ header }}</span>
      </div>
      <div class="blueprint-chat-bubble__content">
        <slot />
      </div>
      <div v-if="timestamp || checksum" class="blueprint-chat-bubble__footer">
        <span v-if="timestamp" class="blueprint-chat-bubble__time">{{ timestamp }}</span>
        <span v-if="checksum" class="blueprint-chat-bubble__checksum">CHK:{{ checksum }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatBubbleProps } from '../../types/components'
import BlueprintAvatar from '../avatar/BlueprintAvatar.vue'

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
.blueprint-chat-bubble {
  display: flex;
  gap: 10px;
  max-width: 80%;
  font-size: 0.9em;

  &--right {
    align-self: flex-end;
    flex-direction: row-reverse;

    .blueprint-chat-bubble__body { align-items: flex-end; }
    .blueprint-chat-bubble__header { justify-content: flex-end; }
    .blueprint-chat-bubble__content {
      border-color: var(--cp-color-secondary);
    }
    .blueprint-chat-bubble__footer { justify-content: flex-end; }
  }

  &--system .blueprint-chat-bubble__content {
    border-color: var(--cp-color-primary);
  }
}

.blueprint-chat-bubble__avatar {
  flex-shrink: 0;
}

.blueprint-chat-bubble__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.blueprint-chat-bubble__header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--cp-font-mono);
  font-size: 0.75em;
}

.blueprint-chat-bubble__tag {
  color: var(--cp-color-primary);
  letter-spacing: 0.5px;
}

.blueprint-chat-bubble__name {
  color: var(--cp-text-muted);
  letter-spacing: 0.5px;
}

.blueprint-chat-bubble__content {
  padding: 12px 16px;
  background: var(--cp-bg-elevated);
  border: 1px solid var(--cp-border-base);
  color: var(--cp-text-secondary);
  line-height: 1.6;
  position: relative;
  transition: border-color var(--cp-duration-fast) var(--cp-easing);

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border: 1px solid var(--cp-border-base);
  }

  &::before {
    left: 0;
    top: 0;
    border-right: 0;
    border-bottom: 0;
  }

  &::after {
    right: 0;
    bottom: 0;
    border-left: 0;
    border-top: 0;
  }
}

.blueprint-chat-bubble__footer {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--cp-font-mono);
  font-size: 0.7em;
  color: var(--cp-text-dim);
}

.blueprint-chat-bubble__time {
  letter-spacing: 0.5px;
}

.blueprint-chat-bubble__checksum {
  opacity: 0.6;
}
</style>
