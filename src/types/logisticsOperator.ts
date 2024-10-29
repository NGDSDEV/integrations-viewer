// interface de los operadores logísticos
export interface ILogisticsOperator {
  codigo: string;
  estado: string;
  nit: string;
  name: string;
  operatorId: string;
  signature: string | object;
  signatureAuth?: string | null;
  url: string;
}