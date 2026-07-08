<template>
  <p class="text-lg md:text-xl max-w-xl leading-relaxed">
    <span ref="textEl" class="typewriter-text" :style="{ color: 'rgb(var(--text-muted))' }"></span>
    <span class="typewriter-cursor" :class="{ blink: started }" :style="{ background: 'rgb(var(--brand-400))' }"></span>
  </p>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  speed: { type: Number, default: 80 }
})

const textEl = ref(null)
const started = ref(false)
let timer = null
let idx = 0

function type() {
  if (!textEl.value) return
  started.value = true
  if (idx < props.text.length) {
    textEl.value.textContent += props.text[idx]
    idx++
    timer = setTimeout(type, props.speed + (Math.random() * 30 - 15))
  }
}

onMounted(() => {
  timer = setTimeout(type, 500)
})

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<style scoped>
.typewriter-cursor {
  display: inline-block;
  width: 2px;
  height: 1.15em;
  vertical-align: text-bottom;
  margin-left: 1px;
  border-radius: 1px;
  opacity: 0;
  transition: opacity 0.3s;
}

.typewriter-cursor.blink {
  opacity: 1;
  animation: cursor-blink 0.8s step-end infinite;
}

@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
