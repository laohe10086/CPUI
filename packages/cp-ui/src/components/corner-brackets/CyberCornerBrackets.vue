<template>
  <div class="cyber-corner-brackets">
    <div class="cyber-corner-brackets__corner cyber-corner-brackets__corner--tl" />
    <div class="cyber-corner-brackets__corner cyber-corner-brackets__corner--tr" />
    <div class="cyber-corner-brackets__corner cyber-corner-brackets__corner--bl" />
    <div class="cyber-corner-brackets__corner cyber-corner-brackets__corner--br" />
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.cyber-corner-brackets {
  position: relative;
}

.cyber-corner-brackets__corner {
  position: absolute;
  width: 16px;
  height: 16px;
  pointer-events: none;
  transition: all var(--cp-duration-base) var(--cp-easing);

  .cyber-corner-brackets:hover & {
    width: 20px;
    height: 20px;
  }

  &--tl {
    top: -1px; left: -1px;
    border-top: 2px solid var(--cp-color-secondary);
    border-left: 2px solid var(--cp-color-secondary);
  }
  &--tr {
    top: -1px; right: -1px;
    border-top: 2px solid var(--cp-color-secondary);
    border-right: 2px solid var(--cp-color-secondary);
  }
  &--bl {
    bottom: -1px; left: -1px;
    border-bottom: 2px solid var(--cp-color-secondary);
    border-left: 2px solid var(--cp-color-secondary);
  }
  &--br {
    bottom: -1px; right: -1px;
    border-bottom: 2px solid var(--cp-color-secondary);
    border-right: 2px solid var(--cp-color-secondary);
  }
}
</style>
