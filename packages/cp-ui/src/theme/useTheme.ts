import { ref, type InjectionKey, type Ref } from 'vue'

export interface ThemeContext {
  currentTheme: Ref<string>
  setTheme: (theme: string) => void
}

export const THEME_KEY: InjectionKey<ThemeContext> = Symbol('cp-theme')

export function useTheme(initialTheme: string, onChange?: (theme: string) => void) {
  const currentTheme = ref(initialTheme)

  function setTheme(theme: string) {
    currentTheme.value = theme
    onChange?.(theme)
  }

  return { currentTheme, setTheme }
}
