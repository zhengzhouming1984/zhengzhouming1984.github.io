<template>
  <section id="blog" class="section-container">
    <h2 class="section-title">博客文章</h2>
    <div class="space-y-3">
      <a
        v-for="p in blogPosts"
        :key="p.title"
        :href="p.url"
        target="_blank"
        class="flex items-baseline justify-between group py-2 divider last:border-0"
      >
        <span class="text-sm group-hover:text-brand-400 transition-colors" :style="{ color: 'rgb(var(--text))' }">{{ p.title }}</span>
        <span class="text-xs font-mono shrink-0 ml-4" :style="{ color: 'rgb(var(--text-subtle))' }">{{ p.date }}</span>
      </a>
    </div>
    <a href="#" class="inline-block mt-8 text-xs link">
      查看更多 →
    </a>
  </section>
</template>

<script setup>
import { blogPosts } from '../config.js'
</script>
