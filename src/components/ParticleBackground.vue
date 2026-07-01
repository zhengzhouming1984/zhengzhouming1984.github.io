<template>
  <canvas ref="canvas" class="particle-canvas" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let ctx = null
let animId = null
let particles = []
let mouse = { x: -9999, y: -9999 }
let width = 0
let height = 0

const CONFIG = {
  desktop: { count: 80, radius: 2, maxDist: 150, repelRadius: 80 },
  mobile: { count: 35, radius: 1.5, maxDist: 100, repelRadius: 60 }
}

function isMobile() {
  return window.innerWidth < 768
}

function getConfig() {
  return isMobile() ? CONFIG.mobile : CONFIG.desktop
}

function getCSSVar(name) {
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return val.split(/\s+/).map(Number)
}

function createParticles() {
  const cfg = getConfig()
  particles = []
  for (let i = 0; i < cfg.count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: cfg.radius * (0.5 + Math.random())
    })
  }
}

function draw() {
  if (!ctx || !canvas.value) return
  const cfg = getConfig()
  ctx.clearRect(0, 0, width, height)

  // Get current theme color
  const brandColor = getCSSVar('--brand-400')
  const r = brandColor[0] || 52
  const g = brandColor[1] || 211
  const b = brandColor[2] || 153

  // Update & draw particles
  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy

    if (p.x < 0) p.x = width
    if (p.x > width) p.x = 0
    if (p.y < 0) p.y = height
    if (p.y > height) p.y = 0

    // Mouse repel
    const dx = p.x - mouse.x
    const dy = p.y - mouse.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < cfg.repelRadius && dist > 0) {
      const force = (cfg.repelRadius - dist) / cfg.repelRadius
      p.vx += (dx / dist) * force * 0.15
      p.vy += (dy / dist) * force * 0.15
    }

    // Velocity damping
    p.vx *= 0.99
    p.vy *= 0.99

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${r},${g},${b},0.6)`
    ctx.fill()
  }

  // Draw connections
  ctx.strokeStyle = `rgba(${r},${g},${b},0.08)`
  ctx.lineWidth = 0.5
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < cfg.maxDist) {
        const alpha = (1 - dist / cfg.maxDist) * 0.08
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }

  animId = requestAnimationFrame(draw)
}

function resize() {
  if (!canvas.value) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = window.innerWidth
  height = window.innerHeight
  canvas.value.width = width * dpr
  canvas.value.height = height * dpr
  canvas.value.style.width = width + 'px'
  canvas.value.style.height = height + 'px'
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  createParticles()
}

function onMouseMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function onTouchMove(e) {
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX
    mouse.y = e.touches[0].clientY
  }
}

function onVisibilityChange() {
  if (document.hidden) {
    if (animId) { cancelAnimationFrame(animId); animId = null }
  } else {
    if (!animId) animId = requestAnimationFrame(draw)
  }
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  resize()
  animId = requestAnimationFrame(draw)
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  document.addEventListener('visibilitychange', onVisibilityChange)
})

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('touchmove', onTouchMove)
  document.removeEventListener('visibilitychange', onVisibilityChange)
})
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  inset: 0;
  z-index: -9;
  pointer-events: none;
}
</style>
