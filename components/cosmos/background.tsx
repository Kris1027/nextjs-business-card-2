'use client'

import { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  z: number
  r: number
  baseAlpha: number
  twinklePhase: number
  twinkleSpeed: number
  hueShift: number
}

type Nebula = {
  x: number
  y: number
  rx: number
  ry: number
  rot: number
  hue: number
  alpha: number
  driftX: number
  driftY: number
  pulsePhase: number
}

type Shooting = { x: number; y: number; vx: number; vy: number; life: number }
type Dust = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  decay: number
  r: number
  hue: number
}

type State = {
  stars: Star[]
  nebulae: Nebula[]
  shooting: Shooting[]
  dust: Dust[]
  mouse: { x: number; y: number; vx: number; vy: number }
  scroll: number
  time: number
}

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
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const state = stateRef.current
    const HUE = 160

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const area = w * h
      const starCount = Math.floor(area / 4500)
      state.stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h * 2,
        z: Math.random() * 3 + 0.3,
        r: Math.random() * 1.4 + 0.2,
        baseAlpha: Math.random() * 0.6 + 0.3,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.3 + Math.random() * 1.2,
        hueShift: (Math.random() - 0.5) * 30,
      }))
      const nebCount = Math.max(3, Math.floor(area / 380000))
      state.nebulae = Array.from({ length: nebCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        rx: 200 + Math.random() * 400,
        ry: 180 + Math.random() * 380,
        rot: Math.random() * Math.PI,
        hue: HUE + (Math.random() - 0.5) * 60,
        alpha: 0.07 + Math.random() * 0.1,
        driftX: (Math.random() - 0.5) * 0.04,
        driftY: (Math.random() - 0.5) * 0.04,
        pulsePhase: Math.random() * Math.PI * 2,
      }))
    }

    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e: MouseEvent) => {
      const m = state.mouse
      const nx = e.clientX,
        ny = e.clientY
      m.vx = nx - m.x
      m.vy = ny - m.y
      m.x = nx
      m.y = ny
      const speed = Math.hypot(m.vx, m.vy)
      const spawn = Math.min(3, Math.floor(speed / 8))
      for (let i = 0; i < spawn; i++) {
        state.dust.push({
          x: nx + (Math.random() - 0.5) * 6,
          y: ny + (Math.random() - 0.5) * 6,
          vx: -m.vx * 0.05 + (Math.random() - 0.5) * 0.6,
          vy: -m.vy * 0.05 + (Math.random() - 0.5) * 0.6,
          life: 1,
          decay: 0.012 + Math.random() * 0.02,
          r: Math.random() * 1.6 + 0.3,
          hue: HUE + (Math.random() - 0.5) * 80,
        })
      }
      if (state.dust.length > 280) state.dust.splice(0, state.dust.length - 280)
    }
    window.addEventListener('mousemove', onMouse)

    const onScroll = () => {
      state.scroll = window.scrollY || 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    let shootTimer = 0
    let raf: number
    let last = performance.now()

    const loop = (t: number) => {
      const dt = Math.min(48, t - last) / 16.667
      last = t
      state.time += dt
      const w = canvas.width / dpr
      const h = canvas.height / dpr

      ctx.fillStyle = '#04020a'
      ctx.fillRect(0, 0, w, h)

      const vg = ctx.createRadialGradient(w / 2, h * 0.4, 0, w / 2, h * 0.5, Math.max(w, h) * 0.8)
      vg.addColorStop(0, `oklch(0.18 0.12 ${HUE} / 0.18)`)
      vg.addColorStop(0.6, `oklch(0.08 0.06 ${HUE} / 0.05)`)
      vg.addColorStop(1, 'oklch(0.02 0 0 / 0)')
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, w, h)

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      for (const n of state.nebulae) {
        n.x += n.driftX * dt
        n.y += n.driftY * dt
        if (n.x < -n.rx) n.x = w + n.rx
        if (n.x > w + n.rx) n.x = -n.rx
        if (n.y < -n.ry) n.y = h + n.ry
        if (n.y > h + n.ry) n.y = -n.ry
        n.pulsePhase += 0.003 * dt
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

      for (const s of state.stars) {
        s.twinklePhase += s.twinkleSpeed * 0.02 * dt
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

      shootTimer += dt
      if (shootTimer > 240 && Math.random() < 0.008) {
        shootTimer = 0
        state.shooting.push({
          x: Math.random() * w * 0.7,
          y: Math.random() * h * 0.5,
          vx: 6 + Math.random() * 4,
          vy: 2 + Math.random() * 2,
          life: 1,
        })
      }
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      for (let i = state.shooting.length - 1; i >= 0; i--) {
        const sh = state.shooting[i]
        sh.x += sh.vx * dt
        sh.y += sh.vy * dt
        sh.life -= 0.012 * dt
        if (sh.life <= 0 || sh.x > w + 100 || sh.y > h + 100) {
          state.shooting.splice(i, 1)
          continue
        }
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

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      for (let i = state.dust.length - 1; i >= 0; i--) {
        const d = state.dust[i]
        d.x += d.vx * dt
        d.y += d.vy * dt
        d.vy -= 0.015 * dt
        d.life -= d.decay * dt
        if (d.life <= 0) {
          state.dust.splice(i, 1)
          continue
        }
        const a = d.life * 0.9
        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 8)
        grad.addColorStop(0, `oklch(0.85 0.22 ${d.hue} / ${a})`)
        grad.addColorStop(0.5, `oklch(0.6 0.2 ${d.hue} / ${a * 0.4})`)
        grad.addColorStop(1, `oklch(0.6 0.2 ${HUE} / 0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r * 8, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `oklch(0.95 0.08 ${d.hue} / ${a})`
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
