import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

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

  // Objeto para o formulário de filtro
  formData: {
    id_supplier: string;
    total: string;
    created_by: string;
    dt_expired: string;
  } = {
    id_supplier: '',
    total: '',
    created_by: this.id_user,
    dt_expired: '',
  };

//nao ta funfando


  createOrder() {
    const { id_supplier, total, created_by, dt_expired } = this.formData;
    this.api
    .createOrder(id_supplier, total, created_by, dt_expired )
    .then(
      (response) => {

          if (response.status === true) {
            console.log("criado");
          }else{
            console.log("nao criado");
            // this.globalService.openSnackBar('Nenhum registro encontrado', 'Ok',  'Erro!', 'error-snackbar');
        }
        },
        (error: any) => {
          console.error('Erro ao buscar usuários:', error);
        }
      );
  }

}
