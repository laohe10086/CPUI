<template>
  <div class="cp-theme-provider" :data-theme="theme">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, watch } from 'vue'
import { THEME_KEY, useTheme } from './useTheme'

const props = withDefaults(defineProps<{
  theme?: string
}>(), {
  theme: 'sterile-cyber',
})

const emit = defineEmits<{
  'theme-change': [theme: string]
}>()

const { currentTheme, setTheme } = useTheme(props.theme, (t) => emit('theme-change', t))

watch(currentTheme, (t) => {
  document.body.setAttribute('data-theme', t)
}, { immediate: true })

provide(THEME_KEY, { currentTheme, setTheme })
</script>

<style lang="scss">
// === Cyberpunk style group ===
@use './themes/cyberpunk/cyberpunk' as cyber;
@use './themes/cyberpunk/sterile-cyber' as sterile;
@use './themes/cyberpunk/neon-noir' as noir;

// === Sterile style group ===
@use './themes/sterile/sterile-dark' as sdark;
@use './themes/sterile/sterile-light' as slight;

// === Shared styles ===
@use '../styles/shared/reset';
@use '../styles/cyberpunk/animations';

// === Default fallback :root ===
// Allows components to work without CpThemeProvider.
// When CpThemeProvider is used, [data-theme] selectors override these values.
:root {
  --cp-color-primary: #fce803;
  --cp-color-secondary: #00f0ff;
  --cp-color-danger: #ff003c;
  --cp-color-success: #00ff41;
  --cp-color-warning: #ff8c00;

  --cp-bg-void: #020202;
  --cp-bg-base: #050505;
  --cp-bg-panel: #0a0a0a;
  --cp-bg-elevated: #141419;
  --cp-bg-hover: #1a1a1a;

  --cp-text-primary: #ffffff;
  --cp-text-secondary: #cccccc;
  --cp-text-muted: #888888;
  --cp-text-dim: #555555;

  --cp-border-dim: rgba(255, 255, 255, 0.06);
  --cp-border-base: rgba(255, 255, 255, 0.12);
  --cp-border-bright: rgba(0, 240, 255, 0.25);
  --cp-border-active: #00f0ff;

  --cp-glow-primary: rgba(252, 232, 3, 0.25);
  --cp-glow-secondary: rgba(0, 240, 255, 0.25);
  --cp-glow-danger: rgba(255, 0, 60, 0.25);
  --cp-glow-intensity: 0.25;

  --cp-grid-line: rgba(255, 255, 255, 0.04);
  --cp-grid-dot: rgba(255, 255, 255, 0.08);

  --cp-font-sans: 'Inter', 'Noto Sans SC', system-ui, sans-serif;
  --cp-font-mono: 'JetBrains Mono', 'Share Tech Mono', Consolas, monospace;

  --cp-cut-corner-sm: polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%);
  --cp-cut-corner-md: polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);
  --cp-cut-corner-lg: polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%);

  --cp-radius-sm: 2px;
  --cp-radius-md: 4px;
  --cp-radius-lg: 8px;

  --cp-shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
  --cp-shadow-md: 0 4px 16px rgba(0, 0, 0, 0.5);
  --cp-shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.6);

  --cp-bracket-fg: #00f0ff;
  --cp-bracket-muted: #888888;

  --cp-hud-bg: rgba(5, 5, 5, 0.9);
  --cp-hud-border: rgba(0, 240, 255, 0.15);

  --cp-duration-fast: 200ms;
  --cp-duration-base: 300ms;
  --cp-easing: cubic-bezier(0.4, 0, 0.2, 1);

  --cp-scanline-opacity: 0.03;
  --cp-noise-opacity: 0.02;
}

.cp-theme-provider,
body[data-theme] {
  position: relative;

  // Cyberpunk themes
  &[data-theme="sterile-cyber"] { @include sterile.sterile-cyber; }
  &[data-theme="cyberpunk"] { @include cyber.cyberpunk; }
  &[data-theme="neon-noir"] { @include noir.neon-noir; }

  // Sterile themes
  &[data-theme="sterile-dark"] { @include sdark.sterile-dark; }
  &[data-theme="sterile-light"] { @include slight.sterile-light; }

  // Legacy alias: "light" maps to sterile-light
  &[data-theme="light"] { @include slight.sterile-light; }
}
</style>
