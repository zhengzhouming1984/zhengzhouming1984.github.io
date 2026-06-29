<template>
  <section id="about" class="section-container">
    <h2 class="section-title">关于我</h2>
    <div class="space-y-6">
      <p class="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
        我是 Zhengzhouming，一名热爱技术的全栈开发者，专注于 AI 应用、前端工程化和多媒体创作。
        始终相信简洁的代码和优雅的设计可以创造出真正有价值的产品。
      </p>
      <div class="flex flex-wrap gap-2">
        <span v-for="tag in skills" :key="tag" class="px-3 py-1 text-xs rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">
          {{ tag }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
const tags = [
  'Vue.js', 'React', 'Python', 'TypeScript',
  'LLM', 'Stable Diffusion', 'TTS',
  'Docker', 'Linux', '全栈工程',
]
</script>
