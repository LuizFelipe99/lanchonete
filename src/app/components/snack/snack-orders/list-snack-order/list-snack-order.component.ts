import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/app/global.service';
import { OrderSnack, OrderSnackFilter } from 'src/app/models/Snack-Order/snack-order.models';
import { OrderSnackService } from 'src/app/services/order-snack.service';

@Component({
  selector: 'app-list-snack-order',
  templateUrl: './list-snack-order.component.html',
  styleUrls: ['./list-snack-order.component.scss']
})
export class ListSnackOrderComponent {
  constructor(private api: OrderSnackService, private _snackBar: MatSnackBar, public globalService: GlobalService) {}

  ngOnInit(): void {
    this.getOrders(this.page);
  }

// requiisição tipada
orders: OrderSnack[];
filterOrder: OrderSnackFilter = {snack: '', description: '', id_order_snack: 0}

  // variaveis para controlar paginação
  page: number = 1;
  totalOrders: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  isLoad: boolean = false;

// passando a pagina por parametro para a paginação
// a pagina pode variar de acordo com o botao do form de paginar, ele sempre incrementa/decrementa current_page + 1 ou -1 depende da ação
getOrders(page: number){
    this.isLoad = true;
    this.api.getOrders(this.filterOrder, page).subscribe(data => {
      if ('error' in data){
        this.globalService.openSnackBar('Não foi encontrado', 'Ok',  'Erro!', 'error-snackbar');
        this.isLoad = false;
      }else{
        this.orders = data.data;
        this.totalPages = data.total_pages;
        this.currentPage = data.current_page;
        this.totalOrders = data.orders_snack;
        this.isLoad = false;
      }
    });
  }
}
