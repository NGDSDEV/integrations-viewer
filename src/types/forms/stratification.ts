export interface IStratification {
  nit: string;
  operatorLog: string;
  logisticOperatorId: string;
  typeService: string;
  orderGeneratorId: string;
  departments: string;
  citiesOrigin: string;
  codeDispensaryIds: string[];
}


export interface ITypeService {
  service_id: string;
  service_name: string;
}

export interface IDepartment {
  department_id: string;
  department_name: string;
}
export interface IOrderGenerator {
  order_generator_id: string;
  order_generator_name: string;
}
export interface ICities {
  city_id: string;
  city_name: string;
  dane_code: string;
  dane_code_sura: string;
  latitude: string;
  longitude: string;
}