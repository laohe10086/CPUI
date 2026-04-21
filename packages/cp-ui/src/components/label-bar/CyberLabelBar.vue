<template>
  <div class="cyber-label-bar">
    <span class="cyber-label-bar__text">{{ text }}</span>
    <span class="cyber-label-bar__barcode" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<style lang="scss" scoped>
.cyber-label-bar {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px;
  background: var(--cp-color-primary);
  font-family: var(--cp-font-mono);
  font-size: 0.75em;
  font-weight: 700;
  color: var(--cp-bg-void);
  letter-spacing: 1px;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  animation: cp-label-pulse 2s ease-in-out infinite;

  &::after {
    content: '//';
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.7em;
    opacity: 0.3;
    letter-spacing: 0;
  }
}

.cyber-label-bar__text {
  white-space: nowrap;
}

.cyber-label-bar__barcode {
  display: inline-block;
  width: 60px;
  height: 14px;
  background: repeating-linear-gradient(
    90deg,
    var(--cp-bg-void) 0px,
    var(--cp-bg-void) 2px,
    transparent 2px,
    transparent 4px
  );
  opacity: 0.4;
}

@keyframes cp-label-pulse {
  0%, 100% {
    box-shadow: 0 0 4px rgba(252, 232, 3, 0.2);
  }
  50% {
    box-shadow: 0 0 12px rgba(252, 232, 3, 0.4), 0 0 24px rgba(252, 232, 3, 0.15);
  }
}
</style>
