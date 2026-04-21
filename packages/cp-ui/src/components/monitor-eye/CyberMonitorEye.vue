<template>
  <div class="cyber-eye" :class="`cyber-eye--${status}`">
    <div class="cyber-eye__ring" />
    <div class="cyber-eye__core" />
    <div class="cyber-eye__scan" />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  status?: 'idle' | 'scanning' | 'alert' | 'warning' | 'online'
}>(), {
  status: 'online',
})
</script>

<style lang="scss" scoped>
.cyber-eye {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cyber-eye__ring {
  position: absolute;
  inset: 0;
  border: 2px solid transparent;
  border-radius: 50%;
  animation: cp-eye-rotate 4s linear infinite;

  &--idle & { border-color: var(--cp-text-muted); }
}

.cyber-eye__core {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--cp-color-secondary);
  box-shadow: 0 0 8px var(--cp-color-secondary);
  animation: cp-eye-pulse 2s ease-in-out infinite;
  z-index: 1;
}

.cyber-eye__scan {
  position: absolute;
  width: 2px;
  height: 100%;
  background: linear-gradient(transparent, var(--cp-color-secondary), transparent);
  opacity: 0.5;
  animation: cp-eye-scan 3s linear infinite;
  z-index: 1;
}

.cyber-eye--idle .cyber-eye__core {
  background: var(--cp-text-muted);
  box-shadow: 0 0 4px var(--cp-text-muted);
  animation: none;
}

.cyber-eye--idle .cyber-eye__scan { opacity: 0; }

.cyber-eye--scanning .cyber-eye__core {
  background: var(--cp-color-secondary);
  animation: cp-eye-blink 0.8s steps(1) infinite;
}

.cyber-eye--alert .cyber-eye__core {
  background: var(--cp-color-danger);
  box-shadow: 0 0 12px var(--cp-color-danger);
  animation: cp-eye-blink 0.3s steps(1) infinite;
}

.cyber-eye--alert .cyber-eye__ring {
  border-color: var(--cp-color-danger);
  animation-duration: 0.5s;
}

.cyber-eye--warning .cyber-eye__core {
  background: var(--cp-color-warning);
  box-shadow: 0 0 10px var(--cp-color-warning);
  animation: cp-eye-blink 1.5s steps(1) infinite;
}

.cyber-eye--online .cyber-eye__core {
  background: var(--cp-color-success);
  box-shadow: 0 0 10px var(--cp-color-success);
}

@keyframes cp-eye-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes cp-eye-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.8); opacity: 0.6; }
}

@keyframes cp-eye-scan {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes cp-eye-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
