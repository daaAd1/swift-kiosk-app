import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "kiosk-interactive kiosk-touch-target inline-flex items-center justify-center rounded-lg font-semibold kiosk-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-md",
        secondary: "bg-transparent text-foreground border-2 border-border hover:bg-secondary-hover",
        success: "bg-success text-success-foreground hover:bg-success-hover shadow-md",
        danger: "bg-danger text-danger-foreground hover:bg-danger-hover shadow-md",
        warning: "bg-warning text-warning-foreground hover:bg-warning-hover shadow-md",
      },
      size: {
        default: "px-8 py-4",
        sm: "px-6 py-3 text-base",
        lg: "px-12 py-6 text-xl",
        xl: "px-16 py-8 text-2xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  showArrow?: boolean;
  countdown?: number;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  children,
  showArrow = false,
  countdown,
  loading = false,
  disabled,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="mr-3 h-5 w-5 animate-spin" />}
      
      <span>{children}</span>
      
      {countdown && countdown > 0 && (
        <span className="ml-3 px-2 py-1 bg-black/20 rounded text-sm">
          {countdown}s
        </span>
      )}
      
      {showArrow && !loading && <ArrowRight className="ml-3 h-5 w-5" />}
    </button>
  );
};

export default Button;