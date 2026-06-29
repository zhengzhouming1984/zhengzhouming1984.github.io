<template>
  <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200/50 dark:border-gray-800/50">
    <div class="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
      <span class="font-mono text-sm text-brand-500 font-medium">~/</span>

      <!-- 桌面端导航 -->
      <div class="hidden sm:flex items-center gap-1">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="px-3 py-1.5 text-xs rounded-md transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {{ link.label }}
        </a>
        <ThemeToggle />
      </div>

      <!-- 移动端菜单按钮 -->
      <div class="flex sm:hidden items-center gap-2">
        <ThemeToggle />
        <button
          @click="isOpen = !isOpen"
          class="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          :aria-expanded="isOpen"
          aria-label="切换菜单"
        >
          <svg v-if="!isOpen" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 移动端下拉菜单 -->
    <div v-if="isOpen" class="sm:hidden border-t border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md">
      <div class="max-w-3xl mx-auto px-6 py-3 space-y-1">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          @click="isOpen = false"
          class="block px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'
import { navLinks } from '../config.js'

const isOpen = ref(false)
</script>
