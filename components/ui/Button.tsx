// components/ui/Button.tsx

import { forwardRef } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
  as?: "button" | "a";
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", children, className = "", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-syne font-bold uppercase tracking-[0.12em] transition-all duration-150 select-none cursor-pointer disabled:opacity-40 disabled:pointer-events-none";

    const sizes = {
      sm: "text-[10px] px-[14px] py-[8px]",
      md: "text-[11px] px-[18px] py-[10px]",
    };

    const variants = {
      primary: `bg-ink text-cream rounded-btn hover:bg-mid active:scale-[0.97]`,
      ghost: `bg-transparent text-stone border border-[0.5px] border-stone rounded-btn hover:bg-cream hover:text-ink hover:border-ink`,
    };

    return (
      <motion.button
        ref={ref as any}
        whileTap={{ scale: 0.97 }}
        className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
