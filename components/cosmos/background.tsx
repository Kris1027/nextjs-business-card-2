'use client'

import { useEffect, useRef } from 'react'
import {
  type State,
  type SimOpts,
  createStars,
  createNebulae,
  spawnDust,
  simulate,
} from '@/lib/cosmos-simulation'

export default function CosmosBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<State>({
    stars: [],
    nebulae: [],
    shooting: [],
    dust: [],
    mouse: { x: 0, y: 0, vx: 0, vy: 0 },
    scroll: 0,
    time: 0,
    shootTimer: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const state = stateRef.current
    const HUE = 160
    const isFirefox = CSS.supports('-moz-appearance', 'none')
    const opts: SimOpts = { hue: HUE, isFirefox }

    // Pre-render dust glow sprite once — eliminates ~560 createRadialGradient calls/frame
    const dustSprite = new OffscreenCanvas(128, 128)
    const dCtx = dustSprite.getContext('2d')!
    const dGrad = dCtx.createRadialGradient(64, 64, 0, 64, 64, 64)
    dGrad.addColorStop(0, `oklch(0.85 0.22 ${HUE} / 0.9)`)
    dGrad.addColorStop(0.5, `oklch(0.6 0.2 ${HUE} / 0.36)`)
    dGrad.addColorStop(1, 'oklch(0.6 0.2 0 / 0)')
    dCtx.fillStyle = dGrad
    dCtx.beginPath()
    dCtx.arc(64, 64, 64, 0, Math.PI * 2)
    dCtx.fill()

    let vignetteGrad: CanvasGradient | null = null

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Cache vignette gradient — only w/h change on resize, no need to recreate per frame
      const vg = ctx.createRadialGradient(w / 2, h * 0.4, 0, w / 2, h * 0.5, Math.max(w, h) * 0.8)
      vg.addColorStop(0, `oklch(0.18 0.12 ${HUE} / 0.18)`)
      vg.addColorStop(0.6, `oklch(0.08 0.06 ${HUE} / 0.05)`)
      vg.addColorStop(1, 'oklch(0.02 0 0 / 0)')
      vignetteGrad = vg

      state.stars = createStars(w, h, isFirefox)
      state.nebulae = createNebulae(w, h, HUE, isFirefox)
    }

    resize()
    window.addEventListener('resize', resize)

    const dustCap = isFirefox ? 100 : 280

    const onMouse = (e: MouseEvent) => {
      const m = state.mouse
      const nx = e.clientX
      const ny = e.clientY
      m.vx = nx - m.x
      m.vy = ny - m.y
      m.x = nx
      m.y = ny
      const newDust = spawnDust(m, HUE)
      state.dust.push(...newDust)
      if (state.dust.length > dustCap) state.dust.splice(0, state.dust.length - dustCap)
    }
    window.addEventListener('mousemove', onMouse)

    const onScroll = () => {
      state.scroll = window.scrollY || 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    let raf: number
    let last = performance.now()

    const loop = (t: number) => {
      const dt = Math.min(48, t - last) / 16.667
      last = t
      const w = canvas.width / dpr
      const h = canvas.height / dpr

      simulate(state, { width: w, height: h }, dt, opts)

      ctx.fillStyle = '#04020a'
      ctx.fillRect(0, 0, w, h)

      ctx.fillStyle = vignetteGrad!
      ctx.fillRect(0, 0, w, h)

      if (!isFirefox) {
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        for (const n of state.nebulae) {
          const pulse = 0.85 + Math.sin(n.pulsePhase) * 0.15
          const py = n.y - state.scroll * 0.05
          const grad = ctx.createRadialGradient(n.x, py, 0, n.x, py, Math.max(n.rx, n.ry))
          grad.addColorStop(0, `oklch(0.65 0.28 ${n.hue} / ${n.alpha * pulse})`)
          grad.addColorStop(0.4, `oklch(0.45 0.22 ${n.hue + 20} / ${n.alpha * 0.5})`)
          grad.addColorStop(1, 'oklch(0.1 0 0 / 0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.ellipse(n.x, py, n.rx, n.ry, n.rot, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      for (const s of state.stars) {
        const tw = 0.55 + Math.sin(s.twinklePhase) * 0.45
        const py = (s.y - state.scroll * (0.05 + s.z * 0.08)) % (h * 2)
        const yy = py < 0 ? py + h * 2 : py
        if (yy > h + 4) continue
        const a = s.baseAlpha * tw
        const starHue = HUE + s.hueShift
        ctx.fillStyle = `oklch(${0.85 + s.z * 0.04} 0.05 ${starHue} / ${a})`
        ctx.beginPath()
        ctx.arc(s.x, yy, s.r * (0.6 + s.z * 0.25), 0, Math.PI * 2)
        ctx.fill()
        if (s.r > 1.0) {
          ctx.fillStyle = `oklch(0.7 0.12 ${starHue} / ${a * 0.18})`
          ctx.beginPath()
          ctx.arc(s.x, yy, s.r * 3, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (!isFirefox) {
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        for (const sh of state.shooting) {
          const grad = ctx.createLinearGradient(
            sh.x,
            sh.y,
            sh.x - (sh.vx * 80) / 6,
            sh.y - (sh.vy * 80) / 6
          )
          grad.addColorStop(0, `oklch(0.95 0.05 ${HUE} / ${sh.life})`)
          grad.addColorStop(1, `oklch(0.95 0.05 ${HUE} / 0)`)
          ctx.strokeStyle = grad
          ctx.lineWidth = 1.4
          ctx.beginPath()
          ctx.moveTo(sh.x, sh.y)
          ctx.lineTo(sh.x - (sh.vx * 80) / 6, sh.y - (sh.vy * 80) / 6)
          ctx.stroke()
        }
        ctx.restore()
      }

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      for (const d of state.dust) {
        const size = d.r * 16
        ctx.globalAlpha = d.life * 0.9
        ctx.drawImage(dustSprite, d.x - size / 2, d.y - size / 2, size, size)
        ctx.globalAlpha = d.life
        ctx.fillStyle = `oklch(0.95 0.08 ${d.hue} / 1)`
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r * 0.8, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
