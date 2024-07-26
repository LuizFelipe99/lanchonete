export interface Category {
  id_category?: string;
  name?: string;
  description?: string;
}

export interface CategoryFilter {
  id_category?: string,
  name?: string,
  description?: string;
  per_page?: number;
}
