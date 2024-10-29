/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";

import AutoComplete from "@/components/common/AutoComplete";
import { useStepValidation } from "@/context/steps/steps";
import { IForm } from "@/types/forms/dispensary";
import { IThirdStep } from "@/types/forms/operator";

import ProductsForm from "./ProductsForm";
import Subtitle from "./Subtitle";

export const Form: React.FC<IForm> = ({
  className,
  isValid,
  handleSubmit,
  control,
  errors,
  reset,
  watch,
  json,
  setJson,
  setJsonCheck,
  jsonCheck,
}) => {
  const { setIsValidStep } = useStepValidation();
  const onSubmit: SubmitHandler<IThirdStep> = (data) => {
    console.log(data);
  };

  const flattenObject = (obj?: Record<string, unknown>, result: Record<string, string> = {}, path: string = "") => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = path ? `${path} -> ${key}` : key;
        const newValue = path ? `${path}.${key}` : key;
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          flattenObject(obj[key] as Record<string, unknown>, result, newKey);
        } else if (Array.isArray(obj[key])) {
          obj[key].forEach((item: Record<string, unknown>, index: number) => {
            flattenObject(item, result, `${newValue}[${index}]`);
          });
        } else {
          result[newKey] = `${newValue}`;
        }
      }
    }
    return result;
  };

  const mapToSelectOptions = (
    obj: Record<string, string>
  ): {
    value: string;
    label: string;
  }[] => {
    return Object.keys(obj).map((key) => ({
      label: key,
      value: obj[key],
    }));
  };

  const flattenedJson = flattenObject(json as Record<string, unknown>);
  const selectOptions = mapToSelectOptions(flattenedJson);

  useEffect(() => {
    setIsValidStep(isValid);

    return () => {
      setIsValidStep(false);
    };
  }, [isValid, setIsValidStep]);

  useEffect(() => {
    watch();
    console.log("💠  watch()--> ", { ...watch() });
    return () => reset();
  }, [watch]);

  const deepClone = (obj: unknown): unknown => {
    return JSON.parse(JSON.stringify(obj));
  };

  const updateJson = (obj: Record<string, unknown>, value: string, key: string): boolean => {
    const parts = value.split(".");
    let current = obj;
    let updated = false;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const arrayMatch = /(\w+)\[(\d+)\]/.exec(part);

      if (arrayMatch) {
        const arrayProp = arrayMatch[1];
        const index = parseInt(arrayMatch[2], 10);

        if (!current[arrayProp] || !Array.isArray(current[arrayProp]) || !current[arrayProp][index]) {
          return false;
        }

        if (i === parts.length - 1) {
          current[arrayProp][index] = key;
          updated = true;
        } else {
          current = current[arrayProp][index];
        }
      } else {
        if (i === parts.length - 1) {
          current[part] = key;
          updated = true;
        } else {
          if (!current[part]) {
            return false;
          }
          current = current[part] as Record<string, unknown>;
        }
      }
    }

    if (updated) {
      setJson({ ...obj });
    }

    return updated;
  };

  const updateJsonCheck = (obj: Record<string, unknown>, value: string, key: string): boolean => {
    const parts = value.split(".");
    let current = obj;
    let updated = false;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const arrayMatch = /(\w+)\[(\d+)\]/.exec(part);

      if (arrayMatch) {
        const arrayProp = arrayMatch[1];
        const index = parseInt(arrayMatch[2], 10);

        if (!current[arrayProp] || !Array.isArray(current[arrayProp]) || !current[arrayProp][index]) {
          return false;
        }

        if (i === parts.length - 1) {
          current[arrayProp][index] = key;
          updated = true;
        } else {
          current = current[arrayProp][index];
        }
      } else {
        if (i === parts.length - 1) {
          current[part] = key;
          updated = true;
        } else {
          if (!current[part]) {
            return false;
          }
          current = current[part] as Record<string, unknown>;
        }
      }
    }

    if (updated) setJsonCheck({ ...obj });

    return updated;
  };

  const setKey = (key: string, value: string) => {
    updateJson(json as Record<string, unknown>, value, key);
    const jsonCheckClone = deepClone(jsonCheck);
    updateJsonCheck(jsonCheckClone as Record<string, unknown>, value, key);
  };

  return (
    <div className={`${className} text-2xl bg-white p-10`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* General Information */}
        <Subtitle text="Información General" id="general-information" />
        <AutoComplete
          name="order.general_information.order_number"
          options={selectOptions}
          control={control}
          requiered
          error={errors.order?.general_information?.order_number}
          label="Número de orden"
          onChangeProp={() => setKey("order_number", watch().order.general_information.order_number)}
        />

        <AutoComplete
          name="order.general_information.short_order"
          error={errors.order?.general_information?.short_order}
          label="Orden corta"
          options={selectOptions}
          control={control}
          onChangeProp={() => setKey("short_order", watch().order.general_information.short_order)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.general_information?.order_creation_date}
          label="Fecha de creación de la orden"
          name="order.general_information.order_creation_date"
          onChangeProp={() => setKey("order_creation_date", watch().order.general_information.order_creation_date)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.general_information?.request_time}
          label="Hora de solicitud"
          name="order.general_information.request_time"
          onChangeProp={() => setKey("request_time", watch().order.general_information.request_time)}
        />

        {/* Delivery Dates */}
        <Subtitle text="Fechas de entrega" id="delivery-dates" />
        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.delivery_dates?.promised_delivery_date}
          label="Fecha de entrega prometida"
          name="order.delivery_dates.promised_delivery_date"
          onChangeProp={() => setKey("promised_delivery_date", watch().order.delivery_dates.promised_delivery_date)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.delivery_dates?.new_promised_delivery_date}
          label="Nueva fecha de entrega prometida"
          name="order.delivery_dates.new_promised_delivery_date"
          onChangeProp={() => setKey("new_promised_delivery_date", watch().order.delivery_dates.new_promised_delivery_date)}
        />
        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.delivery_dates?.promised_delivery_time}
          label="Hora de entrega prometida"
          name="order.delivery_dates.promised_delivery_time"
          onChangeProp={() => setKey("promised_delivery_time", watch().order.delivery_dates.promised_delivery_time)}
        />

        {/* User */}
        <Subtitle text="Usuario" id="user" />
        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.user?.order_processing_user}
          label="Usuario de procesamiento de la orden"
          name="order.user.order_processing_user"
          onChangeProp={() => setKey("order_processing_user", watch().order.user.order_processing_user)}
        />

        {/* Origin */}
        <Subtitle text="Origen" id="origin" />
        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.origin?.department}
          label="Departamento de origen"
          name="order.origin.department"
          onChangeProp={() => setKey("department", watch().order.origin.department)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.origin?.city}
          label="Ciudad de origen"
          name="order.origin.city"
          onChangeProp={() => setKey("city", watch().order.origin.city)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.origin?.address}
          label="Dirección de origen"
          name="order.origin.address"
          onChangeProp={() => setKey("address", watch().order.origin.address)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.origin?.origin_point_code}
          label="Código del punto de origen"
          name="order.origin.origin_point_code"
          onChangeProp={() => setKey("origin_point_code", watch().order.origin.origin_point_code)}
        />
        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.origin?.origin_point_name}
          label="Nombre del punto de origen"
          name="order.origin.origin_point_name"
          onChangeProp={() => setKey("origin_point_name", watch().order.origin.origin_point_name)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.origin?.dane_code}
          label="Código DANE de origen"
          name="order.origin.dane_code"
          onChangeProp={() => setKey("dane_code", watch().order.origin.dane_code)}
        />

        {/* Destination */}
        <Subtitle text="Destino" id="destination" />
        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.destination?.department}
          label="Departamento de destino"
          name="order.destination.department"
          onChangeProp={() => setKey("department", watch().order.destination.department)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.destination?.city}
          label="Ciudad de destino"
          name="order.destination.city"
          onChangeProp={() => setKey("city", watch().order.destination.city)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.destination?.address}
          label="Dirección de destino"
          name="order.destination.address"
          onChangeProp={() => setKey("address", watch().order.destination.address)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.destination?.destination_point_code}
          label="Código del punto de destino"
          name="order.destination.destination_point_code"
          onChangeProp={() => setKey("destination_point_code", watch().order.destination.destination_point_code)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.destination?.destination_point_name}
          label="Nombre del punto de destino"
          name="order.destination.destination_point_name"
          onChangeProp={() => setKey("destination_point_name", watch().order.destination.destination_point_name)}
        />
        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.destination?.dane_code}
          label="Código DANE de destino"
          name="order.destination.dane_code"
          onChangeProp={() => setKey("dane_code", watch().order.destination.dane_code)}
        />

        {/* Order Details */}
        <Subtitle text="Detalles de orden" id="order-details" />
        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.order_details?.sura_order_number}
          label="Número de orden SURA"
          name="order.order_details.sura_order_number"
          onChangeProp={() => setKey("sura_order_number", watch().order.order_details.sura_order_number)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.order_details?.scp_order_number}
          label="Número de orden SCP"
          name="order.order_details.scp_order_number"
          onChangeProp={() => setKey("scp_order_number", watch().order.order_details.scp_order_number)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.order_details?.pending_generator_code}
          label="Código del generador pendiente"
          name="order.order_details.pending_generator_code"
          onChangeProp={() => setKey("pending_generator_code", watch().order.order_details.pending_generator_code)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.order_details?.pending_generator_point}
          label="Punto del generador pendiente"
          name="order.order_details.pending_generator_point"
          onChangeProp={() => setKey("pending_generator_point", watch().order.order_details.pending_generator_point)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.order_details?.healthcare_provider}
          label="Proveedor de salud"
          name="order.order_details.healthcare_provider"
          onChangeProp={() => setKey("healthcare_provider", watch().order.order_details.healthcare_provider)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.order_details?.channel}
          label="Canal"
          name="order.order_details.channel"
          onChangeProp={() => setKey("channel", watch().order.order_details.channel)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.order_details?.institutional_order_value}
          label="Valor de la orden institucional"
          name="order.order_details.institutional_order_value"
          onChangeProp={() => setKey("institutional_order_value", watch().order.order_details.institutional_order_value)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.order_details?.commercial_order_value}
          label="Valor de la orden comercial"
          name="order.order_details.commercial_order_value"
          onChangeProp={() => setKey("commercial_order_value", watch().order.order_details.commercial_order_value)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.order_details?.commercial_payment_method}
          label="Método de pago comercial"
          name="order.order_details.commercial_payment_method"
          onChangeProp={() => setKey("commercial_payment_method", watch().order.order_details.commercial_payment_method)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.order_details?.institutional_payment_method}
          label="Método de pago institucional"
          name="order.order_details.institutional_payment_method"
          onChangeProp={() => setKey("institutional_payment_method", watch().order.order_details.institutional_payment_method)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.order_details?.institutional_inventory_value}
          label="Valor del inventario institucional"
          name="order.order_details.institutional_inventory_value"
          onChangeProp={() => setKey("institutional_inventory_value", watch().order.order_details.institutional_inventory_value)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.order_details?.commercial_inventory_value}
          label="Valor del inventario comercial"
          name="order.order_details.commercial_inventory_value"
          onChangeProp={() => setKey("commercial_inventory_value", watch().order.order_details.commercial_inventory_value)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.order_details?.source}
          label="Fuente"
          name="order.order_details.source"
          onChangeProp={() => setKey("source", watch().order.order_details.source)}
        />

        {/* Logistics */}
        <Subtitle text="Logística" id="logistics" />
        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.logistics?.volume_cm3}
          label="Volumen (cm³)"
          name="order.logistics.volume_cm3"
          onChangeProp={() => setKey("volume_cm3", watch().order.logistics.volume_cm3)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.logistics?.weight_grams}
          label="Peso (gramos)"
          name="order.logistics.weight_grams"
          onChangeProp={() => setKey("weight_grams", watch().order.logistics.weight_grams)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.logistics?.cargo_type}
          label="Tipo de carga"
          name="order.logistics.cargo_type"
          onChangeProp={() => setKey("cargo_type", watch().order.logistics.cargo_type)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.logistics?.delivery_observations}
          label="Observaciones de entrega"
          name="order.logistics.delivery_observations"
          onChangeProp={() => setKey("delivery_observations", watch().order.logistics.delivery_observations)}
        />
        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.logistics?.dispensation_data}
          label="Datos de dispensación"
          name="order.logistics.dispensation_data"
          onChangeProp={() => setKey("dispensation_data", watch().order.logistics.dispensation_data)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.logistics?.tracking_number}
          label="Número de seguimiento"
          name="order.logistics.tracking_number"
          onChangeProp={() => setKey("tracking_number", watch().order.logistics.tracking_number)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.logistics?.coordinate_x}
          label="Coordenada X"
          name="order.logistics.coordinate_x"
          onChangeProp={() => setKey("coordinate_x", watch().order.logistics.coordinate_x)}
        />
        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.logistics?.coordinate_y}
          label="Coordenada Y"
          name="order.logistics.coordinate_y"
          onChangeProp={() => setKey("coordinate_y", watch().order.logistics.coordinate_y)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.order?.logistics?.ans_type}
          label="Tipo de ANS"
          name="order.logistics.ans_type"
          onChangeProp={() => setKey("ans_type", watch().order.logistics.ans_type)}
        />

        <ProductsForm control={control} selectOptions={selectOptions} errors={errors} />

        {/* Customer */}
        <Subtitle text="Cliente" id="customer" />
        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.customer?.name}
          label="Nombre del cliente"
          name="customer.name"
          onChangeProp={() => setKey("name", watch().customer.name)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.customer?.email}
          label="Correo electrónico del cliente"
          name="customer.email"
          onChangeProp={() => setKey("email", watch().customer.email)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.customer?.phone}
          label="Teléfono del cliente"
          name="customer.phone"
          onChangeProp={() => setKey("phone", watch().customer.phone)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.customer?.document_type}
          label="Tipo de documento del cliente"
          name="customer.document_type"
          onChangeProp={() => setKey("document_type", watch().customer.document_type)}
        />

        <AutoComplete
          control={control}
          options={selectOptions}
          error={errors.customer?.document_number}
          label="Número de documento del cliente"
          name="customer.document_number"
          onChangeProp={() => setKey("document_number", watch().customer.document_number)}
        />
      </form>
    </div>
  );
};
