<template>
  <div
    class="cyber-heading"
    :class="[
      { 'cyber-heading--glitched': glitched },
      { 'cyber-heading--neon': neon },
      { 'cyber-heading--rgb-split': rgbSplit },
      { 'cyber-heading--line-pulse': linePulse },
      { 'cyber-heading--line-glow': lineGlow },
    ]"
    :style="{
      '--cyber-heading-line-color': lineColor || undefined,
      '--cyber-heading-text-color': textColor || undefined,
    }"
  >
    <span class="cyber-heading__text"><slot /></span>
    <div v-if="underline" class="cyber-heading__line" />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  underline?: boolean
  lineColor?: string
  textColor?: string
  glitched?: boolean
  neon?: boolean
  rgbSplit?: boolean
  linePulse?: boolean
  lineGlow?: boolean
}>(), {
  underline: true,
  lineColor: '',
  textColor: '',
  glitched: false,
  neon: false,
  rgbSplit: false,
  linePulse: false,
  lineGlow: false,
})
</script>

<style lang="scss" scoped>
.cyber-heading {
  --cyber-heading-line-color: var(--cp-color-secondary);
  --cyber-heading-text-color: var(--cp-text-primary);

  display: inline-block;
  margin: 0;
  padding-bottom: 8px;
  font-family: var(--cp-font-sans);
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.3;
  color: var(--cyber-heading-text-color);

  // ── 文字效果：霓虹发光 ──
  &--neon {
    text-shadow:
      0 0 4px var(--cyber-heading-text-color),
      0 0 12px var(--cyber-heading-line-color),
      0 0 24px var(--cyber-heading-line-color);
    animation: cp-heading-neon 2s ease-in-out infinite alternate;
  }

  // ── 文字效果：RGB色差 ──
  &--rgb-split {
    text-shadow:
      2px 0 var(--cp-color-secondary),
      -2px 0 var(--cp-color-danger);
  }

  // ── 文字效果：Glitch 抖动 ──
  &--glitched {
    animation: cp-heading-glitch 3s steps(2, end) infinite;

    .cyber-heading__line {
      animation: cp-heading-line-glitch 3s steps(2, end) infinite;
    }
  }

  // ── 下横线 ──
  &__line {
    width: 100%;
    height: 6px;
    background-color: var(--cyber-heading-line-color);
    clip-path: polygon(
      0 0,
      0 100%,
      10% 100%,
      calc(10% + 4px) 2px,
      100% 2px,
      100% 0
    );
  }

  // ── 横线效果：脉冲呼吸 ──
  &--line-pulse .cyber-heading__line {
    animation: cp-heading-line-pulse 2s ease-in-out infinite;
  }

  // ── 横线效果：发光 ──
  &--line-glow .cyber-heading__line {
    box-shadow:
      0 0 8px var(--cyber-heading-line-color),
      0 0 20px var(--cyber-heading-line-color);
  }
}

@keyframes cp-heading-neon {
  from { filter: brightness(1); }
  to   { filter: brightness(1.2); }
}

@keyframes cp-heading-glitch {
  0%, 100% {
    transform: skewX(0deg);
  }
  10% {
    transform: skewX(-3deg);
    text-shadow:
      4px 0 var(--cp-color-secondary),
      -4px 0 var(--cp-color-danger);
  }
  12% {
    transform: skewX(0deg);
  }
  51% {
    transform: skewX(2deg);
    text-shadow:
      -2px 2px var(--cp-color-danger),
      2px -2px var(--cp-color-secondary);
  }
  55% {
    transform: skewX(0deg);
  }
}

@keyframes cp-heading-line-glitch {
  0%, 100% { transform: translateX(0); }
  10%  { transform: translateX(-3px); }
  12%  { transform: translateX(2px); }
  14%  { transform: translateX(0); }
}

@keyframes cp-heading-line-pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.3; }
}
</style>
