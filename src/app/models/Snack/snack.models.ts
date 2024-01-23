export interface Snack {
  id_snack?: string;
  name?: string;
  description?: string;
  price?: string;
}

// interface usada para filtrar lanche
export interface SnackFilter {
  id_supplier?:string;
  name?: string;
  description?: string;
  price?: string;
  per_page?: number;
}
