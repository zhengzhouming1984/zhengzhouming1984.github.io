<template>
  <section id="projects" class="section-container">
    <h2 class="section-title">项目作品</h2>
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
        <article class="group card card-hover card-accent card-glow h-full flex flex-col">
          <!-- 顶部：图标 + 名称 + 语言 -->
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                :style="{ background: 'rgb(var(--brand-400) / 0.1)' }">
                <svg class="w-4 h-4" :style="{ color: 'rgb(var(--brand-400))' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <div class="min-w-0">
                <h3 class="font-medium text-sm truncate" :style="{ color: 'rgb(var(--text))' }">{{ repo.name }}</h3>
                <span v-if="repo.language" class="flex items-center gap-1 text-[11px] mt-0.5" :style="{ color: 'rgb(var(--text-subtle))' }">
                  <span class="w-2 h-2 rounded-full flex-shrink-0" :style="{ backgroundColor: langColor(repo.language) }"></span>
                  {{ repo.language }}
                </span>
              </div>
            </div>
            <a :href="repo.html_url" target="_blank" rel="noopener"
              class="flex-shrink-0 p-1.5 rounded-md transition-colors opacity-0 group-hover:opacity-100"
              :style="{ color: 'rgb(var(--text-subtle))' }"
              @mouseenter="(e) => { e.currentTarget.style.background = 'rgb(var(--surface-muted))'; e.currentTarget.style.color = 'rgb(var(--brand-400))' }"
              @mouseleave="(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgb(var(--text-subtle))' }"
              aria-label="查看源码">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <!-- 描述 -->
          <p class="text-xs leading-relaxed mb-4 flex-1" :style="{ color: 'rgb(var(--text-muted))' }">
            {{ repo.description || '暂无描述' }}
          </p>

          <!-- 底部信息 -->
          <div class="flex items-center gap-4 text-[11px] pt-3 border-t" :style="{ borderColor: 'rgb(var(--border-muted))', color: 'rgb(var(--text-subtle))' }">
            <span v-if="repo.stargazers_count" class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              {{ repo.stargazers_count }}
            </span>
            <span v-if="repo.forks_count" class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              {{ repo.forks_count }}
            </span>
            <span class="ml-auto font-mono" :style="{ color: 'rgb(var(--text-subtle))' }">
              {{ formatDate(repo.updated_at) }}
            </span>
          </div>
        </article>
      </Card3D>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Card3D from './Card3D.vue'

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
