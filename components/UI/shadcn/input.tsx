import { cn } from "@/utils/helpers/styles";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "sm" | "base" | "lg";
}

const getInputSizeClasses = (inputSize: "sm" | "base" | "lg") => {
  switch (inputSize) {
    case "sm":
      return "h-8 px-2 text-xs";
    case "lg":
      return "h-12 px-4 text-lg";
    default:
      return "h-10 px-3 text-sm";
  }
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize = "base", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-lg border border-input bg-transparent shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          getInputSizeClasses(inputSize),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
