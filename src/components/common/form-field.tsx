import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

/** Label + input + error text, wired for accessibility. Works with react-hook-form `register`. */
export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, id, ...props }, ref) => {
    const generated = useId();
    const fieldId = id ?? generated;
    return (
      <div className="space-y-1.5">
        <Label htmlFor={fieldId}>{label}</Label>
        <Input
          id={fieldId}
          ref={ref}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${fieldId}-error`} className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  },
);
FormField.displayName = "FormField";
