import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("w-full flex items-center justify-center transition-all duration-75 ease-in-out focus:outline-hidden focus-visible:ring-0", {
  variants: {
    intent: {
      default: "text-white",
      disabled: "cursor-not-allowed text-gray-400 dark:text-gray-300",
    },
    size: {
      default: "px-4 py-2 text-sm",
      sm: "px-3 py-2 text-xs",
      lg: "px-8 py-3 text-base",
      long: "px-8 py-2 text-sm",
    },
    round: {
      default: "rounded-full",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    },
    colorScheme: {
      default: "bg-black hover:bg-neutral-800",
      indigo: "bg-indigo-600 hover:bg-indigo-500",
      blue: "bg-blue-600 hover:bg-blue-500",
    },
  },
  compoundVariants: [
    {
      intent: "disabled",
      className: "bg-gray-100 hover:bg-gray-100 active:bg-gray-100 dark:bg-gray-600 dark:hover:bg-gray-600 dark:active:bg-gray-600",
    },
  ],
  defaultVariants: {
    intent: "default",
    size: "default",
    round: "default",
    colorScheme: "default",
  },
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, intent, size, colorScheme, children, ...props }, ref) => {
  return (
    <button className={buttonVariants({ intent, size, colorScheme, className })} ref={ref} {...props}>
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
