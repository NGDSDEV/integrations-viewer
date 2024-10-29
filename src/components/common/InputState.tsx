import React, { useState } from "react";
import Icon from "./Icon"; // Asegúrate de tener un componente Icon o usa cualquier librería de íconos
import { icons } from "lucide-react"; // O cualquier otra librería de íconos que estés usando

interface IInputProps {
  disabled?: boolean;
  error?: string;
  label: string;
  placeholder?: string;
  postIcon?: keyof typeof icons;
  preIcon?: keyof typeof icons;
  type?: "text" | "password" | "number";
  uppercase?: boolean;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickPostIcon?: () => void;
  onFocus?: () => void;
}

const Input: React.FC<IInputProps> = ({
  disabled = false,
  error,
  label,
  placeholder,
  postIcon,
  preIcon,
  type = "text",
  uppercase = false,
  value,
  onChange,
  onClickPostIcon,
  onFocus,
}) => {
  const [focusInput, setFocusInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputId = `input-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const inputType = type === "password" && showPassword ? "text" : type;

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (uppercase) event.target.value = event.target.value.toUpperCase();
    onChange?.(event);
  };

  const onFocusAction = () => {
    setFocusInput(true);
    onFocus?.();
  };

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className={`block text-sm font-medium ${focusInput ? "text-primary" : ""}`}>
        {label}
      </label>
      <div className="relative mt-1">
        {preIcon && (
          <button type="button" className="absolute inset-y-0 left-0 flex items-center pl-3" tabIndex={-1}>
            <Icon name={preIcon} size={20} />
          </button>
        )}
        <input
          id={inputId}
          type={inputType}
          disabled={disabled}
          aria-invalid={!!error}
          placeholder={placeholder ?? (type === "password" ? "••••••••" : "")}
          className={`block w-full ${preIcon || postIcon ? "px-10" : "px-3"} py-2 border ${
            error ? "border-red-700" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
          onFocus={onFocusAction}
          onBlur={() => setFocusInput(false)}
          onChange={handleChange}
          value={value}
        />
        {type === "password" && (
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={toggleShowPassword}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        )}
        {postIcon && (
          <button onClick={onClickPostIcon} type="button" className="absolute inset-y-0 right-0 flex items-center pr-3" tabIndex={-1}>
            <Icon name={postIcon} size={20} />
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
