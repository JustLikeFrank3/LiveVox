import { motion, AnimatePresence } from 'framer-motion'

interface AudioLevelMeterProps {
  level: number
}

export default function AudioLevelMeter({ level }: AudioLevelMeterProps) {
  const percentage = Math.min(level * 100, 100)
  const isClipping = percentage > 95
  
  const getColorClass = () => {
    if (percentage > 95) return 'bg-destructive'
    if (percentage > 80) return 'bg-yellow-500'
    if (percentage > 60) return 'bg-yellow-400'
    return 'bg-primary'
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="tracking-wide uppercase">Input Level</span>
        <span className={`font-medium ${isClipping ? 'text-destructive font-bold animate-pulse' : ''}`}>
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden relative">
        <motion.div
          className={`h-full ${getColorClass()} transition-colors duration-150 ${isClipping ? 'animate-pulse' : ''}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.05, ease: 'linear' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <AnimatePresence>
          {isClipping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="absolute inset-0 bg-destructive/30"
            />
          )}
        </AnimatePresence>
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground/60 tracking-wider">
        <span>SAFE</span>
        <span>OPTIMAL</span>
        <span className={isClipping ? 'text-destructive font-bold' : ''}>CLIP</span>
      </div>
    </div>
  )
}
