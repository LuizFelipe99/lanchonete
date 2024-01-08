export interface OrderSupplier {
  id_order_supplier?: string;
  id_supplier?: number;
  dt_created?: string;
  dt_expired?: string;
  total?: string;
  created_by?: string;
  supplier?: string;
  responsible?: string;
  items?: string;
  
}

export interface OrderFilter{
  supplier?: string;
  responsible?: string,
  id_order_supplier?: number;
}

export interface ResponseFilterOrder {
  data: any[];
  total_pages: number;
  current_page: number;
  page: number;
  orders: number;  
}