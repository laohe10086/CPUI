<template>
  <div class="cp-typing">
    <span class="cp-typing__dot" />
    <span class="cp-typing__dot" />
    <span class="cp-typing__dot" />
  </div>
</template>

<style lang="scss" scoped>
.cp-typing {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 14px;
  background: var(--cp-bg-elevated);
  border: 1px solid var(--cp-border-base);
}

.cp-typing__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--cp-color-secondary);
  animation: cp-typing-bounce 1.2s ease-in-out infinite;

  &:nth-child(2) { animation-delay: 0.15s; }
  &:nth-child(3) { animation-delay: 0.3s; }
}

@keyframes cp-typing-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-6px); opacity: 1; }
}
</style>
