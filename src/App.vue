<template>
  <div class="min-h-screen transition-colors duration-300 relative overflow-hidden" :style="{ background: 'rgb(var(--surface))' }">
    <!-- 渐变光晕背景 -->
    <div class="fixed inset-0 -z-10">
      <div class="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] animate-float-slow" :style="{ background: 'rgb(var(--glow-primary) / 0.08)' }"></div>
      <div class="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] animate-float-slow" style="animation-delay: -4s" :style="{ background: 'rgb(var(--glow-secondary) / 0.08)' }"></div>
      <div class="absolute top-[40%] left-[50%] w-[30vw] h-[30vw] rounded-full blur-[100px] animate-float-slow" style="animation-delay: -2s" :style="{ background: 'rgb(var(--glow-tertiary) / 0.06)' }"></div>
    </div>
    <!-- 点阵网格 -->
    <div class="dot-grid fixed inset-0 -z-10 opacity-30" :style="{ color: 'rgb(var(--text-muted) / 0.15)' }"></div>

    <template v-if="hasError">
      <div class="min-h-screen flex items-center justify-center">
        <div class="text-center p-8">
          <p class="text-lg mb-4" :style="{ color: 'rgb(var(--text))' }">页面加载异常</p>
          <p class="text-sm mb-4" :style="{ color: 'rgb(var(--text-muted))' }">{{ errorMessage }}</p>
          <button @click="hasError = false" class="px-4 py-2 rounded-lg text-sm" :style="{ background: 'rgb(var(--brand-500))', color: '#fff' }">重试</button>
        </div>
      </div>
    </template>
    <template v-else>
      <NavBar />
      <main id="main" class="relative">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <BlogSection />
        <StatsSection />
      </main>
      <FooterSection />
      <ScrollToTop />
    </template>
    <ParticleBackground />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onErrorCaptured, defineAsyncComponent } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import FooterSection from './components/FooterSection.vue'

const BlogSection = defineAsyncComponent(() => import('./components/BlogSection.vue'))
const StatsSection = defineAsyncComponent(() => import('./components/StatsSection.vue'))

const isDark = ref(false)
const hasError = ref(false)
const errorMessage = ref('')

let observer = null

function updateIsDark() {
  const theme = document.documentElement.getAttribute('data-theme') || ''
  isDark.value = theme.includes('dark') || document.documentElement.classList.contains('dark')
}

onMounted(() => {
  updateIsDark()
  observer = new MutationObserver(updateIsDark)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

onErrorCaptured((err) => {
  hasError.value = true
  errorMessage.value = err.message || '组件渲染异常'
  return false
})
</script>
