<template>
  <Transition name="fade">
    <div class="rose-loader-overlay" v-if="visible">
      <div class="rose-loader-content">
        <div class="frame">
          <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <g id="rose-group">
              <path id="rose-path" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" opacity="0.1"></path>
            </g>
          </svg>
        </div>
        <div class="meta">
          <div class="title">学生学籍管理系统</div>
          <div class="tag">StuRegSys Loading...</div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: true
  }
})

const SVG_NS = 'http://www.w3.org/2000/svg'
let animationId = null
let particles = []

const config = {
  name: "Rose Three",
  tag: "r = a cos(3θ)",
  rotate: true,
  particleCount: 76,
  trailSpan: 0.31,
  durationMs: 5300,
  rotationDurationMs: 28000,
  pulseDurationMs: 4400,
  strokeWidth: 4.6,
  roseA: 9.2,
  roseABoost: 0.6,
  roseBreathBase: 0.72,
  roseBreathBoost: 0.28,
  roseScale: 3.25,
  point(progress, detailScale, config) {
    const t = progress * Math.PI * 2
    const a = config.roseA + detailScale * config.roseABoost
    const r = a * (config.roseBreathBase + detailScale * config.roseBreathBoost) * Math.cos(3 * t)
    return {
      x: 50 + Math.cos(t) * r * config.roseScale,
      y: 50 + Math.sin(t) * r * config.roseScale,
    }
  }
}

function normalizeProgress(progress) {
  return ((progress % 1) + 1) % 1
}

function getDetailScale(time) {
  const pulseProgress = (time % config.pulseDurationMs) / config.pulseDurationMs
  const pulseAngle = pulseProgress * Math.PI * 2
  return 0.52 + ((Math.sin(pulseAngle + 0.55) + 1) / 2) * 0.48
}

function getRotation(time) {
  if (!config.rotate) return 0
  return -((time % config.rotationDurationMs) / config.rotationDurationMs) * 360
}

function buildPath(detailScale, steps = 480) {
  return Array.from({ length: steps + 1 }, (_, index) => {
    const point = config.point(index / steps, detailScale, config)
    return `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`
  }).join(' ')
}

function getParticle(index, progress, detailScale) {
  const tailOffset = index / (config.particleCount - 1)
  const point = config.point(normalizeProgress(progress - tailOffset * config.trailSpan), detailScale, config)
  const fade = Math.pow(1 - tailOffset, 0.56)
  return {
    x: point.x,
    y: point.y,
    radius: 0.9 + fade * 2.7,
    opacity: 0.04 + fade * 0.96,
  }
}

let startedAt = 0

function render(now) {
  if (!props.visible) return
  
  const time = now - startedAt
  const progress = (time % config.durationMs) / config.durationMs
  const detailScale = getDetailScale(time)
  
  const group = document.getElementById('rose-group')
  const path = document.getElementById('rose-path')
  
  if (group && path) {
    group.setAttribute('transform', `rotate(${getRotation(time)} 50 50)`)
    path.setAttribute('d', buildPath(detailScale))
    
    particles.forEach((node, index) => {
      const particle = getParticle(index, progress, detailScale)
      node.setAttribute('cx', particle.x.toFixed(2))
      node.setAttribute('cy', particle.y.toFixed(2))
      node.setAttribute('r', particle.radius.toFixed(2))
      node.setAttribute('opacity', particle.opacity.toFixed(3))
    })
  }
  
  animationId = requestAnimationFrame(render)
}

function initParticles() {
  const group = document.getElementById('rose-group')
  if (!group) return
  
  particles.forEach(p => p.remove())
  particles = []
  
  for (let i = 0; i < config.particleCount; i++) {
    const circle = document.createElementNS(SVG_NS, 'circle')
    circle.setAttribute('fill', 'currentColor')
    group.appendChild(circle)
    particles.push(circle)
  }
}

function startAnimation() {
  startedAt = performance.now()
  initParticles()
  animationId = requestAnimationFrame(render)
}

function stopAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

watch(() => props.visible, (newVal) => {
  if (newVal) {
    startAnimation()
  } else {
    stopAnimation()
  }
})

onMounted(() => {
  if (props.visible) {
    startAnimation()
  }
})

onBeforeUnmount(() => {
  stopAnimation()
  particles.forEach(p => p.remove())
  particles = []
})
</script>

<style scoped>
.fade-leave-active {
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.rose-loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  display: grid;
  place-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.rose-loader-content {
  display: grid;
  gap: 16px;
  justify-items: center;
  padding: 24px;
}

.frame {
  width: min(35vmin, 200px);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
}

svg {
  width: 100%;
  height: 100%;
  overflow: visible;
  color: #333333;
}

.meta {
  display: grid;
  gap: 8px;
  text-align: center;
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.tag {
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.5);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
</style>
