import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'usuarios/criar', component: CreateUserComponent },
  { path: 'usuarios/listar', component: ListUserComponent },
  { path: 'fornecedores/criar', component: CreateSupplierComponent },
  { path: 'fornecedores/listar', component: ListSupplierComponent },
  { path: 'fornecedores/pedidos/criar', component: CreateOrderComponent },
  { path: 'fornecedores/pedidos/listar', component: ListOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
