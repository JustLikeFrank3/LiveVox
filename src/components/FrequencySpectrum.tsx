import { useEffect, useRef } from 'react'
import { Equalizer } from '@phosphor-icons/react'

interface FrequencySpectrumProps {
  analyser: AnalyserNode | null
  isActive: boolean
}

export default function FrequencySpectrum({ analyser, isActive }: FrequencySpectrumProps) {
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

      analyser.getByteFrequencyData(dataArray)

      const dpr = window.devicePixelRatio || 1
      const displayWidth = canvas.offsetWidth
      const displayHeight = canvas.offsetHeight

      canvas.width = displayWidth * dpr
      canvas.height = displayHeight * dpr

      ctx.scale(dpr, dpr)

      ctx.fillStyle = 'oklch(0.25 0.01 260)'
      ctx.fillRect(0, 0, displayWidth, displayHeight)

      const barCount = 32
      const barWidth = displayWidth / barCount
      const barSpacing = 2

      for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor((i / barCount) * bufferLength)
        const value = dataArray[dataIndex]
        const barHeight = (value / 255) * displayHeight

        const x = i * barWidth
        const y = displayHeight - barHeight

        const normalizedValue = value / 255
        let color: string

        if (normalizedValue < 0.33) {
          color = `oklch(${0.45 + normalizedValue * 0.3} 0.15 120)`
        } else if (normalizedValue < 0.66) {
          color = `oklch(${0.55 + normalizedValue * 0.2} 0.16 140)`
        } else {
          color = `oklch(${0.65 + normalizedValue * 0.1} 0.18 150)`
        }

        ctx.fillStyle = color
        ctx.fillRect(x + barSpacing / 2, y, barWidth - barSpacing, barHeight)

        ctx.shadowBlur = 10
        ctx.shadowColor = color
        ctx.fillRect(x + barSpacing / 2, y, barWidth - barSpacing, barHeight)
        ctx.shadowBlur = 0
      }
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
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium flex items-center gap-2">
          <Equalizer size={16} className="text-primary" weight="fill" />
          Frequency Spectrum
        </label>
        <span className="text-[10px] text-muted-foreground opacity-60 tracking-wide uppercase">
          EQ Visualizer
        </span>
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
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-card/60 to-transparent pointer-events-none" />
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground px-1">
        <span>Low</span>
        <span>Mid</span>
        <span>High</span>
      </div>
    </div>
  )
}
