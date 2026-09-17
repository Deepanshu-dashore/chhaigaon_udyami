import * as React from "react"
import { Loader2 } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const spinnerVariants = cva("animate-spin text-muted-foreground", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-3 w-3",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
      icon: "h-10 w-10",
    },
    variant: {
      default: "text-primary",
      muted: "text-muted-foreground",
      white: "text-white",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
})

export interface SpinnerProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  className?: string
  label?: string
}

export function Spinner({ size, variant, className, label, ...props }: SpinnerProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <Loader2
        className={cn(spinnerVariants({ size, variant }), className)}
        {...props}
      />
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
      <span className="sr-only">Loading...</span>
    </div>
  )
}
