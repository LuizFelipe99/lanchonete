import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { OrderService } from 'src/app/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderFilter, OrderSupplier } from 'src/app/models/order/order.model';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent {

  constructor(private api: OrderService, private _snackBar: MatSnackBar, public globalService: GlobalService) {}

  ngOnInit(): void {
    this.getOrderss(this.page);
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
    });
  }









  // Objeto para o formulário de filtro
  formData: {
    supplier: string;
    responsible: string;
    id_order_supplier: string;
    perPage: number;
  } = {
    supplier: '',
    responsible: '',
    id_order_supplier: '',
    perPage: 15,
  };



  getOrderss(pagination: number) {
    this.isLoad = true;
    const { supplier, responsible, id_order_supplier, perPage } = this.formData;
    this.api
      .getOrderss(supplier, responsible, id_order_supplier, pagination, perPage)
      .then(
        (response) => {
          this.orders = response.data; // Armazene os usuários na variável 'usuarios'
          this.totalOrders = response.orders;
          this.totalPages = response.total_pages;
          this.currentPage = response.current_page;
          this.isLoad = false;

          if (response.status === true) {
          }else{
            this.globalService.openSnackBar('Nenhum registro encontrado', 'Ok',  'Erro!', 'error-snackbar');
            this.isLoad = false;
        }
        },
        (error: any) => {
          this.isLoad = false;
          console.error('Erro ao buscar usuários:', error);
        }
      );
  }

}
