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
      <article
        v-for="repo in repos"
        :key="repo.id"
        class="group card card-hover"
      >
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

async function fetchRepos() {
  loading.value = true
  error.value = ''

  const cached = getCached()
  if (cached) {
    repos.value = cached
    loading.value = false
    return
  }

  const controller = new AbortController()

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6&type=owner`, { signal: controller.signal })
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
