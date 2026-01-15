import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Microphone, MicrophoneSlash, SpeakerHigh, Warning, Headphones, Lightning, Gauge } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useKV } from '@github/spark/hooks'
import AudioLevelMeter from '@/components/AudioLevelMeter'
import Waveform from '@/components/Waveform'

type PermissionState = 'prompt' | 'granted' | 'denied' | 'error'

type AudioDevice = {
  deviceId: string
  label: string
  kind: string
}

function App() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [volumeKV, setVolumeKV] = useKV<number[]>('monitor-volume', [100])
  const volume = volumeKV ?? [100]
  const setVolume = (value: number[]) => setVolumeKV(value)
  const [boostKV, setBoostKV] = useKV<number[]>('boost-gain', [0])
  const boost = boostKV ?? [0]
  const setBoost = (value: number[]) => setBoostKV(value)
  const [permissionState, setPermissionState] = useState<PermissionState>('prompt')
  const [errorMessage, setErrorMessage] = useState('')
  const [audioLevel, setAudioLevel] = useState(0)
  const [currentDevice, setCurrentDevice] = useState<string>('')
  const [latency, setLatency] = useState<number>(0)
  const [availableDevices, setAvailableDevices] = useState<AudioDevice[]>([])
  const [selectedDeviceId, setSelectedDeviceId] = useKV<string>('selected-device-id', '')
  const [isClipping, setIsClipping] = useState(false)
  const [lowLatencyMode, setLowLatencyMode] = useKV<boolean>('low-latency-mode', true)
  const clippingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const boostNodeRef = useRef<GainNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  const updateAudioLevel = () => {
    if (!analyserRef.current) return

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteTimeDomainData(dataArray)

    let sum = 0
    let maxValue = 0
    for (let i = 0; i < dataArray.length; i++) {
      const normalized = (dataArray[i] - 128) / 128
      sum += normalized * normalized
      maxValue = Math.max(maxValue, Math.abs(normalized))
    }
    const rms = Math.sqrt(sum / dataArray.length)
    setAudioLevel(rms)

    if (maxValue > 0.95) {
      setIsClipping(true)
      if (clippingTimeoutRef.current) {
        clearTimeout(clippingTimeoutRef.current)
      }
      clippingTimeoutRef.current = setTimeout(() => {
        setIsClipping(false)
      }, 1000)
    }

    animationFrameRef.current = requestAnimationFrame(updateAudioLevel)
  }

  const loadAvailableDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const audioInputs = devices.filter(device => device.kind === 'audioinput')
      
      const deviceList: AudioDevice[] = audioInputs
        .filter(device => device.deviceId) // Filter out devices with empty deviceId
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `Microphone ${audioInputs.indexOf(device) + 1}`,
          kind: device.kind
        }))
      
      setAvailableDevices(deviceList)
      
      if (deviceList.length > 0) {
        if (!selectedDeviceId || !deviceList.find(d => d.deviceId === selectedDeviceId)) {
          const headphoneMic = deviceList.find(device => 
            device.label.toLowerCase().includes('headphone') ||
            device.label.toLowerCase().includes('headset') ||
            device.label.toLowerCase().includes('airpods') ||
            device.label.toLowerCase().includes('earbud') ||
            device.label.toLowerCase().includes('bluetooth')
          )
          const defaultDevice = headphoneMic || deviceList[0]
          setSelectedDeviceId(defaultDevice.deviceId)
        }
      }
    } catch (err) {
      console.error('Error enumerating devices:', err)
    }
  }

  const startMonitoring = async () => {
    try {
      await loadAvailableDevices()
      
      const deviceId = selectedDeviceId || undefined

      const audioConstraints = lowLatencyMode ? {
        deviceId: deviceId ? { exact: deviceId } : undefined,
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        sampleRate: 48000,
        sampleSize: 16,
        channelCount: 1,
        latency: 0
      } : {
        deviceId: deviceId ? { exact: deviceId } : undefined,
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        sampleRate: 48000,
        sampleSize: 16,
        channelCount: 1
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: audioConstraints
      })
      
      streamRef.current = stream
      
      const audioTrack = stream.getAudioTracks()[0]
      const trackLabel = audioTrack.label || 'Default Microphone'
      setCurrentDevice(trackLabel)
      
      const audioContext = new AudioContext({
        latencyHint: lowLatencyMode ? 0 : 'interactive',
        sampleRate: 48000
      })
      audioContextRef.current = audioContext

      const baseLatency = audioContext.baseLatency || 0
      const outputLatency = audioContext.outputLatency || 0
      const totalLatency = (baseLatency + outputLatency) * 1000
      setLatency(Math.round(totalLatency * 10) / 10)

      if (lowLatencyMode && audioContext.audioWorklet) {
        try {
          await audioContext.resume()
        } catch (e) {
          console.log('Could not resume audio context:', e)
        }
      }

      const source = audioContext.createMediaStreamSource(stream)
      sourceRef.current = source

      const gainNode = audioContext.createGain()
      gainNode.gain.value = volume[0] / 100
      gainNodeRef.current = gainNode

      const boostNode = audioContext.createGain()
      const boostMultiplier = 1 + (boost[0] / 100) * 3
      boostNode.gain.value = boostMultiplier
      boostNodeRef.current = boostNode

      const analyser = audioContext.createAnalyser()
      analyser.fftSize = lowLatencyMode ? 128 : 256
      analyser.smoothingTimeConstant = lowLatencyMode ? 0 : 0.3
      analyserRef.current = analyser

      if (lowLatencyMode) {
        source.connect(boostNode)
        boostNode.connect(gainNode)
        gainNode.connect(analyser)
        analyser.connect(audioContext.destination)
      } else {
        const compressor = audioContext.createDynamicsCompressor()
        compressor.threshold.value = -24
        compressor.knee.value = 30
        compressor.ratio.value = 12
        compressor.attack.value = 0.003
        compressor.release.value = 0.25

        source.connect(boostNode)
        boostNode.connect(gainNode)
        gainNode.connect(compressor)
        compressor.connect(analyser)
        analyser.connect(audioContext.destination)
      }

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

    if (clippingTimeoutRef.current) {
      clearTimeout(clippingTimeoutRef.current)
      clippingTimeoutRef.current = null
    }

    if (sourceRef.current) {
      sourceRef.current.disconnect()
      sourceRef.current = null
    }

    if (boostNodeRef.current) {
      boostNodeRef.current.disconnect()
      boostNodeRef.current = null
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
    setCurrentDevice('')
    setLatency(0)
    setIsClipping(false)
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
    if (boostNodeRef.current) {
      const boostMultiplier = 1 + (boost[0] / 100) * 3
      boostNodeRef.current.gain.value = boostMultiplier
    }
  }, [boost])

  useEffect(() => {
    loadAvailableDevices()
    
    navigator.mediaDevices.addEventListener('devicechange', loadAvailableDevices)
    
    return () => {
      stopMonitoring()
      navigator.mediaDevices.removeEventListener('devicechange', loadAvailableDevices)
    }
  }, [])
  
  const handleDeviceChange = async (deviceId: string) => {
    setSelectedDeviceId(deviceId)
    
    if (isMonitoring) {
      stopMonitoring()
      setTimeout(() => {
        startMonitoring()
      }, 100)
    }
  }

  const toggleLatencyMode = () => {
    const newMode = !lowLatencyMode
    setLowLatencyMode(newMode)
    
    if (isMonitoring) {
      stopMonitoring()
      setTimeout(() => {
        startMonitoring()
      }, 100)
    }
  }

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
                  LiveVox
                </h1>
                <p className="text-sm text-muted-foreground tracking-wide uppercase">
                  Real-time voice passthrough
                </p>
                {isMonitoring && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex flex-col gap-2 items-center"
                  >
                    <Badge variant="outline" className="flex items-center gap-2 px-3 py-1">
                      <Headphones size={14} className="text-primary" weight="fill" />
                      <span className="text-xs">{currentDevice}</span>
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs font-mono ${
                          latency < 10 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                          latency < 20 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                          'bg-orange-500/20 text-orange-400 border-orange-500/30'
                        }`}
                      >
                        {latency}ms latency
                      </Badge>
                      <AnimatePresence>
                        {isClipping && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Badge 
                              variant="destructive" 
                              className="flex items-center gap-1.5 px-2.5 py-1 bg-destructive/90 animate-pulse"
                            >
                              <Warning size={14} weight="fill" />
                              <span className="text-xs font-semibold">CLIPPING</span>
                            </Badge>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
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

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <Gauge 
                      className={lowLatencyMode ? "text-primary" : "text-muted-foreground"} 
                      size={20} 
                      weight={lowLatencyMode ? "fill" : "regular"}
                    />
                    <div>
                      <label className="text-sm font-medium block">
                        Ultra-Low Latency Mode
                      </label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {lowLatencyMode ? 'Minimum delay, no compression' : 'Balanced quality with compression'}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={lowLatencyMode}
                    onCheckedChange={toggleLatencyMode}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Input Device
                  </label>
                  <Select 
                    value={selectedDeviceId || (availableDevices.length > 0 ? availableDevices[0].deviceId : '__no_devices__')} 
                    onValueChange={handleDeviceChange}
                    disabled={availableDevices.length === 0}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select microphone..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDevices.length === 0 ? (
                        <SelectItem value="__no_devices__" disabled>
                          No microphones found
                        </SelectItem>
                      ) : (
                        availableDevices
                          .filter(device => device.deviceId) // Extra safety check
                          .map((device) => (
                            <SelectItem key={device.deviceId} value={device.deviceId}>
                              {device.label}
                            </SelectItem>
                          ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
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

                <div className="flex items-center gap-4">
                  <Lightning 
                    className={boost[0] > 0 ? "text-primary" : "text-muted-foreground"} 
                    size={24} 
                    weight={boost[0] > 0 ? "fill" : "regular"}
                  />
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                      Boost Amplification
                      {boost[0] > 0 && (
                        <Badge variant="secondary" className="text-xs px-2 py-0">
                          +{Math.round((boost[0] / 100) * 300)}%
                        </Badge>
                      )}
                    </label>
                    <Slider
                      value={boost}
                      onValueChange={setBoost}
                      max={100}
                      step={5}
                      disabled={!isMonitoring}
                      className="cursor-pointer"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right font-medium">
                    {boost[0]}%
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

              <div className="mt-8 pt-6 border-t border-border space-y-3">
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Warning size={16} className="flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Use headphones to prevent audio feedback. Keep volume low initially and adjust as needed.
                  </p>
                </div>
                {lowLatencyMode && (
                  <div className="flex items-start gap-2 text-xs text-primary/80">
                    <Gauge size={16} className="flex-shrink-0 mt-0.5" weight="fill" />
                    <p className="leading-relaxed">
                      Ultra-low latency mode bypasses compression for minimal delay. May allow clipping at high boost levels.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default App
