<template>
  <button
    v-show="visible"
    class="scroll-top-btn"
    :class="{ 'is-visible': visible }"
    @click="scrollToTop"
    aria-label="回到顶部"
    title="回到顶部"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const THRESHOLD = 300
const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > THRESHOLD
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.scroll-top-btn {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgb(var(--border));
  background: rgb(var(--surface-elevated));
  color: rgb(var(--text-muted));
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 50;
  opacity: 0;
  transform: translateY(12px);
  pointer-events: none;
  transition: opacity 0.3s, transform 0.3s, color 0.2s, border-color 0.2s, background 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.scroll-top-btn.is-visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.scroll-top-btn:hover {
  color: rgb(var(--brand-400));
  border-color: rgb(var(--brand-400) / 0.4);
}

.scroll-top-btn:active {
  transform: scale(0.92);
}
</style>
