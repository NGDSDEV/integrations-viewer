import { icons } from "lucide-react";
import { memo, useState } from "react";
import { CustomHelper } from "./CustomHelper";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface IInput {
  label: string;
  error?: FieldError;
  placeholder?: string;
  type?: "text" | "password";
  preIcon?: keyof typeof icons;
  register?: UseFormRegisterReturn;
}

const Input: React.FC<IInput> = memo(function Input({ register, type = "text", placeholder, label, error, preIcon }) {
  const [focusInput, setFocusInput] = useState(false);

  const iconPadding = preIcon ? "px-10" : "px-3";
  const inputId = `input-${label.replace(/\s+/g, "-").toLowerCase()}`;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (type === "text") {
      event.target.value = event.target.value.toUpperCase();
    }
    if (register && register.onChange) {
      register.onChange(event);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className={`block text-sm font-medium ${focusInput ? "text-primary" : ""}`}>
        {label}
        <span className="text-accent"> *</span>
      </label>
      <textarea
        {...register}
        aria-invalid={!!error}
        placeholder={placeholder ?? (type === "password" ? "••••••••" : "")}
        className={`block mt-1 w-full ${iconPadding} py-2 border ${
          error ? "border-red-700" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
        onFocus={() => setFocusInput(true)}
        onBlur={() => setFocusInput(false)}
        onChange={handleChange}
      />
      {error && <CustomHelper message={error.message} />}
    </div>
  );
});

export default Input;
