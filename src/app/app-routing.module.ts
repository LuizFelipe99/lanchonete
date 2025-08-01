import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
// import do login
import { LoginComponent } from './components/login/login.component';
// import dos users
import { CreateUserComponent } from './components/user/users/create-user/create-user.component';
import { ListUserComponent } from './components/user/users/list-user/list-user.component';
// import dos fornecedores
import { CreateSupplierComponent } from './components/supplier/suppliers/create-supplier/create-supplier.component';
import { ListSupplierComponent } from './components/supplier/suppliers/list-supplier/list-supplier.component';
import { CreateOrderComponent } from './components/supplier/supplier-orders/create-order/create-order.component';
import { ListOrderComponent } from './components/supplier/supplier-orders/list-order/list-order.component';
import { ListItemComponent } from './components/supplier/supplier-items/list-item/list-item.component';

import { HomeComponent } from './components/home/home.component';
import { CreateItemComponent } from './components/supplier/supplier-items/create-item/create-item.component';
import { CreateCategoryComponent } from './components/category/create-category/create-category.component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';
import { CreateSnackComponent } from './components/snack/snacks/create-snack/create-snack.component';
import { ListSnackComponent } from './components/snack/snacks/list-snack/list-snack.component';
import { ListSnackOrderComponent } from './components/snack/snack-orders/list-snack-order/list-snack-order.component';
import { CreateSnackOrderComponent } from './components/snack/snack-orders/create-snack-order/create-snack-order.component';
import { LowItemComponent } from './components/supplier/supplier-items/low-item/low-item.component';

import { FinanceDashDetailComponent } from './components/dashboard/finance-dash-detail/finance-dash-detail.component';

// import configuracoes
import { GeralComponent } from './components/config/geral/geral.component';

//import erros
import { ErrorHttpsComponent } from './components/erros/erros_https/erros_https.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
//   { path: 'usuarios/criar', component: CreateUserComponent },
//   { path: 'usuarios/listar', component: ListUserComponent,  canActivate: [AuthGuard] },
//   { path: 'fornecedores/criar', component: CreateSupplierComponent,  canActivate: [AuthGuard] },
//   { path: 'fornecedores/listar', component: ListSupplierComponent,  canActivate: [AuthGuard] },
//   { path: 'fornecedores/pedidos/listar', component: ListOrderComponent,  canActivate: [AuthGuard] },
//   { path: 'fornecedores/pedidos/criar', component: CreateOrderComponent,  canActivate: [AuthGuard] },
//   { path: 'itens/listar', component: ListItemComponent,  canActivate: [AuthGuard] },
//   { path: 'itens/criar', component: CreateItemComponent,  canActivate: [AuthGuard] },
//   { path: 'categorias/listar', component: ListCategoryComponent,  canActivate: [AuthGuard] },
//   { path: 'categorias/criar', component: CreateCategoryComponent,  canActivate: [AuthGuard] },
//   { path: 'lanches/criar', component: CreateSnackComponent,  canActivate: [AuthGuard] },
//   { path: 'lanches/listar', component: ListSnackComponent,  canActivate: [AuthGuard] },
//   { path: 'lanches/pedidos/listar', component: ListSnackOrderComponent,  canActivate: [AuthGuard] },
//   { path: 'lanches/pedidos/criar', component: CreateSnackOrderComponent,  canActivate: [AuthGuard] },
//   { path: 'dashboard/financias/detalhes', component: FinanceDashDetailComponent,  canActivate: [AuthGuard] },
//   { path: 'configuracoes', component: GeralComponent,  canActivate: [AuthGuard] },
//   { path: 'itens/baixa', component: LowItemComponent,  canActivate: [AuthGuard] },
//   { path: 'error', component: ErrorHttpsComponent },
  
// ];
//adicionado allowedgroups para informar os acessos do caixa e admin
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { allowedGroups: ['1'] } },
  { path: 'usuarios/criar', component: CreateUserComponent, canActivate: [AuthGuard], data: { allowedGroups: ['1'] } },
  { path: 'usuarios/listar', component: ListUserComponent, canActivate: [AuthGuard], data: { allowedGroups: ['1'] } },
  { path: 'fornecedores/criar', component: CreateSupplierComponent, canActivate: [AuthGuard], data: { allowedGroups: ['1'] } },
  { path: 'fornecedores/listar', component: ListSupplierComponent, canActivate: [AuthGuard], data: { allowedGroups: ['1'] } },
  { path: 'fornecedores/pedidos/listar', component: ListOrderComponent, canActivate: [AuthGuard], data: { allowedGroups: ['1'] } },
  { path: 'fornecedores/pedidos/criar', component: CreateOrderComponent, canActivate: [AuthGuard], data: { allowedGroups: ['1'] } },
  { path: 'itens/listar', component: ListItemComponent, canActivate: [AuthGuard], data: { allowedGroups: ['1'] } },
  { path: 'itens/criar', component: CreateItemComponent, canActivate: [AuthGuard], data: { allowedGroups: ['1'] } },
  { path: 'categorias/listar', component: ListCategoryComponent, canActivate: [AuthGuard], data: { allowedGroups: ['1'] } },
  { path: 'categorias/criar', component: CreateCategoryComponent, canActivate: [AuthGuard], data: { allowedGroups: ['1'] } },
  { path: 'lanches/criar', component: CreateSnackComponent, canActivate: [AuthGuard], data: { allowedGroups: ['1'] } },
  { path: 'lanches/listar', component: ListSnackComponent, canActivate: [AuthGuard], data: { allowedGroups: ['1'] } },
  { path: 'lanches/pedidos/listar', component: ListSnackOrderComponent, canActivate: [AuthGuard], data: { allowedGroups: ['1', '2'] } },
  { path: 'lanches/pedidos/criar', component: CreateSnackOrderComponent, canActivate: [AuthGuard], data: { allowedGroups: ['1', '2'] } },
  { path: 'dashboard/financias/detalhes', component: FinanceDashDetailComponent, canActivate: [AuthGuard], data: { allowedGroups: ['1'] } },
  { path: 'configuracoes', component: GeralComponent, canActivate: [AuthGuard], data: { allowedGroups: ['1'] } },
  { path: 'itens/baixa', component: LowItemComponent, canActivate: [AuthGuard], data: { allowedGroups: ['1'] } },
  { path: 'error', component: ErrorHttpsComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
