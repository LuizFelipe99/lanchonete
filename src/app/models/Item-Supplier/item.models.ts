export interface Item{
  id_item?: string;
  name?: string;
  description?: string;
  category?: string;
  quantity?: number;
}

// interface usada para filtrar usuario
export interface ItemFilter{
  id_item?: string,
  name?: string;
  description?: string;
  category?: string;
  quantity?: number;
  per_page?: number;
}

// interface usada para inserir item na order
export interface ItemInOrder{
  id_item?: string,
  name?: string,
  quantity?: string,
  price_unit?: string,
  total?: string,
}
