<template>
  <footer class="border-t border-gray-100 dark:border-gray-900">
    <div class="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span class="text-xs text-gray-400">&copy; {{ year }} All rights reserved.</span>
      <div class="flex gap-4">
        <button
          @click="copyEmail"
          class="text-xs text-gray-400 hover:text-brand-400 transition-colors"
        >
          {{ copied ? '已复制！' : '复制邮箱' }}
        </button>
        <a href="https://github.com/zhengzhouming1984" target="_blank" class="text-xs text-gray-400 hover:text-brand-400 transition-colors">GitHub</a>
        <a href="#" class="text-xs text-gray-400 hover:text-brand-400 transition-colors">RSS</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const year = new Date().getFullYear()
const copied = ref(false)

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('94711123@qq.com')
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  } catch {
    // fallback
  }
}
</script>
