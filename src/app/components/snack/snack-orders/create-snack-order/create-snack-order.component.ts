import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/app/global.service';
import { OrderSnack } from 'src/app/models/Snack-Order/snack-order.models';
import { OrderSnackService } from 'src/app/services/order-snack.service';

@Component({
  selector: 'app-create-snack-order',
  templateUrl: './create-snack-order.component.html',
  styleUrls: ['./create-snack-order.component.scss']
})
export class CreateSnackOrderComponent {

    // PEGANDO ID DO USUARIO NA LOCALSTORAGE PARA MANDAR JUNTO A REQUISIÇÃO
    get id_user(): string {
      return localStorage.getItem('id_user') || ''; // Obter o nome do usuário do localStorage
    }
  
  constructor(private api: OrderSnackService, private _snackBar: MatSnackBar, public globalService: GlobalService) {}

  orders: OrderSnack[] = [];
  newOrder: OrderSnack = {
    created_by: this.id_user,
    id_order_snack: '',
    // Preencha outras propriedades conforme necessário
  };

  isLoad = false;
  id_order_snack = <any> '';

  createNewOrder(): void {
    this.isLoad = true;
    
    this.api.createOrder(this.newOrder).subscribe(createdOrder => {
      console.log('Nova ordem cadastrada:', createdOrder);
      if ('error' in createdOrder) {
        this.globalService.openSnackBar('Preencha todos os campos', 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
      } else {
        this.id_order_snack = createdOrder.id_order_snack;
        localStorage.setItem('id_order_snack',this.id_order_snack['id_order_snack']);
        console.log(this.id_order_snack);

        this.globalService.openSnackBar('Registro criado com sucesso', 'Ok', 'Sucesso!', 'success-snackbar');
        this.globalService.openDialog('Selecione o item', 'detail-snack-order', this.id_order_snack['id_order_snack'], '95%');
        // setando na localstorage o id da order
        this.isLoad = false;
      }
      // Atualizar a lista de ordens após o cadastro (opcional)
      // this.loadOrders();
    });
  }

  
}
