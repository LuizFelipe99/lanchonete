import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { OrderSupplier } from 'src/app/models/Order/order_supplier.model';
import { User, UserFilter } from 'src/app/models/User/user.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-finish-order',
  templateUrl: './finish-order.component.html',
  styleUrls: ['./finish-order.component.scss']
})
export class FinishOrderComponent {

  //colocando o valor que vem por localstorage na varaivel identity, que poderá ser usada para realizar outras funções, como salvar
  get identity(): string {
    return localStorage.getItem('identifier') || ''; // Obter o nome do usuário do localStorage
  }

  ngOnInit(): void {
    // ao carregar componente é executado a função getUser para listar tudo e passando a pagina por parametro
    // como a pagina até entao é 1 ele sempre vai carregar na primeira pagina
    this.getUsers(this.page);

  }

  constructor(private api: UserService, public globalService: GlobalService, private order: OrderService) {}

  users: User[];
  filterUser: UserFilter = { name: '', login: '', active: 3, per_page: 100};
  page: number = 1;

  updateOrder: OrderSupplier = { id_order_supplier: this.identity }

  getUsers(page: number){
    this.api.getUsers(this.filterUser, page).subscribe(data => {
      if ('error' in data){
        this.globalService.openSnackBar('Não foi encontrado', 'Ok',  'Erro!', 'error-snackbar');
      }else{
        this.users = data.data;
      }
    });
  }

  finishOrder(){
    this.order.finishOrder(this.updateOrder).subscribe(data=> {
      if ('error' in data){
        this.globalService.openSnackBar('Não foi possível atualizar pedido', 'Ok',  'Erro!', 'error-snackbar');
      }else{
        this.globalService.openSnackBar('Atualizado com sucesso', 'Ok',  'Sucesso!', 'success-snackbar');
      }
    });
  }

}
