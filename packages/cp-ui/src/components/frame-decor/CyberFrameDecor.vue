<template>
  <div class="cyber-frame">
    <div class="cyber-frame__corner cyber-frame__corner--tl" />
    <div class="cyber-frame__corner cyber-frame__corner--tr" />
    <div class="cyber-frame__corner cyber-frame__corner--bl" />
    <div class="cyber-frame__corner cyber-frame__corner--br" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.cyber-frame {
  position: relative;
}

.cyber-frame__corner {
  position: absolute;
  width: 24px;
  height: 24px;
  pointer-events: none;
  filter: drop-shadow(0 0 3px var(--cp-color-secondary));

  &--tl {
    top: 0;
    left: 0;
    border-top: 2px solid var(--cp-color-secondary);
    border-left: 2px solid var(--cp-color-secondary);
  }

  &--tr {
    top: 0;
    right: 0;
    border-top: 2px solid var(--cp-color-secondary);
    border-right: 2px solid var(--cp-color-secondary);
  }

  &--bl {
    bottom: 0;
    left: 0;
    border-bottom: 2px solid var(--cp-color-secondary);
    border-left: 2px solid var(--cp-color-secondary);
  }

  &--br {
    bottom: 0;
    right: 0;
    border-bottom: 2px solid var(--cp-color-secondary);
    border-right: 2px solid var(--cp-color-secondary);
  }
}
</style>
