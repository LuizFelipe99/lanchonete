import { Component } from '@angular/core';
import { OrderSnack, OrderSnackFilter } from 'src/app/models/Snack-Order/snack-order.models';
import { OrderSnackService } from 'src/app/services/order-snack.service';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-last-orders-snack',
  templateUrl: './last-orders-snack.component.html',
  styleUrls: ['./last-orders-snack.component.scss']
})
export class LastOrdersSnackComponent {
  ngOnInit(): void {
    this.getOrders(this.page);
  }
  constructor(private api: OrderSnackService, public globalService: GlobalService) { }

  card_title = "Ultimos pedidos"

  // requiisição tipada
  orders: OrderSnack[];
  filterOrder: OrderSnackFilter = {status: '3', description: '', id_order_snack: ''}
  isLoad: boolean = false;
  page: number = 1;
  totalOrders: number = 0;
  // passando a pagina por parametro para a paginação
  // a pagina pode variar de acordo com o botao do form de paginar, ele sempre incrementa/decrementa current_page + 1 ou -1 depende da ação
  getOrders(page: number) {
    this.isLoad = true;
   this.api.getOrders(this.filterOrder, page).subscribe(data => {
      if ('error' in data) {
        this.globalService.openSnackBar('Não foi encontrado', 'Ok', 'Erro!', 'error-snackbar');
        this.isLoad = false;
      } else {
        this.orders = data.data;
        this.totalOrders = data.orders;
        this.isLoad = false;
      }
      this.globalService.veryTokenExpired(data);
    });
  }
}
