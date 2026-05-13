import { useEffect, useRef } from 'react'

// One single firework particle
function createParticle(x, y) {
  const angle = Math.random() * 2 * Math.PI        // random direction (0–360°)
  const speed = Math.random() * 6 + 2              // random speed
  const colors = [
    '#FF4444', '#FF8800', '#FFDD00', '#44FF44',
    '#44AAFF', '#AA44FF', '#FF44AA', '#FFFFFF',
  ]
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,   // horizontal velocity
    vy: Math.sin(angle) * speed,   // vertical velocity
    alpha: 1,                       // opacity (1 = fully visible)
    color: colors[Math.floor(Math.random() * colors.length)],
    radius: Math.random() * 5 + 3, // size
  }
}

// Spawn a burst of N particles at position (x, y)
function createBurst(x, y, count = 60) {
  return Array.from({ length: count }, () => createParticle(x, y))
}

export default function FireworksCanvas({ trigger }) {
  const canvasRef = useRef(null)
  // particles lives outside React state so we don't cause re-renders
  const particlesRef = useRef([])
  const animFrameRef = useRef(null)

  // Resize canvas to always fill the window
  useEffect(() => {
    const canvas = canvasRef.current
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // Animation loop — runs continuously
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const loop = () => {
      // Semi-transparent black fill creates the "trail fade" effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current.filter(p => p.alpha > 0.02)

      for (const p of particlesRef.current) {
        // Draw the particle
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 12
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Physics: move + gravity + fade
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.15       // gravity pulls down
        p.vx *= 0.98       // slight air resistance
        p.alpha -= 0.018   // fade out
        p.radius *= 0.995  // shrink slowly
      }

      animFrameRef.current = requestAnimationFrame(loop)
    }

    animFrameRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [])

  // When a new keypress comes in (trigger changes), add a burst
  useEffect(() => {
    if (!trigger) return
    const canvas = canvasRef.current
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height * 0.7  // keep in upper 70%
    particlesRef.current.push(...createBurst(x, y, 80))
  }, [trigger])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,        // behind the letters
      }}
    />
  )
}
