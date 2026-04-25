import { useState } from 'react'

const themes = {
  Dark: 'dark',
  Light: 'light',
}

export function useThemes() {
  const [theme, setTheme] = useState<string | null>(() => {
    const saved = localStorage.getItem('theme') ?? themes.Light
    if (saved === themes.Dark) {
      document.documentElement.classList.add(themes.Dark)
    }
    return saved
  })

  function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark')
    const newTheme = isDark ? themes.Dark : themes.Light
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return { theme, toggleDarkMode }
}
