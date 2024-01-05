export interface Supplier {
  id_supplier?: string;
  name?: string;
  responsible?: string;
  adress?: string;
  contact_supplier?: string;
  contact_responsible?: string;
  catalog?: string;
  type?: string;
  active?: number;
}

// interface usada para filtrar fornecedores
export interface SupplierFilter {
  id_supplier?:string;
  name?: string;
  responsible?: string;
  adress?: string;
  contact_supplier?: string;
  contact_responsible?: string;
  catalog?: string;
  type?: string;
  active?: number;
  per_page?: number;
}
