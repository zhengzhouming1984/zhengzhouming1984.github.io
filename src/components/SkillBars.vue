<template>
  <div class="skill-bars">
    <div
      v-for="(skill, idx) in skillItems"
      :key="skill.name"
      ref="barRefs"
      class="skill-bar-item"
      :class="{ 'is-visible': skill.visible }"
    >
      <div class="skill-bar-header">
        <span class="skill-bar-label" :style="{ color: 'rgb(var(--text-muted))' }">{{ skill.name }}</span>
        <span class="skill-bar-pct" :style="{ color: 'rgb(var(--text-subtle))' }">{{ skill.displayPct }}%</span>
      </div>
      <div class="skill-bar-track" :style="{ background: 'rgb(var(--border))' }">
        <div
          class="skill-bar-fill"
          :style="{
            width: skill.visible ? skill.level + '%' : '0%',
            background: skill.gradient,
            transition: `width ${0.8 + idx * 0.12}s cubic-bezier(0.22, 1, 0.36, 1)`
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { skills } from '../config.js'

const GRADIENTS = [
  'linear-gradient(90deg, rgb(var(--brand-400)), rgb(var(--glow-primary)))',
  'linear-gradient(90deg, rgb(var(--brand-500)), rgb(var(--glow-secondary)))',
  'linear-gradient(90deg, rgb(var(--brand-300)), rgb(var(--brand-500)))',
  'linear-gradient(90deg, rgb(var(--glow-tertiary)), rgb(var(--brand-400)))',
  'linear-gradient(90deg, rgb(var(--brand-400)), rgb(var(--glow-secondary)))',
  'linear-gradient(90deg, rgb(var(--glow-primary)), rgb(var(--glow-tertiary)))',
  'linear-gradient(90deg, rgb(var(--brand-500)), rgb(var(--glow-tertiary)))',
  'linear-gradient(90deg, rgb(var(--glow-secondary)), rgb(var(--brand-400)))',
  'linear-gradient(90deg, rgb(var(--brand-300)), rgb(var(--glow-primary)))',
  'linear-gradient(90deg, rgb(var(--glow-tertiary)), rgb(var(--glow-secondary)))',
]

const LEVELS = [92, 85, 88, 82, 90, 78, 75, 85, 86, 80]

const skillItems = ref(
  skills.slice(0, 10).map((name, i) => ({
    name,
    level: LEVELS[i] || 80,
    displayPct: 0,
    visible: false,
    gradient: GRADIENTS[i % GRADIENTS.length]
  }))
)

const barRefs = ref([])
let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const idx = Number(entry.target.dataset.index)
        if (!isNaN(idx) && skillItems.value[idx]) {
          skillItems.value[idx].visible = true
          animateNumber(idx)
        }
        observer.unobserve(entry.target)
      }
    }
  }, { threshold: 0.2 })

  // Observe after next tick (refs populated)
  requestAnimationFrame(() => {
    if (barRefs.value) {
      barRefs.value.forEach((el, i) => {
        if (el) { el.dataset.index = i; observer.observe(el) }
      })
    }
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

function animateNumber(idx) {
  const target = skillItems.value[idx].level
  const duration = 800 + idx * 120
  const start = performance.now()
  function step(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    skillItems.value[idx].displayPct = Math.round(eased * target)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
</script>

<style scoped>
.skill-bars {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.skill-bar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.skill-bar-label {
  font-size: 0.8rem;
}

.skill-bar-pct {
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
}

.skill-bar-track {
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  border-radius: 3px;
  will-change: width;
  width: 0;
}

.skill-bar-item.is-visible .skill-bar-fill {
  width: var(--target-width, 0%);
}
</style>
