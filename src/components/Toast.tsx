import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ToastProps {
  message: string
  onClose: () => void
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-lg shadow-xl text-sm font-medium"
        style={{ background: 'var(--accent)', color: 'white' }}
      >
        ✅ {message}
      </motion.div>
    </AnimatePresence>
  )
}

export function useToast() {
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => setToast(msg)
  const hideToast = () => setToast(null)

  const ToastComponent = toast ? <Toast message={toast} onClose={hideToast} /> : null

  return { showToast, ToastComponent }
}
