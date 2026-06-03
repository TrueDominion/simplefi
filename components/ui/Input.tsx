// components/ui/Input.tsx

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="font-syne font-bold text-[11px] uppercase tracking-[0.12em] text-stone"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            h-10 px-[14px] border border-[0.5px] border-warm rounded-btn
            font-syne text-[13px] text-ink placeholder:text-stone
            bg-white outline-none
            focus:border-ink focus:shadow-[0_0_0_3px_rgba(13,13,12,0.08)]
            transition-all duration-150
            ${error ? "border-red-400" : ""}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="font-syne text-[12px] text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
