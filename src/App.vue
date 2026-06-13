<template>
  <div class="min-h-screen transition-colors duration-300">
    <NavBar />
    <main>
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
