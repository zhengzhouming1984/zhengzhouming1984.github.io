<template>
  <footer class="border-t" :style="{ borderColor: 'rgb(var(--border-muted))' }">
    <div class="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span class="text-xs" :style="{ color: 'rgb(var(--text-subtle))' }">&copy; {{ year }} All rights reserved.</span>
      <div class="flex gap-4">
        <button
          @click="copyEmail"
          class="text-xs link"
        >
          {{ copied ? '已复制！' : '复制邮箱' }}
        </button>
        <a :href="site.github" target="_blank" class="text-xs link">GitHub</a>
        <a href="#" class="text-xs link">RSS</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { site } from '../config.js'

const year = new Date().getFullYear()
const copied = ref(false)

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(site.email)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  } catch {
    // fallback
  }
}
</script>
