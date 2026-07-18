'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X, CircleAlert as AlertCircle, Info } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: number
  message: string
  type: ToastType
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const remove = (id: number) =>
    setToasts((prev) => prev.filter((t) => t.id !== id))

  const icons = {
    success: <Check size={18} />,
    error: <X size={18} />,
    info: <Info size={18} />,
  }

  const colors = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    info: 'bg-luxury-gold',
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-24 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white ${colors[t.type]}`}
            >
              {icons[t.type]}
              <span className="text-sm font-medium">{t.message}</span>
              <button onClick={() => remove(t.id)} className="ml-2 opacity-70 hover:opacity-100">
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
