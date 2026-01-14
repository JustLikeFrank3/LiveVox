import { motion } from 'framer-motion'

interface AudioLevelMeterProps {
  level: number
}

export default function AudioLevelMeter({ level }: AudioLevelMeterProps) {
  const percentage = Math.min(level * 100, 100)
  
  const getColorClass = () => {
    if (percentage > 80) return 'bg-destructive'
    if (percentage > 60) return 'bg-yellow-500'
    return 'bg-primary'
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="tracking-wide uppercase">Input Level</span>
        <span className="font-medium">{percentage.toFixed(0)}%</span>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden relative">
        <motion.div
          className={`h-full ${getColorClass()} transition-colors duration-150`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.05, ease: 'linear' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground/60 tracking-wider">
        <span>SAFE</span>
        <span>OPTIMAL</span>
        <span>CLIP</span>
      </div>
    </div>
  )
}
