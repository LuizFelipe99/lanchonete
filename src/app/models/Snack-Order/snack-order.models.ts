export interface OrderSnack {
  id_order_snack?: string;
  id_snack?: number;
  dt_created?: string;
  dt_expired?: string;
  total?: string;
  created_by?: string
  snack?: string;
  description?: string;
  client?: string;
  service_type?: string;
  status?: string;
  itens?:string;
}

export interface OrderSnackFilter{
  snack?: string;
  description?: string,
  id_order_snack?: string;
  client?: string;
  status?: string;

}

export interface ResponseFilterOrderSnack {
  data: any[];
  total_pages: number;
  current_page: number;
  page: number;
  orders: number;
  total_value?: number;
}

export interface FinishOrder {
  id_order_snack?: string;
  discounted_value?: string;
  discounted_type?: string;
  total?: number;
  created_by?: string;
  value_to_return?: number;
}

