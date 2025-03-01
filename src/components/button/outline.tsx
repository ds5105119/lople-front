import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const outlineButtonVariants = cva("w-full flex items-center justify-center transition-all duration-75 ease-in-out focus:outline-hidden focus-visible:ring-0 hover:brightness-110", {
  variants: {
    intent: {
      default: "border text-neutral-900 dark:text-white",
      semibold: "border-[1.5px]",
      bold: "border-2",
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
      default:
        "border-neutral-400 hover:bg-neutral-300 hover:border-neutral-300 active:bg-neutral-400 active:border-neutral-400 dark:border-neutral-600 dark:hover:bg-neutral-800 dark:hover:border-neutral-800 dark:active:bg-neutral-700 dark:active:border-neutral-700",
      gradient: "text-white border-0 bg-linear-to-r from-green-400 to-blue-500",
      gradient2: "text-white border-0 bg-linear-to-r from-[#5AC8FA] to-[#5856D6]",
    },
  },
  compoundVariants: [
    {
      colorScheme: "gradient",
      className: "text-white",
    },
    {
      colorScheme: "gradient2",
      className: "text-white",
    },
  ],
  defaultVariants: {
    intent: "default",
    size: "default",
    round: "default",
    colorScheme: "default",
  },
});

interface OutlineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof outlineButtonVariants> {
  children: React.ReactNode;
}

const OutlineButton = React.forwardRef<HTMLButtonElement, OutlineButtonProps>(({ className, intent, size, colorScheme, children, ...props }, ref) => {
  return (
    <button className={outlineButtonVariants({ intent, size, colorScheme, className })} ref={ref} {...props}>
      {children}
    </button>
  );
});

OutlineButton.displayName = "OutlineButton";

export default OutlineButton;
