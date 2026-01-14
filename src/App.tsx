import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Microphone, MicrophoneSlash, SpeakerHigh, Warning } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useKV } from '@github/spark/hooks'
import AudioLevelMeter from '@/components/AudioLevelMeter'
import Waveform from '@/components/Waveform'

type PermissionState = 'prompt' | 'granted' | 'denied' | 'error'

function App() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [volumeKV, setVolumeKV] = useKV<number[]>('monitor-volume', [75])
  const volume = volumeKV ?? [75]
  const setVolume = (value: number[]) => setVolumeKV(value)
  const [permissionState, setPermissionState] = useState<PermissionState>('prompt')
  const [errorMessage, setErrorMessage] = useState('')
  const [audioLevel, setAudioLevel] = useState(0)

  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  const updateAudioLevel = () => {
    if (!analyserRef.current) return

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteTimeDomainData(dataArray)

    let sum = 0
    for (let i = 0; i < dataArray.length; i++) {
      const normalized = (dataArray[i] - 128) / 128
      sum += normalized * normalized
    }
    const rms = Math.sqrt(sum / dataArray.length)
    setAudioLevel(rms)

    animationFrameRef.current = requestAnimationFrame(updateAudioLevel)
  }

  const startMonitoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        } 
      })
      
      streamRef.current = stream
      
      const audioContext = new AudioContext()
      audioContextRef.current = audioContext

      const source = audioContext.createMediaStreamSource(stream)
      sourceRef.current = source

      const gainNode = audioContext.createGain()
      gainNode.gain.value = volume[0] / 100
      gainNodeRef.current = gainNode

      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 2048
      analyser.smoothingTimeConstant = 0.8
      analyserRef.current = analyser

      source.connect(analyser)
      analyser.connect(gainNode)
      gainNode.connect(audioContext.destination)

      setIsMonitoring(true)
      setPermissionState('granted')
      setErrorMessage('')
      
      updateAudioLevel()
    } catch (err) {
      console.error('Error accessing microphone:', err)
      
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setPermissionState('denied')
          setErrorMessage('Microphone permission denied. Please allow access to use audio monitoring.')
        } else if (err.name === 'NotFoundError') {
          setPermissionState('error')
          setErrorMessage('No microphone detected. Please connect a microphone and try again.')
        } else {
          setPermissionState('error')
          setErrorMessage('Unable to access microphone. Please check your device settings.')
        }
      }
    }
  }

  const stopMonitoring = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    if (sourceRef.current) {
      sourceRef.current.disconnect()
      sourceRef.current = null
    }

    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect()
      gainNodeRef.current = null
    }

    if (analyserRef.current) {
      analyserRef.current.disconnect()
      analyserRef.current = null
    }

    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }

    setIsMonitoring(false)
    setAudioLevel(0)
  }

  const toggleMonitoring = () => {
    if (isMonitoring) {
      stopMonitoring()
    } else {
      startMonitoring()
    }
  }

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume[0] / 100
    }
  }, [volume])

  useEffect(() => {
    return () => {
      stopMonitoring()
    }
  }, [])

  const retryPermission = () => {
    setPermissionState('prompt')
    setErrorMessage('')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_120%,oklch(0.75_0.15_195),transparent_50%)]" />
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                  Audio Monitor
                </h1>
                <p className="text-sm text-muted-foreground tracking-wide uppercase">
                  Real-time voice passthrough
                </p>
              </div>

              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6"
                  >
                    <Alert variant="destructive">
                      <Warning className="h-4 w-4" />
                      <AlertDescription className="ml-2">
                        {errorMessage}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col items-center gap-6 mb-8">
                <div className="relative">
                  {isMonitoring && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring"
                      initial={{ scale: 1 }}
                      animate={{ scale: 1.2 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <Button
                    size="lg"
                    onClick={toggleMonitoring}
                    disabled={permissionState === 'error' || permissionState === 'denied'}
                    className={`
                      relative z-10 w-24 h-24 rounded-full text-4xl transition-all duration-150
                      ${isMonitoring 
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/50' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }
                    `}
                  >
                    {isMonitoring ? (
                      <Microphone weight="fill" />
                    ) : (
                      <MicrophoneSlash weight="fill" />
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-lg font-medium">
                    {isMonitoring ? 'Monitoring Active' : 'Monitoring Inactive'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isMonitoring 
                      ? 'Your voice is being passed through to speakers' 
                      : 'Click to start monitoring'
                    }
                  </p>
                </div>
              </div>

              {isMonitoring && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 space-y-6"
                >
                  <Waveform analyser={analyserRef.current} isActive={isMonitoring} />
                  <AudioLevelMeter level={audioLevel} />
                </motion.div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <SpeakerHigh className="text-muted-foreground" size={24} />
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">
                      Monitor Volume
                    </label>
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      disabled={!isMonitoring}
                      className="cursor-pointer"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right font-medium">
                    {volume[0]}%
                  </span>
                </div>
              </div>

              {(permissionState === 'denied' || permissionState === 'error') && (
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={retryPermission}
                    className="w-full"
                  >
                    Try Again
                  </Button>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Warning size={16} className="flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Use headphones to prevent audio feedback. Keep volume low initially and adjust as needed.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default App
