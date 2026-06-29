<template>
  <section class="section-container pt-32 md:pt-40 pb-20">
    <div class="space-y-6">
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
        你好，我是 <span class="text-brand-400">{{ site.author }}</span>
      </h1>
      <p class="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
        {{ site.description }}
      </p>
      <div class="flex flex-wrap gap-3 pt-2">
        <a
          v-for="link in socials"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-brand-400 hover:border-brand-400/50 transition-colors"
        >
          <component :is="link.icon" class="w-4 h-4" />
          {{ link.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h } from 'vue'
import { site } from '../config.js'

// SVG icons as functional components
const IconGitHub = { render: () => h('svg', { class: 'w-4 h-4', fill: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' })]) }
const IconMail = { render: () => h('svg', { class: 'w-4 h-4', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })]) }
const IconBlog = { render: () => h('svg', { class: 'w-4 h-4', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' })]) }

const socials = [
  { label: 'GitHub', href: site.github, icon: IconGitHub },
  { label: '邮箱', href: '#contact', icon: IconMail, copy: site.email },
  { label: '博客', href: '#blog', icon: IconBlog },
]
</script>
