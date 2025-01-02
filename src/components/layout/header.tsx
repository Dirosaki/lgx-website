'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import { RiCloseLine, RiMenuLine } from 'react-icons/ri'

import { Button } from '@/components/ui/button'
import { useBackButton } from '@/hooks/use-back-button'
import { useKeyPress } from '@/hooks/use-key-press'
import { useOnClickOutside } from '@/hooks/use-onclick-outside'

import { MobileMenu } from './mobile-menu'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleCloseMenu = () => setIsOpen(false)

  const handleToggleOpenMenu = () => {
    setIsOpen((prev) => !prev)
  }

  useBackButton(handleCloseMenu)

  useKeyPress(['Escape'], handleCloseMenu, {
    ref: menuRef,
  })

  useOnClickOutside(menuRef, handleCloseMenu, {
    ignoreRef: menuButtonRef,
  })

  return (
    <header className="sticky top-0 flex h-[72px] items-center bg-neutral/90 py-2 pl-5 pr-3 backdrop-blur-[2px]">
      <div className="mx-auto flex w-full max-w-screen-lg items-center justify-between">
        <svg
          fill="none"
          height="32"
          viewBox="0 0 128 32"
          width="128"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 11.4344V20.5654H32.1031V18.5965H9.63093C9.37751 18.5965 9.17221 18.4671 9.17221 18.3075V11.4344H0Z"
            fill="#F2F2F2"
          />
          <path
            d="M38.7654 17.434C39.5464 17.434 40.1795 16.7931 40.1795 16.0025C40.1795 15.2119 39.5464 14.5709 38.7654 14.5709C37.9845 14.5709 37.3514 15.2119 37.3514 16.0025C37.3514 16.7931 37.9845 17.434 38.7654 17.434Z"
            fill="#F2F2F2"
          />
          <path
            d="M82.84 17.434C83.6209 17.434 84.254 16.7931 84.254 16.0025C84.254 15.2119 83.6209 14.5709 82.84 14.5709C82.059 14.5709 81.4259 15.2119 81.4259 16.0025C81.4259 16.7931 82.059 17.434 82.84 17.434Z"
            fill="#F2F2F2"
          />
          <path
            d="M102.544 16L128 32H106.546L96.2479 19.2254L85.9499 32H64.4957L89.9574 16L64.4957 0H85.9499L96.2479 12.7717L106.546 0H128L102.544 16Z"
            fill="#FA3232"
          />
          <path
            d="M53.2276 17.9579V14.0394C53.2276 13.6816 53.6879 13.3915 54.2556 13.3915H76.05C76.1417 13.3915 76.216 13.3447 76.216 13.2869C76.216 12.2656 74.9023 11.4376 73.2818 11.4376H47.782C45.7557 11.4376 44.113 12.4729 44.113 13.7498V18.2531C44.113 19.5302 45.7557 20.5653 47.782 20.5653H72.8984C74.7307 20.5653 76.2161 19.6291 76.2161 18.4743V15.0049C76.2161 14.9471 76.1418 14.9003 76.0501 14.9003H58.8638C58.7721 14.9003 58.6977 14.9471 58.6977 15.0049V16.1427C58.6977 16.5005 59.158 16.7906 59.7257 16.7906H66.0643C66.6321 16.7906 67.0923 17.0807 67.0923 17.4385V17.9579C67.0923 18.3157 66.6321 18.6058 66.0643 18.6058H54.2557C53.688 18.6058 53.2276 18.3157 53.2276 17.9579Z"
            fill="#F2F2F2"
          />
        </svg>

        <nav aria-controls="menu" aria-label="Menu principal" role="navigation">
          <Button
            ref={menuButtonRef}
            aria-controls="menu"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            className="relative flex size-8 flex-col items-center justify-center gap-1"
            size="icon"
            variant="ghost"
            onClick={handleToggleOpenMenu}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={false}
              transition={{ duration: 0.2 }}
              animate={{
                opacity: isOpen ? 0 : 1,
                scale: isOpen ? 0 : 1,
              }}
            >
              <RiMenuLine size={24} />
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={false}
              transition={{ duration: 0.2 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                scale: isOpen ? 1 : 0,
              }}
            >
              <RiCloseLine size={24} />
            </motion.div>
          </Button>

          <AnimatePresence>{isOpen && <MobileMenu />}</AnimatePresence>
        </nav>
      </div>
    </header>
  )
}
