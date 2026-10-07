<template>
  <div
    class="brutal-chat-bubble"
    :class="[`brutal-chat-bubble--${direction}`, `brutal-chat-bubble--${variant}`]"
  >
    <BrutalAvatar
      v-if="showAvatar"
      :src="avatarSrc"
      :alt="avatarAlt"
      size="sm"
      :id="avatarId"
      class="brutal-chat-bubble__avatar"
    />
    <div class="brutal-chat-bubble__body">
      <div v-if="header || tag" class="brutal-chat-bubble__header">
        <span v-if="tag" class="brutal-chat-bubble__tag">[ {{ tag }} ]</span>
        <span v-if="header" class="brutal-chat-bubble__name">{{ header }}</span>
      </div>
      <div class="brutal-chat-bubble__content">
        <slot />
      </div>
      <div v-if="timestamp || checksum" class="brutal-chat-bubble__footer">
        <span v-if="timestamp" class="brutal-chat-bubble__time">{{ timestamp }}</span>
        <span v-if="checksum" class="brutal-chat-bubble__checksum">CHK:{{ checksum }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatBubbleProps } from '../../types/components'
import BrutalAvatar from '../avatar/BrutalAvatar.vue'

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
.brutal-chat-bubble {
  display: flex;
  gap: 10px;
  max-width: 80%;
  font-size: 0.9em;

  &--right {
    align-self: flex-end;
    flex-direction: row-reverse;

    .brutal-chat-bubble__body { align-items: flex-end; }
    .brutal-chat-bubble__header { justify-content: flex-end; }
    .brutal-chat-bubble__footer { justify-content: flex-end; }
  }
}

.brutal-chat-bubble__avatar {
  flex-shrink: 0;
}

.brutal-chat-bubble__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.brutal-chat-bubble__header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--cp-font-mono);
  font-size: 0.75em;
}

.brutal-chat-bubble__tag {
  color: var(--cp-text-primary);
  letter-spacing: 1px;
  font-weight: 700;
}

.brutal-chat-bubble__name {
  color: var(--cp-text-muted);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.brutal-chat-bubble__content {
  padding: 12px 16px;
  background: var(--cp-bg-elevated);
  border: 2px solid var(--cp-border-base);
  color: var(--cp-text-primary);
  line-height: 1.6;
  font-family: var(--cp-font-mono);
  transition: border-color var(--cp-duration-fast) var(--cp-easing);

  .brutal-chat-bubble--right & {
    border-color: var(--cp-text-primary);
  }

  .brutal-chat-bubble--system & {
    border-color: var(--cp-color-primary);
  }
}

.brutal-chat-bubble__footer {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--cp-font-mono);
  font-size: 0.7em;
  color: var(--cp-text-muted);
  font-weight: 700;
}

.brutal-chat-bubble__time {
  letter-spacing: 0.5px;
}

.brutal-chat-bubble__checksum {
  opacity: 0.7;
}
</style>
