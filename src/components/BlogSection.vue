<template>
  <section id="blog" class="section-container">
    <h2 class="section-title">博客文章</h2>
    <div class="space-y-3">
      <a
        v-for="p in posts"
        :key="p.title"
        :href="p.url"
        target="_blank"
        class="flex items-baseline justify-between group py-2 border-b border-gray-100 dark:border-gray-900 last:border-0"
      >
        <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-brand-400 transition-colors">{{ p.title }}</span>
        <span class="text-xs text-gray-400 font-mono shrink-0 ml-4">{{ p.date }}</span>
      </a>
    </div>
    <a href="#" class="inline-block mt-8 text-xs text-gray-400 hover:text-brand-400 transition-colors">
      查看更多 →
    </a>
  </section>
</template>

<script setup>
const posts = [
  { title: '从零搭建个人 AI 语音助手', date: '2026-05', url: '#' },
  { title: 'Vue3 + Vite 极简开发实践', date: '2026-04', url: '#' },
  { title: 'macOS 自动化：效率提升指南', date: '2026-03', url: '#' },
  { title: '本地 LLM 部署与调优笔记', date: '2026-02', url: '#' },
]
</script>
