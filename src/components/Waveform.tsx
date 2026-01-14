import { useEffect, useRef } from 'react'

interface WaveformProps {
  analyser: AnalyserNode | null
  isActive: boolean
}

export default function Waveform({ analyser, isActive }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (!analyser || !isActive || !canvasRef.current) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
      }
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      if (!analyser || !isActive) return

      animationRef.current = requestAnimationFrame(draw)

      analyser.getByteTimeDomainData(dataArray)

      const dpr = window.devicePixelRatio || 1
      const displayWidth = canvas.offsetWidth
      const displayHeight = canvas.offsetHeight

      canvas.width = displayWidth * dpr
      canvas.height = displayHeight * dpr

      ctx.scale(dpr, dpr)

      ctx.fillStyle = 'oklch(0.25 0.01 260)'
      ctx.fillRect(0, 0, displayWidth, displayHeight)

      ctx.lineWidth = 2
      ctx.strokeStyle = 'oklch(0.75 0.15 195)'
      ctx.shadowBlur = 8
      ctx.shadowColor = 'oklch(0.75 0.15 195 / 0.5)'

      ctx.beginPath()

      const sliceWidth = displayWidth / bufferLength
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0
        const y = (v * displayHeight) / 2

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }

        x += sliceWidth
      }

      ctx.lineTo(displayWidth, displayHeight / 2)
      ctx.stroke()

      ctx.shadowBlur = 0
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [analyser, isActive])

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="tracking-wide uppercase">Waveform</span>
        <span className="text-[10px] opacity-60">Real-time Audio</span>
      </div>
      <div className="relative rounded-lg overflow-hidden border border-border">
        <canvas
          ref={canvasRef}
          className="w-full h-32 block"
          style={{ imageRendering: 'crisp-edges' }}
        />
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm">
            <span className="text-xs text-muted-foreground tracking-wide uppercase">
              Inactive
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
