import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { OrderService } from 'src/app/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent {

  constructor(private api: OrderService, private _snackBar: MatSnackBar, public globalService: GlobalService) {}

  ngOnInit(): void {
    this.getOrders(this.pagination);
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


  orders: any[] = [];
  totalOrders: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  pagination: number = 1;
  isLoad: boolean = false;


  getOrders(pagination: number) {
    this.isLoad = true;
    const { supplier, responsible, id_order_supplier, perPage } = this.formData;
    this.api
      .getOrders(supplier, responsible, id_order_supplier, pagination, perPage)
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
