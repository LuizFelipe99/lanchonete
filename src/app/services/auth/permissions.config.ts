// src/app/auth/permissions.config.ts

export interface PermissionEntry {
  path: string;
  allowedGroups: string[];
  title: string;
  icon: string;
  category: string;
}

export const ROUTE_PERMISSIONS: PermissionEntry[] = [
  { path: '/home', allowedGroups: ['1'], title: 'Home', icon: 'home', category: 'home' },

  { path: '/usuarios/criar', allowedGroups: ['1', '2'], title: 'Cadastrar usuários', icon: 'group_add', category: 'users' },
  { path: '/usuarios/listar', allowedGroups: ['1', '2'], title: 'Listar usuários', icon: 'search', category: 'users' },

  { path: '/fornecedores/criar', allowedGroups: ['1'], title: 'Cadastrar fornecedores', icon: 'contact_page', category: 'suppliers' },
  { path: '/fornecedores/listar', allowedGroups: ['1'], title: 'Listar fornecedores', icon: 'search', category: 'suppliers' },

  { path: '/fornecedores/pedidos/listar', allowedGroups: ['1'], title: 'Listar pedidos', icon: 'search', category: 'order_supplier' },
  { path: '/fornecedores/pedidos/criar', allowedGroups: ['1'], title: 'Cadastrar pedidos', icon: 'grading', category: 'order_supplier' },

  { path: '/itens/listar', allowedGroups: ['1'], title: 'Listar itens', icon: 'search', category: 'items' },
  { path: '/itens/criar', allowedGroups: ['1'], title: 'Cadastrar itens', icon: 'grading', category: 'items' },
  { path: '/itens/baixa', allowedGroups: ['1'], title: 'Baixa de itens', icon: 'cancel_presentation', category: 'items' },

  { path: '/categorias/listar', allowedGroups: ['1'], title: 'Listar categorias', icon: 'search', category: 'category' },
  { path: '/categorias/criar', allowedGroups: ['1'], title: 'Cadastrar categorias', icon: 'category', category: 'category' },

  { path: '/lanches/criar', allowedGroups: ['1'], title: 'Cadastrar lanches', icon: 'grading', category: 'snacks' },
  { path: '/lanches/listar', allowedGroups: ['1'], title: 'Listar lanches', icon: 'search', category: 'snacks' },

  { path: '/lanches/pedidos/listar', allowedGroups: ['1', '2'], title: 'Listar pedidos', icon: 'search', category: 'order_snack' },
  { path: '/lanches/pedidos/criar', allowedGroups: ['1', '2'], title: 'Cadastrar pedidos', icon: 'grading', category: 'order_snack' },

  { path: '/dashboard/financias/detalhes', allowedGroups: ['1'], title: 'Detalhes financeiros', icon: 'bar_chart', category: 'dashboard' },

  { path: '/configuracoes', allowedGroups: ['1'], title: 'Configurações', icon: 'settings', category: 'config' }
];
