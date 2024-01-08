export interface Item{
  id_item?: string;
  name?: string;
  description?: string;
  category?: string;
  expiration?: string;
  active?: number;
}

// interface usada para filtrar usuario
export interface ItemFilter{
  id_item?: string,
  name?: string;
  description?: string;
  category?: string;
  expiration?: string;
  active?: number;
  per_page?: number;
}
