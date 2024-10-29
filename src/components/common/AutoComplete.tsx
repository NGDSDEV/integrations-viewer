import { CustomHelper } from "./CustomHelper";
import { Controller, FieldError } from "react-hook-form";
import Select, { StylesConfig, ControlProps, OptionProps } from "react-select";

interface ISelectCustomProps {
  name: string;
  control: any;
  label: string;
  error?: FieldError;
  disabled?: boolean;
  requiered?: boolean;
  options: { value: string; label: string }[];
  onChangeProp?: () => void;
  onFocus?: () => void;
}

const customStyles: StylesConfig = {
  control: (provided, state: ControlProps<any>) => ({
    ...provided,
    height: 40, // Ajusta la altura del control (contenedor del select)
    minHeight: 40, // Asegura que la altura mínima sea 40px
    borderColor: state.isFocused ? "#0067B1" : "none", // Cambia el color del borde cuando está enfocado
    boxShadow: state.isFocused ? "0 0 0 1px #0067B1" : "none", // Añade sombra cuando está enfocado
  }),
  input: (provided) => ({
    ...provided,
    height: "auto", // Ajusta la altura del input
    fontSize: "0.875rem", // Ajusta el tamaño de la fuente del input
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: 40, // Ajusta la altura del contenedor del valor seleccionado
    display: "flex",
    alignItems: "center",
    padding: "0 8px", // Ajusta el padding para que coincida con el input
    fontSize: "0.875rem", // Ajusta el tamaño de la fuente del contenedor del valor seleccionado
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: 40, // Ajusta la altura del contenedor de los indicadores
  }),
  singleValue: (provided) => ({
    ...provided,
    marginLeft: 0, // Ajusta el margen para que coincida con el input
    fontSize: "0.875rem", // Ajusta el tamaño de la fuente del valor seleccionado
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "0.875rem", // Ajusta el tamaño de la fuente del placeholder
  }),
  menu: (provided) => ({
    ...provided,
    fontSize: "0.875rem", // Ajusta el tamaño de la fuente del menú
  }),
  option: (provided, state: OptionProps<any>) => ({
    ...provided,
    fontSize: "0.875rem", // Ajusta el tamaño de la fuente de las opciones
    padding: "4px 8px", // Reduce el padding de las opciones
    backgroundColor: state.isSelected ? "#0067B1" : state.isFocused ? "#e6f7ff" : "white", // Cambia el color de fondo cuando está seleccionado o enfocado
    color: state.isSelected ? "white" : "black", // Cambia el color del texto cuando está seleccionado
    "&:hover": {
      backgroundColor: "#e6f7ff", // Cambia el color de fondo al pasar el cursor
    },
  }),
};

const SelectCustom: React.FC<ISelectCustomProps> = ({
  options,
  control,
  error,
  label,
  name,
  disabled,
  requiered,
  onChangeProp,
  onFocus,
}) => {
  const id = Date.now().toString();

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {requiered && <span className="text-accent"> *</span>}
      </label>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            placeholder="Selecciona una opción"
            id={id}
            name={name}
            options={options}
            value={options.find((option) => option.value === value)}
            onChange={(newValue: unknown) => {
              const selectedOption = newValue as { value: string; label: string } | null;
              const selectedValue = selectedOption ? selectedOption.value : null;

              setTimeout(() => onChangeProp?.(), 300);
              onChange(selectedValue);
            }}
            onFocus={onFocus}
            isDisabled={disabled}
            styles={customStyles}
            classNamePrefix="select"
            className="basic-single"
          />
        )}
        name={name}
      />
      {error && <CustomHelper message={error.message} />}
    </div>
  );
};

export default SelectCustom;
