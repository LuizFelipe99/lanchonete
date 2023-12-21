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

import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'usuarios/criar', component: CreateUserComponent,  canActivate: [AuthGuard] },
  { path: 'usuarios/listar', component: ListUserComponent,  canActivate: [AuthGuard] },
  { path: 'fornecedores/criar', component: CreateSupplierComponent,  canActivate: [AuthGuard] },
  { path: 'fornecedores/listar', component: ListSupplierComponent,  canActivate: [AuthGuard] },
  { path: 'fornecedores/pedidos/criar', component: CreateOrderComponent,  canActivate: [AuthGuard] },
  { path: 'fornecedores/pedidos/listar', component: ListOrderComponent,  canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
