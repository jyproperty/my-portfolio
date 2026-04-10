import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function BlobCursor({
  blobType = 'circle',
  fillColor = '#D4A017',
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = 'rgba(255,255,255,0.8)',
  opacities = [0.6, 0.6, 0.6],
  shadowColor = 'rgba(0,0,0,0.75)',
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterStdDeviation = 30,
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  zIndex = 100,
}) {
  const svgRef = useRef(null)
  const canvasRef = useRef(null)
  const blobsRef = useRef([])
  const mouseRef = useRef({ x: -200, y: -200 })
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // blob 객체 초기화
    const blobs = Array.from({ length: trailCount }, (_, i) => ({
      x: -200,
      y: -200,
      size: sizes[i] ?? 60,
      innerSize: innerSizes[i] ?? 20,
      opacity: opacities[i] ?? 0.6,
      duration: i === 0 ? fastDuration : slowDuration,
    }))
    blobsRef.current = blobs

    // GSAP 트윈으로 각 blob 위치 추적
    const tweens = blobs.map((blob, i) => {
      const target = { x: blob.x, y: blob.y }
      const updateBlob = () => {
        blob.x = target.x
        blob.y = target.y
      }
      return { target, updateBlob, duration: blob.duration }
    })

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      tweens.forEach((t) => {
        gsap.to(t.target, {
          x: e.clientX,
          y: e.clientY,
          duration: t.duration,
          ease: 'power2.out',
          onUpdate: t.updateBlob,
        })
      })
    }

    window.addEventListener('mousemove', onMouseMove)

    // draw loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      blobs.forEach((blob) => {
        ctx.save()
        ctx.globalAlpha = blob.opacity
        ctx.shadowColor = shadowColor
        ctx.shadowBlur = shadowBlur
        ctx.shadowOffsetX = shadowOffsetX
        ctx.shadowOffsetY = shadowOffsetY
        ctx.fillStyle = fillColor

        ctx.beginPath()
        if (blobType === 'circle') {
          ctx.arc(blob.x, blob.y, blob.size / 2, 0, Math.PI * 2)
        } else {
          const s = blob.size
          ctx.roundRect(blob.x - s / 2, blob.y - s / 2, s, s, s * 0.3)
        }
        ctx.fill()

        // inner circle
        ctx.globalAlpha = 1
        ctx.shadowColor = 'transparent'
        ctx.fillStyle = innerColor
        ctx.beginPath()
        if (blobType === 'circle') {
          ctx.arc(blob.x, blob.y, blob.innerSize / 2, 0, Math.PI * 2)
        } else {
          const s = blob.innerSize
          ctx.roundRect(blob.x - s / 2, blob.y - s / 2, s, s, s * 0.3)
        }
        ctx.fill()
        ctx.restore()
      })

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      gsap.killTweensOf('*')
    }
  }, [])

  return (
    <>
      {useFilter && (
        <svg style={{ position: 'fixed', width: 0, height: 0 }}>
          <defs>
            <filter id="blob-filter">
              <feGaussianBlur in="SourceGraphic" stdDeviation={filterStdDeviation} result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="blob"
              />
            </filter>
          </defs>
        </svg>
      )}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex,
          filter: useFilter ? 'url(#blob-filter)' : 'none',
        }}
      />
    </>
  )
}

export default BlobCursor
