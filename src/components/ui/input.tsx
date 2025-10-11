// src/components/ui/input.tsx
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  // additional props if needed later
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-1 focus:outline-none ${className}`}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
