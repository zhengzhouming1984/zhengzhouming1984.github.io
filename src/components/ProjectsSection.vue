<template>
  <section id="projects" class="section-container">
    <h2 class="section-title">项目作品</h2>

    <!-- 精选项目：游戏 & 单词学习 -->
    <div class="grid gap-4 md:grid-cols-2 mb-8">
      <Card3D
        v-for="project in featuredProjects"
        :key="project.name"
      >
        <article class="group card card-hover card-accent card-glow h-full flex flex-col">
          <div class="flex items-center gap-2.5 mb-2">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" :style="{ background: `rgb(${project.color} / 0.15)` }">
              <!-- icon -->
              <svg v-if="project.icon === 'book'" class="w-4 h-4" :style="{ color: `rgb(${project.color})` }" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              <svg v-else-if="project.icon === 'dino'" class="w-4 h-4" :style="{ color: `rgb(${project.color})` }" fill="currentColor" viewBox="0 0 24 24"><path d="M4 14h2v-2h2v-2h2V8h4V6h4v2h2v4h-2v2h-2v2h-2v2h-2v2H8v-2H6v-2H4z" /></svg>
              <svg v-else-if="project.icon === 'blocks'" class="w-4 h-4" :style="{ color: `rgb(${project.color})` }" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" /></svg>
              <svg v-else-if="project.icon === 'shooter'" class="w-4 h-4" :style="{ color: `rgb(${project.color})` }" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2L8 8h3v6h2V8h3l-4-6zM5 22V12h2v10H5zm12 0V12h2v10h-2zM9 22v-4h6v4H9z" /></svg>
            </div>
            <h3 class="font-medium text-sm" :style="{ color: 'rgb(var(--text))' }">{{ project.name }}</h3>
          </div>
          <p class="text-xs leading-relaxed mb-3 flex-1" :style="{ color: 'rgb(var(--text-muted))' }">
            {{ project.description }}
          </p>
          <div class="flex flex-wrap gap-1.5 mb-3">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="px-2 py-0.5 text-[10px] rounded-full font-medium"
              :style="{
                background: tag === '游戏' ? 'rgb(var(--glow-tertiary) / 0.15)' : tag === '教育' ? 'rgb(var(--brand-400) / 0.15)' : 'rgb(var(--surface-muted))',
                color: tag === '游戏' ? 'rgb(var(--glow-tertiary))' : tag === '教育' ? 'rgb(var(--brand-400))' : 'rgb(var(--text-subtle))'
              }"
            >{{ tag }}</span>
          </div>
          <div class="flex items-center gap-3">
            <a :href="project.demo" target="_blank" rel="noopener"
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
              :style="{ background: `rgb(${project.color})`, color: '#fff' }">
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              在线试玩
            </a>
            <a :href="project.source" target="_blank" rel="noopener" class="text-xs link">
              源码 →
            </a>
          </div>
        </article>
      </Card3D>
    </div>

    <!-- GitHub 仓库 -->
    <h3 class="text-sm font-medium mb-4" :style="{ color: 'rgb(var(--text-subtle))' }">GitHub 仓库</h3>
    <div v-if="loading" class="flex justify-center py-12">
      <div class="w-5 h-5 border-2 border-brand-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div v-else-if="error" class="text-center py-8">
      <p class="text-sm mb-2" :style="{ color: 'rgb(var(--text-muted))' }">{{ error }}</p>
      <button @click="fetchRepos" class="text-xs text-brand-400 hover:underline">重试</button>
    </div>
    <div v-else class="grid gap-4 md:grid-cols-2">
      <Card3D
        v-for="repo in repos"
        :key="repo.id"
      >
        <article class="group card card-hover card-accent card-glow h-full">
          <div class="flex items-center gap-2 mb-2">
            <svg class="w-4 h-4" :style="{ color: 'rgb(var(--text-subtle))' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <h3 class="font-medium text-sm" :style="{ color: 'rgb(var(--text))' }">{{ repo.name }}</h3>
          </div>
          <p class="text-xs leading-relaxed mb-3" :style="{ color: 'rgb(var(--text-muted))' }">
            {{ repo.description || '暂无描述' }}
          </p>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3 text-xs" :style="{ color: 'rgb(var(--text-subtle))' }">
              <span v-if="repo.language" class="flex items-center gap-1">
                <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: langColor(repo.language) }"></span>
                {{ repo.language }}
              </span>
              <span class="flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                {{ repo.stargazers_count }}
              </span>
            </div>
            <a :href="repo.html_url" target="_blank" class="text-xs link">查看源码</a>
          </div>
        </article>
      </Card3D>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Card3D from './Card3D.vue'
import { featuredProjects } from '../config.js'

const GITHUB_USER = 'zhengzhouming1984'
const CACHE_KEY = 'gh_repos_cache'
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

const repos = ref([])
const loading = ref(true)
const error = ref('')

const langColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Vue: '#41b883',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  C: '#555555',
  'C++': '#f34b7d',
}

function langColor(lang) {
  return langColors[lang] || '#8b8b8b'
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function getCached() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { data, ts } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }
    return data
  } catch {
    return null
  }
}

function setCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }))
  } catch { /* quota exceeded, skip */ }
}

let fetchController = null

async function fetchRepos() {
  loading.value = true
  error.value = ''

  const cached = getCached()
  if (cached) {
    repos.value = cached
    loading.value = false
    return
  }

  fetchController = new AbortController()

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6&type=owner`, { signal: fetchController.signal })
    if (!res.ok) throw new Error(res.status === 403 ? 'GitHub API 速率限制，请稍后重试' : '获取仓库失败')
    const data = await res.json()
    repos.value = (data || []).filter(r => !r.fork)
    setCache(repos.value)
  } catch (e) {
    error.value = e.message || '加载失败'
  } finally {
    loading.value = false
  }
}

onMounted(fetchRepos)

onUnmounted(() => {
  if (fetchController) {
    fetchController.abort()
  }
})
</script>
