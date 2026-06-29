<template>
  <div class="min-h-screen transition-colors duration-300 relative overflow-hidden">
    <!-- 渐变光晕背景 -->
    <div class="fixed inset-0 -z-10">
      <div class="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-400/10 dark:bg-brand-500/8 blur-[120px] animate-float-slow"></div>
      <div class="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-400/10 dark:bg-purple-500/8 blur-[120px] animate-float-slow" style="animation-delay: -4s"></div>
      <div class="absolute top-[40%] left-[50%] w-[30vw] h-[30vw] rounded-full bg-cyan-400/8 dark:bg-cyan-500/6 blur-[100px] animate-float-slow" style="animation-delay: -2s"></div>
    </div>
    <!-- 点阵网格 -->
    <div class="dot-grid fixed inset-0 -z-10 opacity-30 dark:opacity-20"></div>

    <NavBar />
    <main class="relative">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <BlogSection />
      <StatsSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import BlogSection from './components/BlogSection.vue'
import StatsSection from './components/StatsSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>
