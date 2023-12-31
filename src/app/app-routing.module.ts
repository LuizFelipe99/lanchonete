import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
// import do login
import { LoginComponent } from './components/login/login.component';
// import dos users
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { ListUserComponent } from './components/users/list-user/list-user.component';
// import dos fornecedores
import { CreateSupplierComponent } from './components/suppliers/create-supplier/create-supplier.component';
import { ListSupplierComponent } from './components/suppliers/list-supplier/list-supplier.component';
import { CreateOrderComponent } from './components/suppliers/order/create-order/create-order.component';
import { ListOrderComponent } from './components/suppliers/order/list-order/list-order.component';
import { ListItemComponent } from './components/supplier-items/list-item/list-item.component';

import { HomeComponent } from './components/home/home.component';
import { CreateItemComponent } from './components/supplier-items/create-item/create-item.component';
import { CreateCategoryComponent } from './components/category/create-category/create-category.component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'usuarios/criar', component: CreateUserComponent },
  { path: 'usuarios/listar', component: ListUserComponent,  canActivate: [AuthGuard] },
  { path: 'fornecedores/criar', component: CreateSupplierComponent,  canActivate: [AuthGuard] },
  { path: 'fornecedores/listar', component: ListSupplierComponent,  canActivate: [AuthGuard] },
  { path: 'fornecedores/pedidos/listar', component: ListOrderComponent,  canActivate: [AuthGuard] },
  { path: 'fornecedores/pedidos/criar', component: CreateOrderComponent,  canActivate: [AuthGuard] },
  { path: 'itens/listar', component: ListItemComponent,  canActivate: [AuthGuard] },
  { path: 'itens/criar', component: CreateItemComponent,  canActivate: [AuthGuard] },
  { path: 'categorias/listar', component: ListCategoryComponent,  canActivate: [AuthGuard] },
  { path: 'categorias/criar', component: CreateCategoryComponent,  canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
