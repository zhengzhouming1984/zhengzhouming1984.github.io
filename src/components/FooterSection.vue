<template>
  <footer class="border-t" :style="{ borderColor: 'rgb(var(--border-muted))' }">
    <div class="max-w-3xl mx-auto px-6 py-8">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="text-xs" :style="{ color: 'rgb(var(--text-subtle))' }">&copy; {{ year }}</span>
          <span class="w-1 h-1 rounded-full" :style="{ background: 'rgb(var(--border))' }"></span>
          <span class="text-xs" :style="{ color: 'rgb(var(--text-subtle))' }">Zhengzhouming</span>
        </div>
        <div class="flex items-center gap-4">
          <button
            @click="copyEmail"
            class="text-xs link inline-flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {{ copied ? '已复制!' : site.email }}
          </button>
          <span class="w-1 h-1 rounded-full" :style="{ background: 'rgb(var(--border))' }"></span>
          <a :href="site.github" target="_blank" class="text-xs link">GitHub</a>
          <span class="w-1 h-1 rounded-full" :style="{ background: 'rgb(var(--border))' }"></span>
          <a href="#" class="text-xs link">RSS</a>
        </div>
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
