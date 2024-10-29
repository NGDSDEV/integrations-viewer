import { memo, useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { CustomHelper } from "./CustomHelper";
import { icons } from "lucide-react";
import Icon from "./Icon";

interface IInput {
  error?: FieldError;
  label: string;
  disabled?: boolean;
  requiered?: boolean;
  placeholder?: string;
  type?: "text" | "password";
  preIcon?: keyof typeof icons;
  register?: UseFormRegisterReturn;
  options: { value: string; label: string }[];
}

const SelectCustom: React.FC<IInput> = memo(function SelectCustom({ register, label, error, preIcon, options, disabled, requiered }) {
  const [focusInput, setFocusInput] = useState(false);

  const iconPadding = preIcon ? "px-10" : "px-3";
  const inputId = `input-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <main className="mb-4">
      <label htmlFor={inputId} className={`block text-sm font-medium ${focusInput ? "text-primary" : ""}`}>
        {label}
        {requiered && <span className="text-accent"> *</span>}
      </label>

      <section className="relative mt-1">
        {preIcon && (
          <button type="button" className="absolute inset-y-0 left-0 flex items-center pl-3" tabIndex={-1}>
            <Icon name={preIcon} size={20} />
          </button>
        )}

        <select
          disabled={disabled}
          {...register}
          className={`block w-full ${disabled && "bg-gray-100"}   ${iconPadding} py-2 border ${
            error ? "border-red-700" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
          onFocus={() => setFocusInput(true)}
          onBlur={() => setFocusInput(false)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}{" "}
        </select>
      </section>

      {error && <CustomHelper message={error.message} />}
    </main>
  );
});

export default SelectCustom;
