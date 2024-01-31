export interface Item{
  id_item?: string;
  name?: string;
  description?: string;
  category?: string;
  current_stock?: number;
  min_stock?: number;
  sale_price?:string;
}

// interface usada para filtrar usuario
export interface ItemFilter{
  id_item?: string,
  name?: string;
  description?: string;
  category?: string;
  current_stock?: number;
  min_stock?: number,
  per_page?: number;
}

// interface usada para inserir item na order
export interface ItemInOrder{
  id_item?: string,
  id_order_supplier?: string,
  id_order_supplier_items?: string,
  name?: string,
  quantity?: number,
  price_unit?: number,
  total?: number,
}


// interface usada para inserir item na order
export interface ItemInOrderSnack{
  id_item?: string,
  id_order_snack?: string,
  id_order_snack_items?: string,
  name?: string,
  quantity?: string,
  price_unit?: string,
  total?: string,
}

