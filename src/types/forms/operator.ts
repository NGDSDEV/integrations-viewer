export interface IThirdStep {
  order: {
    general_information: {
      order_number: string;
      short_order: string;
      order_creation_date: string;
      request_time: string;
    };
    delivery_dates: {
      promised_delivery_date: string;
      new_promised_delivery_date: string;
      promised_delivery_time: string;
    };
    user: {
      order_processing_user: string;
    };
    origin: {
      department: string;
      city: string;
      address: string;
      origin_point_code: string;
      origin_point_name: string;
      dane_code: string;
    };
    destination: {
      department: string;
      city: string;
      address: string;
      destination_point_code: string;
      destination_point_name: string;
      dane_code: string;
    };
    order_details: {
      sura_order_number: string;
      scp_order_number: string;
      pending_generator_code: string;
      pending_generator_point: string;
      healthcare_provider: string;
      channel: string;
      institutional_order_value: string;
      commercial_order_value: string;
      commercial_payment_method: string;
      institutional_payment_method: string;
      institutional_inventory_value: string;
      commercial_inventory_value: string;
      source: string;
    };
    logistics: {
      volume_cm3: string;
      weight_grams: string;
      cargo_type: string;
      delivery_observations: string;
      dispensation_data: string;
      tracking_number: string;
      coordinate_x: string;
      coordinate_y: string;
      ans_type: string;
    };
  };
  customer: {
    name: string;
    email: string;
    phone: string;
    document_type: string;
    document_number: string;
  };
  products: IProduct[];
}

export interface IOperator {
  operatorId: number | null;
  nit: number | null;
  name: string;
  code: number | null;
  status: string;
  signature: string;
  uploadSigned: string;
  url: string;
}

export interface IProduct {
  product_code: string;
  product_description: string;
  product_image: string;
  product_value: string;
  product_quantity: string;
  product_barcode: string;
}