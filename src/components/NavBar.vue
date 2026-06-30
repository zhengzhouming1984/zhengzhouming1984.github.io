<template>
  <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
    :style="{ background: 'rgb(var(--surface) / 0.8)', borderColor: 'rgb(var(--border) / 0.5)' }">
    <div class="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
      <span class="font-mono text-sm text-brand-500 font-medium">~/</span>

      <!-- 桌面端导航 -->
      <div class="hidden sm:flex items-center gap-1">
        <a v-for="link in navLinks" :key="link.href" :href="link.href"
          class="px-3 py-1.5 text-xs rounded-md transition-colors" :style="{ color: 'rgb(var(--text-muted))' }"
          @mouseenter="(e) => { e.currentTarget.style.color = 'rgb(var(--text))'; e.currentTarget.style.background = 'rgb(var(--surface-muted))' }"
          @mouseleave="(e) => { e.currentTarget.style.color = 'rgb(var(--text-muted))'; e.currentTarget.style.background = 'transparent' }">
          {{ link.label }}
        </a>
        <ThemeSelector />
        <button @click="showAvatar = true"
          class="ml-1 cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-full"
          aria-label="查看头像大图">
          <picture>
            <source srcset="/avatar.webp" type="image/webp">
            <img src="/avatar.jpg" alt="头像" class="w-8 h-8 rounded-full object-cover object-top" width="1773" height="2364"
              :style="{ boxShadow: '0 0 0 2px rgb(var(--surface))' }" />
          </picture>
        </button>
      </div>

      <!-- 移动端菜单按钮 -->
      <div class="flex sm:hidden items-center gap-2">
        <button @click="showAvatar = true"
          class="cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-full"
          aria-label="查看头像大图">
          <picture>
            <source srcset="/avatar.webp" type="image/webp">
            <img src="/avatar.jpg" alt="头像" class="w-8 h-8 rounded-full object-cover object-top" width="1773" height="2364"
              :style="{ boxShadow: '0 0 0 2px rgb(var(--surface))' }" />
          </picture>
        </button>
        <ThemeSelector />
        <button @click="isOpen = !isOpen" class="p-2 rounded-md transition-colors"
          :style="{ color: 'rgb(var(--text-muted))' }"
          @mouseenter="(e) => { e.currentTarget.style.background = 'rgb(var(--surface-muted))' }"
          @mouseleave="(e) => { e.currentTarget.style.background = 'transparent' }" :aria-expanded="isOpen"
          aria-label="切换菜单">
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
    <div v-if="isOpen" class="sm:hidden border-t backdrop-blur-md"
      :style="{ borderColor: 'rgb(var(--border) / 0.5)', background: 'rgb(var(--surface) / 0.95)' }">
      <div class="max-w-3xl mx-auto px-6 py-3 space-y-1">
        <a v-for="link in navLinks" :key="link.href" :href="link.href" @click="isOpen = false"
          class="block px-3 py-2 text-sm rounded-md transition-colors" :style="{ color: 'rgb(var(--text-muted))' }"
          @mouseenter="(e) => { e.currentTarget.style.color = 'rgb(var(--text))'; e.currentTarget.style.background = 'rgb(var(--surface-muted))' }"
          @mouseleave="(e) => { e.currentTarget.style.color = 'rgb(var(--text-muted))'; e.currentTarget.style.background = 'transparent' }">
          {{ link.label }}
        </a>
      </div>
    </div>

    <!-- 头像放大灯箱 -->
    <Teleport to="body">
      <div v-if="showAvatar" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        @click.self="showAvatar = false">
        <button @click="showAvatar = false"
          class="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="关闭">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="max-w-md w-full mx-6">
          <img src="/avatar.jpg" alt="头像大图" class="w-full h-auto rounded-2xl shadow-2xl" />
        </div>
      </div>
    </Teleport>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import ThemeSelector from './ThemeSelector.vue'
import { navLinks } from '../config.js'

const isOpen = ref(false)
const showAvatar = ref(false)

const handleEscape = (e) => {
  if (e.key === 'Escape' && showAvatar.value) {
    showAvatar.value = false
  }
}

watch(showAvatar, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>
