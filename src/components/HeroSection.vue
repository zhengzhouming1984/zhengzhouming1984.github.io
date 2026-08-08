<template>
  <section class="section-container pt-32 md:pt-44 pb-24 md:pb-32 relative overflow-hidden">
    <!-- 渐变光晕背景 -->
    <div class="hero-glow hero-glow-1"></div>
    <div class="hero-glow hero-glow-2"></div>
    <div class="hero-glow hero-glow-3"></div>

    <!-- 点阵网格 -->
    <div class="absolute inset-0 dot-grid" :style="{ color: 'rgb(var(--text-muted) / 0.08)' }"></div>

    <div class="relative z-10">
      <!-- 主内容区：左侧文字 + 右侧头像 -->
      <div class="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
        <div class="flex-1 space-y-6">
          <!-- 状态标签 -->
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs"
            :style="{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface-elevated))' }">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                :style="{ background: 'rgb(var(--brand-400))' }"></span>
              <span class="relative inline-flex rounded-full h-2 w-2"
                :style="{ background: 'rgb(var(--brand-400))' }"></span>
            </span>
            <span :style="{ color: 'rgb(var(--text-muted))' }">Available for work</span>
          </div>

          <!-- 名字 + 简介 -->
          <div class="space-y-3">
            <h1 class="hero-title">{{ site.author || 'Zhengzhouming' }}</h1>
            <p class="text-lg md:text-xl max-w-lg leading-relaxed" :style="{ color: 'rgb(var(--text-muted))' }">
              {{ site.description }}
            </p>
          </div>

          <!-- 社交按钮 -->
          <div class="flex flex-wrap gap-3 pt-2">
            <a
              v-for="link in socials"
              :key="link.label"
              :href="link.href"
              target="_blank"
              rel="noopener"
              class="btn-gradient inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-brand-500/20 active:scale-100"
            >
              <component :is="link.icon" class="w-4 h-4" />
              {{ link.label }}
            </a>
          </div>
        </div>

        <!-- 右侧头像区域 -->
        <div class="flex-shrink-0 hidden md:block">
          <div class="relative group cursor-pointer" @click="showAvatar = true">
            <!-- 头像外圈光环 -->
            <div class="absolute -inset-1.5 rounded-full opacity-60 blur-md group-hover:opacity-80 transition-opacity duration-500"
              :style="{ background: 'conic-gradient(from 0deg, rgb(var(--brand-400)), rgb(var(--glow-secondary)), rgb(var(--glow-tertiary)), rgb(var(--brand-400)))' }">
            </div>
            <div class="relative rounded-full p-[3px]"
              :style="{ background: 'linear-gradient(135deg, rgb(var(--brand-400)), rgb(var(--glow-secondary)), rgb(var(--glow-tertiary)))' }">
              <picture>
                <source srcset="/avatar.webp" type="image/webp">
                <img src="/avatar.jpg" alt="头像"
                  class="w-36 h-36 rounded-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  width="1773" height="2364" />
              </picture>
            </div>
            <!-- 装饰元素 -->
            <div class="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs"
              :style="{ background: 'rgb(var(--surface-elevated))', border: '1px solid rgb(var(--border))' }">
              <span class="text-sm">👋</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速统计条 -->
      <div class="mt-12 pt-8 border-t flex flex-wrap gap-8 md:gap-12" :style="{ borderColor: 'rgb(var(--border-muted))' }">
        <div v-for="stat in quickStats" :key="stat.label" class="flex items-center gap-2">
          <span class="text-xl md:text-2xl font-bold font-mono" :style="{ color: 'rgb(var(--text))' }">{{ stat.value }}</span>
          <span class="text-xs" :style="{ color: 'rgb(var(--text-subtle))' }">{{ stat.label }}</span>
        </div>
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
        <div class="max-w-sm w-full mx-6">
          <img src="/avatar.jpg" alt="头像大图" class="w-full h-auto rounded-2xl shadow-2xl" />
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { h, ref, watch, onMounted, onUnmounted } from 'vue'
import { site } from '../config.js'

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

// SVG icons as functional components
const IconGitHub = { render: () => h('svg', { class: 'w-4 h-4', fill: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' })]) }
const IconMail = { render: () => h('svg', { class: 'w-4 h-4', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })]) }
const IconBlog = { render: () => h('svg', { class: 'w-4 h-4', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' })]) }

const socials = [
  { label: 'GitHub', href: site.github, icon: IconGitHub },
  { label: '邮箱', href: `mailto:${site.email}`, icon: IconMail },
  { label: '博客', href: '#blog', icon: IconBlog },
]

const quickStats = [
  { value: '5+', label: '年开发经验' },
  { value: '10+', label: '技术栈' },
  { value: '20+', label: '开源项目' },
]
</script>
