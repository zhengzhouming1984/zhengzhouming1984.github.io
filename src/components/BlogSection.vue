<template>
  <section id="blog" class="section-container">
    <h2 class="section-title">博客文章</h2>
    <div class="space-y-3">
      <a
        v-for="p in blogPosts"
        :key="p.title"
        :href="p.url"
        target="_blank"
        class="blog-item flex items-baseline justify-between group"
      >
        <div class="flex-1 min-w-0">
          <span class="text-sm font-medium block truncate transition-colors"
            :style="{ color: 'rgb(var(--text))' }">{{ p.title }}</span>
          <span v-if="p.summary" class="text-xs mt-1 block truncate" :style="{ color: 'rgb(var(--text-subtle))' }">{{ p.summary }}</span>
        </div>
        <span class="text-[11px] font-mono shrink-0 sm:ml-4 px-2 py-0.5 rounded"
          :style="{ color: 'rgb(var(--text-subtle))', background: 'rgb(var(--surface-muted))' }">{{ p.date }}</span>
      </a>
    </div>
    <a href="#" class="inline-flex items-center gap-1.5 mt-8 text-xs link group">
      查看更多
      <svg class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  </section>
</template>

<script setup>
import { blogPosts } from '../config.js'
</script>
