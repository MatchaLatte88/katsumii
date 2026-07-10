import { gsap } from "gsap"
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three"
import { prefersReducedMotion } from "./motion.js"

/* ── Three.js backgrounds ────────────────────────────────────────
   Interchangeable scenes on one fixed canvas + renderer:
   river  — GPU particle stream, all motion in the vertex shader
   logo   — the bonsai mark assembled from image-sampled particles
   River is retinted per discipline via setAccent. */

export const V6_BG_OPTIONS = [
  { key: "river", label: "River" },
  { key: "logo", label: "Logo" },
]

/* Creates the fixed background stage. Returns null when WebGL is
   unavailable. Options: light (bool), mode (bg key), logoUrl,
   accent = [main, hi] hex pair for the initial tint. */
export function createV6Background(canvas, { light = false, mode = "river", logoUrl = "", accent } = {}) {
  if (!canvas) return null

  let renderer
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" })
  } catch {
    return null
  }

  const reduced = prefersReducedMotion()
  const pointer = { x: 99, y: 99, tx: 99, ty: 99 }
  let scroll = 0
  let current = null
  let currentKey = mode
  let themeLight = !!light
  let raf = 0
  let invalidate = () => {} // async builders request a repaint (reduced motion)
  const start = performance.now()

  // live accent for the particle systems — retinted per discipline via setAccent
  let accentA = accent?.[0] ?? (themeLight ? "#0369a1" : "#22d3ee")
  let accentB = accent?.[1] ?? (themeLight ? "#075985" : "#67e8f9")

  /* river — golden particle stream, one draw call */
  const buildRiver = () => {
    const scene = new Scene()
    const camera = new PerspectiveCamera(55, 1, 0.1, 10)
    camera.position.z = 2.2
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z

    const area = window.innerWidth * window.innerHeight
    const count = reduced
      ? 1600
      : Math.max(2500, Math.min(9000, Math.round(area / 240)))

    const aU = new Float32Array(count)
    const aLane = new Float32Array(count)
    const aSpeed = new Float32Array(count)
    const aSize = new Float32Array(count)
    const aShade = new Float32Array(count)
    const aScatter = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      aU[i] = Math.random()
      aLane[i] = (Math.random() * 2 - 1) * (0.35 + Math.random() * 0.65)
      aSpeed[i] = 0.5 + Math.random()
      aSize[i] = 1.1 + Math.random() * 2.3
      aShade[i] = Math.random()
      aScatter[i * 3] = Math.random() * 2 - 1
      aScatter[i * 3 + 1] = Math.random() * 2 - 1
      aScatter[i * 3 + 2] = Math.random() * 2 - 1
    }
    const geo = new BufferGeometry()
    // three needs a position attribute even though the shader derives its own
    geo.setAttribute("position", new BufferAttribute(new Float32Array(count * 3), 3))
    geo.setAttribute("aU", new BufferAttribute(aU, 1))
    geo.setAttribute("aLane", new BufferAttribute(aLane, 1))
    geo.setAttribute("aSpeed", new BufferAttribute(aSpeed, 1))
    geo.setAttribute("aSize", new BufferAttribute(aSize, 1))
    geo.setAttribute("aShade", new BufferAttribute(aShade, 1))
    geo.setAttribute("aScatter", new BufferAttribute(aScatter, 3))

    const uniforms = {
      uTime: { value: reduced ? 14 : 0 },
      uScroll: { value: 0 },
      uPointer: { value: { x: 99, y: 99 } },
      uPixelRatio: { value: 1 },
      uLight: { value: themeLight ? 1 : 0 },
      uColorA: { value: new Color(accentA) },
      uColorB: { value: new Color(accentB) },
    }

    const material = new ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: themeLight ? NormalBlending : AdditiveBlending,
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uScroll;
        uniform vec2 uPointer;
        uniform float uPixelRatio;
        uniform mediump float uLight;
        attribute float aU;
        attribute float aLane;
        attribute float aSpeed;
        attribute float aSize;
        attribute float aShade;
        attribute vec3 aScatter;
        varying float vShade;
        varying float vAlpha;

        void main() {
          float u = fract(aU + uTime * 0.0084 * aSpeed);
          float env = sin(3.14159265 * u);

          // river: layered waves inside a soft envelope — the shape never
          // changes on scroll, only its visibility fades (see vAlpha below)
          float w1 = sin(u * 9.0 + uTime * 0.385 + aLane * 2.0);
          float w2 = sin(u * 4.2 - uTime * 0.224 + aLane * 5.0);
          vec3 pos = vec3(
            mix(-2.7, 2.7, u),
            aLane * 0.42 * env + (w1 * 0.16 + w2 * 0.1) * env - 0.12,
            aScatter.z * 0.5
          );

          // magnet pull — nearby particles drift a fraction of the way
          // toward the pointer; falls off quickly, never collapses onto it
          vec2 d = pos.xy - uPointer;
          float dist = max(length(d), 0.0001);
          float infl = exp(-dist * 3.5);
          pos.xy = mix(pos.xy, uPointer, infl * 0.3);

          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = aSize * uPixelRatio * (2.4 / -mv.z);

          float tw = 0.62 + 0.38 * sin(uTime * (1.2 + aSpeed) + aU * 43.0);
          float riverA = (0.2 + 0.8 * env) * tw * (1.0 + 1.6 * uLight);
          vAlpha = riverA * (1.0 - uScroll);
          vShade = aShade;
        }
      `,
      fragmentShader: /* glsl */ `
        precision mediump float;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform mediump float uLight;
        varying float vShade;
        varying float vAlpha;

        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.06, d) * vAlpha;
          if (a < 0.012) discard;
          vec3 col = mix(uColorA, uColorB, vShade);
          col = mix(col, vec3(1.0), 0.22 * uLight);
          gl_FragColor = vec4(col, a);
        }
      `,
    })

    scene.add(new Points(geo, material))

    const smooth = { x: 99, y: 99 }

    return {
      scene,
      camera,
      uniforms,
      tick(t, p) {
        uniforms.uTime.value = t
        // extra-lazy pointer follow so the current shifts, never snaps
        const tx = p.x > 50 ? 99 : p.x * halfH * camera.aspect
        const ty = p.y > 50 ? 99 : p.y * halfH
        smooth.x += (tx - smooth.x) * 0.03
        smooth.y += (ty - smooth.y) * 0.03
        uniforms.uPointer.value.x = smooth.x
        uniforms.uPointer.value.y = smooth.y
      },
      setScroll(v) { uniforms.uScroll.value = v },
      resize(w, h, dpr) {
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        uniforms.uPixelRatio.value = dpr
      },
      dispose() { geo.dispose(); material.dispose() },
    }
  }

  /* logo — the bonsai mark assembled from drifting colored particles.
     Targets and colors are sampled from the logo image at runtime; the
     points gather from dust into the mark once the image has loaded. */
  const buildLogo = () => {
    const scene = new Scene()
    const camera = new PerspectiveCamera(55, 1, 0.1, 10)
    camera.position.z = 2.2
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z

    let geo = null
    let material = null
    let disposed = false
    let formStart = null
    const view = { w: 1, h: 1, dpr: 1 }

    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPointer: { value: { x: 99, y: 99 } },
      uPixelRatio: { value: 1 },
      uForm: { value: reduced ? 1 : 0 },
      uOffset: { value: { x: 0, y: 0 } },
      uScale: { value: 1.5 },
      uDim: { value: 1 },
      uLight: { value: themeLight ? 1 : 0 },
    }

    const applyLayout = () => {
      const aspect = view.w / view.h
      if (aspect > 0.9) {
        uniforms.uOffset.value.x = halfH * aspect * 0.45
        uniforms.uOffset.value.y = 0
        uniforms.uScale.value = 1.5
        uniforms.uDim.value = 1
      } else {
        // narrow screens: a quiet watermark behind the hero copy
        uniforms.uOffset.value.x = 0
        uniforms.uOffset.value.y = 0.12
        uniforms.uScale.value = Math.min(halfH * aspect * 1.9, 1.1)
        uniforms.uDim.value = 0.3
      }
    }

    const img = new Image()
    img.decoding = "async"
    img.src = logoUrl
    img.onload = () => {
      if (disposed) return
      const S = 140
      const cv = document.createElement("canvas")
      cv.width = S
      cv.height = S
      const cx = cv.getContext("2d", { willReadFrequently: true })
      const s = Math.min(S / img.width, S / img.height)
      cx.drawImage(img, (S - img.width * s) / 2, (S - img.height * s) / 2, img.width * s, img.height * s)
      const data = cx.getImageData(0, 0, S, S).data

      const px = []
      for (let y = 0; y < S; y++) {
        for (let x = 0; x < S; x++) {
          const i = (y * S + x) * 4
          if (data[i + 3] > 120) px.push(i)
        }
      }
      const MAX = reduced ? 3000 : 7000
      const keep = Math.min(1, MAX / px.length)
      const chosen = px.filter(() => Math.random() < keep)
      const n = chosen.length

      const aTarget = new Float32Array(n * 3)
      const aScatter = new Float32Array(n * 3)
      const aColor = new Float32Array(n * 3)
      const aSeed = new Float32Array(n)
      const aSize = new Float32Array(n)
      for (let j = 0; j < n; j++) {
        const i = chosen[j]
        const p = i / 4
        aTarget[j * 3] = (p % S) / S - 0.5
        aTarget[j * 3 + 1] = 0.5 - Math.floor(p / S) / S
        aTarget[j * 3 + 2] = (Math.random() - 0.5) * 0.08
        aScatter[j * 3] = (Math.random() * 2 - 1) * 1.6
        aScatter[j * 3 + 1] = (Math.random() * 2 - 1) * 1.1
        aScatter[j * 3 + 2] = (Math.random() - 0.5) * 0.8
        const tint = 0.88 + Math.random() * 0.24
        aColor[j * 3] = Math.min(1, (data[i] / 255) * tint)
        aColor[j * 3 + 1] = Math.min(1, (data[i + 1] / 255) * tint)
        aColor[j * 3 + 2] = Math.min(1, (data[i + 2] / 255) * tint)
        aSeed[j] = Math.random()
        aSize[j] = 1.7 + Math.random() * 1.9
      }

      geo = new BufferGeometry()
      geo.setAttribute("position", new BufferAttribute(new Float32Array(n * 3), 3))
      geo.setAttribute("aTarget", new BufferAttribute(aTarget, 3))
      geo.setAttribute("aScatter", new BufferAttribute(aScatter, 3))
      geo.setAttribute("aColor", new BufferAttribute(aColor, 3))
      geo.setAttribute("aSeed", new BufferAttribute(aSeed, 1))
      geo.setAttribute("aSize", new BufferAttribute(aSize, 1))

      material = new ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        vertexShader: /* glsl */ `
          uniform float uTime;
          uniform float uScroll;
          uniform vec2 uPointer;
          uniform float uPixelRatio;
          uniform float uForm;
          uniform vec2 uOffset;
          uniform float uScale;
          uniform float uDim;
          uniform mediump float uLight;
          attribute vec3 aTarget;
          attribute vec3 aScatter;
          attribute vec3 aColor;
          attribute float aSeed;
          attribute float aSize;
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            vec3 target = vec3(aTarget.xy * uScale + uOffset, aTarget.z);

            // the pointer doesn't displace — it stirs: nearby particles
            // swing faster and on a wider radius
            float ex = exp(-max(length(target.xy - uPointer), 0.0001) * 2.4);

            vec2 hover = vec2(
              sin(uTime * (0.45 + aSeed * 0.6) + aSeed * 43.0),
              cos(uTime * (0.38 + aSeed * 0.5) + aSeed * 61.0)
            ) * 0.013;
            hover += vec2(
              sin(uTime * (2.6 + aSeed * 1.8) + aSeed * 91.0),
              cos(uTime * (2.2 + aSeed * 1.5) + aSeed * 57.0)
            ) * 0.035 * ex;
            target.xy += hover;

            vec3 scatter = vec3(aScatter.xy + uOffset, aScatter.z);

            // staggered, eased assembly from dust to mark
            float f = clamp(uForm * 1.35 - aSeed * 0.35, 0.0, 1.0);
            f = f * f * (3.0 - 2.0 * f);
            vec3 pos = mix(scatter, target, f);

            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = aSize * uPixelRatio * (2.4 / -mv.z);

            vAlpha = mix(0.18, 0.92, f) * (1.0 - uScroll) * uDim * (1.0 + 0.9 * uLight);
            vColor = aColor;
          }
        `,
        fragmentShader: /* glsl */ `
          precision mediump float;
          uniform mediump float uLight;
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            float d = length(gl_PointCoord - 0.5);
            float a = smoothstep(0.5, 0.12, d) * vAlpha;
            if (a < 0.015) discard;
            vec3 col = mix(vColor, vec3(1.0), 0.2 * uLight);
            gl_FragColor = vec4(col, a);
          }
        `,
      })

      applyLayout()
      scene.add(new Points(geo, material))
      invalidate()
    }

    const smooth = { x: 99, y: 99 }

    return {
      scene,
      camera,
      tick(t, p) {
        uniforms.uTime.value = t
        if (geo && formStart === null) formStart = t
        if (!reduced && formStart !== null) {
          uniforms.uForm.value = Math.min(1, (t - formStart) / 4.5)
        }
        const tx = p.x > 50 ? 99 : p.x * halfH * camera.aspect
        const ty = p.y > 50 ? 99 : p.y * halfH
        smooth.x += (tx - smooth.x) * 0.025
        smooth.y += (ty - smooth.y) * 0.025
        uniforms.uPointer.value.x = smooth.x
        uniforms.uPointer.value.y = smooth.y
      },
      setScroll(v) { uniforms.uScroll.value = v },
      resize(w, h, dpr) {
        view.w = w
        view.h = h
        view.dpr = dpr
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        uniforms.uPixelRatio.value = dpr
        applyLayout()
      },
      dispose() {
        disposed = true
        geo?.dispose()
        material?.dispose()
      },
    }
  }

  const builders = {
    river: buildRiver,
    logo: buildLogo,
  }

  const resize = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6)
    renderer.setPixelRatio(dpr)
    renderer.setSize(w, h, false)
    current?.resize(w, h, dpr)
  }

  const renderStill = () => {
    current.tick(14, pointer)
    renderer.render(current.scene, current.camera)
  }
  invalidate = () => { if (reduced && current) renderStill() }

  const frame = (now) => {
    pointer.x += (pointer.tx - pointer.x) * 0.06
    pointer.y += (pointer.ty - pointer.y) * 0.06
    current.tick((now - start) / 1000, pointer)
    renderer.render(current.scene, current.camera)
    raf = requestAnimationFrame(frame)
  }
  const play = () => { if (!raf && !document.hidden) raf = requestAnimationFrame(frame) }
  const stop = () => { cancelAnimationFrame(raf); raf = 0 }
  const onVis = () => (document.hidden ? stop() : play())
  const onPointer = (e) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1
    pointer.ty = -((e.clientY / window.innerHeight) * 2 - 1)
  }
  const onPointerOut = () => { pointer.tx = 99; pointer.ty = 99 }

  const setMode = (key) => {
    currentKey = key
    current?.dispose()
    current = (builders[key] || buildRiver)()
    resize()
    current.setScroll(scroll)
    if (reduced) renderStill()
  }
  setMode(currentKey)

  window.addEventListener("resize", resize)
  if (!reduced) {
    window.addEventListener("pointermove", onPointer, { passive: true })
    window.addEventListener("pointerleave", onPointerOut)
    document.addEventListener("visibilitychange", onVis)
    play()
  }

  return {
    setMode,
    setTheme(light) {
      themeLight = light
      setMode(currentKey) // rebuild the scene with theme-appropriate colors
    },
    setAccent(aHex, bHex) {
      accentA = aHex
      accentB = bHex
      const u = current?.uniforms
      if (!u?.uColorA) return // the logo keeps its sampled image colors
      const ca = new Color(aHex)
      const cb = new Color(bHex)
      if (reduced) {
        u.uColorA.value.copy(ca)
        u.uColorB.value.copy(cb)
        renderStill()
        return
      }
      gsap.to(u.uColorA.value, { r: ca.r, g: ca.g, b: ca.b, duration: 0.9, ease: "power2.out" })
      gsap.to(u.uColorB.value, { r: cb.r, g: cb.g, b: cb.b, duration: 0.9, ease: "power2.out" })
    },
    setScroll(v) { scroll = v; current?.setScroll(v) },
    dispose() {
      stop()
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onPointer)
      window.removeEventListener("pointerleave", onPointerOut)
      document.removeEventListener("visibilitychange", onVis)
      current?.dispose()
      renderer.dispose()
    },
  }
}
