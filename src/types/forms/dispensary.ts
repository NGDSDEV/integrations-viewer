import { Dispatch,  } from "react";
import { IThirdStep } from "./operator";
import { Control, FieldErrors, UseFormHandleSubmit, UseFormReset, UseFormWatch } from "react-hook-form";

export interface IDispensary {
  dispensary_name: string;
  address: string;
  code: string;
  phone: string;
  latitude: string;
  longitude: string;
  status: string;
}

export interface IForm {
  className?: string;
  isValid: boolean;
  json: object;
  jsonCheck: object;
  setJson: Dispatch<React.SetStateAction<Record<string, unknown>>>;
  setJsonCheck: Dispatch<React.SetStateAction<Record<string, unknown>>>;
  watch: UseFormWatch<IThirdStep>;
  handleSubmit: UseFormHandleSubmit<IThirdStep, undefined>;
  control: Control<IThirdStep, unknown>;
  errors: FieldErrors<IThirdStep>;
  reset: UseFormReset<IThirdStep>;
}
