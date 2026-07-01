<template>
  <div
    ref="cardRef"
    class="card-3d"
    @mousemove="onMouseMove"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div class="card-3d-inner" :style="transformStyle">
      <div class="card-3d-shine" :style="shineStyle"></div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const cardRef = ref(null)
const rotateX = ref(0)
const rotateY = ref(0)
const shineX = ref(50)
const shineY = ref(50)
const isHovering = ref(false)
const isMobile = ref(false)

if (typeof window !== 'undefined') {
  isMobile.value = window.innerWidth < 768 || 'ontouchstart' in window
}

const TILT_AMOUNT = isMobile.value ? 3 : 8

const transformStyle = computed(() => ({
  transform: `perspective(800px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`,
  transition: isHovering.value ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out'
}))

const shineStyle = computed(() => ({
  background: `radial-gradient(circle at ${shineX.value}% ${shineY.value}%, rgba(var(--brand-400) / 0.12) 0%, transparent 60%)`,
  opacity: isHovering.value ? 1 : 0,
  transition: 'opacity 0.3s'
}))

function calcTilt(clientX, clientY) {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const pctX = (clientX - centerX) / (rect.width / 2)
  const pctY = (clientY - centerY) / (rect.height / 2)
  rotateX.value = -pctY * TILT_AMOUNT
  rotateY.value = pctX * TILT_AMOUNT
  shineX.value = 50 + pctX * 30
  shineY.value = 50 + pctY * 30
}

function onMouseEnter() {
  if (isMobile.value) return
  isHovering.value = true
}

function onMouseLeave() {
  if (isMobile.value) return
  isHovering.value = false
  rotateX.value = 0
  rotateY.value = 0
  shineX.value = 50
  shineY.value = 50
}

function onMouseMove(e) {
  if (isMobile.value) return
  calcTilt(e.clientX, e.clientY)
}

function onTouchMove(e) {
  if (!isMobile.value) return
  const touch = e.touches[0]
  calcTilt(touch.clientX, touch.clientY)
}

function onTouchEnd() {
  if (!isMobile.value) return
  rotateX.value = 0
  rotateY.value = 0
  shineX.value = 50
  shineY.value = 50
}
</script>

<style scoped>
.card-3d {
  transform-style: preserve-3d;
  -webkit-tap-highlight-color: transparent;
}

.card-3d-inner {
  position: relative;
  transform-style: preserve-3d;
  will-change: transform;
}

.card-3d-shine {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  z-index: 1;
}
</style>
