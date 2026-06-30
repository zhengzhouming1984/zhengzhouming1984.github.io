<template>
  <section id="about" class="section-container">
    <h2 class="section-title">关于我</h2>
    <div class="space-y-6">
      <p class="leading-relaxed max-w-xl" :style="{ color: 'rgb(var(--text-muted))' }">
        我是 Zhengzhouming，一名热爱技术的全栈开发者，专注于 AI 应用、前端工程化和多媒体创作。
        始终相信简洁的代码和优雅的设计可以创造出真正有价值的产品。
      </p>
      <div class="flex flex-wrap gap-2">
        <span v-for="tag in skills" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- 工作经历时间线 -->
    <div class="mt-12">
      <h3 class="text-lg font-semibold mb-6" :style="{ color: 'rgb(var(--text))' }">工作经历</h3>
      <div class="space-y-6">
        <div v-for="(exp, idx) in workExperience" :key="idx" class="relative pl-6 border-l-2" :style="{ borderColor: 'rgb(var(--border))' }">
          <div class="absolute w-3 h-3 rounded-full -left-[7px] top-1" :style="{ background: 'rgb(var(--brand-500))' }"></div>
          <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
            <span class="font-medium text-sm" :style="{ color: 'rgb(var(--text))' }">{{ exp.role }}</span>
            <span class="text-xs" :style="{ color: 'rgb(var(--brand-400))' }">{{ exp.company }}</span>
            <span class="text-xs font-mono" :style="{ color: 'rgb(var(--text-subtle))' }">{{ exp.period }}</span>
          </div>
          <p class="text-sm leading-relaxed" :style="{ color: 'rgb(var(--text-muted))' }">{{ exp.description }}</p>
        </div>
      </div>
    </div>

    <!-- 教育背景时间线 -->
    <div class="mt-10">
      <h3 class="text-lg font-semibold mb-6" :style="{ color: 'rgb(var(--text))' }">教育背景</h3>
      <div class="space-y-4">
        <div v-for="(edu, idx) in education" :key="idx" class="relative pl-6 border-l-2" :style="{ borderColor: 'rgb(var(--border))' }">
          <div class="absolute w-3 h-3 rounded-full -left-[7px] top-1" :style="{ background: 'rgb(var(--glow-secondary) / 0.8)' }"></div>
          <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span class="font-medium text-sm" :style="{ color: 'rgb(var(--text))' }">{{ edu.school }}</span>
            <span class="text-xs" :style="{ color: 'rgb(var(--text-muted))' }">{{ edu.degree }}</span>
            <span class="text-xs font-mono" :style="{ color: 'rgb(var(--text-subtle))' }">{{ edu.period }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { skills, workExperience, education } from '../config.js'
</script>
