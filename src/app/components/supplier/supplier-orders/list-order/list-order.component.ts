import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { OrderService } from 'src/app/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderFilter, OrderSupplier } from 'src/app/models/Order/order_supplier.model';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent {

  constructor(private api: OrderService, private _snackBar: MatSnackBar, public globalService: GlobalService) {}

  ngOnInit(): void {
    this.getOrders(this.page);
  }

// requiisição tipada
orders: OrderSupplier[];
filterOrder: OrderFilter = {supplier: '', responsible: '', id_order_supplier: 0}



 
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
        this.totalOrders = data.orders;
        this.isLoad = false;
      }
      //funcao que verifica token
      this.globalService.veryTokenExpired(data);
    });
  }


  clearInputs(){
    this.filterOrder.supplier = "";
    this.filterOrder.responsible = "";
    this.filterOrder.id_order_supplier = 0;
  }

}
