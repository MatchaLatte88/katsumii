<template>
  <!--
    KbBackground.vue — Portable background component (Vue 3, no Pinia required)

    Props:
      pattern  String  'honeycomb' | 'lines' | 'sky' | 'seasonal'   default: 'honeycomb'
      isDark   Boolean                                                default: false

    Requires in your project:
      kb-tokens.css  (CSS variables for dark/light)
      kb-blobs.css   (optional, body blob effects)

    Usage:
      <KbBackground :pattern="bgPattern" :isDark="isDark" />

    Place this as the FIRST element in your App.vue template.
    Your main content wrapper needs: position: relative; z-index: 1 (or higher).

    CSS-only alternative (honeycomb only): use kb-grid.css instead of this component.
  -->
  <div class="k-bg" :class="isDark ? 'k-bg-dark' : 'k-bg-light'" aria-hidden="true">
    <div class="k-bg-gradient" />

    <!-- Honeycomb SVG pattern -->
    <svg v-if="pattern === 'honeycomb'" class="k-bg-grid" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="hc" x="0" y="0" width="69.28" height="60" patternUnits="userSpaceOnUse">
          <path d="M34.64,0 L51.96,10 L51.96,30 L34.64,40 L17.32,30 L17.32,10 Z M0,0 L17.32,10 M17.32,30 L0,40 M51.96,10 L69.28,0 M69.28,40 L51.96,30 M34.64,40 L34.64,60 M0,40 L0,60"
            style="fill:none;stroke:var(--hc-stroke);stroke-width:1.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hc)" />
    </svg>

    <!-- Canvas patterns -->
    <canvas v-else-if="pattern === 'lines'"    ref="linesCanvas"    class="k-bg-canvas" aria-hidden="true" />
    <canvas v-else-if="pattern === 'sky'"      ref="skyCanvas"      class="k-bg-canvas" aria-hidden="true" />
    <canvas v-else-if="pattern === 'seasonal'" ref="seasonalCanvas" class="k-bg-canvas" aria-hidden="true" />
    <canvas v-else-if="pattern === 'stars'"    ref="starsCanvas"    class="k-bg-canvas" aria-hidden="true" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  pattern: { type: String,  default: 'honeycomb' }, // 'honeycomb' | 'lines' | 'sky' | 'seasonal' | 'stars'
  isDark:  { type: Boolean, default: false },
})

// ── Flowing Lines ──────────────────────────────────────────────────────────
const linesCanvas = ref(null)
let linesRaf = null

function startFlow() {
  const canvas = linesCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  function resize() {
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = window.innerHeight + 'px'
    ctx.scale(dpr, dpr)
  }
  resize()
  window.addEventListener('resize', resize)
  canvas._resizeHandler = resize
  const ribbons = Array.from({ length: 20 }, () => ({
    baseY: Math.random() * window.innerHeight,
    amp1: 30 + Math.random() * 60, amp2: 15 + Math.random() * 35,
    freq1: 0.0008 + Math.random() * 0.0012, freq2: 0.0018 + Math.random() * 0.0022,
    speed1: 0.12 + Math.random() * 0.18, speed2: 0.07 + Math.random() * 0.13,
    hue: 180 + Math.random() * 60, alphaBase: 0.015 + Math.random() * 0.025,
    breathFreq: 0.3 + Math.random() * 0.4, breathOff: Math.random() * Math.PI * 2,
  }))
  let t = 0
  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    for (const r of ribbons) {
      const breath = 0.5 + 0.5 * Math.sin(t * r.breathFreq + r.breathOff)
      const modeBoost = props.isDark ? 1 : 2.2
      const alpha = r.alphaBase * (0.6 + 0.4 * breath) * modeBoost
      ctx.beginPath()
      ctx.strokeStyle = `hsla(${r.hue},80%,${props.isDark ? 68 : 52}%,${alpha})`
      ctx.lineWidth = 1.2
      ctx.shadowColor = `hsla(${r.hue},90%,70%,${alpha * 0.3})`
      ctx.shadowBlur = 3
      let first = true
      for (let x = 0; x <= window.innerWidth; x += 3) {
        const y = r.baseY + r.amp1 * Math.sin(x * r.freq1 + t * r.speed1) + r.amp2 * Math.sin(x * r.freq2 + t * r.speed2)
        if (first) { ctx.moveTo(x, y); first = false } else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
    t += 0.016
    linesRaf = requestAnimationFrame(draw)
  }
  linesRaf = requestAnimationFrame(draw)
}

function stopFlow() {
  if (linesRaf) { cancelAnimationFrame(linesRaf); linesRaf = null }
  if (linesCanvas.value?._resizeHandler) window.removeEventListener('resize', linesCanvas.value._resizeHandler)
}

// ── Sky ────────────────────────────────────────────────────────────────────
const skyCanvas = ref(null)
let skyRaf = null


function startSky() {
  const canvas = skyCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const dark = props.isDark
  function resize() {
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr; canvas.height = window.innerHeight * dpr
    canvas.style.width = window.innerWidth + 'px'; canvas.style.height = window.innerHeight + 'px'
    ctx.scale(dpr, dpr)
  }
  resize(); window.addEventListener('resize', resize); canvas._skyResizeHandler = resize
  // Shared rain factory
  const ANGLE = Math.PI / 12   // ~15° diagonal
  const sinA = Math.sin(ANGLE), cosA = Math.cos(ANGLE)
  function makeDrops(count, W, H) {
    return Array.from({ length: count }, () => ({
      x: Math.random() * (W + 200) - 100,
      y: Math.random() * H,
      len: dark ? (18 + Math.random() * 28) : (14 + Math.random() * 22),
      speed: dark ? (1.2 + Math.random() * 1.6) : (1.0 + Math.random() * 1.2),
      alpha: dark ? (0.06 + Math.random() * 0.10) : (0.22 + Math.random() * 0.26),
      width: dark ? (0.6 + Math.random() * 0.7) : (0.5 + Math.random() * 0.6),
    }))
  }
  let W = window.innerWidth, H = window.innerHeight
  const COUNT = dark ? 140 : 100
  let drops = makeDrops(COUNT, W, H)
  canvas._skyDropReinit = () => { W = window.innerWidth; H = window.innerHeight; drops = makeDrops(COUNT, W, H) }
  window.addEventListener('resize', canvas._skyDropReinit)

  if (dark) {
    // Dark rain: deep blue-cyan streaks with faint glow
    function drawDark() {
      ctx.clearRect(0, 0, W, H)
      ctx.save()
      ctx.lineCap = 'round'
      for (const d of drops) {
        d.x += sinA * d.speed; d.y += cosA * d.speed
        if (d.y - d.len > H || d.x > W + 100) { d.y = -d.len - Math.random() * H * 0.3; d.x = Math.random() * (W + 200) - 100 }
        const x2 = d.x - sinA * d.len, y2 = d.y - cosA * d.len
        const g = ctx.createLinearGradient(x2, y2, d.x, d.y)
        g.addColorStop(0, `rgba(100,160,240,0)`)
        g.addColorStop(1, `rgba(120,180,255,${d.alpha})`)
        ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(d.x, d.y)
        ctx.strokeStyle = g; ctx.lineWidth = d.width; ctx.stroke()
      }
      ctx.restore()
      skyRaf = requestAnimationFrame(drawDark)
    }
    skyRaf = requestAnimationFrame(drawDark)
    return
  }

  // Light rain: blue streaks with a soft dark-blue background gradient
  function drawLight() {
    ctx.clearRect(0, 0, W, H)
    ctx.save()
    ctx.lineCap = 'round'
    for (const d of drops) {
      d.x += sinA * d.speed; d.y += cosA * d.speed
      if (d.y - d.len > H || d.x > W + 100) { d.y = -d.len - Math.random() * H * 0.3; d.x = Math.random() * (W + 200) - 100 }
      const x2 = d.x - sinA * d.len, y2 = d.y - cosA * d.len
      const g = ctx.createLinearGradient(x2, y2, d.x, d.y)
      g.addColorStop(0, `rgba(60, 110, 220, 0)`)
      g.addColorStop(1, `rgba(50, 100, 210, ${d.alpha})`)
      ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(d.x, d.y)
      ctx.strokeStyle = g; ctx.lineWidth = d.width; ctx.stroke()
    }
    ctx.restore()
    skyRaf = requestAnimationFrame(drawLight)
  }
  skyRaf = requestAnimationFrame(drawLight)
}

function stopSky() {
  if (skyRaf) { cancelAnimationFrame(skyRaf); skyRaf = null }
  if (skyCanvas.value?._skyResizeHandler) window.removeEventListener('resize', skyCanvas.value._skyResizeHandler)
  if (skyCanvas.value?._skyDropReinit)    window.removeEventListener('resize', skyCanvas.value._skyDropReinit)
}

// ── Seasonal ───────────────────────────────────────────────────────────────
const seasonalCanvas = ref(null)
let seasonalRaf = null

function drawSnowflakeShape(ctx, size, alpha) {
  const branch=size*0.18,outer=size*0.88,inner=size*0.5
  ctx.strokeStyle=`rgba(236,246,255,${alpha})`; ctx.lineWidth=Math.max(0.75,size*0.085); ctx.lineCap='round'
  for (let i=0;i<6;i++) {
    ctx.save(); ctx.rotate((Math.PI/3)*i)
    ctx.beginPath(); ctx.moveTo(0,-outer); ctx.lineTo(0,outer); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(0,-inner); ctx.lineTo(branch,-size*0.3); ctx.moveTo(0,-inner); ctx.lineTo(-branch,-size*0.3)
    ctx.moveTo(0,inner*0.92); ctx.lineTo(branch,size*0.26); ctx.moveTo(0,inner*0.92); ctx.lineTo(-branch,size*0.26)
    ctx.stroke(); ctx.restore()
  }
  ctx.beginPath()
  for (let i=0;i<6;i++) { const a=(Math.PI/3)*i-Math.PI/2; if(i===0)ctx.moveTo(Math.cos(a)*size*0.34,Math.sin(a)*size*0.34); else ctx.lineTo(Math.cos(a)*size*0.34,Math.sin(a)*size*0.34) }
  ctx.closePath(); ctx.strokeStyle=`rgba(225,240,255,${alpha*0.45})`; ctx.lineWidth=Math.max(0.55,size*0.05); ctx.stroke()
  ctx.beginPath(); ctx.arc(0,0,Math.max(0.6,size*0.12),0,Math.PI*2); ctx.fillStyle=`rgba(245,250,255,${Math.min(0.82,alpha+0.03)})`; ctx.fill()
}

function drawSinglePetal(ctx, size, colorA, colorB) {
  const w=size*0.92, h=size*1.0, nd=size*0.22, nw=size*0.18
  ctx.beginPath()
  ctx.moveTo(-nw, -h+nd)
  ctx.bezierCurveTo(-nw*2.2,-h*1.08,-w,-h*0.68,-w,-h*0.08)
  ctx.bezierCurveTo(-w,h*0.46,-w*0.36,h,0,h)
  ctx.bezierCurveTo(w*0.36,h,w,h*0.46,w,-h*0.08)
  ctx.bezierCurveTo(w,-h*0.68,nw*2.2,-h*1.08,nw,-h+nd)
  ctx.bezierCurveTo(nw*0.35,-h+nd*0.25,-nw*0.35,-h+nd*0.25,-nw,-h+nd)
  ctx.closePath()
  const fill=ctx.createLinearGradient(-w,-h,w,h); fill.addColorStop(0,colorA); fill.addColorStop(1,colorB)
  ctx.fillStyle=fill; ctx.fill()
}

function drawSakuraBlossom(ctx, size, colorA, colorB) {
  const ps=size*0.46, offset=size*0.50
  for (let i=0; i<5; i++) {
    ctx.save(); ctx.rotate(i*Math.PI*2/5); ctx.translate(0,-offset)
    drawSinglePetal(ctx,ps,colorA,colorB); ctx.restore()
  }
  ctx.beginPath(); ctx.arc(0,0,size*0.22,0,Math.PI*2)
  ctx.fillStyle='rgba(245,210,155,0.88)'; ctx.fill()
  for (let i=0; i<6; i++) {
    const a=i*Math.PI/3; const r1=size*0.22, r2=size*0.32
    ctx.beginPath(); ctx.moveTo(Math.cos(a)*r1,Math.sin(a)*r1); ctx.lineTo(Math.cos(a)*r2,Math.sin(a)*r2)
    ctx.strokeStyle='rgba(190,140,80,0.55)'; ctx.lineWidth=Math.max(0.5,size*0.04); ctx.stroke()
    ctx.beginPath(); ctx.arc(Math.cos(a)*r2,Math.sin(a)*r2,Math.max(0.5,size*0.04),0,Math.PI*2)
    ctx.fillStyle='rgba(210,160,80,0.75)'; ctx.fill()
  }
}

function startSeasonal() {
  const canvas = seasonalCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const dark = props.isDark
  function resize() {
    const dpr = window.devicePixelRatio || 1
    canvas.width=window.innerWidth*dpr; canvas.height=window.innerHeight*dpr
    canvas.style.width=window.innerWidth+'px'; canvas.style.height=window.innerHeight+'px'
    ctx.setTransform(1,0,0,1,0,0); ctx.scale(dpr,dpr)
  }
  resize(); window.addEventListener('resize', resize); canvas._seasonalResizeHandler = resize
  const W=()=>window.innerWidth, H=()=>window.innerHeight
  if (dark) {
    const flakes = Array.from({ length: 30 }, () => ({
      x:Math.random()*W(), y:Math.random()*H(), size:2.6+Math.random()*4.8,
      speedY:0.14+Math.random()*0.24, driftAmp:10+Math.random()*28, driftFreq:0.32+Math.random()*0.9,
      driftOffset:Math.random()*Math.PI*2, alpha:0.18+Math.random()*0.2,
      rot:Math.random()*Math.PI*2, rotSpeed:(Math.random()*0.004+0.0015)*(Math.random()<0.5?-1:1),
    }))
    const fallingStars = []
    let t=0
    function onFlakeClick(e) {
      const rect=canvas.getBoundingClientRect()
      const cx=e.clientX-rect.left, cy=e.clientY-rect.top
      for (let i=0; i<flakes.length; i++) {
        const f=flakes[i]
        const fx=f.x+Math.sin(t*f.driftFreq+f.driftOffset)*f.driftAmp
        if (Math.hypot(cx-fx, cy-f.y) < f.size*3.6) {
          const angle=Math.PI*0.18+Math.random()*Math.PI*0.1
          const speed=4.5+Math.random()*3
          fallingStars.push({
            x:W()*(0.55+Math.random()*0.45),
            y:H()*(Math.random()*0.3),
            vx:-Math.cos(angle)*speed,
            vy:Math.sin(angle)*speed,
            len:80+Math.random()*120,
            alpha:1,
            decay:0.006+Math.random()*0.002,
            width:1.2+Math.random()*1.2,
            trail:[],
          })
          break
        }
      }
    }
    window.addEventListener('click', onFlakeClick)
    canvas._flakeClickHandler = onFlakeClick
    function drawDark() {
      ctx.clearRect(0,0,W(),H())
      for (const f of flakes) {
        f.y+=f.speedY; f.rot+=f.rotSpeed
        if(f.y-f.size*4>H()){f.y=-20-Math.random()*120;f.x=Math.random()*W()}
        const x=f.x+Math.sin(t*f.driftFreq+f.driftOffset)*f.driftAmp
        const glow=ctx.createRadialGradient(x,f.y,0,x,f.y,f.size*3.6)
        glow.addColorStop(0,`rgba(210,235,255,${f.alpha*0.2})`); glow.addColorStop(0.45,`rgba(190,225,255,${f.alpha*0.08})`); glow.addColorStop(1,'transparent')
        ctx.beginPath(); ctx.arc(x,f.y,f.size*3.6,0,Math.PI*2); ctx.fillStyle=glow; ctx.fill()
        ctx.save(); ctx.translate(x,f.y); ctx.rotate(f.rot); drawSnowflakeShape(ctx,f.size,f.alpha); ctx.restore()
      }
      for (let i=fallingStars.length-1; i>=0; i--) {
        const s=fallingStars[i]
        s.trail.push({x:s.x, y:s.y})
        if (s.trail.length>Math.ceil(s.len/5)) s.trail.shift()
        s.x+=s.vx; s.y+=s.vy; s.alpha-=s.decay
        if (s.alpha<=0) { fallingStars.splice(i,1); continue }
        if (s.trail.length>1) {
          const tailGrad=ctx.createLinearGradient(s.trail[0].x,s.trail[0].y,s.x,s.y)
          tailGrad.addColorStop(0,'rgba(255,255,255,0)')
          tailGrad.addColorStop(0.6,`rgba(200,230,255,${s.alpha*0.35})`)
          tailGrad.addColorStop(1,`rgba(255,255,255,${s.alpha*0.9})`)
          ctx.beginPath(); ctx.moveTo(s.trail[0].x,s.trail[0].y)
          for (const p of s.trail) ctx.lineTo(p.x,p.y)
          ctx.lineTo(s.x,s.y)
          ctx.strokeStyle=tailGrad; ctx.lineWidth=s.width; ctx.lineCap='round'; ctx.stroke()
        }
        const headGlow=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.width*5)
        headGlow.addColorStop(0,`rgba(255,255,255,${s.alpha})`)
        headGlow.addColorStop(0.4,`rgba(200,230,255,${s.alpha*0.5})`)
        headGlow.addColorStop(1,'transparent')
        ctx.beginPath(); ctx.arc(s.x,s.y,s.width*5,0,Math.PI*2); ctx.fillStyle=headGlow; ctx.fill()
      }
      t+=0.01; seasonalRaf=requestAnimationFrame(drawDark)
    }
    seasonalRaf=requestAnimationFrame(drawDark); return
  }
  const leaves = Array.from({ length: 14 }, () => {
    const size=8+Math.random()*8
    return {
      x:Math.random()*W(), y:Math.random()*H(), size,
      speedY:0.18+Math.random()*0.20, swayAmp:10+Math.random()*20, swayFreq:0.55+Math.random()*0.9,
      swayOffset:Math.random()*Math.PI*2, rot:Math.random()*Math.PI*2,
      rotSpeed:(Math.random()*0.008+0.003)*(Math.random()<0.5?-1:1),
      colorA:['rgba(255,182,210,0.95)','rgba(255,168,200,0.95)','rgba(252,190,220,0.95)','rgba(255,175,205,0.95)'][Math.floor(Math.random()*4)],
      colorB:['rgba(255,140,180,0.90)','rgba(248,150,188,0.90)','rgba(255,130,172,0.90)','rgba(250,155,192,0.90)'][Math.floor(Math.random()*4)],
    }
  })
  const tornPieces = []
  let t=0
  function onCanvasClick(e) {
    const rect=canvas.getBoundingClientRect()
    const cx=e.clientX-rect.left, cy=e.clientY-rect.top
    for (let i=0; i<leaves.length; i++) {
      const l=leaves[i]
      const lx=l.x+Math.sin(t*l.swayFreq+l.swayOffset)*l.swayAmp
      if (Math.hypot(cx-lx, cy-l.y) < l.size*1.4) {
        for (let p=0; p<5; p++) {
          const angle=l.rot+p*(Math.PI*2/5)+(Math.random()-0.5)*0.3
          const speed=1.2+Math.random()*1.4
          tornPieces.push({
            x:lx, y:l.y, size:l.size*0.58,
            colorA:l.colorA, colorB:l.colorB,
            vx:Math.cos(angle)*speed, vy:Math.sin(angle)*speed-0.4,
            rot:angle, rotSpeed:(Math.random()*0.020+0.008)*(Math.random()<0.5?-1:1),
          })
        }
        leaves.splice(i,1); break
      }
    }
  }
  window.addEventListener('click', onCanvasClick)
  canvas._leafClickHandler = onCanvasClick
  function drawLight() {
    ctx.clearRect(0,0,W(),H())
    for (const l of leaves) {
      l.y+=l.speedY; l.rot+=l.rotSpeed
      if(l.y-l.size*2>H()){l.y=-20-Math.random()*140;l.x=Math.random()*W()}
      const x=l.x+Math.sin(t*l.swayFreq+l.swayOffset)*l.swayAmp
      ctx.save(); ctx.translate(x,l.y); ctx.rotate(l.rot); ctx.shadowBlur=0
      drawSakuraBlossom(ctx,l.size,l.colorA,l.colorB); ctx.restore()
    }
    for (let i=tornPieces.length-1; i>=0; i--) {
      const p=tornPieces[i]
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.018; p.rot+=p.rotSpeed
      if (p.y-p.size*3>H()) { tornPieces.splice(i,1); continue }
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot)
      drawSinglePetal(ctx,p.size,p.colorA,p.colorB); ctx.restore()
    }
    t+=0.012; seasonalRaf=requestAnimationFrame(drawLight)
  }
  seasonalRaf=requestAnimationFrame(drawLight)
}

function stopSeasonal() {
  if (seasonalRaf) { cancelAnimationFrame(seasonalRaf); seasonalRaf = null }
  if (seasonalCanvas.value?._seasonalResizeHandler) window.removeEventListener('resize', seasonalCanvas.value._seasonalResizeHandler)
  if (seasonalCanvas.value?._leafClickHandler)      window.removeEventListener('click', seasonalCanvas.value._leafClickHandler)
  if (seasonalCanvas.value?._flakeClickHandler)     window.removeEventListener('click', seasonalCanvas.value._flakeClickHandler)
}

// ── Stars (dark-only) ───────────────────────────────────────────────────────
const starsCanvas = ref(null)
let starsRaf = null

function startStars() {
  const canvas = starsCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  function resize() {
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr; canvas.height = window.innerHeight * dpr
    canvas.style.width = window.innerWidth + 'px'; canvas.style.height = window.innerHeight + 'px'
    ctx.scale(dpr, dpr)
  }
  resize(); window.addEventListener('resize', resize); canvas._starsResizeHandler = resize
  const stars = Array.from({ length: 220 }, () => ({
    x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
    r: 0.3 + Math.random() * 1.1, alpha: 0.3 + Math.random() * 0.55,
    twinkleSpd: 0.4 + Math.random() * 1.8, twinkleOff: Math.random() * Math.PI * 2,
    glow: Math.random() < 0.18,
  }))
  let t = 0
  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    for (const s of stars) {
      const a = s.alpha * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.twinkleSpd + s.twinkleOff)))
      if (s.glow) {
        const g = ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*5)
        g.addColorStop(0,`rgba(190,215,255,${a*0.55})`); g.addColorStop(1,'transparent')
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r*5,0,Math.PI*2); ctx.fillStyle=g; ctx.fill()
      }
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fillStyle=`rgba(215,230,255,${a})`; ctx.fill()
    }
    t += 0.016; starsRaf = requestAnimationFrame(draw)
  }
  starsRaf = requestAnimationFrame(draw)
}

function stopStars() {
  if (starsRaf) { cancelAnimationFrame(starsRaf); starsRaf = null }
  if (starsCanvas.value?._starsResizeHandler) window.removeEventListener('resize', starsCanvas.value._starsResizeHandler)
}

// ── Lifecycle ──────────────────────────────────────────────────────────────
watch(() => props.pattern, (val, old) => {
  if (old === 'lines')    stopFlow()
  if (old === 'sky')      stopSky()
  if (old === 'seasonal') stopSeasonal()
  if (old === 'stars')    stopStars()
  if (val === 'lines')    setTimeout(startFlow,    0)
  if (val === 'sky')      setTimeout(startSky,     0)
  if (val === 'seasonal') setTimeout(startSeasonal, 0)
  if (val === 'stars')    setTimeout(startStars,    0)
}, { flush: 'post' })

watch(() => props.isDark, () => {
  if (props.pattern === 'sky')      { stopSky();      setTimeout(startSky,      0) }
  if (props.pattern === 'seasonal') { stopSeasonal(); setTimeout(startSeasonal, 0) }
})

onMounted(() => {
  if (props.pattern === 'lines')    setTimeout(startFlow,    0)
  if (props.pattern === 'sky')      setTimeout(startSky,     0)
  if (props.pattern === 'seasonal') setTimeout(startSeasonal, 0)
  if (props.pattern === 'stars')    setTimeout(startStars,    0)
})

onBeforeUnmount(() => {
  stopFlow(); stopSky(); stopSeasonal(); stopStars()
})
</script>

<style scoped>
.k-bg {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.k-bg-dark  { --orb-a: rgba(59,130,246,0.08); --orb-b: rgba(34,211,238,0.06); --hc-stroke: rgba(34,211,238,0.02); }
.k-bg-light { --orb-a: transparent; --orb-b: transparent; --hc-stroke: rgba(8,145,178,0.04); }

.k-bg-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 55% at 8% 18%, var(--orb-a), transparent 60%),
    radial-gradient(ellipse 55% 45% at 88% 80%, var(--orb-b), transparent 55%);
}

.k-bg-grid {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  mask-image: linear-gradient(180deg, transparent 0%, black 12%, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 12%, black 80%, transparent 100%);
}

.k-bg-canvas {
  position: absolute;
  inset: 0;
  display: block;
}
</style>
