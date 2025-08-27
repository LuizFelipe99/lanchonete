export interface Item{
  id_item?: string;
  name?: string;
  description?: string;
  category?: string;
  current_stock?: string;
  sale_price?:string;
  min_stock?: string;
  url_img?: string;
  rank?:string;
}

// interface usada para filtrar usuario
export interface ItemFilter{
  id_item?: string,
  name?: string;
  description?: string;
  category?: string;
  current_stock?: number;
  min_stock?: number,
  sale_price?:string;
  per_page?: number;
  url_img?:string;
  rank?:string;
}

// interface usada para inserir item na order
export interface ItemInOrder{
  id_item?: string,
  id_order_supplier?: string,
  id_order_supplier_items?: string,
  name?: string,
  quantity?: number,
  price_unit?: number,
  sale_price?:string;
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
  message?: string,
}

export interface RemoveItemInOrder{
  id_order_snack_items?: number
}

export interface lowItemStock{
  id_item?:string,
  qte_remove?: string,
  message?: any,
  name?: string,
}
