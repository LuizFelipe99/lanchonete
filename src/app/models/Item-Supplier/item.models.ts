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
