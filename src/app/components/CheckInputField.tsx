import { useState, useEffect, useCallback } from "react";
import InputField from "./InputField";

interface ValidationRule {
  validate: (value: string) => boolean;
  message: string;
}

interface CheckInputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  rules?: ValidationRule[];
  validateMode?: "immediate" | "onBlur";
  onValidation?: (isValid: boolean) => void;
}

export default function CheckInputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  disabled = false,
  rules = [],
  validateMode = "onBlur",
  onValidation,
}: CheckInputFieldProps) {
  const [error, setError] = useState<string>("");
  const [isDirty, setIsDirty] = useState(false);

  const validate = useCallback(() => {
    for (const rule of rules) {
      if (!rule.validate(value)) {
        setError(rule.message);
        onValidation?.(false);
        return;
      }
    }
    setError("");
    onValidation?.(true);
  }, [rules, value, onValidation]);

  useEffect(() => {
    if (validateMode === "immediate" && isDirty) {
      validate();
    }
  }, [validate, validateMode, isDirty]);

  const handleBlur = () => {
    setIsDirty(true);
    if (validateMode === "onBlur") {
      validate();
    }
  };

  return (
    <div className="space-y-1">
      <InputField
        label={label}
        type={type}
        value={value}
        onChange={(newValue) => {
          onChange(newValue);
          setIsDirty(true);
        }}
        placeholder={placeholder}
        disabled={disabled}
        onBlur={handleBlur}
      />
      {error && <p className="text-[12px] text-red-500">{error}</p>}
    </div>
  );
}
