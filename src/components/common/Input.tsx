import Icon from "./Icon";
import { icons } from "lucide-react";
import { memo, useState } from "react";
import { CustomHelper } from "./CustomHelper";
import { FieldError, Merge, UseFormRegisterReturn } from "react-hook-form";

interface IInput {
  disabled?: boolean;
  error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
  label: string;
  placeholder?: string;
  postIcon?: keyof typeof icons;
  preIcon?: keyof typeof icons;
  register?: UseFormRegisterReturn;
  requiered?: boolean;
  type?: "text" | "password" | "number";
  uppercase?: boolean;
  onClickPostIcon?: () => void;
  onFocus?: () => void;
}

const Input: React.FC<IInput> = memo(function Input({
  disabled = false,
  error,
  label,
  placeholder,
  postIcon, // Nueva propiedad
  preIcon,
  register,
  requiered,
  type = "text",
  uppercase = false,
  onClickPostIcon,
  onFocus,
}) {
  const [focusInput, setFocusInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const iconPadding = preIcon ? "px-10" : "px-3";
  const inputId = `input-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const inputType = type === "password" && showPassword ? "text" : type;

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (uppercase) event.target.value = event.target.value.toUpperCase();
    register?.onChange?.(event);
  };

  const onFocusAction = () => {
    setFocusInput(true);
    onFocus?.();
  };

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className={`block text-sm font-medium ${focusInput ? "text-primary" : ""}`}>
        {label}
        {requiered && <span className="text-accent"> *</span>}
      </label>
      <div className="relative mt-1">
        {preIcon && (
          <button type="button" className="absolute inset-y-0 left-0 flex items-center pl-3" tabIndex={-1}>
            <Icon name={preIcon} size={20} />
          </button>
        )}
        <input
          {...register}
          type={inputType}
          disabled={disabled}
          aria-invalid={!!error}
          placeholder={placeholder ?? (type === "password" ? "••••••••" : "")}
          className={`block w-full ${iconPadding} py-2 border ${
            error ? "border-red-700" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
          onFocus={() => onFocusAction()}
          onBlur={() => setFocusInput(false)}
          onChange={handleChange}
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
          <button  onClick={onClickPostIcon} type="button" className="absolute inset-y-0 right-0 flex items-center pr-3" tabIndex={-1}>
            <Icon name={postIcon} size={20} />
          </button>
        )}
      </div>
      {error && <CustomHelper message={error.message} />}
    </div>
  );
});

export default Input;
