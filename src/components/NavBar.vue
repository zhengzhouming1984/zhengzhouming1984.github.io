<template>
  <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200/50 dark:border-gray-800/50">
    <div class="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
      <span class="font-mono text-sm text-brand-500 font-medium">~/</span>
      <div class="flex items-center gap-1">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="px-3 py-1.5 text-xs rounded-md transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {{ link.label }}
        </a>
        <ThemeToggle />
      </div>
    </div>
  </nav>
</template>

<script setup>
import ThemeToggle from './ThemeToggle.vue'

const links = [
  { label: '关于', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '博客', href: '#blog' },
]
</script>
