<template>
  <aside class="cyber-sidebar" :style="{ width: width + 'px' }">
    <div class="cyber-sidebar__header-bar">{{ headerText }}</div>
    <div class="cyber-sidebar__profile">
      <slot name="profile" />
    </div>
    <div class="cyber-sidebar__nav">
      <slot name="nav" />
    </div>
    <div class="cyber-sidebar__stats">
      <slot name="stats" />
    </div>
    <div class="cyber-sidebar__footer">
      <slot name="footer" />
    </div>
    <slot />
  </aside>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  width?: number
  headerText?: string
}>(), {
  width: 380,
  headerText: 'USER_ID: GHOST // NETWATCH_VERIFIED',
})
</script>

<style lang="scss" scoped>
.cyber-sidebar {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: rgba(20, 20, 25, 0.95);
  border-right: 4px solid var(--cp-color-primary);
  clip-path: polygon(0 0, 100% 0, 100% 98%, 95% 100%, 0 100%);
  z-index: 50;
  flex-shrink: 0;
  position: relative;
}

.cyber-sidebar__header-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--cp-color-primary);
  color: #000;
  font-weight: 800;
  font-size: 0.7rem;
  text-align: center;
  letter-spacing: 2px;
}

.cyber-sidebar__profile {
  margin-bottom: 1.5rem;
  margin-top: 1rem;
}

.cyber-sidebar__nav {
  margin-bottom: 1.5rem;
}

.cyber-sidebar__stats {
  margin-top: auto;
}

.cyber-sidebar__footer {
  margin-top: 1rem;
  padding-top: 2rem;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.6;
}
</style>
