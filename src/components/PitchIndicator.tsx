import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { MusicNote } from '@phosphor-icons/react'

type PitchIndicatorProps = {
  analyser: AnalyserNode | null
  isActive: boolean
}

const noteFrequencies = [
  { note: 'C', octave: 2, freq: 65.41 },
  { note: 'C#', octave: 2, freq: 69.30 },
  { note: 'D', octave: 2, freq: 73.42 },
  { note: 'D#', octave: 2, freq: 77.78 },
  { note: 'E', octave: 2, freq: 82.41 },
  { note: 'F', octave: 2, freq: 87.31 },
  { note: 'F#', octave: 2, freq: 92.50 },
  { note: 'G', octave: 2, freq: 98.00 },
  { note: 'G#', octave: 2, freq: 103.83 },
  { note: 'A', octave: 2, freq: 110.00 },
  { note: 'A#', octave: 2, freq: 116.54 },
  { note: 'B', octave: 2, freq: 123.47 },
  { note: 'C', octave: 3, freq: 130.81 },
  { note: 'C#', octave: 3, freq: 138.59 },
  { note: 'D', octave: 3, freq: 146.83 },
  { note: 'D#', octave: 3, freq: 155.56 },
  { note: 'E', octave: 3, freq: 164.81 },
  { note: 'F', octave: 3, freq: 174.61 },
  { note: 'F#', octave: 3, freq: 185.00 },
  { note: 'G', octave: 3, freq: 196.00 },
  { note: 'G#', octave: 3, freq: 207.65 },
  { note: 'A', octave: 3, freq: 220.00 },
  { note: 'A#', octave: 3, freq: 233.08 },
  { note: 'B', octave: 3, freq: 246.94 },
  { note: 'C', octave: 4, freq: 261.63 },
  { note: 'C#', octave: 4, freq: 277.18 },
  { note: 'D', octave: 4, freq: 293.66 },
  { note: 'D#', octave: 4, freq: 311.13 },
  { note: 'E', octave: 4, freq: 329.63 },
  { note: 'F', octave: 4, freq: 349.23 },
  { note: 'F#', octave: 4, freq: 369.99 },
  { note: 'G', octave: 4, freq: 392.00 },
  { note: 'G#', octave: 4, freq: 415.30 },
  { note: 'A', octave: 4, freq: 440.00 },
  { note: 'A#', octave: 4, freq: 466.16 },
  { note: 'B', octave: 4, freq: 493.88 },
  { note: 'C', octave: 5, freq: 523.25 },
  { note: 'C#', octave: 5, freq: 554.37 },
  { note: 'D', octave: 5, freq: 587.33 },
  { note: 'D#', octave: 5, freq: 622.25 },
  { note: 'E', octave: 5, freq: 659.25 },
  { note: 'F', octave: 5, freq: 698.46 },
  { note: 'F#', octave: 5, freq: 739.99 },
  { note: 'G', octave: 5, freq: 783.99 },
  { note: 'G#', octave: 5, freq: 830.61 },
  { note: 'A', octave: 5, freq: 880.00 },
  { note: 'A#', octave: 5, freq: 932.33 },
  { note: 'B', octave: 5, freq: 987.77 },
]

function autoCorrelate(buffer: Float32Array, sampleRate: number): number {
  const SIZE = buffer.length
  const MAX_SAMPLES = Math.floor(SIZE / 2)
  let bestOffset = -1
  let bestCorrelation = 0
  let rms = 0
  let foundGoodCorrelation = false

  for (let i = 0; i < SIZE; i++) {
    const val = buffer[i]
    rms += val * val
  }
  rms = Math.sqrt(rms / SIZE)
  
  if (rms < 0.01) return -1

  let lastCorrelation = 1
  for (let offset = 1; offset < MAX_SAMPLES; offset++) {
    let correlation = 0

    for (let i = 0; i < MAX_SAMPLES; i++) {
      correlation += Math.abs(buffer[i] - buffer[i + offset])
    }
    correlation = 1 - correlation / MAX_SAMPLES
    
    if (correlation > 0.9 && correlation > lastCorrelation) {
      foundGoodCorrelation = true
      if (correlation > bestCorrelation) {
        bestCorrelation = correlation
        bestOffset = offset
      }
    }
    lastCorrelation = correlation
  }
  
  if (foundGoodCorrelation && bestOffset !== -1) {
    return sampleRate / bestOffset
  }
  return -1
}

function frequencyToNote(frequency: number): { note: string; octave: number; cents: number } | null {
  if (frequency < 60 || frequency > 1000) return null

  let closestNote = noteFrequencies[0]
  let minDiff = Math.abs(frequency - closestNote.freq)

  for (const noteData of noteFrequencies) {
    const diff = Math.abs(frequency - noteData.freq)
    if (diff < minDiff) {
      minDiff = diff
      closestNote = noteData
    }
  }

  const cents = 1200 * Math.log2(frequency / closestNote.freq)

  return {
    note: closestNote.note,
    octave: closestNote.octave,
    cents: Math.round(cents)
  }
}

function PitchIndicator({ analyser, isActive }: PitchIndicatorProps) {
  const [detectedNote, setDetectedNote] = useState<{ note: string; octave: number; cents: number } | null>(null)
  const [isInTune, setIsInTune] = useState(false)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isActive || !analyser) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      setDetectedNote(null)
      return
    }

    const bufferLength = analyser.fftSize
    const buffer = new Float32Array(bufferLength)

    const detectPitch = () => {
      if (!analyser) return

      analyser.getFloatTimeDomainData(buffer)
      
      const sampleRate = analyser.context.sampleRate
      const frequency = autoCorrelate(buffer, sampleRate)

      if (frequency > 0) {
        const noteInfo = frequencyToNote(frequency)
        if (noteInfo) {
          setDetectedNote(noteInfo)
          const inTune = Math.abs(noteInfo.cents) < 15
          setIsInTune(inTune)
        } else {
          setDetectedNote(null)
        }
      } else {
        setDetectedNote(null)
      }

      animationFrameRef.current = requestAnimationFrame(detectPitch)
    }

    detectPitch()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [analyser, isActive])

  if (!isActive) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium flex items-center gap-2">
          <MusicNote size={16} className="text-primary" weight="fill" />
          Pitch Detection
        </label>
      </div>

      <div className="relative bg-card/50 rounded-lg border border-border p-6 overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(90deg,oklch(0.35_0.18_140)_0px,oklch(0.35_0.18_140)_1px,transparent_1px,transparent_4px)]" />
        
        <AnimatePresence mode="wait">
          {detectedNote ? (
            <motion.div
              key="detected"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="relative z-10 flex flex-col items-center gap-4"
            >
              <div className="text-center">
                <div className="text-5xl font-bold tracking-tight mb-1">
                  {detectedNote.note}
                  <span className="text-3xl text-muted-foreground ml-1">{detectedNote.octave}</span>
                </div>
                <AnimatePresence mode="wait">
                  {isInTune ? (
                    <motion.div
                      key="in-tune"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                    >
                      <Badge 
                        className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-3 py-1"
                      >
                        In Tune
                      </Badge>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="tuning"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="px-3 py-1"
                      >
                        {detectedNote.cents > 0 ? `+${detectedNote.cents}` : detectedNote.cents} cents
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-full max-w-xs">
                <div className="relative h-12 bg-muted rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-full bg-emerald-500/40" />
                  </div>

                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-1 h-8 rounded-full"
                    style={{
                      left: `${50 + (detectedNote.cents / 50) * 50}%`,
                      backgroundColor: isInTune 
                        ? 'oklch(0.75 0.15 145)' 
                        : detectedNote.cents > 0 
                          ? 'oklch(0.70 0.15 60)' 
                          : 'oklch(0.65 0.18 260)',
                      boxShadow: isInTune 
                        ? '0 0 12px oklch(0.75 0.15 145)' 
                        : '0 0 8px currentColor'
                    }}
                    animate={{
                      x: '-50%',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />

                  <div className="absolute inset-0 flex items-center justify-between px-2 text-xs text-muted-foreground pointer-events-none">
                    <span>♭</span>
                    <span>♯</span>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-muted-foreground mt-1.5 px-1">
                  <span>-50¢</span>
                  <span className="text-emerald-400/60">0¢</span>
                  <span>+50¢</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 text-center py-8"
            >
              <MusicNote size={32} className="text-muted-foreground/40 mx-auto mb-2" weight="light" />
              <p className="text-sm text-muted-foreground">
                Sing or play a note
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default PitchIndicator
