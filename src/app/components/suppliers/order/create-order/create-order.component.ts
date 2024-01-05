import { OrderService } from 'src/app/services/order.service';
import {Component} from '@angular/core';
import { OrderSupplier } from 'src/app/models/order/order.model';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent {
  // PEGANDO ID DO USUARIO NA LOCALSTORAGE PARA MANDAR JUNTO A REQUISIÇÃO
  get id_user(): string {
    return localStorage.getItem('id_user') || ''; // Obter o nome do usuário do localStorage
  }
  
  constructor(private api: OrderService){}


  orders: OrderSupplier[] = [];
  newOrder: OrderSupplier = {
    id_supplier: 0,
    dt_expired: '',
    dt_created: '',
    total: '',
    created_by: this.id_user,
    // Preencha outras propriedades conforme necessário
  };

  createNewOrder(): void {
    this.api.createOrder(this.newOrder).subscribe(createdOrder => {
      console.log('Nova ordem cadastrada:', createdOrder);
      // Atualizar a lista de ordens após o cadastro (opcional)
      // this.loadOrders();
    });
  }
}
