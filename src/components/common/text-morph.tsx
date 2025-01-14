import { AnimatePresence, motion } from 'motion/react'
import { useId, useMemo } from 'react'

import { cn } from '@/utils/cn'

type TextMorphProps = {
  children: string
  as?: React.ElementType
  className?: string
  style?: React.CSSProperties
}

export function TextMorph({ children, as: Component = 'p', className, style }: TextMorphProps) {
  const uniqueId = useId()

  const characters = useMemo(() => {
    const charCounts: Record<string, number> = {}

    return children.split('').map((char, index) => {
      const lowerChar = char.toLowerCase()
      charCounts[lowerChar] = (charCounts[lowerChar] || 0) + 1

      return {
        id: `${uniqueId}-${lowerChar}${charCounts[lowerChar]}`,
        label: index === 0 ? char.toUpperCase() : lowerChar,
      }
    })
  }, [children, uniqueId])

  return (
    <Component aria-label={children} className={cn(className)} style={style}>
      <AnimatePresence initial={false} mode="popLayout">
        {characters.map((character) => (
          <motion.span
            key={character.id}
            animate={{ opacity: 1 }}
            aria-hidden="true"
            className="inline-block"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            layoutId={character.id}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
              mass: 0.2,
            }}
          >
            {character.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </Component>
  )
}