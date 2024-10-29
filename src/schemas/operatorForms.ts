import * as yup from "yup";
import msg from "./message";

export const operatorSchema = yup
  .object({
    nit: yup.string().required(msg.requiered).matches(/^\d+$/, "El NIT debe contener solo números"),
    operatorId: yup.string().notRequired(),
    name: yup
      .string()
      .required(msg.requiered)
      .matches(/^[A-Z0-9\s]+$/, "El campo debe estar en mayúsculas y puede contener números"),
    codigo: yup.string().required(msg.requiered),
    estado: yup.string().required(msg.requiered),
    url: yup.string().required(msg.requiered),
    signature: yup.object().required(msg.requiered).typeError("El campo debe ser un objeto válido"),
    signatureAuth: yup.string().notRequired(),
  })
  .required();

export const stratificationSchema = yup.object().shape({
  nit: yup.string().required(msg.requiered).matches(/^\d+$/, "El NIT debe contener solo números"),  
  operatorLog: yup.string().required(msg.requiered),
  // logisticOperatorId: yup.string().required(msg.requiered),
  typeService: yup.string().required(msg.requiered),
  orderGeneratorId: yup.string().required(msg.requiered),
  departments: yup.string().required(msg.requiered),
  citiesOrigin: yup.string().required(msg.requiered),
});
