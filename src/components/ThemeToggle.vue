<template>
  <button
    @click="toggle"
    class="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    :title="isDark ? '切换亮色模式' : '切换暗色模式'"
    :aria-label="isDark ? '切换到亮色模式' : '切换到暗色模式'"
  >
    <svg v-if="isDark" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
  </button>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue'

const STORAGE_KEY = 'theme-preference'

function getSystemPreference() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) {
    return stored === 'dark'
  }
  return getSystemPreference()
}

const isDark = ref(true)

function applyTheme(dark) {
  document.documentElement.classList.toggle('dark', dark)
}

function toggle() {
  isDark.value = !isDark.value
  localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  isDark.value = getInitialTheme()
  applyTheme(isDark.value)

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    if (localStorage.getItem(STORAGE_KEY) === null) {
      isDark.value = e.matches
      applyTheme(isDark.value)
    }
  })
})

watchEffect(() => {
  applyTheme(isDark.value)
})
</script>
