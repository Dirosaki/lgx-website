'use client'

import { useEffect } from 'react'

export const useBackButton = (callback: () => void) => {
  useEffect(() => {
    const handlePopState = () => {
      callback()
      window.history.pushState(null, '', window.location.href)
    }

    window.history.pushState(null, '', window.location.href)

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [callback])
}
