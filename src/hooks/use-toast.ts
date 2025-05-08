
import * as React from "react"
import { Toast, type ToastProps } from "@/components/ui/toast"

// Context interface
export interface ToastContextType {
  toast: (props: Omit<Toast, "id">) => string
  dismiss: (toastId?: string) => void
  toasts: Toast[]
}

// Create context with a default value
const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

// Generate a unique ID for each toast
const genId = () => Math.random().toString(36).slice(2)

export const ToastProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const dismiss = React.useCallback((toastId?: string) => {
    setToasts((toasts) => {
      if (toastId) {
        return toasts.map((t) =>
          t.id === toastId ? { ...t, open: false } : t
        )
      }
      return toasts.map((t) => ({ ...t, open: false }))
    })
  }, [])

  const toast = React.useCallback((props: Omit<Toast, "id">) => {
    const id = genId()
    setToasts((toasts) => [
      ...toasts,
      { id, ...props, open: true },
    ])
    return id
  }, [])

  return (
    <ToastContext.Provider
      value={{
        toast,
        dismiss,
        toasts,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  return context
}

// Create a standalone toast function that can be used without hooks
export const toast = (props: Omit<Toast, "id">): string => {
  console.warn("Using toast outside of ToastProvider might not work as expected")
  return genId() // Returns an ID but doesn't actually show a toast without the provider
}
