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
