import * as React from "react"
import { Viewport } from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Context interface
interface ToastContextType {
  toast: (props: Omit<ToasterToast, "id">) => string
  dismiss: (toastId?: string) => void
  toasts: ToasterToast[]
}

// Create context with a default value
const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

// Generate a unique ID for each toast
const genId = () => Math.random().toString(36).slice(2)

const ToastProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [toasts, setToasts] = React.useState<ToasterToast[]>([])

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

  const toast = React.useCallback((props: Omit<ToasterToast, "id">) => {
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
export const toast = (props: Omit<ToasterToast, "id">): string => {
  console.warn("Using toast outside of ToastProvider might not work as expected")
  return genId() // Returns an ID but doesn't actually show a toast without the provider
}

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 100000

type Toast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  duration?: number
}

const actionVariants = cva(
  "group inline-flex items-center rounded-md bg-secondary text-sm font-medium transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center overflow-hidden rounded-md border border-border bg-background shadow-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-bottom-12 data-[state=closed]:slide-out-to-bottom-12 sm:w-[390px]",
  {
    variants: {
      variant: {
        default: "border",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground [&[role='alert']]:bg-destructive [&[role='alert']]:text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ToastProps extends React.ComponentPropsWithoutRef<"div">, VariantProps<typeof toastVariants> {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  duration?: number
  onClose?: () => void
}

export interface ToasterToast extends ToastProps { }

export interface ToasterProps extends React.ComponentPropsWithoutRef<"div"> {
  position?:
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  gutter?: number
  offset?: number
  expand?: boolean
  closeButton?: boolean
  closeDelay?: number
  toastOptions?: ToastProps
}

export const Toaster = React.forwardRef<HTMLDivElement, ToasterProps>(
  ({ className, position = "bottom-right", gutter = 8, offset = 20, expand = false, closeButton = false, closeDelay = 500, toastOptions, ...props }, ref) => {
    const { toasts, dismiss } = useToast()

    return (
      <ToastViewport
        className={cn(
          "fixed pointer-events-none z-[100]",
          position === "top-left" && "top-0 left-0",
          position === "top-center" && "top-0 left-1/2 -translate-x-1/2",
          position === "top-right" && "top-0 right-0",
          position === "bottom-left" && "bottom-0 left-0",
          position === "bottom-center" && "bottom-0 left-1/2 -translate-x-1/2",
          position === "bottom-right" && "bottom-0 right-0",
          className
        )}
        style={{
          "--gutter": `${gutter}px`,
          "--offset": `${offset}px`,
        }}
        {...props}
        ref={ref}
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            className={cn(
              expand && "w-full",
              toast.variant === "destructive" &&
              "bg-destructive text-destructive-foreground",
              toastOptions?.className
            )}
            {...toast}
            onClose={() => dismiss(toast.id)}
          />
        ))}
      </ToastViewport>
    )
  }
)
Toaster.displayName = "Toaster"

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof Viewport>,
  React.ComponentPropsWithoutRef<typeof Viewport>
>(({ className, ...props }, ref) => (
  <Viewport
    ref={ref}
    className={cn(
      "fixed inset-0 z-[100] flex flex-col p-4 sm:items-center sm:justify-center gap-4",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = "ToastViewport"

export const Toast = React.forwardRef<
  HTMLDivElement,
  ToastProps
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = "Toast"

export const ToastAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "ml-auto flex items-center justify-center rounded-md px-3 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:text-destructive-foreground",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = "ToastAction"

export const ToastClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:text-destructive-foreground",
      className
    )}
    {...props}
  />
))
ToastClose.displayName = "ToastClose"

export const ToastTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-1 font-semibold text-sm", className)}
    {...props}
  />
))
ToastTitle.displayName = "ToastTitle"

export const ToastDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = "ToastDescription"
