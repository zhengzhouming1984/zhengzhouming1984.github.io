<template>
  <section id="about" class="section-container">
    <h2 class="section-title">关于我</h2>

    <!-- 个人简介 -->
    <div class="card card-accent p-6 mb-8">
      <p class="leading-relaxed" :style="{ color: 'rgb(var(--text-muted))' }">
        我是 Zhengzhouming，一名热爱技术的全栈开发者，专注于 AI 应用、前端工程化和多媒体创作。
        始终相信简洁的代码和优雅的设计可以创造出真正有价值的产品。
      </p>
    </div>

    <!-- 技术栈 -->
    <div class="mb-10">
      <h3 class="text-lg font-semibold mb-5" :style="{ color: 'rgb(var(--text))' }">技术栈</h3>
      <SkillBars />
    </div>

    <!-- 工作经历时间线 -->
    <div class="mt-12">
      <h3 class="text-lg font-semibold mb-6" :style="{ color: 'rgb(var(--text))' }">工作经历</h3>
      <div class="space-y-5">
        <div v-for="(exp, idx) in workExperience" :key="idx" class="relative">
          <!-- 时间线连接线 -->
          <div class="absolute left-[3px] top-3 bottom-0 w-px" :style="{ background: 'rgb(var(--border))' }"></div>
          <!-- 时间线圆点 -->
          <div class="absolute left-0 top-3 w-[7px] h-[7px] rounded-full timeline-dot"
            :style="{ background: 'rgb(var(--brand-500))' }"></div>

          <div class="ml-5 card card-hover p-4 transition-all duration-200">
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="font-medium text-sm" :style="{ color: 'rgb(var(--text))' }">{{ exp.role }}</span>
              <span class="tag text-[11px]">{{ exp.company }}</span>
              <span class="ml-auto text-[11px] font-mono px-2 py-0.5 rounded"
                :style="{ color: 'rgb(var(--text-subtle))', background: 'rgb(var(--surface-muted))' }">{{ exp.period }}</span>
            </div>
            <p class="text-sm leading-relaxed" :style="{ color: 'rgb(var(--text-muted))' }">{{ exp.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 教育背景 -->
    <div class="mt-10">
      <h3 class="text-lg font-semibold mb-6" :style="{ color: 'rgb(var(--text))' }">教育背景</h3>
      <div class="space-y-4">
        <div v-for="(edu, idx) in education" :key="idx" class="relative">
          <div class="absolute left-[3px] top-3 bottom-0 w-px" :style="{ background: 'rgb(var(--border))' }"></div>
          <div class="absolute left-0 top-3 w-[7px] h-[7px] rounded-full timeline-dot-secondary"
            :style="{ background: 'rgb(var(--glow-secondary) / 0.8)' }"></div>
          <div class="ml-5 flex flex-wrap items-center gap-2">
            <span class="font-medium text-sm" :style="{ color: 'rgb(var(--text))' }">{{ edu.school }}</span>
            <span class="text-xs" :style="{ color: 'rgb(var(--text-muted))' }">{{ edu.degree }}</span>
            <span class="text-[11px] font-mono px-2 py-0.5 rounded"
              :style="{ color: 'rgb(var(--text-subtle))', background: 'rgb(var(--surface-muted))' }">{{ edu.period }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { skills, workExperience, education } from '../config.js'
</script>
