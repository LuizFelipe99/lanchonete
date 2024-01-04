export interface User{
  id_user?: string;
  name: string;
  login: string;
  password: string;
  active: number;
  contact: string;
  usergroup: number;
  dt_created?: string;
}

// interface usada para filtrar usuario
export interface UserFilter{
  name: string;
  login: string;
  active: number;
  per_page: number;
}