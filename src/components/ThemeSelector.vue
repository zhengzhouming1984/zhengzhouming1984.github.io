<template>
  <div class="relative" ref="triggerRef">
    <button
      ref="buttonRef"
      @click="toggleMenu"
      class="p-2 rounded-md transition-colors"
      :style="{ color: 'rgb(var(--text-muted))' }"
      @mouseenter="(e) => { e.currentTarget.style.background = 'rgb(var(--surface-muted))' }"
      @mouseleave="(e) => { e.currentTarget.style.background = 'transparent' }"
      :title="'切换主题（当前：' + currentThemeName + '）'"
      :aria-label="'切换主题，当前主题：' + currentThemeName"
      :aria-expanded="isOpen"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    </button>

    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[90]"
        @click="isOpen = false"
      />
    </Teleport>

    <Teleport to="body">
      <div
        v-show="isOpen"
        ref="menuRef"
        class="fixed w-48 rounded-xl border shadow-xl overflow-hidden z-[100]"
        :style="{
          top: menuTop + 'px',
          right: menuRight + 'px',
          background: 'rgb(var(--surface-elevated))',
          borderColor: 'rgb(var(--border))'
        }"
      >
        <div class="px-3 py-2 border-b" :style="{ borderColor: 'rgb(var(--border-muted))' }">
          <span class="text-xs font-medium" :style="{ color: 'rgb(var(--text-muted))' }">选择主题</span>
        </div>
        <div class="py-1">
          <button
            v-for="theme in themes"
            :key="theme.id"
            @click="selectTheme(theme.id)"
            class="w-full px-3 py-2 flex items-center gap-3 text-left text-sm transition-colors"
            :style="{
              background: currentTheme === theme.id ? 'rgb(var(--surface-muted))' : 'transparent',
              color: 'rgb(var(--text))'
            }"
            @mouseenter="(e) => { if (currentTheme !== theme.id) e.currentTarget.style.background = 'rgb(var(--surface-muted))' }"
            @mouseleave="(e) => { if (currentTheme !== theme.id) e.currentTarget.style.background = 'transparent' }"
          >
            <span
              class="w-5 h-5 rounded-full border-2 flex-shrink-0"
              :style="{ background: theme.preview, borderColor: 'rgb(var(--border))' }"
            />
            <span class="flex-1">{{ theme.name }}</span>
            <svg
              v-if="currentTheme === theme.id"
              class="w-4 h-4 text-brand-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const STORAGE_KEY = 'theme-preference'

const themes = [
  { id: 'emerald-dark', name: '翡翠绿', preview: 'linear-gradient(135deg, #10b981, #064e3b)' },
  { id: 'ocean-dark', name: '海洋蓝', preview: 'linear-gradient(135deg, #3b82f6, #1e3a8a)' },
  { id: 'purple-dark', name: '暗夜紫', preview: 'linear-gradient(135deg, #a855f7, #581c87)' },
  { id: 'sunset-dark', name: '落日橙', preview: 'linear-gradient(135deg, #f97316, #7c2d12)' },
  { id: 'sakura-dark', name: '樱花粉', preview: 'linear-gradient(135deg, #ec4899, #831843)' },
  { id: 'mono-dark', name: '经典黑', preview: 'linear-gradient(135deg, #6b7280, #000000)' },
  { id: 'light', name: '极简白', preview: 'linear-gradient(135deg, #ffffff, #e5e7eb)' },
]

const isOpen = ref(false)
const currentTheme = ref('emerald-dark')
const buttonRef = ref(null)
const menuRef = ref(null)
const menuTop = ref(0)
const menuRight = ref(0)

const currentThemeName = computed(() => {
  const theme = themes.find(t => t.id === currentTheme.value)
  return theme ? theme.name : '翡翠绿'
})

function updateMenuPosition() {
  if (buttonRef.value) {
    const rect = buttonRef.value.getBoundingClientRect()
    menuTop.value = rect.bottom + 8
    menuRight.value = window.innerWidth - rect.right
  }
}

function toggleMenu() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      updateMenuPosition()
    })
  }
}

function applyTheme(themeId) {
  document.documentElement.setAttribute('data-theme', themeId)
  if (themeId === 'light') {
    document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.add('dark')
  }
}

function selectTheme(themeId) {
  currentTheme.value = themeId
  applyTheme(themeId)
  localStorage.setItem(STORAGE_KEY, themeId)
  isOpen.value = false
}

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && themes.find(t => t.id === stored)) {
    return stored
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'emerald-dark' : 'light'
}

function handleEscape(e) {
  if (e.key === 'Escape') {
    isOpen.value = false
  }
}

function handleResize() {
  if (isOpen.value) {
    updateMenuPosition()
  }
}

onMounted(() => {
  currentTheme.value = getInitialTheme()
  applyTheme(currentTheme.value)
  document.addEventListener('keydown', handleEscape)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  window.removeEventListener('resize', handleResize)
})
</script>
